"use client"

import React, { useEffect, useState } from "react"
import MainLayout from "@/components/layouts/mainlayout"
import { useFilterState } from "@/hooks/use-filter"
import { usePaginationState } from "@/hooks/use-paginate"
import { HeaderCategory } from "./headerCategory"
import { useFilterCategory } from "../api/server"
import type { Filter } from "@/schemas/types"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TablePagination } from "@/features/components/TablePagination"
import { CategoriesData } from "@/schemas/category"
import { LoadingState } from "@/components/ui/state/loading.state"
import { ErrorState } from "@/components/ui/state/error-state"
import { EmptyState } from "@/components/ui/state/empty-state"
import { CategoryDetails } from "./category-details"
import { CategoryRow } from "./category-row"

export function DashboardProductCategory() {
  // State hooks
  const { debouncedSearchTerm, typeFilter, statusFilter, handleSearchChange, handleTypeChange, handleStatusChange } =
    useFilterState()

  const { currentPage, perPage, setCurrentPage, handlePerPageChange } = usePaginationState()

  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null)

  const getFilterParams = (): Filter => {
    const filterParams: Filter = {
      page: currentPage,
      limit: perPage,
    }

    if (debouncedSearchTerm) filterParams.search = debouncedSearchTerm
    if (typeFilter) filterParams.type = typeFilter
    if (statusFilter === "active") filterParams.active = "active"
    if (statusFilter === "unactive") filterParams.active = "unactive"

    return filterParams
  }

  // Fetch data
  const { data, isLoading, error } = useFilterCategory(getFilterParams())

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, typeFilter, statusFilter, setCurrentPage])

  const toggleExpand = (id: number) => {
    setExpandedCategoryId((prev) => (prev === id ? null : id))
  }

  const renderContent = () => {
    if (isLoading) return <LoadingState />
    if (error) return <ErrorState />
    if (!data?.data || data.data.categories.length === 0) return <EmptyState />

    return (
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
              <TableBody>{renderCategoryRows(data.data.categories)}</TableBody>
            </Table>
          </div>
        </div>
        {renderPagination()}
      </div>
    )
  }

  const renderCategoryRows = (categories: CategoriesData[]) => {
    return categories.map((category, index) => (
      <React.Fragment key={category.id}>
        <CategoryRow
          category={category}
          index={index}
          currentPage={currentPage}
          perPage={perPage}
          isExpanded={expandedCategoryId === category.id}
          onToggleExpand={() => toggleExpand(category.id)}
        />
        {expandedCategoryId === category.id && <CategoryDetails category={category} />}
      </React.Fragment>
    ))
  }

  const renderPagination = () => {
    if (!data?.data?.meta) return null

    return (
      <TablePagination
        currentPage={currentPage}
        perPage={perPage}
        totalItems={data.data.meta.total}
        totalPages={data.data.meta.totalPages}
        onPageChange={setCurrentPage}
        onPerPageChange={handlePerPageChange}
      />
    )
  }

  return (
    <MainLayout className="p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
          <HeaderCategory
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onTypeChange={handleTypeChange}
          />
   

        <div className="mt-6">{renderContent()}</div>
      </div>
    </MainLayout>
  )
}
