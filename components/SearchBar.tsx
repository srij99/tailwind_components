"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  borderColor?: string; // e.g., "#3b82f6"
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick?: () => void; // new function prop
}

const SearchBar: React.FC<SearchBarProps> = ({
  borderColor = "#3b82f6",
  placeholder = "Search...",
  value,
  onChange,
  onSearchClick,
}) => {
  return (
    <div
      className="flex items-center px-4 py-2 rounded-md backdrop-blur-sm w-full max-w-md"
      style={{
        border: `2px solid ${borderColor}`,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-transparent focus:outline-none text-sm w-full placeholder-gray-300"
        style={{ color: "inherit" }}
      />
      <button onClick={onSearchClick} className="ml-2 cursor-pointer">
        <Search className="w-5 h-5" color={borderColor} />
      </button>
    </div>
  );
};

export default SearchBar;

// HOW TO USE

// const [query, setQuery] = useState("");

//   const handleSearch = () => {
//     alert(`Searching for:${query}`);
//   };

//     <SearchBar
//           borderColor="#facc15" // yellow-400
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onSearchClick={handleSearch}
//           placeholder="Search something cool..."
//     />
