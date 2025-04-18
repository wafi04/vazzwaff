"use client"

import { useState, useEffect } from "react"
import type { MethodsData } from "@/schemas/methods"
import { formatDate, FormatPrice } from "@/utils/formatPrice"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { PencilIcon, TrashIcon, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function TableMethod({ data }: { data: MethodsData[] }) {
  const [isLoading, setIsLoading] = useState(true)
  const [paymentMethods, setPaymentMethods] = useState<MethodsData[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setPaymentMethods(data)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [data])

  // Filter methods based on search term
  const filteredMethods = paymentMethods.filter(
    (method) =>
      method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.tipe.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">ID</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Code</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Min-Max</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Skeleton loading rows
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell>
                        <Skeleton className="h-4 w-6" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-4 w-28" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Skeleton className="h-8 w-8" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : filteredMethods.length > 0 ? (
                // Actual data rows
                filteredMethods.map((method) => (
                  <TableRow key={method.id}>
                    <TableCell className="font-medium">{method.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                                    <Image
                                        width={100}
                                        height={100}
                            src={method.images}
                            alt={method.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{method.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{method.code}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-[200px] truncate" title={method.keterangan}>
                      {method.keterangan}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{method.tipe}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {FormatPrice(method.min)} - {method.max && FormatPrice(method.max)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={method.isActive ? "success" : "destructive"}>
                        {method.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(method.createdAt as string)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        >
                          <PencilIcon className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No payment methods found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
      
  )
}
