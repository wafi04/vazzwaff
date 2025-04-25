"use client"
import { useFilterCategoryHome } from "@/hooks/use-filterGame"
import { CategoryWithProduct } from "@/schemas/products"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterComponent({ category }: { category: CategoryWithProduct }) {
    return (
        <div className="flex flex-col gap-4 bg-[#001f54] rounded-lg shadow-lg p-6 border border-[#4f9cf9]/20">
            {/* header */}
            <h2 className="text-lg font-semibold text-[#f8fafc] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#4f9cf9]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Filter Products
            </h2>
            <div className="flex flex-col gap-3">
                <SubCategoryFilter category={category} />
                <PriceFilter />
            </div>
        </div>
    )
}

export function SubCategoryFilter({ category }: { category: CategoryWithProduct }) {
  const { subCategory, setSubCategory } = useFilterCategoryHome();

  return (
    <div className="flex flex-col gap-3">
      <Select value={subCategory ?? "all"} onValueChange={setSubCategory}>
        <SelectTrigger className="w-full bg-[#001435] border border-[#4f9cf9]/30 text-[#f8fafc]/80">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#001435] border border-[#4f9cf9]/20 text-[#f8fafc]">
          <SelectItem value="all">All</SelectItem>
          {category.subCategories.map((sub) => (
            <SelectItem key={sub.id} value={sub.code}>
              {sub.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function PriceFilter() {
    const { price, setPrice } = useFilterCategoryHome()
    return (
         <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-[#f8fafc]/80">Price Order</label>
      <Select value={price} onValueChange={setPrice}>
        <SelectTrigger className="w-full bg-[#001435] border border-[#4f9cf9]/30 text-[#f8fafc]/80">
          <SelectValue placeholder="Sort by Price" />
        </SelectTrigger>
        <SelectContent className="bg-[#001435] border border-[#4f9cf9]/20 text-[#f8fafc]">
          <SelectItem value="min">Murah ke Mahal</SelectItem>
          <SelectItem value="max">Mahal ke Murah</SelectItem>
        </SelectContent>
      </Select>
    </div>
    )
}