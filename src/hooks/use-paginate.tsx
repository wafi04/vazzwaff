import { useState } from "react";

export const usePaginationState = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handlePageChange = (page : number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (perPage : number) => {
    setPerPage(perPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return {
    currentPage,
    perPage,
    setCurrentPage, // Direct setter also exported for resets
    handlePageChange,
    handlePerPageChange
  };
};