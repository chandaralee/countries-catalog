import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder=""
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className=" outline-none border p-2 w-full mb-4 hover:bg-secondary focus:bg-secondary focus:border-primary"
    />
  );
};

export default SearchBar;
