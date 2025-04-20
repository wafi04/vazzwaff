import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export function TablePagination({
  currentPage,
  perPage,
  totalItems,
  totalPages,
  onPageChange,
  onPerPageChange,
}: TablePaginationProps) {
  // Calculate range of items being displayed
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  // Mobile-optimized pagination renderer
  const renderMobilePagination = () => {
    return (
      <div className="flex items-center justify-between w-full bg-muted/20 rounded-md px-2 py-1">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`p-1 rounded ${
            currentPage <= 1
              ? "text-muted-foreground opacity-50"
              : "text-primary hover:bg-muted"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
        
        <span className="text-xs font-medium">
          Halaman {currentPage} dari {totalPages || 1}
        </span>
        
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`p-1 rounded ${
            currentPage >= totalPages
              ? "text-muted-foreground opacity-50"
              : "text-primary hover:bg-muted"
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  // Desktop pagination renderer with dynamic visible pages
  const renderDesktopPagination = () => {
    const items = [];
    const maxVisiblePages = window.innerWidth < 640 ? 1 : window.innerWidth < 768 ? 3 : 5;
    
    // Calculate start and end pages
    let startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1
      )
    );
    startPage = Math.max(1, startPage);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious 
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} 
        />
      </PaginationItem>
    );

    // First page and ellipsis if needed
    if (startPage > 1) {
      items.push(
        <PaginationItem key="1" className="hidden sm:flex">
          <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
        </PaginationItem>
      );
      
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis1" className="hidden sm:flex">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i} className={i !== currentPage ? "hidden xs:flex" : ""}>
          <PaginationLink 
            isActive={currentPage === i}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis2" className="hidden sm:flex">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key={totalPages} className="hidden sm:flex">
          <PaginationLink onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext 
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} 
        />
      </PaginationItem>
    );

    return (
      <Pagination>
        <PaginationContent>{items}</PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="w-full">
      {/* Ultra-compact view for very small screens */}
      <div className="block sm:hidden">
        <div className="grid grid-cols-1 gap-2">
          {/* Top row: Page info + navigation */}
          {renderMobilePagination()}
          
          {/* Bottom row: Item counts + per page */}
          <div className="flex justify-between items-center text-xs">
            <div className="text-muted-foreground">
              {totalItems > 0 ? (
                <>{startItem}-{endItem}/{totalItems}</>
              ) : (
                <>0 data</>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Select
                value={perPage.toString()}
                onValueChange={(value) => onPerPageChange(parseInt(value))}
              >
                <SelectTrigger className="h-6 w-12 text-xs border-dashed">
                  <SelectValue placeholder={perPage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground">/ hal</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Small screen layout */}
      <div className="hidden sm:block md:hidden">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            
            
            <div className="flex items-center gap-1 justify-between w-full">
              <span className="text-sm text-muted-foreground">Tampilkan</span>
              <Select
                value={perPage.toString()}
                onValueChange={(value) => onPerPageChange(parseInt(value))}
              >
                <SelectTrigger className="h-7 w-14 text-sm">
                  <SelectValue placeholder={perPage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            {renderDesktopPagination()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Medium and large screen layout */}
      <div className="hidden md:flex md:flex-row items-center justify-between gap-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Tampilkan</span>
          <Select
            value={perPage.toString()}
            onValueChange={(value) => onPerPageChange(parseInt(value))}
          >
            <SelectTrigger className="h-8 w-16">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground whitespace-nowrap">per halaman</span>
        </div>

        <div className="text-sm text-muted-foreground w-full">
          {totalItems > 0 ? (
            <>Menampilkan {startItem} - {endItem} dari {totalItems} data</>
          ) : (
            <>Tidak ada data</>
          )}
        </div>

        {renderDesktopPagination()}
      </div>
    </div>
  );
}