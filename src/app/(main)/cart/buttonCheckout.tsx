import { motion } from "framer-motion";
import { usePaymentStore } from "@/hooks/use-checkout";
import { FormatCurrency } from "@/utils/formatPrice";
import socketClient from "@/lib/websocket";

export function ButtonCheckout({ subtotal,transactionId }: { subtotal: number,transactionId : string }) {
  const { selectPayment } = usePaymentStore();
  const socket = socketClient.getSocket()
  
  const calculateTaxAmount = () => {
    if (!selectPayment?.tax) return 0;
    
    if (selectPayment.type === "PERCENTAGE") {
      return subtotal * (selectPayment.tax / 100);
    } else if (selectPayment.type === "FIXED") {
      return selectPayment.tax;
    }
    
    return 0;
  };
  
  const taxAmount = calculateTaxAmount();
  
  const total = subtotal + taxAmount;
  
  const handleContinueToPayment = () => {
    if(socket){
      socket.emit(`checkout:user`,{
        methodCode : selectPayment.code,
        amount : total,
        transactionId,
        username : "wafiuddin",
        whatsApp : "08222697047"
      })
    }
  };

  return (
    <>
      {/* Subtotal */}
      <div className="border-t border-blue-900/50 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-blue-300/70">Total Pembelian</span>
          <span className="font-bold text-primary text-lg">
            {FormatCurrency(subtotal)}
          </span>
        </div>
        
        {/* Display tax if applicable */}
        {selectPayment?.tax && selectPayment.tax > 0 && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-blue-300/70">
              {selectPayment.name} {selectPayment.type === "PERCENTAGE" 
                ? `Tax (${selectPayment.tax}%)` 
                : "Tax (Fixed)"}
            </span>
            <span className="text-primary">
              {FormatCurrency(taxAmount)}
            </span>
          </div>
        )}
        
        {/* Total with tax */}
        {selectPayment?.tax && selectPayment.tax > 0 && (
          <div className="flex justify-between items-center mt-3 pt-2 border-t border-blue-900/30">
            <span className="text-blue-300/70 font-medium">Total + Tax</span>
            <span className="font-bold text-primary text-lg">
              {FormatCurrency(total)}
            </span>
          </div>
        )}
      </div>
      
      {/* Checkout Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={handleContinueToPayment}
        className="w-full text-sm mt-4 bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/80 transition-colors"
      >
        Lanjutkan ke Pembayaran
      </motion.button>
    </>
  );
}