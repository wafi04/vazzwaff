import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { FilterIcon, PlusIcon} from "lucide-react";
import DialogSubCategory from "./dialogSubCategory";
import { useFilterCategory } from "../../category/api/server";
import { SearchBar } from "@/components/ui/searchbar";
import { StatusFilter } from "@/components/ui/statusFilter";
import { HeaderSection } from "@/components/layouts/header-dashboard";
import { MobileFilters } from "./mobile-filter";
import { CategoriesData } from "@/schemas/category";
import { CategoryFilter } from "../../category/_components/category-filter";


interface HeaderSubCategoryProps {
  onStatusChange: (status: string) => void;
  onSearchChange: (term: string) => void;
  onCategoryChange: (categoryId: number) => void;
}

export const HeaderSubCategory: React.FC<HeaderSubCategoryProps> = ({
  onSearchChange,
  onStatusChange,
  onCategoryChange
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("active");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const { data: categoryData, isLoading: loadingCategories } = useFilterCategory({
    all: "all"
  });
  
  const categories: CategoriesData[] = categoryData?.data?.categories || [];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (): void => {
    onSearchChange(searchInput);
  };

  const handleStatusChange = (value: string): void => {
    setSelectedStatus(value);
    onStatusChange(value);
  };

  const handleCategoryChange = (value: string): void => {
    setSelectedCategory(value);
    onCategoryChange(Number(value));
  };

  const handleClearSearch = (): void => {
    setSearchInput("");
    onSearchChange("");
  };

  return (
    <section className="w-full space-y-4">
      {/* Title and Add Button Row */}
      <HeaderSection title="Sub Category">
         <DialogSubCategory>
          <Button className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Tambah</span>
          </Button>
        </DialogSubCategory>
      </HeaderSection>
      
      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {/* Search input - takes more space on larger screens */}
        <SearchBar 
          value={searchInput}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
          onClear={handleClearSearch}
        />

        {/* Desktop Filters */}
        <div className="hidden sm:flex gap-3">
          <CategoryFilter 
            value={selectedCategory} 
            onChange={handleCategoryChange} 
            categories={categories}
            isLoading={loadingCategories} 
          />

          <StatusFilter 
            value={selectedStatus} 
            onChange={handleStatusChange} 
          />
        </div>

        {/* Mobile Filter Button */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Apply filters to refine your subcategories
                </SheetDescription>
              </SheetHeader>
              <MobileFilters 
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
                selectedStatus={selectedStatus}
                handleStatusChange={handleStatusChange}
                categories={categories}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};