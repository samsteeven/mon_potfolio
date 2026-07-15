"use client";

import React, { type ReactNode } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  X, 
  ZoomIn, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  AlertOctagon,
  Copy,
  Check
} from "lucide-react";
import { getTextContent } from "@/lib/text";

// Bouton interactif de copie
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md border border-line bg-paper-raised/60 px-2 py-0.5 font-mono text-[9px] text-ink-soft hover:border-accent/40 hover:text-accent hover:bg-paper-raised transition duration-200 cursor-pointer"
      aria-label="Copy code snippet"
    >
      {copied ? (
        <>
          <Check className="h-2.5 w-2.5 text-emerald-500" />
          <span className="text-emerald-500 font-semibold">Copié !</span>
        </>
      ) : (
        <>
          <Copy className="h-2.5 w-2.5" />
          <span>Copier</span>
        </>
      )}
    </button>
  );
}

// Wrapper de bloc pre pour afficher le bouton au survol
export function PreBlock({ children, ...props }: { children: ReactNode } & React.HTMLAttributes<HTMLPreElement>) {
  const codeText = getTextContent(children);
  return (
    <div className="group relative my-6 w-full max-w-full">
      <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10">
        <CopyButton text={codeText} />
      </div>
      <pre
        className="mb-0 w-full max-w-full overflow-x-auto rounded-lg border border-line bg-paper-raised p-4 font-mono text-sm"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

// -------------------------------------------------------------
// COMPOSANT IMAGE INTERACTIVE AVEC LIGHTBOX DE ZOOM PLEIN ÉCRAN
// -------------------------------------------------------------
export function ZoomableImage({ 
  src, 
  alt, 
  priority, 
  ...props 
}: { src: string; alt?: string; priority?: boolean } & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height" | "priority">) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <span 
        className="block group relative my-6 cursor-zoom-in overflow-hidden rounded-lg border border-line bg-paper-raised"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt || ""}
          width={1200}
          height={675}
          priority={priority}
          className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.01]"
          sizes="(max-width: 768px) 100vw, 672px"
          {...props}
        />
        <span className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-black/55 p-2 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-sm">
          <ZoomIn className="h-4 w-4" />
        </span>
      </span>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition duration-200"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            aria-label="Close zoom"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative max-h-[90vh] max-w-[95vw] overflow-hidden rounded-lg" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={src} 
              alt={alt || ""} 
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
            />
          </div>
        </div>
      )}
    </>
  );
}

// -------------------------------------------------------------
// COMPOSANTS MDX RICHES D'ACCENTUATION ET D'ENRICHISSEMENT
// -------------------------------------------------------------

// 1. Callout (Encadrés d'alertes style GitHub/Notion)
export function Callout({ children, type = "info" }: { children: ReactNode; type?: "info" | "warning" | "tip" | "danger" }) {
  const styles = {
    info: "border-accent/25 bg-accent/[0.04] text-ink-soft",
    warning: "border-amber-500/25 bg-amber-500/[0.04] text-ink-soft",
    tip: "border-emerald-500/25 bg-emerald-500/[0.04] text-ink-soft",
    danger: "border-red-500/25 bg-red-500/[0.04] text-ink-soft",
  };
  const iconColor = {
    info: "text-accent",
    warning: "text-amber-600 dark:text-amber-400",
    tip: "text-emerald-600 dark:text-emerald-400",
    danger: "text-red-600 dark:text-red-400",
  };

  return (
    <div className={`my-6 flex gap-4 rounded-xl border p-5 text-sm ${styles[type]}`}>
      <div className={`mt-0.5 shrink-0 ${iconColor[type]}`}>
        {type === "info" && <Info className="h-4.5 w-4.5" />}
        {type === "warning" && <AlertTriangle className="h-4.5 w-4.5" />}
        {type === "tip" && <CheckCircle className="h-4.5 w-4.5" />}
        {type === "danger" && <AlertOctagon className="h-4.5 w-4.5" />}
      </div>
      <div className="leading-relaxed flex-1">{children}</div>
    </div>
  );
}

export function CodeWindow({ children, filename }: { children: ReactNode; filename?: string }) {
  const codeText = getTextContent(children);
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-line bg-paper-raised/40 shadow-sm">
      <div className="flex items-center justify-between border-b border-line bg-paper-raised/60 px-4 py-2 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
          {filename && <span className="ml-3 text-ink-soft/80 font-bold">{filename}</span>}
        </div>
        <CopyButton text={codeText} />
      </div>
      <div className="p-4 overflow-x-auto text-sm leading-relaxed font-mono">
        {children}
      </div>
    </div>
  );
}

// 3. Grille de cartes & Carte unitaire
export function CardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {children}
    </div>
  );
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-paper-raised/35 p-5 shadow-sm hover:bg-paper-raised/60 transition duration-200">
      <h4 className="font-display text-sm font-semibold text-ink">{title}</h4>
      <div className="mt-2 text-xs leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}
