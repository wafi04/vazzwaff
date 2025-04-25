"use client"

import { useFilterCategoryHome } from "@/hooks/use-filterGame"
import { HeaderFilterGame } from "./header-filter"
import { useFilterCategory } from "@/app/dashboard/category/api/server"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { EmptyState } from "@/components/ui/state/empty-state"

export function ProductGrid() {
  const { filter } = useFilterCategoryHome()
  const { data, isLoading } = useFilterCategory({
      type: filter,
      all : "all"
  })

  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const categories = data?.data?.categories || []

  return (
    <section className="min-h-screen">
      <HeaderFilterGame />

      {/* Title section */}
      <div className="px-4 mb-6">
        <motion.h2
          className="text-xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          key={filter} 
          transition={{ duration: 0.3 }}
        >
          {filter === "gamelainnya"
            ? "Top Games"
            : filter === "voucher"
              ? "Popular Vouchers"
              : filter === "pulsa"
                ? "Mobile Credit"
                : "PLN Services"}
        </motion.h2>
        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {categories.length} {filter.toLowerCase()} tersedia
        </motion.p>
      </div>

      
      {!isLoading && categories.length === 0 && (
       <EmptyState />
      )}

      {/* Product grid */}
      {!isLoading && categories.length > 0 && (
        <div className="px-4 pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2"
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredCard(category.id.toString())}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card container */}
                  <div className="relative overflow-hidden rounded-2xl hover:bg-gradient-to-br hover:from-blue-950 hover:to-[#0a0a18] h-full aspect-square hover:shadow-lg hover:shadow-blue-900/10 hover:border hover:border-blue-900/20">
                    {/* Hover glow effect */}
                    {hoveredCard === category.id.toString() && (
                      <motion.div
                        className="absolute inset-0 opacity-30 bg-gradient-to-br from-amber-500/30 to-purple-500/30 blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    {/* Card content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                      {/* Image container */}
                      <div className="relative flex items-center justify-center w-full h-full">
                        {category.logo && (
                          <motion.img
                            src={category.logo}
                            alt={category.name}
                            className="object-cover rounded-xl" 
                            initial={{ width: '80%', height: '80%' }}
                            animate={{
                              width: hoveredCard === category.id.toString() ? '100%' : '80%',
                              height: hoveredCard === category.id.toString() ? '100%' : '80%',
                              opacity: 1,
                              borderRadius: hoveredCard === category.id.toString() ? '0.5rem' : '0.75rem',
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        )}

                        {/* Subtle animated ring around logo on hover */}
                        {hoveredCard === category.id.toString() && (
                          <motion.div
                            className="absolute inset-0 rounded-full border border-amber-500/30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                              opacity: [0.2, 0.5, 0.2],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                            }}
                          />
                        )}
                      </div>

                      {/* Title section */}
                      <AnimatePresence>
                        {hoveredCard === category.id.toString() && (
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.h3
                              className="text-center text-sm font-medium text-white mb-1 line-clamp-1"
                              initial={{ y: 5, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.2, delay: 0.1 }}
                            >
                              {category.name}
                            </motion.h3>
                            <motion.p
                              className="text-center text-xs text-blue-300 line-clamp-1"
                              initial={{ y: 5, opacity: 0 }}
                              animate={{ y: 0, opacity: 0.8 }}
                              transition={{ duration: 0.2, delay: 0.2 }}
                            >
                              {category.brand || "Brand"}
                            </motion.p>
                          </motion.div>
                                  )
                        //               : (
                        //   <motion.div 
                        //     className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2"
                        //     initial={{ opacity: 0, y: 20 }}
                        //     animate={{ opacity: 0.8, y: 0 }}
                        //     exit={{ opacity: 0 }}
                        //     transition={{ duration: 0.2 }}
                        //   >
                        //     <h3 className="text-center text-sm font-medium text-white line-clamp-1 mb-2">
                        //       {category.name}
                        //     </h3>
                        //   </motion.div>
                        
                        //           )
                                  }
                      </AnimatePresence>

                      {/* Hover shine effect */}
                      {hoveredCard === category.id.toString() && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 0.8, repeat: 0 }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}