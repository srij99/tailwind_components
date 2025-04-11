"use client";

import React, { useState } from "react";

interface ButtonProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
  onClick?: () => void;
  outline?: boolean;
}

const darkenColor = (color: string, percent: number) => {
  color = color.replace(/^#/, "");
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  r = Math.max(0, Math.floor(r * (1 - percent)));
  g = Math.max(0, Math.floor(g * (1 - percent)));
  b = Math.max(0, Math.floor(b * (1 - percent)));

  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
};

const Button: React.FC<ButtonProps> = ({
  label,
  backgroundColor = "#3b82f6", // blue-500
  textColor = "#ffffff",
  onClick,
  outline = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverBg = outline
    ? `${backgroundColor}20` // 12% opacity for transparent hover
    : darkenColor(backgroundColor, 0.2);

  const currentBg = isHovered
    ? hoverBg
    : outline
    ? "transparent"
    : backgroundColor;

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: currentBg,
        color: outline ? backgroundColor : textColor,
        border: `2px solid ${outline ? backgroundColor : "transparent"}`,
        padding: "0.5rem 1.25rem",
        borderRadius: "0.375rem",
        fontWeight: 500,
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </button>
  );
};

export default Button;

// HOW TO USE

// <Button
//         label="Click Me"
//         backgroundColor="#f0000c"
//         textColor="#ffffff"
//         onClick={() => alert("Button clicked!")}
//       />

//       <Button
//         label="Click Me"
//         backgroundColor="#03e6ff"
//         onClick={() => alert("Button clicked!")}
//         outline
//       />
