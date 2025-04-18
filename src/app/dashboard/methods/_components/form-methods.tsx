"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createMethod, type CreateMethod } from "@/schemas/methods";
import UploadImage from "@/components/ui/uploadimage/upload";
import {
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Wallet,
  Store,
  Clock,
  ImageIcon,
  ToggleRight,
  BanknoteIcon as BankIcon,
  CurrencyIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Step1Basic = ({ form }: { form: any }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama Metode</FormLabel>
            <FormControl>
              <Input placeholder="BCA Virtual Account" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kode</FormLabel>
            <FormControl>
              <Input placeholder="BCA_VA" {...field} />
            </FormControl>
            <FormDescription>Kode unik untuk metode pembayaran</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tipe"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipe Pembayaran</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe pembayaran" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="BANK_TRANSFER">
                  <div className="flex items-center">
                    <BankIcon className="h-4 w-4 mr-2" />
                    Bank Transfer
                  </div>
                </SelectItem>
                <SelectItem value="EWALLET">
                  <div className="flex items-center">
                    <Wallet className="h-4 w-4 mr-2" />
                    E-Wallet
                  </div>
                </SelectItem>
                <SelectItem value="CSSTORE">
                  <div className="flex items-center">
                    <Store className="h-4 w-4 mr-2" />
                    Convenience Store
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="keterangan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Keterangan</FormLabel>
            <FormControl>
              <Input placeholder="Deskripsi singkat metode pembayaran" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </div>
);

const Step2Payment = ({ form }: { form: any }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="min"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Minimal Pembayaran</FormLabel>
            <FormControl>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  Rp
                </div>
                <Input
                  type="number"
                  placeholder="10000"
                  className="pl-9"
                  {...field}
                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="max"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Maksimal Pembayaran</FormLabel>
            <FormControl>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  Rp
                </div>
                <Input
                  type="number"
                  placeholder="10000000"
                  className="pl-9"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : null)}
                />
              </div>
            </FormControl>
            <FormDescription>Kosongkan jika tidak ada batas maksimum</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="minExpired"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Minimal Expired (menit)</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="60"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : null)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="maxExpired"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Maksimal Expired (menit)</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="1440"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : null)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </div>
);

