import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getWritingPages } from "@/lib/source";
import { WritingList } from "@/components/writing-list";
import { getT, type Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ lang: Language }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = getT(lang);
  return createPageMetadata({
    lang,
    title: t.writing.title,
    description: t.writing.seoDescription,
    path: "/writing",
  });
}


export default async function WritingIndexPage({ params }: PageProps) {
  const { lang } = await params;
  const t = getT(lang);

  const items = getWritingPages(lang);

  return (
    <main id="main-content" className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href={`/${lang}`}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-soft transition-all duration-200 hover:text-accent hover:-translate-x-0.5"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t.details.back}
      </Link>

      <h1 className="fade-up mt-8 mb-10 font-display text-3xl font-bold tracking-tight">{t.writing.title}</h1>

      <WritingList items={items} lang={lang} />
    </main>
  );
}
