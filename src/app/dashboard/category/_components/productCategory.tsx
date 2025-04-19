"use client";

import { useEffect, useState } from "react";
import { HeaderCategory } from "./headerCategory";
import MainLayout from "@/components/layouts/mainlayout";
import { useFilterCategory } from "../api/server";
import { FilterCategory } from "@/schemas/category";

export function DashboardProductCategory() {
  // State untuk filter
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Menyiapkan parameter filter
  const filterParams: FilterCategory = {};

  // Hanya tambahkan parameter jika ada nilainya
  if (debouncedSearchTerm) filterParams.search = debouncedSearchTerm;
  if (typeFilter) filterParams.type = typeFilter;
  if (statusFilter === "active") filterParams.active = "1";
  if (statusFilter === "unactive") filterParams.active = "0";
  if (statusFilter === "draft") filterParams.status = "draft";

  // Selalu sertakan parameter pagination
  filterParams.page = currentPage;
  filterParams.limit = perPage;

  // Gunakan filter hook dengan parameter yang sudah disiapkan
  const { data, isLoading, error } = useFilterCategory(filterParams);

  // Handler untuk HeaderCategory
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleTypeChange = (type: string | undefined) => {
    setTypeFilter(type);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string | undefined) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return (
    <MainLayout className="p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <HeaderCategory
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onTypeChange={handleTypeChange}
        />

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse">Memuat data kategori...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mt-4">
            <p className="font-medium">Terjadi kesalahan saat memuat data</p>
            <p className="text-sm mt-1">
              Silakan periksa console untuk detail kesalahan
            </p>
          </div>
        ) : (
          <div className="mt-6">
            {!data?.data || data.data.categories.length === 0 ? (
              <div className="text-center py-8 bg-muted/20 rounded-lg">
                <p className="text-muted-foreground">
                  Tidak ada data kategori yang ditemukan
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <pre className="p-4 bg-muted rounded-md overflow-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
