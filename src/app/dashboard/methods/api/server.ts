import { api } from "@/lib/axios";
import { CreateMethod, UpdateMethods } from "@/schemas/methods";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetMethods() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["methods"],
        queryFn: async () => {
            try {
                const res = await api.get("/methods");
                return res.data;
            } catch (error) {
                toast.error("Gagal memuat metode pembayaran");
                throw error;
            }
        },
        gcTime: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    return {
        data,
        error,
        isLoading
    };
}

export function useCreateMethods() {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationKey: ["methods"],
        mutationFn: async (req: CreateMethod) => {
            try {
                const res = await api.post("/methods", req);
                return res.data;
            } catch (error) {
                toast.error("Gagal membuat metode pembayaran");
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Metode pembayaran berhasil dibuat");
            queryClient.invalidateQueries({ queryKey: ["methods"] });
        },
        onError: (error) => {
            queryClient.invalidateQueries({ queryKey: ["methods"] });
        }
    });

    return {
        mutate,
        isPending,
        error
    };
}

export function useUpdateMethods(id: number) {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationKey: ["methods"],
        mutationFn: async (req: UpdateMethods) => {
            try {
                const res = await api.patch(`/methods/${id}`, req);
                return res.data;
            } catch (error) {
                toast.error("Gagal memperbarui metode pembayaran");
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Metode pembayaran berhasil diperbarui");
            queryClient.invalidateQueries({ queryKey: ["methods"] });
        },
        onError: (error) => {
            queryClient.invalidateQueries({ queryKey: ["methods"] });
        }
    });

    return {
        mutate,
        isPending,
        error
    };
}

export function useDeleteMethods(id: number) {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationKey: ["methods"],
        mutationFn: async () => {
            try {
                const res = await api.delete(`/methods/${id}`);
                return res.data;
            } catch (error) {
                toast.error("Gagal menghapus metode pembayaran");
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Metode pembayaran berhasil dihapus");
            queryClient.invalidateQueries({ queryKey: ["methods"] });
        },
        onError: (error) => {
            queryClient.invalidateQueries({ queryKey: ["methods"] });
        }
    });

    return {
        mutate,
        isPending,
        error
    };
}
