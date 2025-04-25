import type { CategoriesData } from "@/schemas/category"
import Image from "next/image"
import { InfoIcon } from "lucide-react"

export function HeaderOrderCategory({ category }: { category: CategoriesData }) {

  return (
    <div className="rounded-xl shadow-lg overflow-hidden mb-6">
      {/* Enhanced banner image with better overlay */}
      <div className="h-48 w-full relative">
        <Image
          src={category.thumbnail}
          alt={category.name}
          width={400}
          height={100}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001435]/60 via-[#001435]/80 to-[#001435]"></div>

        {/* Floating content on the banner */}
        <div className="absolute bottom-0 left-0 w-full p-6 flex items-end">
          {/* Logo */}
          <div className="h-20 w-20 rounded-xl overflow-hidden border-2 border-[#4f9cf9]/30 shadow-lg bg-[#001435] relative mr-4">
            <Image
              src={category.logo || "/placeholder.svg"}
              alt={category.brand}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          {/* Title */}
          <div className="pb-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white">{category.name}</h1>
            <p className="text-[#4f9cf9] font-medium">{category.brand}</p>
          </div>
        </div>
      </div>

      {/* Instructions section */}
     
    </div>
  )
}
