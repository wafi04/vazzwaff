"use client"

import {  type ReactNode } from "react"

export function AuthPage({ children }: { children: ReactNode }) {


  return (
    <main
      className="w-full min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dikf91ikq/image/upload/v1744977714/workspaces/bg-auth_mlfihl.webp')" ,
        backgroundColor: "#f5f5f5",
      }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0" />
      <div className="w-full max-w-md z-10 relative ml-16">
        {/* <div className="flex justify-center">
          <Image
            src={(URL_LOGO as string)}
            alt="Logo"
            width={150}
            height={80}
            className="w-auto"
          />
        </div> */}
        <div className="backdrop-blur-md rounded-xl shadow-xl overflow-hidden relative">
          <div className="">{children}</div>
        </div>

        
      </div>
    </main>
  )
}
