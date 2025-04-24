"use client";
import { useEffect } from "react";
import { HeaderSubCategory } from "./header";
import { useGetSubcategories } from "../api/server";
import { SkeletonSubCategories } from "@/components/ui/skeleton/skeleton-sub";
import SubContent from "./table-sub-content";
import { NotFoundItems } from "@/components/ui/not-found-items";
import { TablePagination } from "@/features/components/TablePagination";
import { usePaginationState } from "@/hooks/use-paginate";
import { useFilterCategoryState } from "@/hooks/use-sub-categories";

export default function SubCategory() {
  const {
    searchInput, active, categoryId,
    setSearchTerm, setActive, setCategoryId
  } = useFilterCategoryState();
  
  const { currentPage, handlePerPageChange, perPage, setCurrentPage } =
    usePaginationState();

  const { data, isLoading, meta } = useGetSubcategories({
    limit: perPage,
    page: currentPage,
    search: searchInput,
    active,
    categoryId: categoryId || undefined,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(searchInput ?? "");
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput, setSearchTerm]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string) => {
    setActive(status);
    setCurrentPage(1);
  };

  const handleCategoryChange = (id: number) => {
    // If id is 0, it means "All Categories" was selected
    setCategoryId(id === 0 ? undefined : id);
    setCurrentPage(1);
  };

  return (
    <main className="space-y-6 p-8">
      <HeaderSubCategory
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onCategoryChange={handleCategoryChange}
      />

      {isLoading ? (
        <SkeletonSubCategories />
      ) : data && data.length > 0 ? (
        <>
          <SubContent data={data} />
          {meta && (
            <TablePagination
              currentPage={currentPage}
              perPage={perPage}
              totalItems={meta.total}
              totalPages={meta.totalPages}
              onPageChange={setCurrentPage}
              onPerPageChange={handlePerPageChange}
            />
          )}
        </>
      ) : (
        <NotFoundItems />
      )}
    </main>
  );
}