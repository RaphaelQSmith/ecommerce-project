"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

const THEME_STORAGE_KEY = "storefront-theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const darkModeEnabled = savedTheme === "dark";
    document.documentElement.classList.toggle("dark", darkModeEnabled);
    setIsDark(darkModeEnabled);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      nextIsDark ? "dark" : "light",
    );
    setIsDark(nextIsDark);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-label="Dark mode"
      aria-checked={isDark}
      onClick={toggleTheme}
      className={`relative inline-flex h-[18px] w-[33px] shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-600 focus-visible:ring-offset-1 ${
        isDark ? "bg-indigo-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`theme-switch-thumb pointer-events-none inline-flex h-[15px] w-[15px] translate-y-[1.5px] items-center justify-center rounded-full bg-white shadow transition-transform ${
          isDark ? "translate-x-[17px]" : "translate-x-px"
        } ${isDark ? "theme-switch-thumb-dark" : ""}`}
      >
        {isDark ? <SunIcon width={9} height={9} /> : <MoonIcon width={9} height={9} />}
      </span>
    </button>
  );
}
