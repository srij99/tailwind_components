"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  color?: string; // for border color
  textColor?: string; // optional text color override
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select option",
  color = "#3B82F6", // Tailwind blue-500
  textColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" relative max-w-md" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`
          w-full text-left px-4 py-2 rounded-md flex justify-between items-center 
          backdrop-blur
        `}
        style={{
          border: `2px solid ${color}`,
          color: textColor || undefined,
        }}
      >
        <span>{selected || placeholder}</span>
        {isOpen ? (
          <ChevronUp size={18} className="ml-2 text-inherit" />
        ) : (
          <ChevronDown size={18} className="ml-2 text-inherit" />
        )}
      </button>

      {isOpen && (
        <ul
          className={`
            absolute z-50 w-full mt-2 rounded-md shadow-md 
            backdrop-blur
          `}
          style={{
            border: `2px solid ${color}`,
            color: textColor || undefined,
          }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className={`
                px-4 py-2 hover:bg-gray-100/30 dark:hover:bg-gray-700/30 
                cursor-pointer
              `}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

// HOW TO USE

// const handleDropdownSelect = (value: string) => {
//     alert(`Selected: ${value}`);
//   };

// <Dropdown
//         options={["Option 1", "Option 2", "Option 3"]}
//         onSelect={handleDropdownSelect}
//         placeholder="Choose an option" //optional
//         color="#f0000c" //optional
//         textColor="#03e6ff" //optional
//       />
