"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { getT, type Language } from "@/lib/translations";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { getOppositeUrl } from "@/hooks/use-language-switch";

export function SiteHeader({ lang }: { lang: Language }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const t = getT(lang);
  const isHome = pathname === "/" || pathname === `/${lang}`;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const activeSection = useScrollSpy(["about", "work"], [isHome]);
  const section = isHome ? activeSection : null;

  const oppositeLang = t.nav.opposite;

  const navLinks = [
    { href: `/${lang}/#about`, label: t.nav.about, key: "about" as const },
    { href: `https://services.samensteeve.com/${lang}`, label: t.nav.services, key: "services" as const },
    { href: `/${lang}/writing`, label: t.nav.writing, key: "writing" as const },
  ];

  const ariaCurrentOf = (linkKey: "services" | "about" | "writing") => {
    if (linkKey === "writing") {
      return pathname.startsWith(`/${lang}/writing`) || pathname.startsWith("/writing") ? "page" : undefined;
    }
    if (linkKey === "services") {
      return undefined;
    }
    return section === linkKey ? "true" : undefined;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Logo / Section Profil */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2.5 transition-all duration-200 hover:opacity-85 group shrink-0"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-line bg-paper-raised/80 shadow-sm transition-all duration-300 group-hover:border-accent/40 group-hover:scale-105">
            <Image
              src="/profile/profil.png"
              alt="Samen Steeve"
              width={32}
              height={32}
              className="h-full w-full object-cover object-[center_15%]"
              priority
            />
          </div>
          <span className="hidden sm:inline font-display text-sm font-extrabold tracking-tight text-ink">
            SAMEN STEEVE<span className="text-accent">.</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-5 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={ariaCurrentOf(link.key)}
              className="relative py-1 transition-all duration-200 hover:text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full aria-[current=page]:text-accent aria-[current=page]:after:w-full aria-[current=true]:text-accent aria-[current=true]:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <span className="h-3 w-px bg-line/60" />
          <Link
            href={getOppositeUrl(pathname, lang, hash)}
            scroll={false}
            className="flex items-center gap-1.5 font-semibold text-ink-soft hover:text-accent transition duration-200"
            aria-label={oppositeLang === "EN" ? "Switch to English" : "Passer en Français"}
          >
            {oppositeLang === "EN" ? (
              <svg viewBox="0 0 60 40" className="h-4 w-6 rounded-sm shadow-sm">
                <rect width="60" height="40" fill="#012169" />
                <path d="M0 0l60 40m0-40L0 40" stroke="#FFF" strokeWidth="6" />
                <path d="M0 0l60 40m0-40L0 40" stroke="#C8102E" strokeWidth="2" />
                <path d="M30 0v40M0 20h60" stroke="#FFF" strokeWidth="6" />
                <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="2" />
              </svg>
            ) : (
              <svg viewBox="0 0 60 40" className="h-4 w-6 rounded-sm shadow-sm">
                <rect width="60" height="40" fill="#ED2939" />
                <rect x="20" width="20" height="40" fill="#FFF" />
                <rect x="40" width="20" height="40" fill="#002395" />
              </svg>
            )}
          </Link>
          <ThemeToggle />
        </nav>

      </div>
    </header>
  );
}