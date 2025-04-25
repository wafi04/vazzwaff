import { api } from "@/lib/axios";
import { OrderResponse } from "@/schemas/order";
import { ApiResponse } from "@/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateTransactionCart() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["cart"],
        mutationFn: async (req : {gameId : string,gameServer? : string,productCode : string}[]) => {
            const items = {
                items : req
            }
            console.log(items.items)
            const create = await api.post('/transactions/cart', items)
            return create.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey  : ["cart"]})
            toast.success("create cart successfully")
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey  : ["cart"]})
            toast.success("Failed to Create Cart")
        }
    })

}


export function useGetCart(){
    const {data,isLoading,error}  = useQuery({
        queryKey : ["cart"],
        queryFn : async ()  => {
            const req =  await api.get<ApiResponse<OrderResponse>>("/transactions/cart")
            return req.data
        },
        gcTime : 24 * 60 * 60 * 1000,
        staleTime : 24 * 60 * 60 * 1000,
        refetchOnWindowFocus : false
    })
    return {
        data : data?.data.data,
        isLoading,
        error
    }
}