import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

interface ButtonCartProps {
  amount: number
}

export function ButtonCart({ amount }: ButtonCartProps) {
  return (
    <Link href={'/cart'}>
    <Button 
      variant="outline" 
      className="relative flex items-center gap-2  border-none hover:bg-transparent hover:text-blue-300  text-white transition-all duration-300"
      >
      <ShoppingCart className="size-10" />
      {amount > 0 && (
        <div className="absolute top-0 -right-2 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full">
          {amount}
        </div>
      )}
    </Button>
      </Link>
  )
}
