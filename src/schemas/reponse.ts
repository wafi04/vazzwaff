import { Category } from "@/types/category";

export interface Pagination {
  total: number;
  page: number;
  limit: number;
}

export interface CategoryResponse {
  meta: Pagination;
  categories: Category[];
}
