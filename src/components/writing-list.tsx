"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { translations, type Language } from "@/lib/translations";

interface WritingItem {
  url: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  lang: string;
  cover?: string;
  readTime: number;
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

      {/* Liste des posts — image à gauche, contenu à droite */}
      <div className="flex flex-col divide-y divide-line">
        {filtered.map((item, i) => {
          const readLabel = lang === "en" ? `${item.readTime} min read` : `${item.readTime} min de lecture`;

          return (
            <div
              key={item.url}
              style={{ animationDelay: `${i * 60}ms` }}
              className="fade-up group -mx-2 px-2 py-6 transition-all duration-200 rounded-xl hover:bg-paper-raised/50"
            >
              <Link
                href={`/${lang}${item.url}`}
                className="flex items-start gap-5"
              >
                {/* Miniature à gauche */}
                <div className="relative shrink-0 w-32 h-24 sm:w-40 sm:h-28 rounded-xl overflow-hidden border border-line bg-paper-raised">
                  {item.cover ? (
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold text-ink-soft/15 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                {/* Contenu à droite */}
                <div className="flex-1 min-w-0">
                  {/* Date + temps de lecture */}
                  <div className="flex items-center gap-2 mb-1.5 font-mono text-xs text-ink-soft/60">
                    <span>{item.date}</span>
                    <span>·</span>
                    <span className="text-ink-soft/50">{readLabel}</span>
                  </div>

                  {/* Titre */}
                  <h3 className="font-display text-lg font-semibold text-ink group-hover:text-accent transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1.5 text-sm text-ink-soft line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>

              {/* Tags — hors du lien pour éviter l'imbrication <a> dans <a> */}
              {item.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5 pl-32 sm:pl-40">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={(e) => {
                        e.preventDefault();
                        setActive(tag);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActive(tag);
                        }
                      }}
                      className={[
                        "cursor-pointer rounded-full border px-2.5 py-0.5 font-mono text-[10px] transition-colors",
                        active === tag
                          ? "border-accent/40 bg-accent/10 text-accent"
                          : "border-line bg-paper-raised/60 text-ink-soft hover:border-accent/20 hover:text-accent/70",
                      ].join(" ")}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="py-10 text-center font-mono text-xs text-ink-soft">{t.writing.empty}</p>
        )}
      </div>
    </div>
  );
}
