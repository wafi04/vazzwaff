"use client"

import MainLayout from "@/components/layouts/mainlayout"
import { HeaderBanner } from "./_components/header"
import { useGetBanner } from "./server"
import Image from "next/image"
import { useState, useEffect } from "react"
import { BannerData } from "@/schemas/banner"

export default function BannerPage() {
  const { data, error, isLoading } = useGetBanner()
  const [selectedBanner, setSelectedBanner] = useState<BannerData | null>(null)

  // Handle loading and error states
  if (isLoading) return (
    <MainLayout className="p-6">
      <HeaderBanner />
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading banners...</p>
      </div>
    </MainLayout>
  )

  if (error) return (
    <MainLayout className="p-6">
      <HeaderBanner />
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading banners. Please try again.</p>
      </div>
    </MainLayout>
  )

  return (
    <MainLayout className="p-6">
      <HeaderBanner />
      
      {/* Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data && data.data.map((item) => (
          <div 
            key={item.id} 
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => setSelectedBanner(item)}
          >
            <div className="relative h-48 w-full">
              <Image 
                src={item.urlImage} 
                alt={item.title || "Banner Vazzuniverse"} 
                fill
                className="bg-cover"
              />
            </div>
            {item.title && (
              <div className="p-4">
                <h3 className="font-medium text-lg">{item.title}</h3>
                {item.description && <p className="text-gray-600 mt-1">{item.description}</p>}
                <p className="text-xs text-gray-400 mt-2">Created: {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Display when no banners are available */}
      {(!data || data.data.length === 0) && (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No banners available.</p>
        </div>
      )}
      
      {/* Modal for selected banner */}
      {selectedBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedBanner(null)}>
          <div className="bg-gray-800 p-4 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
                      <div className="flex w-full justify-between items-center">
                          <h1 className="text-xl">Banner</h1>
                      <button 
              className="bg-gray-800 text-white px-3.5 py-2  rounded-full "
              onClick={() => setSelectedBanner(null)}
              >
              X
            </button>
                </div>
                      <div className="relative h-80 w-full">
              <Image 
                src={selectedBanner.urlImage} 
                alt={selectedBanner.title || "Banner Vazzuniverse"} 
                fill
                className="object-contain"
              />
            </div>
            {selectedBanner.title && (
              <div className="mt-4">
                <h2 className="text-xl font-bold">{selectedBanner.title}</h2>
                {selectedBanner.description && <p className="mt-2">{selectedBanner.description}</p>}
              </div>
            )}
            
          </div>
        </div>
      )}
    </MainLayout>
  )
}