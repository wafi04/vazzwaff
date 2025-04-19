"use client";
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormLabel,
} from "@/components/ui/form";
import { type CreateMethod } from "@/schemas/methods";
import UploadImage from "@/components/ui/uploadimage/upload";

import Image from "next/image";
export const Step4Image = ({ form, setFormData }: { form: UseFormReturn<CreateMethod> ; setFormData: (data: any) => void }) => {
  const [imageUrl, setImageUrl] = useState(form.getValues("images") || "");

  const handleImageChange = (url: string) => {
    setImageUrl(url); 
    setFormData({ ...form.getValues(), images: url }); 
  };

  useEffect(() => {
    setImageUrl(form.getValues("images") || ""); 
  }, [form]);

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <FormLabel>Gambar Metode Pembayaran</FormLabel>
        <div className="mt-2">
          <UploadImage value={imageUrl} onChange={handleImageChange} />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Upload logo metode pembayaran (format: JPG, PNG)</p>
      </div>
      {imageUrl && (
        <div className="mt-4 p-4 border rounded-lg bg-muted/30">
          <h4 className="text-sm font-medium mb-2">Preview</h4>
          <div className="flex items-center space-x-3 p-3 rounded-md border">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <Image 
                width={40}
                height={40}
                src={imageUrl}
                alt={form.getValues("name")}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{form.getValues("name") || "Nama Metode"}</div>
              <div className="text-sm text-muted-foreground">{form.getValues("code") || "CODE"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};