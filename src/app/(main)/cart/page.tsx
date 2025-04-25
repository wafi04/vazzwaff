"use client"
import MainLayout from "@/components/layouts/mainlayout"
import { useGetCart } from "../order/server"
import { HeaderCart, UserDetails } from "./headerCart"
import { PaymentMethods } from "./methodCard"
import { OrderSummary } from "./orderSummary"


export default function Page() {
  const { data, error, isLoading } = useGetCart()
  const cart = data?.cart

  return (
    <MainLayout className="max-w-7xl mx-auto w-full py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <HeaderCart />
            <UserDetails />
            <PaymentMethods />
          </div>
          <div>
            <OrderSummary cart={cart} />
          </div>
        </div>
    </MainLayout>
  )
}
