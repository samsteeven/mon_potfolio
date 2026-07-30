"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);

    document.documentElement.classList.add("theme-transition");
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");

    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage indisponible
    }

    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 250);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Changer de thème"
      className={`relative rounded-full border p-1.5 transition-all duration-200 hover:scale-110 active:scale-[0.96] ${
        isDark
          ? "border-accent/30 text-ink bg-accent/5 hover:border-accent/60"
          : "border-line text-ink-soft hover:border-ink-soft hover:text-ink"
      }`}
    >
      <span className="relative block h-3.5 w-3.5">
        <Sun
          className="absolute inset-0 h-3.5 w-3.5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.25)",
          }}
        />
        <Moon
          className="absolute inset-0 h-3.5 w-3.5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? "rotate(-90deg) scale(0.25)" : "rotate(0deg) scale(1)",
          }}
        />
      </span>
    </button>
  );
}