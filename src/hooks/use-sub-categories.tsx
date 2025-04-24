import { create } from "zustand"

export type FilterSubCategoriesState = {
  // state
  searchInput: string | undefined
  active: string | undefined

  categoryId: number | undefined
  
  // actions
  setSearchTerm: (term: string) => void
  setActive: (active: string) => void
  setCategoryId: (categoryId: number | undefined) => void
  resetFilters: () => void
}

export const useFilterCategoryState = create<FilterSubCategoriesState>((set) => ({
  // Initial state
  active: undefined,
  categoryId: undefined,
  searchInput: undefined,
  
  // Actions
  setSearchTerm: (term: string) => set({ 
    searchInput: term,
  }),
  
  setActive: (active: string) => set({ 
    active,
  }),
  
  
  setCategoryId: (categoryId: number | undefined) => set({ 
    categoryId,
  }),
  
  resetFilters: () => set({
    searchInput: undefined,
    active: undefined,
    categoryId: undefined
  })
}))