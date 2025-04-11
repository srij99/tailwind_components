"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  backgroundColor?: string; // e.g., "#ffffff" or "rgb(0,0,0)"
  textColor?: string; // e.g., "#333" or "white"
}

const Navbar: React.FC<NavbarProps> = ({
  backgroundColor = "#ffffff",
  textColor = "#1f2937", // default gray-800
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className="shadow-md px-6 py-4 flex justify-between items-center"
      style={{ backgroundColor }}
    >
      <div className="text-2xl font-bold" style={{ color: textColor }}>
        MyApp
      </div>

      <div className="hidden md:flex space-x-6 font-medium">
        <a href="#" style={{ color: textColor }}>
          Home
        </a>
        <a href="#" style={{ color: textColor }}>
          About
        </a>
        <a href="#" style={{ color: textColor }}>
          Logout
        </a>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isOpen ? (
            <X className="w-6 h-6" color={textColor} />
          ) : (
            <Menu className="w-6 h-6" color={textColor} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="absolute top-16 left-0 w-full shadow-md flex flex-col items-center py-4 space-y-4 md:hidden z-50"
          style={{ backgroundColor }}
        >
          <a href="#" className="font-medium" style={{ color: textColor }}>
            Home
          </a>
          <a href="#" className="font-medium" style={{ color: textColor }}>
            About
          </a>
          <a href="#" className="font-medium" style={{ color: textColor }}>
            Logout
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// HOW TO USE

// <Navbar backgroundColor="blue" textColor="white" />
