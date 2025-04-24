import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/searchbar";
import { StatusFilter } from "@/components/ui/statusFilter";
import { FilterIcon } from "lucide-react";
import React, { useState } from "react";


interface HeaderProductProps {
  onSearchChange: (term: string) => void
  onActiveChange: (active : string)  => void
}
export default function HeaderProduct({ onSearchChange,onActiveChange }: HeaderProductProps) {
  const [searchInput, setSearchInput] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("active");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (): void => {
    onSearchChange(searchInput);
  };
  const handleClearSearch = (): void => {
    setSearchInput("");
    onSearchChange("");
  };
  const handleStatusChange = (value: string): void => {
    setSelectedStatus(value);
    onActiveChange(value);
  };

    return (
        <section className="py-5 flex justify-between gap-5 items-center mx-auto">
          <h1 className="text-2xl md:text-2xl font-semibold ">Product </h1>
          <div className="max-w-md flex gap-4">
              <SearchBar onChange={handleSearchChange} onClear={handleClearSearch} onSubmit={handleSearchSubmit} value={searchInput} />
              <StatusFilter onChange={handleStatusChange} value={selectedStatus} />         
              <Button className="md:hidden  bg-yellow-500 text-white hover:bg-yellow-600">
                <FilterIcon />
              </Button>  
        </div>
        </section>
    )
}