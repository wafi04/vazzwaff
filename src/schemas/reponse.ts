import { CategoriesData } from "./category";

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CategoryResponse {
  meta: Pagination;
  categories: CategoriesData[];
}
