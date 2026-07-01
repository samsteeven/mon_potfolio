"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { translations, type Language } from "@/lib/translations";

export function SiteHeader({ lang }: { lang: Language }) {
  const pathname = usePathname();
  const t = translations[lang] || translations.en;

  const getOppositeLangLink = () => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    const targetLang = lang === "en" ? "fr" : "en";
    segments[1] = targetLang;

    // Si c'est un article de blog (/writing/[slug])
    if (segments[2] === "writing" && segments[3]) {
      let slug = segments[3];
      if (targetLang === "en") {
        if (!slug.endsWith("-en")) slug = `${slug}-en`;
      } else {
        if (slug.endsWith("-en")) slug = slug.slice(0, -3);
      }
      segments[3] = slug;
    }

    return segments.join("/");
  };

  const oppositeLang = lang === "en" ? "FR" : "EN";

  const navLinks = [
    { href: `/${lang}/#work`, label: t.nav.work },
    { href: `/${lang}/#about`, label: t.nav.about },
    { href: `/${lang}/writing`, label: t.nav.writing },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Logo / Section Profil */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2.5 transition-all duration-200 hover:opacity-85 group shrink-0"
        >
          {/* Photo de profil (Avatar) */}
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-line bg-paper-raised/80 shadow-sm transition-all duration-300 group-hover:border-accent/40 group-hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profil.png"
              alt="Samen Steeve"
              className="h-full w-full object-cover object-[center_15%]"
            />
          </div>
          {/* Nom - Masqué sur mobile, visible sur tablette et plus (sm+) */}
          <span
            className="hidden sm:inline font-display text-sm font-extrabold tracking-tight text-ink"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            SAMEN STEEVE<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Navigation en ligne globale (aucun menu hamburger, s'intègre parfaitement partout) */}
        <nav className="flex items-center gap-4 sm:gap-5 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 transition-all duration-200 hover:text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <span className="h-3 w-px bg-line/60" />
          <Link
            href={getOppositeLangLink()}
            className="font-semibold text-ink-soft hover:text-accent transition duration-200"
          >
            {oppositeLang}
          </Link>
          <ThemeToggle />
        </nav>

      </div>
    </header>
  );
}
