"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { translations, type Language } from "@/lib/translations";
import { LanguageFlag } from "@/components/language-flag";

interface WritingItem {
  url: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  lang: string;
  cover?: string;
}

export function WritingList({ items, lang }: { items: WritingItem[]; lang: Language }) {
  const t = translations[lang] || translations.en;

  const tags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => item.tags.forEach((tag) => set.add(tag)));
    return Array.from(set);
  }, [items]);

  const [active, setActive] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = items;
    if (active) {
      result = result.filter((item) => item.tags.includes(active));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return result;
  }, [items, active, searchQuery]);

  return (
    <div>
      {/* Barre de recherche */}
      <div className="relative mb-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-ink-soft">
          <Search className="h-4 w-4" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.writing.searchPlaceholder}
          className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-line bg-paper-raised/40 text-ink placeholder:text-ink-soft/75 focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent/40 transition duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-ink-soft hover:text-ink transition"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActive(null)}
            className={
              active === null
                ? "rounded-full border border-ink bg-ink px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-paper transition"
                : "rounded-full border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition hover:border-ink-soft hover:text-ink"
            }
          >
            {t.writing.all}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className={
                active === tag
                  ? "rounded-full border border-ink bg-ink px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-paper transition"
                  : "rounded-full border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft transition hover:border-ink-soft hover:text-ink"
              }
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Grille des posts — 2 colonnes sur sm+, 1 colonne sur mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {filtered.map((item, i) => {
          const pageLangLabel = item.lang === "en"
            ? (lang === "en" ? "English" : "Anglais")
            : (lang === "en" ? "French" : "Français");

          return (
            <Link
              key={item.url}
              href={`/${lang}${item.url}`}
              style={{ animationDelay: `${i * 60}ms` }}
              className="fade-up group flex flex-col rounded-2xl border border-line bg-paper-raised/20 overflow-hidden transition-all duration-300 hover:border-accent/30 hover:bg-paper-raised hover:shadow-md"
            >
              {/* Image de couverture en haut, pleine largeur */}
              <div className="relative w-full h-44 overflow-hidden bg-paper-raised border-b border-line">
                {item.cover ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="font-mono text-3xl font-bold text-ink-soft/10 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>

              {/* Contenu */}
              <div className="flex flex-col flex-1 gap-3 p-5">
                {/* En-tête : titre + date */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <ArrowUpRight className="shrink-0 mt-0.5 h-4 w-4 text-ink-soft/30 transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>

                {/* Description */}
                <p className="text-sm text-ink-soft line-clamp-2 flex-1">{item.description}</p>

                {/* Footer : badge langue + date */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] text-accent/70 border border-accent/20 bg-accent/5 rounded px-1.5 py-0.5">
                    {pageLangLabel}
                    <LanguageFlag lang={(item.lang as Language) || "fr"} />
                  </span>
                  <div className="flex items-center gap-2">
                    {item.tags.length > 0 && (
                      <span className="font-mono text-[9px] text-ink-soft/50">
                        {item.tags.slice(0, 2).map((t) => `#${t}`).join(" ")}
                        {item.tags.length > 2 && " …"}
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-ink-soft/60">{item.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-2 py-10 text-center font-mono text-xs text-ink-soft">{t.writing.empty}</p>
        )}
      </div>
    </div>
  );
}
