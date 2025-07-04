'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface UploadedFile {
  originalName: string;
  filename: string;
  thumbnailFilename: string;
  url: string;
  thumbnailUrl: string;
  size: number;
  type: string;
}

interface ImageUploadProps {
  onUploadComplete: (files: UploadedFile[]) => void;
  existingImages?: string[];
  maxFiles?: number;
  multiple?: boolean;
}

export default function ImageUpload({
  onUploadComplete,
  existingImages = [],
  maxFiles = 5,
  multiple = true
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>(existingImages);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFiles(files);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(Array.from(files));
    }
  }, []);

  const handleFiles = async (files: File[]) => {
    // Validate file count
    if (!multiple && files.length > 1) {
      toast.error('Only one file allowed');
      return;
    }

    if (files.length + uploadedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate file types
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast.error(`Invalid file types: ${invalidFiles.map(f => f.name).join(', ')}`);
      return;
    }

    // Validate file sizes (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      toast.error(`Files too large: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      
      if (data.success) {
        setUploadedFiles(prev => [...prev, ...data.files]);
        setPreviewImages(prev => [...prev, ...data.files.map((f: UploadedFile) => f.url)]);
        onUploadComplete(data.files);
        toast.success(`Successfully uploaded ${data.files.length} file(s)`);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (index: number, filename?: string) => {
    if (filename) {
      try {
        await fetch(`/api/admin/upload?filename=${filename}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Delete error:', error);
      }
    }

    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-6">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 text-gray-400">
              {uploading ? (
                <Loader2 className="h-12 w-12 animate-spin" />
              ) : (
                <Upload className="h-12 w-12" />
              )}
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              {uploading ? 'Uploading...' : 'Upload Images'}
            </h3>
            <p className="mb-4 text-gray-600">
              Drag and drop images here, or click to select files
            </p>
            <div className="mb-4 text-sm text-gray-500">
              <p>Supported formats: JPEG, PNG, WebP, GIF</p>
              <p>Maximum file size: 5MB</p>
              <p>Maximum files: {maxFiles}</p>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple={multiple}
              onChange={handleFileSelect}
              disabled={uploading}
              className="hidden"
              id="file-upload"
            />
            <Button
              asChild
              variant="outline"
              disabled={uploading}
              className="cursor-pointer"
            >
              <label htmlFor="file-upload">
                <ImageIcon className="mr-2 h-4 w-4" />
                Select Images
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Images */}
      {previewImages.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold">Selected Images</h4>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {previewImages.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="group relative aspect-square overflow-hidden rounded-lg border"
              >
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute right-1 top-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                  onClick={() => removeImage(index, uploadedFiles[index]?.filename)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="rounded-lg bg-blue-50 p-4">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-sm text-blue-600">Uploading and processing images...</span>
          </div>
        </div>
      )}
    </div>
  );
}