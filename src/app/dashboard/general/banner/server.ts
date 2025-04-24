import { api } from "@/lib/axios";
import { BannerData, CreateBanner, UpdateBanner } from "@/schemas/banner";
import { ApiResponse } from "@/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateBanner() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['banner'],
        mutationFn: async (req: CreateBanner) => {
            const request = await api.post('/banner', req)
            return request.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({  queryKey : ["banner"]})
            toast.success("Create Banner Successfully")
        },
        onError: () => {
            queryClient.cancelQueries({ queryKey: ["banner"] })
            toast.error("failed to create banner")
        }
    })
}
export function useUpdateBanner(id : number) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['banner'],
        mutationFn: async (req: UpdateBanner) => {
            const request = await api.put(`/banner/${id}`, req)
            return request.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({  queryKey : ["banner"]})
            toast.success("Update Banner Successfully")
        },
        onError: () => {
            queryClient.cancelQueries({ queryKey: ["banner"] })
            toast.error("Failed to update banner")
        }
    })
}
export function useDeleteBanner(id : number) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['banner'],
        mutationFn: async () => {
            const request = await api.delete(`/banner/${id}`)
            return request.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({  queryKey : ["banner"]})
            toast.success("Update Banner Successfully")
        },
        onError: () => {
            queryClient.cancelQueries({ queryKey: ["banner"] })
            toast.error("Failed to update banner")
        }
    })
}

export function useGetBanner() {
    const { data,error,isLoading} = useQuery({
        queryKey: ["banner"],
        queryFn: async () => {
            const request = await api.get<ApiResponse<BannerData[]>>(`/banner`)
            return request.data
        },
        gcTime: 24 * 60 * 60 * 1000,
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnWindowFocus : false
    })

    return {
        data,
        isLoading,
        error
    }
}
