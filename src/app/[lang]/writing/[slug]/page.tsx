import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";
import { writingSource } from "@/lib/source";
import { getMDXComponents } from "@/components/mdx/mdx-components";
import { translations, type Language } from "@/lib/translations";
import { TableOfContents, type TocItem } from "@/components/table-of-contents";
import { CopyButtons } from "@/components/copy-buttons";

interface PageProps {
  params: Promise<{ lang: Language; slug: string }>;
}

export function generateStaticParams() {
  const pages = writingSource.getPages();
  return pages.map((page) => ({
    lang: page.data.lang || "fr",
    slug: page.slugs[0],
  }));
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://samensteeve.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = writingSource.getPage([slug]);
  if (!page || !page.data.published || (page.data.lang || "fr") !== lang) return {};

  const canonicalUrl = `${BASE_URL}/${lang}/writing/${slug}`;
  const altLang = lang === "fr" ? "en" : "fr";
  const altSlug = lang === "fr" ? `${slug}-en` : (slug.endsWith("-en") ? slug.slice(0, -3) : slug);
  const altUrl = `${BASE_URL}/${altLang}/writing/${altSlug}`;
  const ogImage = page.data.cover || "/profil.png";

  return {
    title: `${page.data.title} — Samen Steeve`,
    description: page.data.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        [lang]: canonicalUrl,
        [altLang]: altUrl,
        "x-default": `${BASE_URL}/en/writing/${lang === "fr" ? `${slug}-en` : slug}`,
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
  if (!page || !page.data.published || (page.data.lang || "fr") !== lang) notFound();

  const t = translations[lang] || translations.en;
  const MDX = page.data.body;

  // Build canonical URL and shareable text (full post content) for copy buttons
  const canonicalUrl = `${BASE_URL}/${lang}/writing/${slug}`;
  
  let bodyText = "";
  try {
    const filePath = join(process.cwd(), "src/content/writing", `${slug}.mdx`);
    const rawMdx = readFileSync(filePath, "utf-8");
    const parts = rawMdx.split("---");
    bodyText = parts.length > 2 ? parts.slice(2).join("---").trim() : rawMdx.trim();
  } catch (error) {
    console.error("Failed to read raw MDX content for sharing:", error);
    bodyText = page.data.description; // fallback if file reading fails
  }

  const shareText = [
    page.data.title,
    "",
    bodyText,
    "",
    page.data.tags.map((t: string) => `#${t}`).join(" "),
    "",
    lang === "en" ? `Read online:` : `Lire en ligne :`,
    canonicalUrl,
  ]
    .join("\n")
    .trim();

  // Calculated reading time based on body text
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length || page.data.description.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  const readLabel = lang === "en" ? `${readTime} min read` : `${readTime} min de lecture`;

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
        <div className="flex items-center gap-3 font-mono text-xs text-ink-soft/60">
          <p className="text-accent font-medium">
            {page.data.date}
          </p>
          <span>·</span>
          <span>{readLabel}</span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {page.data.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {page.data.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {page.data.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded border border-line bg-paper-raised/80 px-2.5 py-0.5 font-mono text-[10px] text-ink-soft"
              >
                #{tag}
              </span>
            ))}
          </div>
          <CopyButtons
            url={canonicalUrl}
            shareText={shareText}
            lang={lang}
          />
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
