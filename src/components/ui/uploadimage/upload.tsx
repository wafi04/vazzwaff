"use client";

import type React from "react";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { toast } from "sonner";
import { Label } from "../label";

export default function UploadImage({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(value || "");

  // Handler untuk mengunggah file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Unggah file ke Cloudinary
      const image = await uploadToCloudinary(file);
      setPreview(image); // Update preview lokal
      onChange(image); // Beri tahu komponen induk tentang perubahan
    } catch (error) {
      toast.error("Gagal mengunggah gambar");
    } finally {
      setIsUploading(false);
    }
  };

  // Handler untuk menghapus gambar
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault(); // Mencegah event bubbling
    e.stopPropagation(); // Mencegah event bubbling
    setPreview(""); // Reset preview lokal
    onChange(""); // Beri tahu komponen induk bahwa gambar telah dihapus
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative border rounded-lg p-2 bg-muted/20 flex justify-center">
          <img
            src={preview}
            alt="Preview"
            className="h-40 w-auto object-contain"
          />
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <Label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-8 w-8 text-muted-foreground/70" />
              <span className="text-sm font-medium">Klik disini untuk upload gambar</span>
            </div>
          </Label>
        </div>
      )}

      {isUploading && (
        <div className="flex justify-center p-2 bg-blue-50 text-blue-600 rounded-md">
          <span>Mengunggah...</span>
        </div>
      )}
    </div>
  );
}