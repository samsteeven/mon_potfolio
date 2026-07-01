"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ThemeWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const isDark =
        stored === "dark" ||
        (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
      
      document.documentElement.classList.toggle("dark", isDark);
    } catch {
      // Ignored
    }
  }, [pathname]);

  return null;
}
