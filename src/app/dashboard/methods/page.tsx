"use client";
import MainLayout from "@/components/layouts/mainlayout";
import { HeaderMethods } from "./_components/header-methods";
import { useGetMethodsWithQuery } from "./api/server";
import { useState } from "react";
import { FilterMethod } from "@/schemas/methods";
import TableMethod from "./_components/table-method";

export default function Methods() {
  const [filters, setFilters] = useState<FilterMethod>({
    isAll: "true",
    type: undefined,
    page: 1,
    isActive: true,
    code: "",
    limit: 10,
  });
  const updateFilter = (newFilter: Partial<FilterMethod>) => {
    if (newFilter.type === "") {
      newFilter.type = undefined;
    }
    setFilters((prev) => ({
      ...prev,
      ...newFilter,
    }));
  };

  const { data: methods } = useGetMethodsWithQuery(filters);
  return (
    <MainLayout className="p-6 md:max-w-7xl">
      <HeaderMethods
        filters={filters}
        setFilters={setFilters}
        updateFilter={updateFilter}
      />
      {methods && methods.methods && (
        <TableMethod
          data={methods?.methods}
          filters={filters}
          setFilters={setFilters}
          updateFilter={updateFilter}
        />
      )}
    </MainLayout>
  );
}
