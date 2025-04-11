"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import { MoreVertical } from "lucide-react";
import IconMenu from "@/components/IconMenu";

export default function Home() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert(`Searching for:${query}`);
  };
  return (
    <>
      <h1>Hello world</h1>
      <Button
        label="Click Me"
        backgroundColor="#f0000c"
        textColor="#ffffff"
        onClick={() => alert("Button clicked!")}
      />

      <Button
        label="Click Me"
        backgroundColor="#03e6ff"
        onClick={() => alert("Button clicked!")}
        outline
      />

      <div className="flex">
        <SearchBar
          borderColor="#facc15" // yellow-400
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearchClick={handleSearch}
          placeholder="Search something cool..."
        />

        <IconMenu
          icon={<MoreVertical className="w-5 h-5" />}
          iconColor="#f0000c" // indigo-600
          textColor="#facc15"
          menuItems={[
            { label: "Profile", onClick: () => alert("Profile clicked") },
            { label: "Settings", onClick: () => alert("Settings clicked") },
            { label: "Logout", onClick: () => alert("Logged out") },
          ]}
        />
      </div>
    </>
  );
}
