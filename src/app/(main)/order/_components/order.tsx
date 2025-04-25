"use client"
import { useGetProductByCategoryCode } from "@/app/dashboard/product/api/server";
import MainLayout from "@/components/layouts/mainlayout";
import { CategoryWithProduct } from "@/schemas/products";
import { useParams } from "next/navigation";
import { HeaderOrderCategory } from "./header";
import { PlaceholderInput } from "./placeholder";
import { getServerData } from "@/data/data-server-region";
import { useFilterCategoryHome } from "@/hooks/use-filterGame";
import { FilterComponent } from "./filter/filter";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useMemo } from "react";
import { InfoIcon } from "lucide-react";
import { FormatPrice } from "@/utils/formatPrice";
import { CardProducts } from "./cardProducts";
import { ButtonAddToCart } from "./buttonAddToCart";

export function OrderPage() {
  const { slug } = useParams();
  const { price, subCategory } = useFilterCategoryHome();
  const { data } = useGetProductByCategoryCode({ code: slug as string,price,subcategory : subCategory ?? undefined });
  const serverData = useMemo(() => getServerData(slug as string), [slug]);

  const category = data as CategoryWithProduct;
  
  
  if (!category || category === undefined) {
    return <LoadingOverlay />
  }

  const instructionsList = category?.instructions
    .replace(/<br>/g, "\n")
    .split("\n")
    .filter((instruction) => instruction.trim() !== "")

  return (
    <MainLayout className="w-full max-w-none">
      <div className="w-full max-w-7xl mx-auto px-4 py-6">
        {/* Category Header */}
        <HeaderOrderCategory category={category}/>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {/* Left Sidebar - Filters */}
          <div className="md:col-span-1">
            <FilterComponent category={category} />
            <div className="bg-[#00112b] mt-4 p-4 rounded-lg border border-[#4f9cf9]/20">
              <div className="flex items-center mb-3">
                <InfoIcon className="h-5 w-5 text-[#4f9cf9] mr-2" />
                <h3 className="font-semibold text-[#4f9cf9]">Cara Pembelian:</h3>
              </div>
              <ol className="list-decimal pl-5 text-xs text-white/90 space-y-1.5">
                {instructionsList.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ol>
          </div>
            <ButtonAddToCart code={category.code} />
          </div>
          
         <div className="md:col-span-3 flex flex-col overflow-hidden">
          <PlaceholderInput 
            serverData={serverData} 
            placeholder1={category.placeholder1} 
            placeholder2={category.placeholder2}
          />
          
          {/* Scrollable Product List */}
          <div className="overflow-y-auto mt-4 pr-4 custom-scrollbar" style={{ maxHeight: "calc(100vh - 250px)" }}>
            <CardProducts category={category}/>
          </div>
        </div>
        </div>
      </div>
    </MainLayout>
  );
}