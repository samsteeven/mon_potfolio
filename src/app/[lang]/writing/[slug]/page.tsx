import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { writingSource } from "@/lib/source";
import { getMDXComponents } from "@/components/mdx/mdx-components";
import { translations, type Language } from "@/lib/translations";
import { TableOfContents, type TocItem } from "@/components/table-of-contents";
import { LanguageFlag } from "@/components/language-flag";

interface PageProps {
  params: Promise<{ lang: Language; slug: string }>;
}

export function generateStaticParams() {
  const pages = writingSource.getPages();
  const params: { lang: string; slug: string }[] = [];
  for (const page of pages) {
    params.push({ lang: "en", slug: page.slugs[0] });
    params.push({ lang: "fr", slug: page.slugs[0] });
  }
  return params;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://samensteeve.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = writingSource.getPage([slug]);
  if (!page) return {};

  const canonicalUrl = `${BASE_URL}/${lang}/writing/${slug}`;
  const altLang = lang === "fr" ? "en" : "fr";
  const ogImage = page.data.cover || "/profil.png";

  return {
    title: `${page.data.title} — Samen Steeve`,
    description: page.data.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        [lang]: canonicalUrl,
        [altLang]: `${BASE_URL}/${altLang}/writing/${slug}`,
        "x-default": `${BASE_URL}/en/writing/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: page.data.title,
      description: page.data.description,
      url: canonicalUrl,
      siteName: "Samen Steeve",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: [ogImage],
    },
  };
}


export default async function WritingPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const page = writingSource.getPage([slug]);
  if (!page) notFound();

  const t = translations[lang] || translations.en;
  const MDX = page.data.body;

  const postLangLabel =
    page.data.lang === "en"
      ? lang === "en"
        ? "English"
        : "Anglais"
      : lang === "en"
        ? "French"
        : "Français";

  // Extraction des headings depuis le TOC généré par Fumadocs
  const tocItems: TocItem[] = (page.data.toc ?? [])
    .filter((item) => item.depth === 2 || item.depth === 3)
    .map((item) => ({
      id: item.url.replace(/^#/, ""),
      title: item.title,
      depth: item.depth,
    }));

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href={`/${lang}/writing`}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-soft transition-all duration-200 hover:text-accent hover:-translate-x-0.5"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t.details.back}
      </Link>

      {/* Image de couverture optionnelle */}
      {page.data.cover && (
        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={page.data.cover}
            alt={page.data.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-line/20" />
        </div>
      )}

      <header className={`mb-12 border-b border-line pb-8 ${page.data.cover ? "mt-8" : "mt-8"}`}>
        <div className="flex items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
            {page.data.date}
          </p>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-accent/80 border border-accent/20 bg-accent/5 rounded px-1.5 py-0.5">
            <span>
              {lang === "en" ? `Post in ${postLangLabel}` : `Rédigé en ${postLangLabel}`}
            </span>
            <LanguageFlag lang={page.data.lang || "fr"} />
          </span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {page.data.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {page.data.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {page.data.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded border border-line bg-paper-raised/80 px-2.5 py-0.5 font-mono text-[10px] text-ink-soft"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Layout relatif pour le TOC absolu à droite */}
      <div className="relative">
        <article className="prose-headings:font-display prose-a:text-accent">
          <MDX components={getMDXComponents()} />
        </article>
        <TableOfContents items={tocItems} lang={lang} />
      </div>
    </main>
  );
}
