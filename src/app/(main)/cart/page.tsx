"use client"
import MainLayout from "@/components/layouts/mainlayout"
import { useGetCart } from "../order/server"
import { HeaderCart } from "./headerCart"
import { PaymentMethods } from "./methodCard"
import { CartItem } from "./cardItems"

export default function Page() {
  const { data, error, isLoading } = useGetCart()
  const cart = data?.cart
  
  return (
    <MainLayout className="max-w-7xl mx-auto w-full py-8 px-4 bg-background/80">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <HeaderCart />
          <PaymentMethods />
        </div>
        <div className="sticky top-8 h-fit">
          {cart && cart.items.length > 0 && (
            <CartItem items={cart.items} />
          )}
        </div>
      </div>
    </MainLayout>
  )
}