import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { writingSource, getWritingPageContent } from "@/lib/source";
import { leafSlug } from "@/lib/slug";
import { getMDXComponents, ZoomableImage } from "@/components/mdx/mdx-components";
import { getT, type Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { TableOfContents, type TocItem } from "@/components/table-of-contents";
import { CopyButtons } from "@/components/copy-buttons";

interface PageProps {
  params: Promise<{ lang: Language; slug: string }>;
}

export function generateStaticParams() {
  const pages = writingSource.getPages();
  return pages.map((page) => ({
    lang: page.data.lang || "fr",
    slug: leafSlug(page.slugs),
  }));
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://samensteeve.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = writingSource.getPage([lang, slug]);
  if (!page || !page.data.published || (page.data.lang || "fr") !== lang) return {};
  return createPageMetadata({
    lang,
    title: page.data.title,
    description: page.data.description,
    path: `/writing/${slug}`,
    image: page.data.cover || "/profile/profil.png",
    type: "article",
  });
}


export default async function WritingPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const content = getWritingPageContent(lang, slug);
  if (!content) notFound();

  const t = getT(lang);

  const canonicalUrl = `${BASE_URL}/${lang}/writing/${slug}`;

  const shareText = [
    content.title,
    "",
    content.bodyText,
    "",
    content.tags.map((t: string) => `#${t}`).join(" "),
    "",
    t.details.shareText,
    canonicalUrl,
  ]
    .join("\n")
    .trim();

  const readLabel = `${content.readTime} ${t.writing.minRead}`;

  const tocItems: TocItem[] = (content.toc ?? [])
    .filter((item) => item.depth === 2 || item.depth === 3)
    .map((item) => ({
      id: item.url.replace(/^#/, ""),
      title: item.title,
      depth: item.depth,
    }));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: content.title,
    description: content.description,
    image: content.cover ? `${BASE_URL}${content.cover}` : `${BASE_URL}/profile/profil.png`,
    datePublished: content.date,
    author: { "@type": "Person", name: "Samen Steeve", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "Samen Steeve",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/profile/profil.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  return (
    <main id="main-content" className="mx-auto max-w-2xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Link
        href={`/${lang}/writing`}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-soft transition-all duration-200 hover:text-accent hover:-translate-x-0.5"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t.details.back}
      </Link>

      {content.cover && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <ZoomableImage
            src={content.cover}
            alt={content.title}
            priority
          />
        </div>
      )}

      <header className={`mb-12 border-b border-line pb-8 ${content.cover ? "mt-8" : "mt-8"}`}>
        <div className="flex items-center gap-3 font-mono text-xs text-ink-soft/60">
          <p className="text-accent font-medium">{content.date}</p>
          <span>·</span>
          <span>{readLabel}</span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {content.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {content.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {content.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded border border-line bg-paper-raised/80 px-2.5 py-0.5 font-mono text-[10px] text-ink-soft"
              >
                #{tag}
              </span>
            ))}
          </div>
          <CopyButtons url={canonicalUrl} shareText={shareText} lang={lang} />
        </div>
      </header>

      <div className="relative">
        <TableOfContents items={tocItems} lang={lang} />
        <article className="prose-headings:font-display prose-a:text-accent w-full max-w-full overflow-hidden">
          <content.MDX components={getMDXComponents()} />
        </article>
      </div>
    </main>
  );
}
