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
    // segments[1] contains the current language code (e.g. "en" or "fr")
    const targetLang = lang === "en" ? "fr" : "en";
    segments[1] = targetLang;
    return segments.join("/");
  };

  const oppositeLang = lang === "en" ? "FR" : "EN";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href={`/${lang}`} className="font-display text-sm font-semibold tracking-tight text-ink transition hover:opacity-80">
          Samen Steeve<span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
          <Link
            href={`/${lang}/#work`}
            className="relative py-1 transition-all duration-200 hover:text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
          >
            {t.nav.work}
          </Link>
          <Link
            href={`/${lang}/#about`}
            className="relative py-1 transition-all duration-200 hover:text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
          >
            {t.nav.about}
          </Link>
          <Link
            href={`/${lang}/writing`}
            className="relative py-1 transition-all duration-200 hover:text-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
          >
            {t.nav.writing}
          </Link>

          <span className="h-3 w-px bg-line mx-0.5" />

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
