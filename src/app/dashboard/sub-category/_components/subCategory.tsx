"use client";
import { useEffect, useState } from "react";
import { HeaderSubCategory } from "./header";
import { useGetSubcategories } from "../api/server";
import { SkeletonSubCategories } from "@/components/ui/skeleton/skeleton-sub";
import SubContent from "./table-sub-content";
import { NotFoundItems } from "@/components/ui/not-found-items";
import { TablePagination } from "@/features/components/TablePagination";
import { usePaginationState } from "@/hooks/use-paginate";

export default function SubCategory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [status, setStatus] = useState("active");
  const { currentPage, handlePerPageChange, perPage, setCurrentPage } =
    usePaginationState();

  const { data, isLoading, meta } = useGetSubcategories({
    limit: perPage,
    page: currentPage,
    search: debouncedSearchTerm,
    active: "active",
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string) => {
    setStatus(status);
    setCurrentPage(1);
  };

  return (
    <main className="space-y-6 p-8">
      <HeaderSubCategory
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
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
