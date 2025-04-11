"use client";

import React, { useState, useRef, useEffect } from "react";

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface IconMenuProps {
  icon: React.ReactNode;
  menuItems: MenuItem[];
  iconColor?: string;
  textColor?: string; // text color for menu items
}

const IconMenu: React.FC<IconMenuProps> = ({
  icon,
  menuItems,
  iconColor,
  textColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button onClick={toggleMenu} className="cursor-pointer">
        <span style={{ color: iconColor ?? "inherit" }}>{icon}</span>
      </button>

      {isOpen && (
        <div
          className={`
            absolute right-0 mt-2 w-48 z-50 rounded-md shadow-lg
            backdrop-blur-md bg-white/70 dark:bg-white/10
          `}
        >
          <ul className="py-1">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`
                  px-4 py-2 text-sm cursor-pointer
                  hover:bg-black/10 dark:hover:bg-white/20
                `}
                style={{ color: textColor ?? "inherit" }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IconMenu;

// HOW TO USE

// <IconMenu
//           icon={<MoreVertical className="w-5 h-5" />}
//           iconColor="#f0000c" // icon color - optional
//           textColor="#facc15" // text color of the menu items - optional
//           menuItems={[
//             { label: "Profile", onClick: () => alert("Profile clicked") },
//             { label: "Settings", onClick: () => alert("Settings clicked") },
//             { label: "Logout", onClick: () => alert("Logged out") },
//           ]}
//         />
