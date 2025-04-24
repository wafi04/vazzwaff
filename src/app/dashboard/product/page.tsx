"use client"
import MainLayout from "@/components/layouts/mainlayout"
import HeaderProduct from "./_components/header"
import { useGetProduct } from "./api/server"
import { TableProducts } from "./_components/table-products"
import { usePaginationState } from "@/hooks/use-paginate"
import { TablePagination } from "@/features/components/TablePagination"
import { useFilterProductState } from "@/hooks/use-product"

export default function Page() {
    const {searchInput,setSearchTerm,active,setActive}  = useFilterProductState()
    const {currentPage,handlePerPageChange,perPage,setCurrentPage}  = usePaginationState()
    const { data } = useGetProduct({
        search: searchInput,
        page: currentPage,
        perPage,
        status: active
    })
    return (
        <MainLayout className="p-6">
            <HeaderProduct
                onActiveChange={(value) => {
                    setActive(value)
                }}
                onSearchChange={(value) => {
                setSearchTerm(value)
            }} />
            {
                data && (
                    <>
                    <TableProducts data={data.data}/>
                        <TablePagination
                            currentPage={currentPage}
                            perPage={perPage}
                            totalItems={data.meta.total}
                            totalPages={data.meta.totalPages}
                            onPageChange={setCurrentPage}
                            onPerPageChange={handlePerPageChange}
                        />
                    </>
                )
            }
            
        </MainLayout>
    )
}