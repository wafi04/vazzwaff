"use client";

import { Form } from "@/components/ui/form"; 
import { CreateBanner } from "@/schemas/banner"; 
import { useForm } from "react-hook-form"; 
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"; 
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea"; 
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import UploadImage from "@/components/ui/uploadimage/upload";
import { useCreateBanner, useUpdateBanner } from "../server";

export default function FormBanner({
    initialData,
    id
}: {
        initialData?: CreateBanner,
    id? : number
}) {
    const [step, setStep] = useState(1);
    const [logoUrl, setLogoUrl] = useState(initialData?.urlImage || "");
    const create = useCreateBanner()
    const update = useUpdateBanner(id ?? 0)
    const form = useForm<CreateBanner>({
        defaultValues: {
            urlImage: initialData?.urlImage ?? "",
            description: initialData?.description ?? "",
            title: initialData?.title ?? ""
        }
    });
    
    const handleImageUpload = (field: string, value: string) => {
        setLogoUrl(value);
        form.setValue("urlImage", value);
    };
    
    const onSubmit = (data: CreateBanner) => {
        if (step === 1) {
            setStep(2);
        } else {
            if (initialData) {
                update.mutate(data)
            } else {
                create.mutate(data)
            }
        }
        
    };

    const totalSteps = 2;
    
    return (
        <div className="w-full max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {step === 1 && (
                        <div className="border rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-medium mb-4">Step 1: Upload Banner Image</h2>
                            <FormField
                                control={form.control}
                                name="urlImage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Banner Image</FormLabel>
                                        <FormControl>
                                            <UploadImage
                                                value={logoUrl}
                                                onChange={(value) => handleImageUpload("logo", value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                    
                    {step === 2 && (
                        <div className="border rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-medium mb-4">Step 2: Banner Details</h2>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter banner title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter banner description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    )}
                    
                    <div className="flex justify-between mt-6">
                        {step > 1 && (
                            <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => setStep(step - 1)}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Previous
                            </Button>
                        )}
                        
                        <div className="ml-auto">
                            {step < totalSteps && (
                                <Button 
                                    type="button" 
                                    onClick={() => {
                                        if (step === 1) {
                                            if (logoUrl) {
                                                setStep(step + 1);
                                            } else {
                                                form.setError("urlImage", {
                                                    type: "manual",
                                                    message: "Please upload an image"
                                                });
                                            }
                                        }
                                    }}
                                    className="flex items-center gap-2"
                                >
                                    Next
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            ) }
                            {
                                step === totalSteps && (
                                <Button type="submit" className="flex items-center gap-2">
                                    Submit
                                    <Check className="w-4 h-4" />
                                </Button>

                                )
                            }
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}