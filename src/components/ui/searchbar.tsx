import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onClear: () => void;
}
export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit, onClear }) => (
  <div className="relative flex-grow w-full">
    <Input
      placeholder="Cari kategori..."
      value={value}
      onChange={onChange}
      className="pr-16 w-full"
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
    />
    {value && (
      <button
        onClick={onClear}
        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        type="button"
      >
        <XIcon className="h-4 w-4" />
      </button>
    )}
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-1 top-1/2 -translate-y-1/2"
      onClick={onSubmit}
      type="button"
    >
      <SearchIcon className="h-4 w-4" />
    </Button>
  </div>
);
