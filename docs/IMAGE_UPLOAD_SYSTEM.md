# Image Upload System Documentation

## Overview

The UDT Store now includes a comprehensive image upload system for product management with support for both local storage and cloud storage (Cloudinary).

## Features

### ✅ **Implemented Features**

1. **Multiple Upload Methods**

   - Local file storage (`/app/uploads/` served via API)
   - Cloudinary cloud storage integration
   - Drag & drop interface
   - File browser selection

2. **Image Processing**

   - Automatic WebP conversion for optimization
   - Image resizing (max 1200x1200px)
   - Thumbnail generation (300x300px)
   - Quality optimization (85% for full images, 75% for thumbnails)

3. **File Validation**

   - File type validation (JPEG, PNG, WebP, GIF)
   - File size limits (5MB maximum)
   - Multiple file upload support
   - File count limits (configurable)

4. **UI Components**

   - Drag & drop upload area
   - Image preview gallery
   - Upload progress indicators
   - Error handling and user feedback

5. **Security**
   - Authentication required for uploads
   - File type validation
   - Secure file naming (UUID)
   - Directory traversal protection

## API Endpoints

### Local Storage Upload

```
POST /api/admin/upload
DELETE /api/admin/upload?filename={filename}
```

### Cloudinary Upload

```
POST /api/admin/upload/cloudinary
DELETE /api/admin/upload/cloudinary?publicId={publicId}
```

## Environment Configuration

### Required Environment Variables

```env
# File Upload Settings
MAX_FILE_SIZE=5242880  # 5MB in bytes
UPLOAD_DIR="/app/uploads"

# Cloudinary (Optional - for cloud storage)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

## Usage Examples

### 1. Local Storage Setup (Self-Hosting)

For Docker or self-hosted deployments:

```env
# .env.docker
UPLOAD_DIR="/app/uploads"
MAX_FILE_SIZE=5242880
```

Uploads will be saved to `/app/uploads/` and served via API endpoints.

### 2. Cloudinary Setup (Vercel Deployment)

For Vercel or cloud deployments:

```env
# .env.production
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
MAX_FILE_SIZE=5242880
```

## File Structure

```
udt-store/
├── app/api/admin/upload/
│   ├── route.ts                    # Local storage upload
│   └── cloudinary/
│       └── route.ts                # Cloudinary upload
├── components/admin/
│   ├── ImageUpload.tsx             # Upload UI component
│   └── ProductForm.tsx             # Product form with image upload
├── lib/
│   └── cloudinary.ts               # Cloudinary configuration
├── app/uploads/
│   └── .gitkeep                    # Keep directory in git
└── docs/
    └── IMAGE_UPLOAD_SYSTEM.md      # This documentation
```

## Database Schema

Images are stored in the `ProductImage` model:

```prisma
model ProductImage {
  id        String  @id @default(cuid())
  productId String
  url       String  // File path or Cloudinary URL
  altText   String?
  sortOrder Int     @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}
```

## Image Processing Pipeline

### Local Storage Flow

1. File upload validation
2. Sharp processing (resize + WebP conversion)
3. Thumbnail generation
4. Save to `/app/uploads/admin/`
5. Return file URLs

### Cloudinary Flow

1. File upload validation
2. Upload to Cloudinary with transformations
3. Automatic optimization and format conversion
4. Thumbnail generation via Cloudinary
5. Return Cloudinary URLs

## Security Considerations

1. **File Validation**

   - Only image file types allowed
   - File size limits enforced
   - MIME type validation

2. **Authentication**

   - Admin/Manager role required
   - Session-based authentication

3. **File Storage**
   - UUID-based file naming
   - Directory traversal protection
   - Proper file permissions

## Performance Optimizations

1. **Image Optimization**

   - WebP format for better compression
   - Automatic resizing to prevent oversized images
   - Quality optimization

2. **Caching**
   - Static file serving for local uploads
   - Cloudinary CDN for cloud uploads
   - Browser caching headers

## Troubleshooting

### Common Issues

1. **Upload Fails**

   - Check file size limits
   - Verify file type is supported
   - Ensure authentication is valid

2. **Images Not Displaying**

   - Check file paths in database
   - Verify upload directory permissions
   - Check Cloudinary configuration

3. **Performance Issues**
   - Enable CDN for static files
   - Use Cloudinary for cloud deployments
   - Optimize image sizes

## Deployment Considerations

### For Vercel Deployment

- Use Cloudinary for image storage
- Local uploads won't persist across deployments
- Set environment variables in Vercel dashboard

### For Self-Hosting

- Use local storage or cloud storage
- Ensure upload directory is writable
- Configure backup strategy for uploads

## Future Enhancements

1. **Advanced Image Editing**

   - Image cropping interface
   - Filters and adjustments
   - Batch operations

2. **Additional Storage Providers**

   - AWS S3 integration
   - Google Cloud Storage
   - Azure Blob Storage

3. **Performance Improvements**
   - Image lazy loading
   - Progressive image loading
   - Image compression options

## API Response Examples

### Successful Upload Response

```json
{
  "success": true,
  "files": [
    {
      "originalName": "product-image.jpg",
      "filename": "uuid-123.webp",
      "thumbnailFilename": "thumb_uuid-123.webp",
      "url": "/uploads/uuid-123.webp",
      "thumbnailUrl": "/uploads/thumb_uuid-123.webp",
      "size": 245760,
      "type": "image/webp"
    }
  ],
  "message": "Successfully uploaded 1 file(s)"
}
```

### Error Response

```json
{
  "error": "File too large: image.jpg. Maximum size: 5MB"
}
```
