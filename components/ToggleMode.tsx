"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes"; // Importing useTheme directly
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

function ToggleMode() {
  const { theme, setTheme } = useTheme(); // Using useTheme directly

  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    <Button
      className="border-none"
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="hover:cursor-pointer hover:text-primary" />
      ) : (
        <Moon className="hover:cursor-pointer hover:text-primary" />
      )}
    </Button>
  );
}

export default ToggleMode;
