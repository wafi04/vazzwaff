"use client";

import { useEffect, useState } from "react";

export const useFilterState = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleSearchChange = (term : string) => {
    setSearchTerm(term);
  };

  const handleTypeChange = (type : string | undefined) => {
    setTypeFilter(type);
  };

  const handleStatusChange = (status : string | undefined) => {
    setStatusFilter(status);
  };

  return {
    searchTerm,
    debouncedSearchTerm,
    typeFilter,
    statusFilter,
    handleSearchChange,
    handleTypeChange,
    handleStatusChange
  };
};