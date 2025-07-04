import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import { auth } from '@/auth';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const UPLOAD_DIR = join(process.cwd(), 'app', 'uploads', 'admin');

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    // Create upload directory if it doesn't exist
    try {
      await mkdir(UPLOAD_DIR, { recursive: true });
    } catch (error) {
      // Directory might already exist
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

      // Generate unique filename
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const uniqueFilename = `${uuidv4()}.${fileExtension}`;
      const optimizedFilename = `${uuidv4()}.webp`;
      
      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Process image with Sharp
      const processedBuffer = await sharp(buffer)
        .resize(1200, 1200, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .webp({ quality: 85 })
        .toBuffer();

      // Save processed image
      const filePath = join(UPLOAD_DIR, optimizedFilename);
      await writeFile(filePath, processedBuffer);

      // Create thumbnail
      const thumbnailFilename = `thumb_${optimizedFilename}`;
      const thumbnailBuffer = await sharp(buffer)
        .resize(300, 300, { 
          fit: 'cover' 
        })
        .webp({ quality: 75 })
        .toBuffer();

      const thumbnailPath = join(UPLOAD_DIR, thumbnailFilename);
      await writeFile(thumbnailPath, thumbnailBuffer);

      uploadedFiles.push({
        originalName: file.name,
        filename: optimizedFilename,
        thumbnailFilename,
        url: `/api/admin/upload/admin/${optimizedFilename}`,
        thumbnailUrl: `/api/admin/upload/admin/${thumbnailFilename}`,
        size: processedBuffer.length,
        type: 'image/webp'
      });
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      message: `Successfully uploaded ${uploadedFiles.length} file(s)`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Internal server error during upload' 
    }, { status: 500 });
  }
}

// Handle file deletion
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'Filename required' }, { status: 400 });
    }

    // Delete main image and thumbnail
    const fs = require('fs').promises;
    const filePath = join(UPLOAD_DIR, filename);
    const thumbnailPath = join(UPLOAD_DIR, `thumb_${filename}`);

    try {
      await fs.unlink(filePath);
      await fs.unlink(thumbnailPath);
    } catch (error) {
      console.error('File deletion error:', error);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'File deleted successfully' 
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ 
      error: 'Internal server error during deletion' 
    }, { status: 500 });
  }
}