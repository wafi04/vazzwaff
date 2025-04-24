import { CategoriesData } from "./category";
import { Pagination } from "./reponse";

export interface ProductsReponse {
    data: ProductsData[]
    meta  : Pagination
}
export type ACTIVATE = "ACTIVE" | "NONACTIVE"


export type ProductsData = {
  id: number;
  categoryId: number;
  subCategoryId: number | null;
  name: string;
  code: string;
  description: string;
  note: string;
  provider: string;
  providerId: string;
  price: string;
  regularPrice: string;
  resellerPrice: string;
  platinumPrice: string;
  profit: string;
  profitRegular: string;
  profitReseller: string;
  profitPlatinum: string;
  isProfitPercentage: boolean;
  isRegularProfitPercentage: boolean;
  isResellerProfitPercentage: boolean;
  isPlatinumProfitPercentage: boolean;
  isFlashSale: boolean;
  flashSalePrice: string | null;
  flashSaleUntil: string | null;
  titleFlashSale: string | null;
  bannerFlashSale: string | null;
  status: boolean;
  productImage: string | null;
  productLogo: string | null;
  createdAt: string;
  updatedAt: string;
};



export type FilterProduct = {
    search?: string
    isFlashSale?: string
    page?: number
    perPage?: number
    status?: string
    categoryId?: number  
    sortPriceDesc?: boolean  
    sortPriceAsc?: boolean   
}