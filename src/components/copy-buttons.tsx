"use client";

import { useState } from "react";
import { Link2, Copy, Check } from "lucide-react";

interface CopyButtonsProps {
  /** Full canonical URL of the article */
  url: string;
  /** Pre-formatted shareable text (title + description + tags + url) */
  shareText: string;
  lang: "en" | "fr";
}

interface CopyState {
  link: boolean;
  post: boolean;
}

export function CopyButtons({ url, shareText, lang }: CopyButtonsProps) {
  const [copied, setCopied] = useState<CopyState>({ link: false, post: false });

  const handleCopy = async (type: keyof CopyState, text: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied((prev) => ({ ...prev, [type]: true }));
      setTimeout(
        () => setCopied((prev) => ({ ...prev, [type]: false })),
        2000
      );
    } catch {
      // Clipboard error ignored safely
    }
  };

  const labels = {
    en: { link: "Copy link", post: "Copy post", done: "Copied!" },
    fr: { link: "Copier le lien", post: "Copier le post", done: "Copié !" },
  };
  const l = labels[lang];

  return (
    <div className="flex items-center gap-2 notranslate" translate="no">
      {/* Copy link button */}
      <button
        type="button"
        onClick={() => handleCopy("link", url)}
        title={l.link}
        className={`
          inline-flex items-center gap-1.5
          rounded border px-2.5 py-1
          font-mono text-[10px] uppercase tracking-wider
          transition-all duration-200 cursor-pointer notranslate
          ${
            copied.link
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-line bg-paper-raised/80 text-ink-soft hover:border-accent/30 hover:text-ink hover:bg-paper-raised"
          }
        `}
        translate="no"
      >
        {copied.link ? (
          <Check className="h-3 w-3 shrink-0" />
        ) : (
          <Link2 className="h-3 w-3 shrink-0" />
        )}
        <span className="notranslate" translate="no">
          {copied.link ? l.done : l.link}
        </span>
      </button>

      {/* Copy post button */}
      <button
        type="button"
        onClick={() => handleCopy("post", shareText)}
        title={l.post}
        className={`
          inline-flex items-center gap-1.5
          rounded border px-2.5 py-1
          font-mono text-[10px] uppercase tracking-wider
          transition-all duration-200 cursor-pointer notranslate
          ${
            copied.post
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-line bg-paper-raised/80 text-ink-soft hover:border-accent/30 hover:text-ink hover:bg-paper-raised"
          }
        `}
        translate="no"
      >
        {copied.post ? (
          <Check className="h-3 w-3 shrink-0" />
        ) : (
          <Copy className="h-3 w-3 shrink-0" />
        )}
        <span className="notranslate" translate="no">
          {copied.post ? l.done : l.post}
        </span>
      </button>
    </div>
  );
}

