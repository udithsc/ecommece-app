import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return NextResponse.json({ 
        error: 'Cloudinary not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.' 
      }, { status: 500 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedFiles = [];

    for (const file of files) {
      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ 
          error: `Invalid file type: ${file.type}. Allowed types: ${ALLOWED_TYPES.join(', ')}` 
        }, { status: 400 });
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ 
          error: `File too large: ${file.name}. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB` 
        }, { status: 400 });
      }

      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to Cloudinary
      const result = await uploadToCloudinary(buffer, 'udt-store/products');

      uploadedFiles.push({
        originalName: file.name,
        publicId: result.public_id,
        url: result.secure_url,
        thumbnailUrl: result.thumbnail_url || result.secure_url,
        size: result.bytes,
        type: `image/${result.format}`,
        width: result.width,
        height: result.height
      });
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      message: `Successfully uploaded ${uploadedFiles.length} file(s) to Cloudinary`
    });

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ 
      error: 'Internal server error during upload' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');

    if (!publicId) {
      return NextResponse.json({ error: 'Public ID required' }, { status: 400 });
    }

    const { deleteFromCloudinary } = await import('@/lib/cloudinary');
    await deleteFromCloudinary(publicId);

    return NextResponse.json({ 
      success: true, 
      message: 'File deleted successfully from Cloudinary' 
    });

  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return NextResponse.json({ 
      error: 'Internal server error during deletion' 
    }, { status: 500 });
  }
}