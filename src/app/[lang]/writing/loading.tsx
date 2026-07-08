import { SkeletonCard } from "@/components/skeleton-card";

export default function WritingLoading() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-line" />
      <div className="mt-8 flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </main>
  );
}
