"use client"

import { useGetBanner } from "@/app/dashboard/general/banner/server"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { BannerLoading } from "@/components/ui/skeleton/banner-loading"
import { BannerNotFound } from "@/components/ui/state/banner-notfound"

export function BannerHomeDesign() {
  const { data, isLoading, error } = useGetBanner()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const backgroundUrl = "https://res.cloudinary.com/dstvymie8/image/upload/v1741104865/download_1_bzlrrj.webp"

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setIsAutoPlaying(false)
    nextSlide()
  }

  const handlePrev = () => {
    setDirection(-1)
    setIsAutoPlaying(false)
    prevSlide()
  }
  // Handle auto-sliding
   useEffect(() => {
    if (!isAutoPlaying || !data?.data.length) return

    const interval = setInterval(() => {
      handleNext()
    }, 500) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, data?.data?.length, handleNext])


  // Loading state
  if (isLoading) {
    return (
      <BannerLoading image={backgroundUrl} />
    )
  }

  // Error or no data state
  if (error || !data || !data.data || data.data.length === 0) {
    return (
      <BannerNotFound image={backgroundUrl} />
    )
  }

  const banners = data.data

  

  const variants = {
    enter: (direction : number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction : number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  return (
    <section
      className="relative w-full py-4 md:py-8 rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full">
        <div className="relative  flex flex-col space-y-3 md:space-y-6 z-10">
          {/* Banner Slider */}
          <div 
            className="relative w-full h-40 sm:h-48 md:h-64 lg:h-96 overflow-hidden rounded-lg"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full h-full"
              >
                <Image
                  src={banners[currentIndex].urlImage}
                  alt={banners[currentIndex].title || `Banner ${currentIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
                  className={`w-full h-full ${isMobile ? "object-contain" : "object-cover"} rounded-lg`}
                  priority
                />
                
                {/* Banner Content Overlay */}
                {(banners[currentIndex].title || banners[currentIndex].description) && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/70 to-transparent">
                    {banners[currentIndex].title && (
                      <motion.h3 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl lg:text-2xl font-bold text-white"
                      >
                        {banners[currentIndex].title}
                      </motion.h3>
                    )}
                    {banners[currentIndex].description && (
                      <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm md:text-base text-white/90 mt-1"
                      >
                        {banners[currentIndex].description}
                      </motion.p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {banners.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 md:p-2 transition-all duration-200"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={isMobile ? 18 : 24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 md:p-2 transition-all duration-200"
                  aria-label="Next slide"
                >
                  <ChevronRight size={isMobile ? 18 : 24} />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {banners.length > 1 && (
              <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 md:space-x-2 z-10 px-2 md:px-4 py-1 md:py-2 bg-black/20 rounded-full">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1)
                      setCurrentIndex(index)
                      setIsAutoPlaying(false)
                    }}
                    className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex ? "bg-white scale-125" : "bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* CSS for hide-scrollbar */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}