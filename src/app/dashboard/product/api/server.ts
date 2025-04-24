import { api } from "@/lib/axios";
import { FilterProduct, ProductsReponse } from "@/schemas/products";
import { ApiResponse } from "@/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function UpdateProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["product"],
        mutationFn: async () => {
            const req = await api.put('/product')
            return req.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product"] })
            toast.success("Update product successfully")
        },
        onError: () => {
            queryClient.cancelQueries({ queryKey: ["product"] })
            toast.error("Failed Update Product")
        }
    })
}


export function useGetProduct(req?: FilterProduct) {
    const { data,isLoading,error} = useQuery({
        queryKey: ["product",req],
        queryFn: async () => {
            const data = await api.get<ApiResponse<ProductsReponse>>("/products",req)
            return data
        },
        gcTime: 24 * 60 * 60 * 1000,
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    }) 

    return {
        data : data?.data.data,
        isLoading,
        error
    }
}