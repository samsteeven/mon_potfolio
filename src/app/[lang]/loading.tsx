export default function Loading() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="flex flex-col gap-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-line" />
        <div className="h-4 w-96 animate-pulse rounded-lg bg-line" />
        <div className="h-64 w-full animate-pulse rounded-2xl bg-line" />
        <div className="flex flex-col gap-3">
          <div className="h-4 w-full animate-pulse rounded bg-line" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-line" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-line" />
        </div>
      </div>
    </main>
  );
}
