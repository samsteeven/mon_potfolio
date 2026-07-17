"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { getT, type Language } from "@/lib/translations";

export interface TocItem {
  id: string;
  title: ReactNode;
  depth: number; // 2 = h2, 3 = h3
}

interface TableOfContentsProps {
  items: TocItem[];
  lang: Language;
}

export function TableOfContents({ items, lang }: TableOfContentsProps) {
  const t = getT(lang);
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const headingElements = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "0px 0px -60% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const contentLabel = t.toc.contents;
  const menuLabel = t.toc.onThisPage;

  const renderItems = () => (
    <ul className="space-y-1.5">
      {items.map((item) => {
        const isActive = activeId === item.id;
        const indent = item.depth === 3 ? "pl-3" : "pl-0";

        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={[
                "block rounded-md py-1 px-3 mx-1.5 font-sans text-[13px] leading-snug transition-all duration-200",
                isActive
                  ? "text-accent font-semibold bg-accent/5"
                  : "text-ink-soft hover:bg-paper-raised/40 hover:text-ink",
              ].join(" ")}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveId(item.id);
              }}
            >
              <span className={`block ${indent}`}>{item.title}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Version desktop : aside sticky à droite (xl+) */}
      <aside className="absolute top-0 -right-72 hidden h-full w-60 xl:block">
        <div className="sticky top-24 flex max-h-[calc(100vh-8rem)] flex-col gap-2 overflow-hidden">
          <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-line bg-paper/80 p-4 shadow-sm backdrop-blur-sm">
            <nav>
              <h4 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                {contentLabel}
              </h4>
              {renderItems()}
            </nav>
          </div>
        </div>
      </aside>

      {/* Version mobile / tablette : <details> repliable sous le titre */}
      <details className="group mb-8 rounded-xl border border-line bg-paper/80 p-4 shadow-sm backdrop-blur-sm xl:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[11px] uppercase tracking-widest text-ink-soft hover:text-ink transition-colors">
          <span>{menuLabel}</span>
          <span className="text-ink-soft transition-transform duration-200 group-open:rotate-180">▾</span>
        </summary>
        <nav className="mt-4">{renderItems()}</nav>
      </details>
    </>
  );
}