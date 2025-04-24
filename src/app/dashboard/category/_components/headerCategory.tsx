import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterIcon, PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogCreateCategory } from "./dialogCategory";
import { dataCategoryType } from "@/data/data-category";
import { SearchBar } from "@/components/ui/searchbar";
import { StatusFilter } from "@/components/ui/statusFilter";

export function HeaderCategory({
  onSearchChange,
  onTypeChange,
  onStatusChange,
}: {
  onSearchChange: (term: string) => void;
  onTypeChange: (type: string | undefined) => void;
  onStatusChange: (status: string | undefined) => void;
}) {
  const [searchInput, setSearchInput] = useState("");
  const [activeTypeFilter, setActiveTypeFilter] = useState<string | undefined>(
    undefined
  );
  const [activeStatusFilter, setActiveStatusFilter] = useState<
    string | undefined
  >(undefined);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearchChange(searchInput);
  };

  const handleTypeSelect = (type: string | undefined) => {
    setActiveTypeFilter(type);
    onTypeChange(type);
  };

  const handleStatusSelect = (status: string | undefined) => {
    setActiveStatusFilter(status);
    onStatusChange(status);
  };
  const handleClearSearch = () => {
    setSearchInput("");
    onSearchChange("");
  };

  return (
    <section className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 mb-6">
      <h1 className="text-2xl font-bold text-card-foreground">Categories</h1>
      <div className="flex flex-row items-start md:items-center gap-4 w-full md:w-auto">
        {/* Search input with button */}
        <SearchBar onChange={handleSearchChange} onClear={handleClearSearch} onSubmit={handleSearchSubmit} value={searchInput} />

        {/* Type filter dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={activeTypeFilter ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-2"
            >
              <FilterIcon className="h-4 w-4" />
              <span>{activeTypeFilter || "Tipe"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleTypeSelect(undefined)}>
              Semua Tipe
            </DropdownMenuItem>
            {
              dataCategoryType.map((cat) => (
            <DropdownMenuItem key={cat.type} onClick={() => handleTypeSelect(cat.type)}>
              {cat.name}
            </DropdownMenuItem>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
        <StatusFilter onChange={handleStatusSelect} value={activeStatusFilter ?? "active"} />
        <DialogCreateCategory>
          <Button className="flex items-center gap-2 h-8">
            <PlusIcon className="h-3 w-3" />
            <span className="hidden md:inline">Tambah Kategori</span>
          </Button>
        </DialogCreateCategory>
      </div>
    </section>
  );
}
