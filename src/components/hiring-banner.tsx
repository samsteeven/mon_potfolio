"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { getT, type Language } from "@/lib/translations";

export function HiringBanner({ lang }: { lang: Language }) {
  const t = getT(lang);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative z-50 border-b border-accent/20 bg-accent/10">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-2.5 px-10 py-2 text-center">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-soft sm:text-[11px]">
          {t.hiring.text}
        </p>
        <a
          href="mailto:contact@samensteeve.com"
          className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent underline underline-offset-4 transition hover:opacity-80 sm:text-[11px]"
        >
          {t.hiring.cta}
        </a>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label={t.hiring.close}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-ink-soft transition hover:bg-accent/10 hover:text-accent"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