const Step3AdminFee = ({ form }: { form: any }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="typeTax"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipe Biaya Admin</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(value === "none" ? null : value)}
              value={field.value || "none"}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe biaya admin" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">Tidak ada biaya admin</SelectItem>
                <SelectItem value="FIX">Tetap (Fix)</SelectItem>
                <SelectItem value="PERCENTAGE">Persentase</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="taxAdmin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nilai Biaya Admin</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="number"
                  placeholder={form.watch("typeTax") === "PERCENTAGE" ? "2.5" : "3000"}
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value ? Number.parseFloat(e.target.value) : null)}
                  disabled={!form.watch("typeTax")}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                  {form.watch("typeTax") === "PERCENTAGE" ? "%" : "Rp"}
                </div>
              </div>
            </FormControl>
            <FormDescription>
              {form.watch("typeTax") === "PERCENTAGE"
                ? "Dalam persen (%)"
                : form.watch("typeTax") === "FIX"
                ? "Dalam Rupiah"
                : ""}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <div className="bg-muted/30 p-4 rounded-lg border mt-6">
      <h4 className="text-sm font-medium mb-2 flex items-center">
        <CurrencyIcon className="h-4 w-4 mr-2" />
        Contoh Perhitungan Biaya Admin
      </h4>
      <div className="text-sm text-muted-foreground">
        {form.watch("typeTax") === "FIX" ? (
          <p>
            Untuk setiap transaksi, biaya admin tetap sebesar{" "}
            <strong>Rp {form.watch("taxAdmin")?.toLocaleString() || "0"}</strong>
          </p>
        ) : form.watch("typeTax") === "PERCENTAGE" ? (
          <div className="space-y-2">
            <p>
              Untuk transaksi Rp 100.000, biaya admin:{" "}
              <strong>Rp {((100000 * (form.watch("taxAdmin") || 0)) / 100).toLocaleString()}</strong>
            </p>
            <p>
              Untuk transaksi Rp 1.000.000, biaya admin:{" "}
              <strong>Rp {((1000000 * (form.watch("taxAdmin") || 0)) / 100).toLocaleString()}</strong>
            </p>
          </div>
        ) : (
          <p>Tidak ada biaya admin untuk metode pembayaran ini</p>
        )}
      </div>
    </div>
  </div>
);
const Step4Image = ({ form, setFormData }: { form: any; setFormData: (data: any) => void }) => {
  const [imageUrl, setImageUrl] = useState(form.getValues("images") || "");

  const handleImageChange = (url: string) => {
    setImageUrl(url); // Simpan URL gambar di state lokal
    setFormData({ ...form.getValues(), images: url }); // Update formData tanpa validasi
  };

  useEffect(() => {
    setImageUrl(form.getValues("images") || ""); // Sinkronkan state lokal dengan form
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
          <div className="flex items-center space-x-3 p-3 bg-white rounded-md border">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <img
                src={imageUrl || "/placeholder.svg"}
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

const Step5Status = ({ form }: { form: any }) => {
  const getPaymentTypeIcon = (type: string) => {
    switch (type) {
      case "BANK_TRANSFER":
        return <BankIcon className="h-4 w-4 mr-2" />;
      case "EWALLET":
        return <Wallet className="h-4 w-4 mr-2" />;
      case "CSSTORE":
        return <Store className="h-4 w-4 mr-2" />;
      default:
        return <CreditCard className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="space-y-8">
      <FormField
        control={form.control}
        name="isActive"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Aktifkan Metode Pembayaran</FormLabel>
              <FormDescription>Metode pembayaran akan terlihat dan dapat digunakan oleh pengguna</FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="rounded-lg border p-4 bg-muted/30">
        <h4 className="font-medium mb-3 flex items-center">
          <CreditCard className="h-4 w-4 mr-2" />
          Ringkasan Metode Pembayaran
        </h4>
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
            <div className="flex justify-between">
              <div className="text-muted-foreground">Nama:</div>
              <div className="font-medium">{form.watch("name") || "-"}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground">Kode:</div>
              <div className="font-medium">{form.watch("code") || "-"}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground">Tipe:</div>
              <div className="font-medium flex items-center">
                {getPaymentTypeIcon(form.watch("tipe"))}
                {form.watch("tipe") === "BANK_TRANSFER"
                  ? "Bank Transfer"
                  : form.watch("tipe") === "EWALLET"
                  ? "E-Wallet"
                  : form.watch("tipe") === "CSSTORE"
                  ? "Convenience Store"
                  : "-"}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground">Keterangan:</div>
              <div className="font-medium">{form.watch("keterangan") || "-"}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground">Minimal:</div>
              <div className="font-medium">Rp {form.watch("min")?.toLocaleString() || "-"}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground">Maksimal:</div>
              <div className="font-medium">
                {form.watch("max") ? `Rp ${form.watch("max")?.toLocaleString()}` : "Tidak ada batasan"}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground">Biaya Admin:</div>
              <div className="font-medium">
                {form.watch("typeTax") === "FIX"
                  ? `Rp ${form.watch("taxAdmin")?.toLocaleString()}`
                  : form.watch("typeTax") === "PERCENTAGE"
                  ? `${form.watch("taxAdmin")}%`
                  : "Tidak ada biaya admin"}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground">Status:</div>
              <div className="font-medium">
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    form.watch("isActive") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                  )}
                >
                  {form.watch("isActive") ? "Aktif" : "Tidak aktif"}
                </span>
              </div>
            </div>
          </div>
          {form.watch("images") && (
            <div className="mt-4 pt-4 border-t">
              <div className="text-muted-foreground mb-2">Logo:</div>
              <div className="flex justify-center">
                <div className="h-16 w-16 overflow-hidden rounded-full border">
                  <img
                    src={form.watch("images") }
                    alt={form.watch("name")}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function FormMethods({
  onSubmit,
  initialData,
  isLoading = false,
}: {
  onSubmit: (data: CreateMethod) => void;
  initialData?: Partial<CreateMethod>;
  isLoading?: boolean;
}) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [formData, setFormData] = useState<Partial<CreateMethod>>(initialData || {});

  const form = useForm<CreateMethod>({
    resolver: zodResolver(createMethod),
    defaultValues: {
      name: initialData?.name || "",
      images: initialData?.images || "",
      code: initialData?.code || "",
      keterangan: initialData?.keterangan || "",
      tipe: initialData?.tipe || "BANK_TRANSFER",
      min: initialData?.min || 10000,
      isActive: initialData?.isActive ?? false,
      typeTax: initialData?.typeTax || null,
      taxAdmin: initialData?.taxAdmin || null,
      minExpired: initialData?.minExpired || null,
      maxExpired: initialData?.maxExpired || null,
      max: initialData?.max || null,
    },
  });

  const nextStep = () => {
    if (step === 4) {
      form.setValue("images", formData.images || "", { shouldValidate: false });
      setStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo(0, 0);
      return;
    }

    const fieldsToValidate = getFieldsForStep(step);
    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) {
        setStep((prev) => Math.min(prev + 1, totalSteps));
        window.scrollTo(0, 0);
      }
    });
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const goToStep = (stepNumber: number) => {
    if (step === 4) {
      form.setValue("images", formData.images || "", { shouldValidate: false });
    }
    setStep(stepNumber);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (data: CreateMethod) => {
    if (step === 5 && formData.images) {
      data.images = formData.images;
    }
    onSubmit(data);
  };

  const getFieldsForStep = (stepNumber: number): (keyof CreateMethod)[] => {
    switch (stepNumber) {
      case 1:
        return ["name", "code", "tipe", "keterangan"];
      case 2:
        return ["min", "max", "minExpired", "maxExpired"];
      case 3:
        return ["typeTax", "taxAdmin"];
      case 4:
        return ["images"];
      case 5:
        return ["isActive"];
      default:
        return [];
    }
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <BankIcon className="h-5 w-5" />;
      case 2:
        return <CurrencyIcon className="h-5 w-5" />;
      case 3:
        return <Wallet className="h-5 w-5" />;
      case 4:
        return <ImageIcon className="h-5 w-5" />;
      case 5:
        return <ToggleRight className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const renderStepTitle = () => {
    switch (step) {
      case 1:
        return "Informasi Dasar";
      case 2:
        return "Pengaturan Pembayaran";
      case 3:
        return "Pengaturan Biaya Admin";
      case 4:
        return "Upload Gambar";
      case 5:
        return "Status Metode";
      default:
        return "";
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1Basic form={form} />;
      case 2:
        return <Step2Payment form={form} />;
      case 3:
        return <Step3AdminFee form={form} />;
      case 4:
        return <Step4Image form={form} setFormData={setFormData} />;
      case 5:
        return <Step5Status form={form} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (step !== 4) {
        setFormData((prev) => ({ ...prev, ...value }));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, step]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
        <Card className="w-full shadow-md">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="flex items-center text-xl">
              <CreditCard className="mr-2 h-5 w-5" />
              Detail Metode Pembayaran
            </CardTitle>
          </CardHeader>
          <div className="flex flex-wrap md:flex-nowrap border-b">
            {/* Step navigation sidebar */}
            <div className="w-full md:w-64 md:border-r bg-muted/30">
              <nav className="p-4">
                <ul className="space-y-1">
                  {Array.from({ length: totalSteps }).map((_, i) => {
                    const stepNum = i + 1;
                    const isActive = step === stepNum;
                    const isCompleted =
                      form.formState.touchedFields &&
                      getFieldsForStep(stepNum).some((field) =>
                        Object.keys(form.formState.touchedFields).includes(field as string)
                      );
                    return (
                      <li key={`step-${stepNum}`}>
                        <button
                          type="button"
                          onClick={() => goToStep(stepNum)}
                          className={cn(
                            "w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground font-medium"
                              : isCompleted
                              ? "bg-muted/80 text-foreground hover:bg-muted"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          )}
                        >
                          <div
                            className={cn(
                              "flex items-center justify-center h-6 w-6 rounded-full mr-2 text-xs",
                              isActive
                                ? "bg-primary-foreground text-primary"
                                : isCompleted
                                ? "bg-primary/20 text-primary"
                                : "bg-muted-foreground/30 text-muted-foreground"
                            )}
                          >
                            {stepNum}
                          </div>
                          <span className="flex-1 text-left">{renderStepTitle()}</span>
                          {getStepIcon(stepNum)}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            {/* Form content */}
            <div className="flex-1">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="mr-3">{getStepIcon(step)}</div>
                  <div>
                    <h3 className="text-lg font-medium">{renderStepTitle()}</h3>
                    <p className="text-sm text-muted-foreground">
                      Langkah {step} dari {totalSteps}
                    </p>
                  </div>
                </div>
                <Separator className="mb-6" />
                {renderStepContent()}
              </CardContent>
              <CardFooter className="flex justify-between p-6 border-t bg-muted/20">
                <div>
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep} className="flex items-center">
                      <ChevronLeft className="w-4 h-4 mr-1" /> Sebelumnya
                    </Button>
                  )}
                </div>
                <div className="flex space-x-2">
                  {step < totalSteps ? (
                    <Button type="button" onClick={nextStep} className="flex items-center">
                      Selanjutnya <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center"
                      onClick={() => {
                        if (formData.images) {
                          form.setValue("images", formData.images, { shouldValidate: false });
                        }
                      }}
                    >
                      {isLoading ? "Menyimpan..." : "Simpan Metode"}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      </form>
    </Form>
  );
}