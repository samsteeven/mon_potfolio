"use client";

export default function WritingError(
  { reset }: { error: Error & { digest?: string }; reset: () => void }
) {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center justify-center px-6 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Error
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink">
        Could not load articles
      </h1>
      <p className="mt-3 text-ink-soft">
        Something went wrong while loading this page.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-ink px-6 py-2.5 font-mono text-xs uppercase tracking-wide text-paper transition-all duration-300 hover:scale-105 hover:bg-accent active:scale-[0.96]"
      >
        Try again
      </button>
    </main>
  );
}
