"use client"

import type React from "react"
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { DialogCreateCategory } from "./dialogCategory"
import { DialogDeleteCategory } from "./dialogDelete"
import { CategoriesData } from "@/schemas/category"

interface CategoryRowProps {
  category: CategoriesData
  index: number
  currentPage: number
  perPage: number
  isExpanded: boolean
  onToggleExpand: () => void
}

export function CategoryRow({ category, index, currentPage, perPage, isExpanded, onToggleExpand }: CategoryRowProps) {
  return (
    <TableRow className="cursor-pointer hover:bg-muted/50" onClick={onToggleExpand}>
      <TableCell className="font-medium">{(currentPage - 1) * perPage + index + 1}</TableCell>
      <TableCell>
        <Avatar className="h-8 w-8">
          <AvatarImage src={category.logo || "/placeholder.svg"} alt={category.name} />
          <AvatarFallback>{category.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="font-medium">{category.name}</TableCell>
      <TableCell className="hidden md:table-cell">
        <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{category.code}</span>
      </TableCell>
      <TableCell className="hidden lg:table-cell max-w-xs">
        <span className="text-sm line-clamp-1">{category.subName}</span>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge variant="outline" className="font-normal">
          {category.type}
        </Badge>
      </TableCell>
      <TableCell>
        <StatusBadge status={category.status} />
      </TableCell>
      <TableCell className="text-right">
        <CategoryActions category={category} />
      </TableCell>
    </TableRow>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant={status === "active" ? "default" : "secondary"}
      className={
        status === "active"
          ? "bg-green-100 text-green-800 hover:bg-green-100"
          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
      }
    >
      {status === "active" ? "Aktif" : "Tidak Aktif"}
    </Badge>
  )
}

function CategoryActions({ category }: { category: CategoriesData }) {
  // Stop propagation to prevent row toggle when clicking action buttons
  const handleClick = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <div className="flex justify-end gap-2">
      <Button variant="ghost" size="icon" title="Lihat" onClick={handleClick}>
        <Eye className="h-4 w-4" />
      </Button>
      <DialogCreateCategory initialData={category}>
        <Button variant="ghost" size="icon" title="Edit" onClick={handleClick}>
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogCreateCategory>
      <DialogDeleteCategory id={category.id}>
        <Button variant="ghost" size="icon" title="Hapus" onClick={handleClick}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogDeleteCategory>
    </div>
  )
}
