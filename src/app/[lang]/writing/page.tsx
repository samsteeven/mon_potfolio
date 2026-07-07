import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getReadingTime } from "@/lib/reading-time";
import { writingSource, leafSlug } from "@/lib/source";
import { WritingList } from "@/components/writing-list";
import { translations, type Language } from "@/lib/translations";

interface PageProps {
  params: Promise<{ lang: Language }>;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://samensteeve.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang] || translations.en;
  const altLang = lang === "fr" ? "en" : "fr";

  return {
    title: `${t.writing.title} — Samen Steeve`,
    description: t.writing.seoDescription,
    alternates: {
      canonical: `${BASE_URL}/${lang}/writing`,
      languages: {
        [lang]: `${BASE_URL}/${lang}/writing`,
        [altLang]: `${BASE_URL}/${altLang}/writing`,
        "x-default": `${BASE_URL}/en/writing`,
      },
    },
  };
}


export default async function WritingIndexPage({ params }: PageProps) {
  const { lang } = await params;
  const t = translations[lang] || translations.en;

  const items = writingSource
    .getPages()
    .filter((page) => page.data.published && (page.data.lang || "fr") === lang)
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
    .map((page) => {
      const readTime = getReadingTime(
        leafSlug(page.slugs),
        `writing/${page.data.lang || "fr"}`,
        page.data.description
      );

      return {
        url: `/writing/${leafSlug(page.slugs)}`,
        title: page.data.title,
        description: page.data.description,
        date: page.data.date,
        tags: page.data.tags,
        lang: page.data.lang || "fr",
        cover: page.data.cover,
        readTime,
      };
    });

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
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
