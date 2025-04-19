"use client";
import { useState, useEffect } from "react";
import type { FilterMethod, MethodsData } from "@/schemas/methods";
import { formatDate, FormatPrice } from "@/utils/formatPrice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import TableSkeleton from "@/components/ui/skeleton/table-skeleton";
import { DialogDeleteMethods } from "./dialogMethods";

interface TableMethodProps {
  data: MethodsData[];
  filters: FilterMethod;
  setFilters: (filters: FilterMethod) => void;
  updateFilter: (newFilters: Partial<FilterMethod>) => void;
}

export default function TableMethod({ data }: TableMethodProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);

  const handleDeleteClick = (methodId: number) => {
    setSelectedMethodId(methodId);
    setOpenDelete(true);
  };

  return (
    <>
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
          {data === undefined ? (
            Array(5)
              .fill(0)
              .map((_, index) => <TableSkeleton key={index} index={index} />)
          ) : data.length > 0 ? (
            data.map((method) => (
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
                <TableCell
                  className="hidden md:table-cell max-w-[200px] truncate"
                  title={method.keterangan}
                >
                  {method.keterangan}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {method.tipe}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {FormatPrice(method.min)} -{" "}
                  {method.max && FormatPrice(method.max)}
                </TableCell>
                <TableCell>
                  <Badge variant={method.isActive ? "success" : "destructive"}>
                    {method.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(method.createdAt as string)}
                </TableCell>
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
                      onClick={() => handleDeleteClick(method.id)}
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

      {openDelete && selectedMethodId && (
        <DialogDeleteMethods
          methodId={selectedMethodId}
          open={openDelete}
          setOpen={() => setOpenDelete(false)}
        />
      )}
    </>
  );
}
