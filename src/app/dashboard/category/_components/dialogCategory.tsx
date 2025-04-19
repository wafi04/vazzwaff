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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormCategory, FormValuesCategory } from "@/types/schema/categories";
import { ButtonUploadImage } from "@/components/ui/button-upload-image";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Category } from "@/types/category";
import { toast } from "sonner";
import { useUpdateCategory } from "../api/server";
import useCreateCategory from "../api/server";
import UploadImage from "@/components/ui/uploadimage/upload";

export function DialogCreateCategory({
  children,
  req,
}: {
  children: ReactNode;
  req?: Category;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const create = useCreateCategory();
  const update = useUpdateCategory(req?.id || 0);
  const [loadingState, setLoadingState] = useState({
    isSubmitting: false,
    thumbnailLoading: false,
    bannerLoading: false,
  });

  const { isSubmitting } = loadingState;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValuesCategory>({
    resolver: zodResolver(FormCategory),
    defaultValues: {
      nama: req?.nama || "",
      subNama: req?.subNama || "",
      brand: req?.brand || "",
      kode: req?.kode || "",
      serverId: req?.serverId || 0,
      status: req?.status || "",
      thumbnail: req?.thumbnail ?? "",
      tipe: req?.tipe ?? "",
      petunjuk: req?.petunjuk ?? "",
      ketLayanan: req?.ketLayanan ?? "",
      ketId: req?.ketId ?? "",
      placeholder1: req?.placeholder1 ?? "",
      placeholder2: req?.placeholder2 ?? "",
      bannerLayanan: req?.bannerLayanan ?? "",
    },
  });

  // Get current values
  const thumbnailUrl = watch("thumbnail");
  const bannerLayananUrl = watch("bannerLayanan");

  // Improved thumbnail upload handler

  const onSubmit = async (data: FormValuesCategory) => {
    setLoadingState((prev) => ({ ...prev, isSubmitting: true }));
    try {
      if (req) {
        // Update existing category
        update.mutate(data);
        toast.success("Kategori berhasil diperbarui");
      } else {
        // Create new category
        create.mutate({
          bannerLayanan: data.bannerLayanan,
          ketId: data.ketId ?? "",
          ketLayanan: data.ketLayanan ?? "",
          code: data.kode ?? "",
          brand: data.brand ?? "",
          petunjuk: data.petunjuk ?? "",
          name: data.nama,
          placeholder1: data.placeholder1,
          placeholder2: data.placeholder2,
          serverId: data.serverId,
          status: data.status,
          subNama: data.subNama,
          thumbnail: data.thumbnail,
          tipe: data.tipe,
        });
        toast.success("Kategori berhasil ditambahkan");
      }
      setOpen(false);
      reset();
    } catch (error) {
      toast.error("Gagal menyimpan kategori");
    } finally {
      setLoadingState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Kategori Baru</DialogTitle>
          <DialogDescription>
            Isi form berikut untuk menambahkan kategori baru.
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
                  <Label htmlFor="nama">Nama Kategori</Label>
                  <Input
                    id="nama"
                    placeholder="Masukkan nama kategori"
                    {...register("nama")}
                  />
                  {errors.nama && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.nama.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subName">Sub Nama</Label>
                  <Input
                    id="subName"
                    placeholder="Masukkan sub nama"
                    {...register("subNama")}
                  />
                  {errors.subNama && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.subNama.message}
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
                  <Label htmlFor="kode">Kode</Label>
                  <Input
                    id="kode"
                    placeholder="Masukkan kode (opsional)"
                    {...register("kode")}
                  />
                  {errors.kode && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.kode.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe</Label>
                  <Select
                    onValueChange={(value) => setValue("tipe", value)}
                    value={watch("tipe")}
                  >
                    <SelectTrigger id="tipe">
                      <SelectValue placeholder="Pilih tipe kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gamelainnya">Game</SelectItem>
                      <SelectItem value="voucher">Voucher</SelectItem>
                      <SelectItem value="pulsa">Pulsa</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tipe && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.tipe.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    onValueChange={(value) => setValue("status", value)}
                    value={watch("status")}
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
                <Input id="serverId" type="number" {...register("serverId")} />
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
                    onChange={(value) => setValue("thumbnail", value)}
                  />
                </div>
                {errors.thumbnail && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bannerLayanan">Banner Layanan</Label>
                <div className="mt-2">
                  <UploadImage
                    value={bannerLayananUrl}
                    onChange={(value) => setValue("bannerLayanan", value)}
                  />
                </div>
                {errors.bannerLayanan && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.bannerLayanan.message}
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
                <Label htmlFor="instruction">Petunjuk</Label>
                <Textarea
                  id="instruction"
                  placeholder="Masukkan petunjuk penggunaan (opsional)"
                  className="min-h-[100px]"
                  {...register("petunjuk")}
                />
                {errors.petunjuk && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.petunjuk.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ketLayanan">Keterangan Layanan</Label>
                <Textarea
                  id="ketLayanan"
                  placeholder="Masukkan keterangan layanan (opsional)"
                  className="min-h-[100px]"
                  {...register("ketLayanan")}
                />
                {errors.ketLayanan && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.ketLayanan.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ketId">Keterangan ID</Label>
                <Input
                  id="ketId"
                  placeholder="Masukkan keterangan ID (opsional)"
                  {...register("ketId")}
                />
                {errors.ketId && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.ketId.message}
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
              disabled={isSubmitting}
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
