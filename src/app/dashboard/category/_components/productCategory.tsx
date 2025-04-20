"use client";

import MainLayout from "@/components/layouts/mainlayout";
import { useFilterState } from "@/hooks/use-filter";
import { usePaginationState } from "@/hooks/use-paginate";
import { useEffect } from "react";
import { HeaderCategory } from "./headerCategory";
import { useFilterCategory } from "../api/server";
import { Filter } from "@/schemas/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { TablePagination } from "@/features/components/TablePagination";

export function DashboardProductCategory() {
  const {
    debouncedSearchTerm,
    typeFilter,
    statusFilter,
    handleSearchChange,
    handleTypeChange,
    handleStatusChange
  } = useFilterState();

  const {
    currentPage,
    perPage,
    setCurrentPage,
    handlePerPageChange
  } = usePaginationState();

  const getFilterParams = () => {
    const filterParams: Filter = {};

    if (debouncedSearchTerm) filterParams.search = debouncedSearchTerm;
    if (typeFilter) filterParams.type = typeFilter;
    if (statusFilter === "active") filterParams.active = "1";
    if (statusFilter === "unactive") filterParams.active = "0";
    if (statusFilter === "draft") filterParams.status = "draft";

    filterParams.page = currentPage;
    filterParams.limit = perPage;

    return filterParams;
  };

  const { data, isLoading, error } = useFilterCategory(getFilterParams());

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, typeFilter, statusFilter]);

  // Helper function to format type
  const formatType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
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
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">No.</TableHead>
                          <TableHead className="w-14">Logo</TableHead>
                          <TableHead>Nama Kategori</TableHead>
                          <TableHead className="hidden md:table-cell">Kode</TableHead>
                          <TableHead className="hidden lg:table-cell">Deskripsi</TableHead>
                          <TableHead className="hidden sm:table-cell">Tipe</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.data.categories.map((category, index) => (
                          <TableRow key={category.name}>
                            <TableCell className="font-medium">
                              {(currentPage - 1) * perPage + index + 1}
                            </TableCell>
                            <TableCell>
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={category.logo} alt={category.name} />
                                <AvatarFallback>
                                  {category.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <span className="text-xs">{category.code}</span>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell max-w-xs">
                              <span className="text-sm line-clamp-1">{category.subName}</span>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <span>{formatType(category.type)}</span>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={category.status === "active" ? "default" : "secondary"}
                                className={category.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                              >
                                {category.status === "active" ? "Aktif" : "Draft"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" title="Lihat">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Edit">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Hapus">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {data?.data?.meta && (
                  <TablePagination
                    currentPage={currentPage}
                    perPage={perPage}
                    totalItems={data.data.meta.total}
                    totalPages={data.data.meta.totalPages}
                    onPageChange={setCurrentPage}
                    onPerPageChange={handlePerPageChange}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}