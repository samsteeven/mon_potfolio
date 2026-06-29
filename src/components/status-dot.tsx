type Status = "shipped" | "in-progress";

const LABELS: Record<Status, string> = {
  "in-progress": "En cours",
  shipped: "Livré",
};

export function StatusDot({ status }: { status: Status }) {
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
        {LABELS[status]}
      </span>
    </span>
  );
}
