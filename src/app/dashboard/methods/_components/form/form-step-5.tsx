"use client";
import { UseFormReturn } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { type CreateMethod } from "@/schemas/methods";
import {
  CreditCard,
  Wallet,
  Store,
  BanknoteIcon as BankIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";


export const Step5Status = ({ form }: { form: UseFormReturn<CreateMethod> }) => {
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