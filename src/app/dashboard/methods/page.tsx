"use client"
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
        limit: 10
    });
    const updateFilter = (newFilter: Partial<FilterMethod>) => {
    if (newFilter.type === "") {
        newFilter.type = undefined;
    }
    setFilters(prev => ({
        ...prev,
        ...newFilter
    }));
    };


    const { data: methods } = useGetMethodsWithQuery(filters);
    console.log(methods)
    return (
        <MainLayout className="p-6 max-w-[90rem]">
            <HeaderMethods filters={filters} setFilters={setFilters} updateFilter={updateFilter} />
            {
                methods && methods.methods && 
            <TableMethod data={methods?.methods}/>
            }
        </MainLayout>
    )
}