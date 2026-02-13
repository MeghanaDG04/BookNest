"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative p-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-all duration-300 cursor-pointer"
      aria-label="Toggle theme"
    >
      <Sun className={`w-5 h-5 text-amber-500 transition-all duration-300 ${dark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} />
      <Moon className={`w-5 h-5 text-amber-400 transition-all duration-300 ${dark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`} />
    </button>
  );
}
