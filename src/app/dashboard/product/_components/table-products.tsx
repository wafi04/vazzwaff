import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ProductsData } from "@/schemas/products";
import { formatDate, FormatPrice } from "@/utils/formatPrice";
import { Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function TableProducts({ data }: { data: ProductsData[] }) {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRowExpansion = (productId: number) => {
    setExpandedRows(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <div className="rounded-md border overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 font-semibold">ID</TableHead>
            <TableHead className="font-semibold">Product</TableHead>
            <TableHead className="font-semibold">Code</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="w-32 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="rounded-full bg-gray-100 p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </div>
                  <div className="font-medium">No products found</div>
                  <p className="text-sm text-gray-400">Add products to see them listed here</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((product) => (
              <>
                <TableRow 
                  key={product.id} 
                  className={`group transition-colors border-b ${expandedRows[product.id] ? 'bg-blue-500' : 'hover:bg-blue-500'}`}
                >
                  <TableCell className="font-mono text-xs text-gray-400">{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <div className="font-medium group-hover:text-blue-600 transition-colors">{product.name}</div>
                          <button 
                        className="p-1 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                        onClick={() => toggleRowExpansion(product.id)}
                        title={expandedRows[product.id] ? "Hide Details" : "Show Details"}
                      >
                        {expandedRows[product.id] ? 
                          <ChevronUp size={16} className="text-blue-600" /> : 
                          <ChevronDown size={16} className="text-blue-600" />
                        }
                      </button>
                      {product.isFlashSale && (
                        <Badge className="ml-2 bg-red-500 hover:bg-red-600">Flash Sale</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-gray-500">{product.providerId}</TableCell>
                  <TableCell className="font-medium">
                    {FormatPrice(parseInt(product.price))}
                  </TableCell>
                  <TableCell>
                    {product.status ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <button className="p-1 rounded-md hover:bg-blue-100 transition-colors" title="Edit">
                        <Edit size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 rounded-md hover:bg-red-100 transition-colors" title="Delete">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>

                {expandedRows[product.id] && (
                  <TableRow className="">
                    <TableCell colSpan={6} className="px-8 py-4">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Created At</div>
                          <div>{product.createdAt ? formatDate(product.createdAt) : 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Updated At</div>
                          <div>{product.updatedAt ? formatDate(product.updatedAt) : 'N/A'}</div>
                        </div>
                        {product.isFlashSale && (
                          <div>
                            <div className="text-sm font-medium text-gray-500">Flash Sale Until</div>
                            <div>{product.flashSaleUntil ? formatDate(product.flashSaleUntil) : 'N/A'}</div>
                          </div>
                        )}
                       
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}