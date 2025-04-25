import { Cart } from "@/schemas/order"
import Image from "next/image"



interface OrderSummaryProps {
  cart?: Cart
}

export function OrderSummary({ cart }: OrderSummaryProps) {
  // Sample data if cart is not available
  const sampleItems = [
    {
      id: "1",
      name: "Travel Alarm Clock",
      price: 64,
      quantity: 1,
      productImage: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      name: "Classic Watch",
      price: 470,
      quantity: 1,
      productImage: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      name: "Braun Satin Hair",
      price: 146,
      quantity: 1,
      productImage: "/placeholder.svg?height=80&width=80",
    },
  ]

  const items = cart?.items?.length ? cart.items : sampleItems

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = subtotal * 0.5 // 50% discount
  const total = subtotal - discount

  return (
    <div className="bg-zinc-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Your order</h2>
        <span className="text-xs bg-zinc-700 px-3 py-1 rounded">Edit</span>
      </div>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-20 h-20 bg-zinc-700 rounded-md overflow-hidden flex items-center justify-center">
              <Image
                src={item.productImage || "/placeholder.svg"}
                alt={"items"}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-zinc-400 mt-1">$ {item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-700 pt-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-zinc-400">Subtotal:</span>
          <span className="font-medium">$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-zinc-400">Taxes:</span>
          <span className="font-medium">Free</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-zinc-400">Discount:</span>
          <span className="font-medium text-green-500">-50%</span>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-zinc-700 pt-4 mb-6">
        <span className="text-sm text-zinc-400">Total price:</span>
        <span className="text-lg font-bold">$ {total.toFixed(2)}</span>
      </div>

      <div className="relative mb-6">
        <div className="bg-pink-500 bg-opacity-20 rounded-lg p-4 flex items-center">
          <div className="mr-3">
            <Image src="/placeholder.svg?height=40&width=40" alt="Braun logo" width={40} height={40} />
          </div>
          <div>
            <p className="text-xs text-pink-300">Discount</p>
            <p className="text-sm font-medium">
              on all items <span className="text-pink-300">-50%</span>
            </p>
          </div>
        </div>
      </div>

      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors">
        Place Order
      </button>
    </div>
  )
}
