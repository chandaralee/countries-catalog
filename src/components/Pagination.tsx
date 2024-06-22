import React from "react";

interface PaginationProps {
  totalCountries: number;
  countriesPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalCountries,
  countriesPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCountries / countriesPerPage);

  return (
    <div className="flex justify-center my-4">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`mx-1 px-3 py-1 ${
            currentPage === index + 1 ? "bg-primary text-white" : "bg-gray-300 hover:bg-secondary"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
