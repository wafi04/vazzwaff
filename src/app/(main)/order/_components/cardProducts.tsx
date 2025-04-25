import { useFilterCategoryHome } from "@/hooks/use-filterGame";
import { useAddToCart } from "@/hooks/use-order";
import { CategoryWithProduct } from "@/schemas/products";
import { FormatPrice } from "@/utils/formatPrice";
import clsx from "clsx";

export function CardProducts({ category }: { category: CategoryWithProduct }) {
  const { productCode, setProductCode,productName,setProductName } = useAddToCart();
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {category.products.map((product) => {
        const isSelected = productCode === product.providerId;
        return (
          <div
            key={product.id}
            className={clsx(
              "cursor-pointer bg-gradient-to-b from-[#001c4d] to-[#001435] rounded-lg shadow-md p-4 transition-all duration-200 hover:shadow-xl hover:translate-y-[-2px]",
              {
                "border-2 border-[#4f9cf9]": isSelected,
                "border border-[#4f9cf9]/20": !isSelected,
              }
            )}
                onClick={() => {
                    setProductCode(product.providerId)
                    setProductName(product.name)
                }}
                
          >
            <div className="flex justify-between items-start mb-3">
              <div className="text-sm text-[#f8fafc] font-medium">
                {product.name}
              </div>
              {isSelected && (
                <div className="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded-full">
                  Terpilih
                </div>
              )}
            </div>
            <div className="text-[#4f9cf9] font-bold text-lg">
              {FormatPrice(parseInt(product.price))}
            </div>
          </div>
        );
      })}
    </div>
  );
}