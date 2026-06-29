"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { translations, type Language } from "@/lib/translations";

export function SiteHeader({ lang }: { lang: Language }) {
  const pathname = usePathname();
  const t = translations[lang] || translations.en;
  const [menuOpen, setMenuOpen] = useState(false);

  const getOppositeLangLink = () => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    const targetLang = lang === "en" ? "fr" : "en";
    segments[1] = targetLang;
    return segments.join("/");
  };

  const oppositeLang = lang === "en" ? "FR" : "EN";

  const navLinks = [
    { href: `/${lang}/#work`, label: t.nav.work },
    { href: `/${lang}/#about`, label: t.nav.about },
    { href: `/${lang}/writing`, label: t.nav.writing },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={`/${lang}`}
          className="font-display text-sm font-semibold tracking-tight text-ink transition hover:opacity-80"
        >
          SAMEN STEEVE<span className="text-accent">.</span>
        </Link>

        {/* Navigation desktop (md+) */}
        <nav className="hidden md:flex items-center gap-5 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 transition-all duration-200 hover:text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <span className="h-3 w-px bg-line mx-0.5" />
          <Link
            href={getOppositeLangLink()}
            className="font-semibold text-ink-soft hover:text-accent transition duration-200"
          >
            {oppositeLang}
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile : boutons droite */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href={getOppositeLangLink()}
            className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft hover:text-accent transition duration-200"
          >
            {oppositeLang}
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="p-1.5 rounded-lg text-ink-soft hover:text-ink hover:bg-paper-raised transition"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-line bg-paper/95 backdrop-blur-md">
          <nav className="mx-auto max-w-3xl flex flex-col px-4 py-3 gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 font-mono text-xs uppercase tracking-wider text-ink-soft hover:text-accent transition border-b border-line/50 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
