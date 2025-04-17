"use client"
import { URL_LOGO } from "@/constants"
import Image from "next/image"
import { useEffect, useState, type ReactNode } from "react"

export function AuthPage({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main
      className="w-full min-h-screen flex flex-col items-start justify-start relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: mounted ? "url('/bg-auth.webp')" : "none",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />
      <div className="w-full max-w-md z-10 relative ml-16">
        <div className="flex justify-center">
          <Image
            src={(URL_LOGO as string)}
            alt="Logo"
            width={150}
            height={80}
            className="w-auto"
          />
        </div>
        <div className="backdrop-blur-md rounded-xl shadow-xl overflow-hidden relative">
          <div className="">{children}</div>
        </div>

        
      </div>
    </main>
  )
}
