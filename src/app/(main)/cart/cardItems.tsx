import { OrderItems } from "@/schemas/order";
import { FormatCurrency } from "@/utils/formatPrice";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function CartItem({ item }: { item: OrderItems }) {
  return (
    <Card className="mb-4 overflow-hidden border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="font-semibold text-blue-600">{item.productCode.substring(0, 2)}</span>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-blue-900">{item.productCode}</h3>
              
              <div className="mt-1 space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="font-medium min-w-20">Game ID:</span>
                  <span>{item.gameId}</span>
                </div>
                
                {item.gameServer && (
                  <div className="flex items-center">
                    <span className="font-medium min-w-20">Server:</span>
                    <Badge variant="outline" className="">{item.gameServer}</Badge>
                  </div>
                )}
                
                {item.nickName && (
                  <div className="flex items-center">
                    <span className="font-medium min-w-20">Nickname:</span>
                    <span className="italic">{item.nickName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-bold text-lg text-blue-800">{FormatCurrency(item.price)}</div>
            <div className="text-sm mt-1 text-gray-600">Qty: <span className="font-medium">{item.quantity}</span></div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 text-red-600 hover:text-red-700 hover:bg-red-50 p-2 h-8"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              <span className="text-xs">Remove</span>
            </Button>
          </div>
        </div>
        
        <Separator />
      </CardContent>
    </Card>
  );
}