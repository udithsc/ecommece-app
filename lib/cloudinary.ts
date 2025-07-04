import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  url: string;
  thumbnail_url?: string;
}

export const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string = 'udt-store/products'
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 1200, crop: 'limit', quality: 'auto' },
          { format: 'webp' }
        ],
        eager: [
          { width: 300, height: 300, crop: 'fill', quality: 'auto', format: 'webp' }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
            url: result.url,
            thumbnail_url: result.eager?.[0]?.secure_url
          });
        } else {
          reject(new Error('Upload failed'));
        }
      }
    );

    uploadStream.end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

export const getCloudinaryUrl = (publicId: string, transformation?: string): string => {
  if (transformation) {
    return cloudinary.url(publicId, { transformation });
  }
  return cloudinary.url(publicId);
};