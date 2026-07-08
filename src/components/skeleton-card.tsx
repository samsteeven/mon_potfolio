export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-paper-raised/20 p-6">
      <div className="flex items-center justify-between">
        <div className="h-5 w-40 animate-pulse rounded bg-line" />
        <div className="h-3 w-32 animate-pulse rounded bg-line" />
      </div>
      <div className="h-4 w-full animate-pulse rounded bg-line" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-line" />
      <div className="flex items-center justify-between pt-3">
        <div className="flex gap-2">
          <div className="h-5 w-16 animate-pulse rounded-full bg-line" />
          <div className="h-5 w-20 animate-pulse rounded-full bg-line" />
        </div>
        <div className="h-3 w-24 animate-pulse rounded bg-line" />
      </div>
    </div>
  );
}
