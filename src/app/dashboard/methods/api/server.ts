import { api } from "@/lib/axios";
import {
  CreateMethod,
  FilterMethod,
  MethodsResponse,
  UpdateMethods,
} from "@/schemas/methods";
import { ApiResponse } from "@/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetMethodsWithQuery(req: FilterMethod) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["methods", req],
    queryFn: async () => {
      try {
        const res = await api.get<ApiResponse<MethodsResponse>>("/methods", {
          isAll: req.isAll === "true" ? true : false,
          type: req.type,
          page: req.page,
          limit: req.limit,
          code: req.code,
        });
        return res.data;
      } catch (error) {
        toast.error("Gagal memuat metode pembayaran");
      }
    },
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data,
    error,
    isLoading,
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
      toast.error("Gagal membuat metode pembayaran");
    },
  });

  return {
    mutate,
    isPending,
    error,
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
      toast.error("Gagal memperbarui metode pembayaran");
    },
  });

  return {
    mutate,
    isPending,
    error,
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
      toast.error("Gagal menghapus metode pembayaran");
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
}
