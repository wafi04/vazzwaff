"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Search, Filter, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreateMethod, FilterMethod } from "@/schemas/methods";
import { useCreateMethods } from "../api/server";
import DialogMethods from "./dialogMethods";

interface HeaderMethodsProps {
  filters: FilterMethod;
  setFilters: (filters: FilterMethod) => void;
  updateFilter: (newFilters: Partial<FilterMethod>) => void;
}

export function HeaderMethods({
  filters,
  setFilters,
  updateFilter,
}: HeaderMethodsProps) {
  const [create, setCreate] = useState(false);
  const createFunc = useCreateMethods();
  return (
    <>
      <Card className="border-none bg-transparent w-full shadow-none  py-2 ">
        <CardHeader className="px-0 pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">
                Metode Pembayaran
              </CardTitle>
              <CardDescription className="text-gray-500">
                Kelola metode pembayaran yang tersedia di toko Anda.
              </CardDescription>
            </div>

            <Button
              onClick={() => setCreate(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Tambah Metode
            </Button>
          </div>
        </CardHeader>

        <Separator className="my-2" />

        <CardContent className="px-0 pt-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari kode atau nama metode..."
                className="pl-9"
                value={filters.code || ""}
                onChange={(e) => updateFilter({ code: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Select
                value={filters.type || "all"}
                onValueChange={(value) =>
                  updateFilter({ type: value === "all" ? undefined : value })
                }
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Tipe Pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="VIRTUAL_ACCOUNT">
                    Virtual Account
                  </SelectItem>
                  <SelectItem value="EWALLET">E-Wallet</SelectItem>
                  <SelectItem value="CREDIT_CARD">Kartu Kredit</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4" /> Filter
              </Button>

              {(filters.isActive !== undefined ||
                filters.type ||
                filters.code) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setFilters({ isAll: "true", page: 1, limit: 10 })
                  }
                  className="w-full sm:w-auto"
                >
                  Reset Filter
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {filters.isActive !== undefined && (
              <Badge variant="secondary" className="px-2 py-1 gap-1">
                Status: {filters.isActive ? "Aktif" : "Tidak Aktif"}
                <button
                  onClick={() => updateFilter({ isActive: undefined })}
                  className="ml-1 text-xs"
                >
                  ×
                </button>
              </Badge>
            )}

            {filters.type && (
              <Badge variant="secondary" className="px-2 py-1 gap-1">
                Tipe:{" "}
                {filters.type === "VIRTUAL_ACCOUNT"
                  ? "Virtual Account"
                  : filters.type === "EWALLET"
                  ? "E-Wallet"
                  : filters.type === "CREDIT_CARD"
                  ? "Kartu Kredit"
                  : filters.type}
                <button
                  onClick={() => updateFilter({ type: undefined })}
                  className="ml-1 text-xs"
                >
                  ×
                </button>
              </Badge>
            )}

            {filters.code && (
              <Badge variant="secondary" className="px-2 py-1 gap-1">
                Kode: {filters.code}
                <button
                  onClick={() => updateFilter({ code: undefined })}
                  className="ml-1 text-xs"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
      {create && (
        <DialogMethods
          onClose={() => setCreate(false)}
          open={create}
          description=""
          onSubmit={(data: CreateMethod) => {
            createFunc.mutate(data);
          }}
          title="Create Method"
        />
      )}
    </>
  );
}
