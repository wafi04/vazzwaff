"use client";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type CreateMethod } from "@/schemas/methods";
import {
  CurrencyIcon,
} from "lucide-react";

export const Step3AdminFee = ({ form }: { form: UseFormReturn<CreateMethod> }) => (
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