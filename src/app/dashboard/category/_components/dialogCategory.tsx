"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { type ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import UploadImage from "@/components/ui/uploadimage/upload";
import useCreateCategory, { useUpdateCategory } from "../api/server";
import { CategoriesData, CreateCategory } from "@/schemas/category";
import { dataCategoryType } from "@/data/data-category";


export function DialogCreateCategory({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: CategoriesData;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory(initialData?.id || 0);
  const [loadingState, setLoadingState] = useState({
    isSubmitting: false,
    thumbnailLoading: false,
    logoLoading: false,
  });


  const { isSubmitting } = loadingState;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateCategory>({
    // resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      subName: initialData?.subName || "",
      brand: initialData?.brand || "",
      code: initialData?.code || "",
      serverId: initialData?.serverId || 0,
      status: initialData?.status || "",
      thumbnail: initialData?.thumbnail || "",
      type: initialData?.type || "",
      instructions: initialData?.instructions || "",
      description: initialData?.description || "",
      placeholder1: initialData?.placeholder1 || "",
      placeholder2: initialData?.placeholder2 || "",
      logo: initialData?.logo || "",
    },
  });

  // Get current values
  const thumbnailUrl = watch("thumbnail");
  const logoUrl = watch("logo");

  const handleImageUpload = (field: "thumbnail" | "logo", value: string) => {
    setLoadingState(prev => ({ 
      ...prev, 
      [field === "thumbnail" ? "thumbnailLoading" : "logoLoading"]: false 
    }));
    setValue(field, value);
  };

  const onSubmit = async (data: CreateCategory) => {
    setLoadingState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      if (initialData) {
        // Update existing category
        updateMutation.mutate(data);
      } else {
        // Create new category
        createMutation.mutate(data);
      }
      setOpen(false);
      reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat menyimpan kategori";
      toast.error(errorMessage);
    } finally {
      setLoadingState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Kategori" : "Tambah Kategori Baru"}</DialogTitle>
          <DialogDescription>
            Isi form berikut untuk {initialData ? "mengubah" : "menambahkan"} kategori.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
              <TabsTrigger value="display">Tampilan</TabsTrigger>
              <TabsTrigger value="additional">Informasi Tambahan</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Kategori</Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama kategori"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subName">Sub Nama</Label>
                  <Input
                    id="subName"
                    placeholder="Masukkan sub nama"
                    {...register("subName")}
                  />
                  {errors.subName && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.subName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    placeholder="Masukkan brand"
                    {...register("brand")}
                  />
                  {errors.brand && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.brand.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Kode</Label>
                  <Input
                    id="code"
                    placeholder="Masukkan kode (opsional)"
                    {...register("code")}
                  />
                  {errors.code && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.code.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe</Label>
                  <Select
                    onValueChange={(value) => setValue("type", value)}
                    defaultValue={watch("type")}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Pilih tipe kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        dataCategoryType.map((cat) => (
                          <SelectItem value={cat.type} key={cat.type}>{cat.name}</SelectItem>
                        ))
                     }
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    onValueChange={(value) => setValue("status", value)}
                    defaultValue={watch("status")}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="unactive">Nonaktif</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serverId">Server ID</Label>
                <Input 
                  id="serverId" 
                  type="number" 
                  {...register("serverId", { valueAsNumber: true })}
                />
                {errors.serverId && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.serverId.message}
                  </p>
                )}
              </div>
            </TabsContent>

            {/* Display Tab */}
            <TabsContent value="display" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <div className="mt-2">
                  <UploadImage
                    value={thumbnailUrl}
                    onChange={(value) => handleImageUpload("thumbnail", value)}
                  />
                </div>
                {errors.thumbnail && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Banner Layanan</Label>
                <div className="mt-2">
                  <UploadImage
                    value={logoUrl}
                    onChange={(value) => handleImageUpload("logo", value)}
                    
                  />
                </div>
                {errors.logo && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.logo.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="placeholder1">Placeholder 1</Label>
                  <Input
                    id="placeholder1"
                    placeholder="Masukkan placeholder 1"
                    {...register("placeholder1")}
                  />
                  {errors.placeholder1 && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.placeholder1.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="placeholder2">Placeholder 2</Label>
                  <Input
                    id="placeholder2"
                    placeholder="Masukkan placeholder 2"
                    {...register("placeholder2")}
                  />
                  {errors.placeholder2 && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.placeholder2.message}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Additional Information Tab */}
            <TabsContent value="additional" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="instructions">Petunjuk</Label>
                <Textarea
                  id="instructions"
                  placeholder="Masukkan intructions penggunaan (opsional)"
                  className="min-h-[100px]"
                  {...register("instructions")}
                />
                {errors.instructions && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.instructions.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Masukkan keterangan layanan (opsional)"
                  className="min-h-[100px]"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

            
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setOpen(false);
              }}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || loadingState.thumbnailLoading || loadingState.logoLoading}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}