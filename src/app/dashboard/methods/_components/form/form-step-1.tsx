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
import { Wallet, Store, BanknoteIcon as BankIcon } from "lucide-react";

export const Step1Basic = ({ form }: { form: UseFormReturn<CreateMethod> }) => (
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
                <SelectItem value="VIRTUAL_ACCOUNT">
                  <div className="flex items-center">
                    <BankIcon className="h-4 w-4 mr-2" />
                    Virtual Account
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
              <Input
                placeholder="Deskripsi singkat metode pembayaran"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </div>
);
