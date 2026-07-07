"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { translations, type Language } from "@/lib/translations";

export function SiteHeader({ lang }: { lang: Language }) {
  const pathname = usePathname();
  const t = translations[lang] || translations.en;
  const isHome = pathname === `/${lang}`;
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Scroll spy sur les sections ancrées de la home (#work, #about)
  useEffect(() => {
    if (!isHome) return;

    const sections = ["about", "work"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome, lang]);

  const getOppositeLangLink = () => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    const targetLang = lang === "en" ? "fr" : "en";
    segments[1] = targetLang;
    // Avec les sous-dossiers content/writing/{en,fr}/, le slug d'article est
    // identique dans les deux langues : il suffit de permuter le segment de langue.
    return segments.join("/");
  };

  const oppositeLang = lang === "en" ? "FR" : "EN";

  const navLinks = [
    { href: `/${lang}/#work`, label: t.nav.work, key: "work" as const },
    { href: `/${lang}/#about`, label: t.nav.about, key: "about" as const },
    { href: `/${lang}/writing`, label: t.nav.writing, key: "writing" as const },
  ];

  // Section active uniquement sur la home (dérivée — pas de setState synchrone)
  const section = isHome ? activeSection : null;

  // aria-current par lien : "page" pour /writing, "true" pour ancres sur home
  const ariaCurrentOf = (linkKey: "work" | "about" | "writing") => {
    if (linkKey === "writing") {
      return pathname.startsWith(`/${lang}/writing`) ? "page" : undefined;
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
          {/* Photo de profil (Avatar) */}
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-line bg-paper-raised/80 shadow-sm transition-all duration-300 group-hover:border-accent/40 group-hover:scale-105">
            <Image
              src="/profil.png"
              alt="Samen Steeve"
              width={32}
              height={32}
              className="h-full w-full object-cover object-[center_15%]"
              priority
            />
          </div>
          {/* Nom - Masqué sur mobile, visible sur tablette et plus (sm+) */}
          <span
            className="hidden sm:inline font-display text-sm font-extrabold tracking-tight text-ink"
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
              aria-current={ariaCurrentOf(link.key)}
              className="relative py-1 transition-all duration-200 hover:text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full aria-[current=page]:text-accent aria-[current=page]:after:w-full aria-[current=true]:text-accent aria-[current=true]:after:w-full"
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
