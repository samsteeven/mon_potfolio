import type { Language } from "@/lib/translations";

type Status = "shipped" | "in-progress";

const LABELS: Record<Language, Record<Status, string>> = {
  en: { "in-progress": "In progress", shipped: "Shipped" },
  fr: { "in-progress": "En cours", shipped: "Livré" },
};

export function StatusDot({
  status,
  lang,
}: {
  status: Status;
  lang: Language;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={
          status === "in-progress"
            ? "h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
            : "h-1.5 w-1.5 rounded-full bg-ink-soft"
        }
      />
      <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
        {LABELS[lang][status]}
      </span>
    </span>
  );
}