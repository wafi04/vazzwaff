import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoriesData } from "@/schemas/category";

interface CategoryFilterProps {
  value: string | undefined;
  onChange: (value: string) => void;
  categories: CategoriesData[];
  isLoading?: boolean;
}
export const CategoryFilter: React.FC<CategoryFilterProps> = ({ value, onChange, categories, isLoading }) => (
  <Select onValueChange={onChange} value={value}>
    <SelectTrigger className="min-w-[180px]">
      <SelectValue placeholder="Select Category" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="0">All Categories</SelectItem>
      {categories?.map((category) => (
        <SelectItem key={category.id} value={category.id.toString()}>
          {category.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);