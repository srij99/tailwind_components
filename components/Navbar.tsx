"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

interface NavbarProps {
  backgroundColor?: string; // e.g., "#ffffff" or "rgb(0,0,0)"
  textColor?: string; // e.g., "#333" or "white"
}

const Navbar: React.FC<NavbarProps> = ({
  backgroundColor = "#ffffff",
  textColor = "#1f2937", // default gray-800
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Toggle menu for mobile view
  const toggleMenu = () => setIsOpen(!isOpen);

  // Toggle the dark/light mode
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  // Check localStorage to set theme on initial load
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  return (
    <nav
      className="shadow-md px-6 py-4 flex justify-between items-center"
      style={{ backgroundColor }}
    >
      <div className="flex items-center space-x-4">
        {/* App name */}
        <div className="text-2xl font-bold" style={{ color: textColor }}>
          MyApp
        </div>
      </div>

      <div className="hidden md:flex space-x-6 font-medium">
        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="px-3"
          style={{ color: textColor }}
        >
          {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

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
        <button
          onClick={toggleTheme}
          className="px-6"
          style={{ color: textColor }}
        >
          {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
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

// FOR DARK MODE CHANGE GLOBAL.CSS

// REMOVE:
// @media (prefers-color-scheme: dark) {
//   :root {
//     --background: #0a0a0a;
//     --foreground: #ededed;
//   }
// }

// WITH:
// .dark {
//   --background: #0a0a0a;
//   --foreground: #ededed;
// }
