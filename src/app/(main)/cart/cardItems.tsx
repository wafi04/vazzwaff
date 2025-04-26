import { motion } from "framer-motion";
import Image from "next/image";
import { OrderItems } from "@/schemas/order";
import { FormatCurrency } from "@/utils/formatPrice";
import { Badge } from "@/components/ui/badge";
import { ButtonCheckout } from "./buttonCheckout";

export function CartItem({ items }: { items: OrderItems[] }) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <div className="bg-card/80 border border-blue-900/30 rounded-xl p-6 backdrop-blur-sm shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-blue-50">Orderan </h2>
        <span className="text-sm bg-primary/20 px-3 py-1 rounded-full text-primary font-medium">
          {items.length} items
        </span>
      </div>
      
      {/* Items List */}
      <div className="space-y-3 mb-6 max-h-80 overflow-y-auto pr-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center p-3 bg-blue-900/10 hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <div className="w-16 h-16 bg-blue-950 rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
              {item.productImage && (
                <Image
                  src={item.productImage as string}
                  alt={item.productName}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-50">{item.productName}</h3>
              <p className="text-sm text-blue-50">{item.gameId}-{item.gameServer && item.gameServer}</p>
              {
                item.nickName && (

              <Badge>
                {item.nickName}
              </Badge>
                )
              }
              <p className="text-blue-300/80 text-sm">{FormatCurrency(item.price)}</p>
            </div>
          </div>
        ))}
      </div>
      <ButtonCheckout subtotal={subtotal} transactionId={items[0].transactionId}/>
    </div>
  );
}