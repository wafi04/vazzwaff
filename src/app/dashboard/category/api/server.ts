import { api } from "@/lib/axios";
import {
  CreateCategory,
  FilterCategory,
  UpdateCategory,
} from "@/schemas/category";
import { CategoryResponse } from "@/schemas/reponse";
import { ApiResponse } from "@/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCreateCategory() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationKey: ["categories"],
    mutationFn: async (req: CreateCategory) => {
      const request = await api.post("/categories", req);
      return request.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.error("Category created failed");
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
}

export function useUpdateCategory(id: number) {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationKey: ["categories"],
    mutationFn: async (req: UpdateCategory) => {
      const request = await api.put(`/categories/${id}`, req);
      return request.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully");
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.error("Category updated failed");
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
}

export function useFilterCategory(req: FilterCategory) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories",req],
    queryFn: async () => {
      const request = await api.get<ApiResponse<CategoryResponse>>(
        "/categories",
        req
      );
      return request.data;
    },
    gcTime: 1000 * 60 * 60 * 24,
    meta: {
      cacheTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
    },
  });
  return {
    data,
    error,
    isLoading,
  };
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationKey: ["categories"],
    mutationFn: async (id: number) => {
      const request = await api.delete(`/categories/${id}`);
      return request.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.error("Category deleted failed");
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
}
