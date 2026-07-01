"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Lit l'état déjà posé sur <html> par le script anti-flash dans layout.tsx —
    // nécessaire pour éviter un mismatch d'hydratation SSR/client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage indisponible (mode privé, etc.) — on ignore silencieusement
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Changer de thème"
      className="rounded-full border border-line p-1.5 text-ink-soft transition hover:scale-110 hover:border-ink-soft hover:text-ink active:scale-95"
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
    </button>
  );
}
