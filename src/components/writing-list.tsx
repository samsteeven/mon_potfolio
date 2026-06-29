"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { translations, type Language } from "@/lib/translations";

interface WritingItem {
  url: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  lang: string;
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

      {/* Liste des posts */}
      <div className="flex flex-col gap-4">
        {filtered.map((item, i) => {
          const pageLangLabel = item.lang === "en"
            ? (lang === "en" ? "English 🇬🇧" : "Anglais 🇬🇧")
            : (lang === "en" ? "French 🇫🇷" : "Français 🇫🇷");

          return (
            <Link
              key={item.url}
              href={`/${lang}${item.url}`}
              style={{ animationDelay: `${i * 60}ms` }}
              className="fade-up group flex flex-col gap-2 rounded-2xl border border-line bg-paper-raised/20 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-paper-raised hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-base font-semibold transition group-hover:text-accent">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[10px] text-accent/80 border border-accent/20 bg-accent/5 rounded px-1.5 py-0.5">
                    {lang === "en" ? `In ${pageLangLabel}` : `En ${pageLangLabel}`}
                  </span>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-ink-soft">{item.date}</span>
              </div>
              <p className="text-sm text-ink-soft">{item.description}</p>
              {item.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-line bg-paper-raised/60 px-2 py-0.5 font-mono text-[10px] text-ink-soft transition duration-300 group-hover:border-accent/15 group-hover:bg-accent/5 group-hover:text-accent"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <p className="py-10 text-center font-mono text-xs text-ink-soft">{t.writing.empty}</p>
        )}
      </div>
    </div>
  );
}
