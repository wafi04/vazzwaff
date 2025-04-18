import { api } from "@/lib/axios";
import { SessionsData } from "@/schemas/auth";
import { ApiResponse } from "@/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function GetAllSession() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            const req = await api.get<ApiResponse<SessionsData[]>>("/auth/sessions")
            return req.data
        },
        gcTime: 1000 * 60 * 60 * 24,
        staleTime: 1000 * 60 * 60 * 24,
        refetchOnWindowFocus: false,
    })
    return {
        data: data?.data,
        isLoading,
        error
    }
}

export function useRevokeAllSessions() {
    const queryClient = useQueryClient()
    
    const { mutate, isPending, error } = useMutation({
        mutationFn: async () => {
            const req = await api.post("/auth/sessions/revoke-all")
            return req.data
        },
        onMutate: async () => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['sessions'] })
            
            // Snapshot the previous value
            const previousSessions = queryClient.getQueryData(['sessions'])
            
            // Optimistically update to the new value
            queryClient.setQueryData(['sessions'], (old: any) => ({
                ...old,
                data: []
            }))
            
            return { previousSessions }
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(['sessions'], context?.previousSessions)
            toast.error("Failed to Revoke Sessions")
        },
        onSuccess: () => {
            toast.success("All Sessions Revoked Successfully")
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['sessions'] })
        }
    })
    
    return {
        mutate,
        isPending,
        error
    }
}

export function useRevokeSession() {
    const queryClient = useQueryClient()
    
    const { mutate, isPending, error } = useMutation({
        mutationFn: async (sessionId: string) => {
            const req = await api.post("/auth/sessions/revoke", {
                sessionId
            })
            return req.data
        },
        onMutate: async (sessionId) => {
            await queryClient.cancelQueries({ queryKey: ['sessions'] })
            
            // Snapshot the previous value
            const previousSessions = queryClient.getQueryData(['sessions'])
            
            // Optimistically update to the new value
            queryClient.setQueryData(['sessions'], (old: any) => {
                if (!old || !old.data) return old;
                
                return {
                    ...old,
                    data: old.data.filter((session: SessionsData) => session.id !== sessionId)
                }
            })
            
            // Return a context object with the snapshot
            return { previousSessions }
        },
        onError: (err, sessionId, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            queryClient.setQueryData(['sessions'], context?.previousSessions)
            toast.error("Failed to Revoke Session")
        },
        onSuccess: () => {
            toast.success("Session Revoked Successfully")
        },
        onSettled: () => {
            // Always refetch after error or success to ensure data is in sync
            queryClient.invalidateQueries({ queryKey: ['sessions'] })
        }
    })
    
    return {
        mutate,
        isPending,
        error
    }
}
