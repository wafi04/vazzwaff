import { api } from "@/lib/axios";
import {
  CreateSubCategories,
  FilterSubcategory,
  SubCategoryResponse,
  UpdateSubCategory,
} from "@/schemas/category";
import { ApiResponse } from "@/types/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateSubCategories() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["subCategory"],
    mutationFn: async (req: CreateSubCategories) => {
      const request = await api.post("/subcategories", req);
      return request.data;
    },
    onError: () => {
      queryClient.cancelQueries({ queryKey: ["subCategory"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.error("Failed to create sub-category");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subCategory"] });
      toast.success("Sub-category created successfully");
    },
  });
  return {
    mutate,
    isPending,
    isError,
    isSuccess,
  };
}

export function useGetSubcategories(req: FilterSubcategory) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["subCategory",req],
    queryFn: async () => {
      const request = await api.get<ApiResponse<SubCategoryResponse>>(
        "/subcategories",
        req
      );
      return request.data;
    },
    gcTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data.data ?? [],
    meta: data?.data.meta,
    error,
    isLoading,
  };
}

export function useUpdateCategory(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["subCategory"],
    mutationFn: async (req: UpdateSubCategory) => {
      const request = await api.put(`/subcategories/${id}`, req);
      return request.data;
    },
    onError: () => {
      queryClient.cancelQueries({ queryKey: ["subCategory"] });
      toast.error("Failed to update sub-category");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subCategory"] });
      toast.success("Sub-category updated successfully");
    },
  });
}

export function useDeleteSubCategory(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["subCategory"],
    mutationFn: async () => {
      const request = await api.delete(`/subcategories/${id}`);
      return request.data;
    },
    onError: () => {
      queryClient.cancelQueries({ queryKey: ["subCategory"] });
      toast.error("Failed to delete sub-category");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subCategory"] });
      toast.success("Sub-category deleted successfully");
    },
  });
}
