import { create } from "zustand"

export type FilterProduct = "gamelainnya" | "voucher" | "pulsa" | "pln"



export type HeaderFilterGame = {
  filter: FilterProduct;
  setFilter: (filter: FilterProduct) => void;
    subCategory: string
    setSubCategory : (sub  : string)  => void
    price: "min" | "max"
    setPrice: (price: "min" | "max") => void;
    productCode: string | undefined
    setProductCode: (code: string | undefined) => void
  resetFilters: () => void;
}

// Default values
const DEFAULT_FILTER: FilterProduct = "gamelainnya";
const DEFAULT_PRICE= "min"

export const useFilterCategoryHome = create<HeaderFilterGame>((set) => ({
  filter: DEFAULT_FILTER,
  setFilter: (filter) => set({ filter }),
  
  // Price filter
  price: DEFAULT_PRICE,
    setPrice: (price) => set({ price }),
  
    productCode: undefined,
    setProductCode : (code)  => set({productCode : code}),
    
    subCategory : "all",
    setSubCategory : (sub : string)  => set({ subCategory : sub}),
  
  resetFilters: () => set({ 
    price: DEFAULT_PRICE
  })
}))