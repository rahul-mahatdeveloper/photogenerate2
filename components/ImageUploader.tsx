
import React, { useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload a valid image file (jpeg, png, etc.).');
      }
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [handleFileChange]);

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ${
        isDragging ? 'border-brand-primary bg-blue-50' : 'border-gray-300 hover:border-brand-primary'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
      />
      {preview ? (
        <img src={preview} alt="Preview" className="mx-auto max-h-48 rounded-md" />
      ) : (
        <div className="text-gray-500">
          <p className="font-semibold">Drag & drop your photo here</p>
          <p className="text-sm">or click to browse</p>
          <p className="text-xs mt-2 text-gray-400">For best results, use a clear, well-lit photo.</p>
        </div>
      )}
    </div>
  );
};
