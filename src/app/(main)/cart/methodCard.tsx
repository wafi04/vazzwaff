"use client"

import { useGetMethodsWithQuery } from "@/app/dashboard/methods/api/server"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { EmptyState } from "@/components/ui/state/empty-state"
import { usePaymentStore } from "@/hooks/use-checkout"
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp, CreditCard, IdCard, Store, Wallet } from "lucide-react"
import { useAuth } from "@/components/layouts/provider/auth-provider"
import { FormatCurrency } from "@/utils/formatPrice"

export function PaymentMethods() {
  const { data, isLoading, error } = useGetMethodsWithQuery({
    isAll: "ALL",
    isActive: true,
  })
  const { user } = useAuth()
  const { selectPayment, setSelectPayment } = usePaymentStore()
  const [openCategory, setOpenCategory] = useState<string | null>("saldo")
  
  const groupedMethods = {
    saldo: { 
      name: "Saldo", 
      icon: <Wallet className="h-5 w-5 text-teal-400" />,
      methods: user && user.balance > 0 ? [{ 
        id: "saldo-1", 
        code: "saldo", 
        name: "Gunakan Saldo", 
        tipe: "saldo", 
        taxAdmin: 0, 
        typeTax: "FIXED",
        images: "/images/wallet.png" 
      }] : []
    },
    va: { 
      name: "Virtual Account", 
      icon: <CreditCard className="h-5 w-5 text-blue-400" />,
      methods: data?.methods?.filter(m => m.tipe?.toUpperCase() === "BANK_TRANSFER") || []
    },
    ewallet: { 
      name: "E-Wallet", 
      icon: <IdCard className="h-5 w-5 text-purple-400" />,
      methods: data?.methods?.filter(m => 
        ["ovo", "shopeepay", "qris"].includes(m.tipe?.toLowerCase())) || []
    },
    gerai: { 
      name: "Gerai/Minimarket", 
      icon: <Store className="h-5 w-5 text-orange-400" />,
      methods: data?.methods?.filter(m => m.tipe?.toUpperCase() === "CSTORE") || []
    }
  }

  const toggleCategory = (category: string) => {
    if (openCategory === category) {
      setOpenCategory(null)
    } else {
      setOpenCategory(category)
    }
  }

  const validCategories = Object.entries(groupedMethods)
    .filter(([_, category]) => category.methods && category.methods.length > 0);

  return (
    <div className="bg-card/80 border border-blue-900/30 rounded-xl p-6 backdrop-blur-sm shadow-lg relative overflow-hidden">
      <div className="absolute -left-32 -bottom-32 w-64 h-64 rounded-full bg-blue-500/10" />
      <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-primary/10" />
      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-4 text-blue-50">Metode Pembayaran</h2>

        {isLoading && (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-blue-950/70 rounded-lg animate-pulse" />
            ))}
          </div>
        )}

        {error && <EmptyState />}

        {!isLoading && !error && (
          <div className="space-y-3 mt-2">
            {/* Payment categories */}
            {validCategories.map(([key, category]) => (
              <div key={key} className="border border-blue-900/30 rounded-lg overflow-hidden shadow-sm">
                {/* Category header */}
                <button 
                  className={`w-full flex items-center justify-between p-4 text-left ${
                    openCategory === key ? "bg-blue-900/30" : "bg-blue-950/50"
                  } hover:bg-blue-900/20 transition-colors`}
                  onClick={() => toggleCategory(key)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center">
                      {category.icon}
                    </div>
                    <span className="font-medium text-blue-50">{category.name}</span>
                    <span className="text-xs text-blue-300/70">({category.methods.length})</span>
                  </div>
                  {openCategory === key ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                
                {/* Category content */}
                {openCategory === key && (
                  <div className="p-4 bg-blue-950/30 border-t border-blue-900/20">
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                      {category.methods.map((option) => (
                        <button
                          key={option.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                            selectPayment?.code === option.code
                              ? "border-primary bg-primary/10 shadow-md"
                              : "border-blue-900/30 bg-blue-950/50 hover:bg-blue-900/20"
                          }`}
                          onClick={() => setSelectPayment({
                            code: option.code,
                            name: option.name,
                            tax: option.taxAdmin as number,
                            type: option.typeTax as string
                          })}
                        >
                          <div
                            className={`w-20 h-12 rounded-lg flex items-center justify-center  shadow-md`}
                          >
                            {option.images && (
                              <Image
                                src={option.images}
                                alt={option.name}
                                width={32}
                                height={32}
                                className="object-contain w-8 h-8"
                              />
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-sm text-blue-50 font-medium">{option.name}</div>
                            {key === "saldo" && user?.balance && (
                              <div className="text-xs text-blue-300/70 mt-1">
                                Balance: {FormatCurrency(user.balance)}
                              </div>
                            )}
                          </div>
                          {selectPayment?.code === option.code && (
                            <Check className="size-4 rounded-full bg-primary " />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}