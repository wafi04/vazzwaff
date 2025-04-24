import { CategoriesData } from "@/schemas/category";
import { StatusFilter } from "@/components/ui/statusFilter";
import { CategoryFilter } from "../../category/_components/category-filter";

interface MobileFiltersProps {
  selectedCategory: string | undefined;
  handleCategoryChange: (value: string) => void;
  selectedStatus: string;
  handleStatusChange: (value: string) => void;
  categories: CategoriesData[];
}

export const MobileFilters: React.FC<MobileFiltersProps> = ({ 
  selectedCategory, 
  handleCategoryChange, 
  selectedStatus, 
  handleStatusChange, 
  categories 
}) => (
  <div className="space-y-4 py-4">
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Category</h4>
      <CategoryFilter 
        value={selectedCategory} 
        onChange={handleCategoryChange} 
        categories={categories} 
      />
    </div>

    <div className="space-y-2">
      <h4 className="text-sm font-medium">Status</h4>
      <StatusFilter 
        value={selectedStatus} 
        onChange={handleStatusChange} 
      />
    </div>
  </div>
);
