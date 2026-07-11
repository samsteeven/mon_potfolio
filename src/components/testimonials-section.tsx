"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface Props {
  items: readonly Testimonial[];
}

const INTERVAL_MS = 5000;

export function TestimonialsSection({ items }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // ── Auto-avance ──────────────────────────────────────────
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
      setTick((t) => t + 1);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, items.length]);

  // ── Scroll local dans la liste (sans bouger la page) ─────
  useEffect(() => {
    const container = containerRef.current;
    const activeEl = itemRefs.current[active];
    if (!container || !activeEl) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const target = activeEl.offsetLeft - (container.clientWidth / 2) + (activeEl.clientWidth / 2);
      container.scrollTo({ left: target, behavior: "smooth" });
    } else {
      const target = activeEl.offsetTop - (container.clientHeight / 2) + (activeEl.clientHeight / 2);
      container.scrollTo({ top: target, behavior: "smooth" });
    }
  }, [active]);

  const handleSelect = useCallback((i: number) => {
    setActive(i);
    setTick((t) => t + 1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPaused(false);
    setTick((t) => t + 1);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      setActive((prev) => diff > 0
        ? (prev + 1) % items.length
        : (prev - 1 + items.length) % items.length
      );
      setTick((t) => t + 1);
    }
    touchStartX.current = null;
  };

  const item = items[active];

  return (
    <div className="mt-12 flex flex-col gap-8 md:flex-row md:gap-16">

      {/* ── Gauche : liste d'auteurs ─────────────────────────── */}
      <div
        ref={containerRef}
        className="no-scrollbar flex flex-row md:flex-col overflow-x-auto md:overflow-x-hidden md:overflow-y-auto gap-2 md:gap-0 pb-2 md:pb-0 md:w-2/5 shrink-0 md:max-h-[16rem] -mx-6 px-6 md:mx-0 md:px-0"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={handleMouseLeave}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >


        {items.map((t, i) => {
          const initials = t.author.split(" ").map((n) => n[0]).join("").toUpperCase();
          const isActive = i === active;

          return (
            <button
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              type="button"
              onClick={() => handleSelect(i)}
              className={`group flex items-center gap-3.5 shrink-0 focus-visible:outline-none transition-all duration-300 overflow-visible
                py-2 pl-3.5 pr-4 rounded-xl
                md:border-b md:border-line/30 md:pl-2.5 md:pr-1 md:py-4 md:w-full md:rounded-none md:bg-transparent
                ${isActive
                  ? "bg-paper-raised/40 opacity-100 md:opacity-100"
                  : "bg-transparent opacity-35 hover:opacity-60"
                }`}
            >
              {/* Avatar */}
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold transition-all duration-300 ${
                isActive ? "bg-accent text-white scale-105" : "bg-paper-raised text-ink-soft"
              }`}>
                {initials}
              </div>

              {/* Infos */}
              <div className="min-w-[110px] md:min-w-0 flex-1 text-left">
                <p className={`text-xs md:text-sm font-semibold leading-none transition-colors ${
                  isActive ? "text-ink" : "text-ink-soft"
                }`}>
                  {t.author}
                </p>
                <p className="mt-1.5 text-[10px] md:text-[11px] leading-tight text-ink-soft/55 truncate">
                  {t.role}{" "}
                  <span className={`font-semibold ${isActive ? "text-accent" : "text-ink-soft/45"}`}>
                    @ {t.company}
                  </span>
                </p>

                {/* Barre de progression (item actif uniquement) */}
                {isActive && (
                  <div className="mt-2.5 h-px w-full overflow-hidden rounded-full bg-line/20">
                    <div
                      key={`pb-${i}-${tick}`}
                      className="h-full rounded-full bg-accent/70"
                      style={{
                        width: "0%",
                        animation: paused ? "none" : `testimonialProgress ${INTERVAL_MS}ms linear forwards`,
                      }}
                    />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Droite : citation ────────────────────────────────── */}
      <div
        className="flex flex-col justify-center md:w-3/5 select-none touch-pan-y"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Guillemet décoratif géant */}
        <div
          className="font-display select-none leading-none text-accent/8 pointer-events-none"
          style={{ fontSize: "clamp(64px, 8vw, 96px)", lineHeight: 1, marginBottom: "-0.1em" }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Citation — key={active} déclenche fade-up */}
        <blockquote key={active} className="fade-up pointer-events-none">
          <p className="font-display text-lg font-medium leading-relaxed text-ink sm:text-2xl">
            {item.quote}
          </p>
          <footer className="mt-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft/40">
              — {item.author}, {item.role} · {item.company}
            </p>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
