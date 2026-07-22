import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { workSource, extractTocItems, getWorkPages } from "@/lib/source";
import { leafSlug } from "@/lib/slug";
import { getMDXComponents, ZoomableImage } from "@/components/mdx/mdx-components";
import { StatusDot } from "@/components/status-dot";
import { getT, type Language } from "@/lib/translations";
import { createPageMetadata } from "@/lib/metadata";
import { TableOfContents } from "@/components/table-of-contents";
import { LanguageFlag } from "@/components/language-flag";

interface PageProps {
  params: Promise<{ lang: Language; slug: string }>;
}

export function generateStaticParams() {
  const pages = workSource.getPages();
  return pages.map((page) => ({
    lang: page.data.lang || "fr",
    slug: leafSlug(page.slugs),
  }));
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://samensteeve.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = workSource.getPage([lang, slug]);
  if (!page) return {};
  
  const metadata = createPageMetadata({
    lang,
    title: page.data.title,
    description: page.data.description,
    path: `/work/${slug}`,
    image: page.data.cover || "/profile/profil.png",
    type: "article",
  });
  
  // Canonical cross-domain pour éviter le contenu dupliqué avec services.samensteeve.com
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: `${BASE_URL}/${lang}/work/${slug}`,
    },
  };
}


export default async function WorkPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const page = workSource.getPage([lang, slug]);
  if (!page || (page.data.lang || "fr") !== lang) notFound();

  const t = getT(lang);
  const MDX = page.data.body;

  const postLabel = page.data.lang === "en" ? t.details.writtenInEn : t.details.writtenInFr;

  // Extraction des headings depuis le TOC généré par Fumadocs
  const tocItems = extractTocItems(page.data.toc ?? []);

  const canonicalUrl = `${BASE_URL}/${lang}/work/${slug}`;

  // ── Prev / Next navigation ──
  const allProjects = getWorkPages(lang);
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  // BreadcrumbList JSON-LD pour Google
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "fr" ? "Accueil" : "Home",
        item: `${BASE_URL}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: lang === "fr" ? "Projets" : "Work",
        item: `${BASE_URL}/${lang}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.data.title,
        item: canonicalUrl,
      },
    ],
  };
  
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: page.data.title,
    description: page.data.description,
    image: page.data.cover ? `${BASE_URL}${page.data.cover}` : `${BASE_URL}/profile/profil.png`,
    author: {
      "@type": "Person",
      name: "Samen Steeve",
      url: BASE_URL,
    },
    url: canonicalUrl,
  };

  return (
    <main id="main-content" className="mx-auto max-w-2xl px-6 py-20">
      {/* JSON-LD BreadcrumbList Schema pour Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* JSON-LD CreativeWork Schema pour Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <Link
        href={`/${lang}/#work`}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-soft transition-all duration-200 hover:text-accent hover:-translate-x-0.5"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t.details.back}
      </Link>

      {/* Image de couverture optionnelle et zoomable */}
      {page.data.cover && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <ZoomableImage
            src={page.data.cover}
            alt={page.data.title}
            priority
          />
        </div>
      )}

      <header className="mt-8 mb-12 border-b border-line pb-8">
        <p className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
          {page.data.role}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {page.data.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {page.data.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StatusDot status={page.data.status} lang={lang} />
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-accent/80 border border-accent/20 bg-accent/5 rounded px-1.5 py-0.5">
            <span>
              {postLabel}
            </span>
            <LanguageFlag lang={page.data.lang || "fr"} />
          </span>
          <div className="flex flex-wrap gap-2">
            {page.data.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-line bg-paper-raised/80 px-2.5 py-0.5 font-mono text-[10px] text-ink-soft"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {page.data.url && (
          <a
            href={page.data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-accent transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/15 active:scale-[0.96]"
          >
            {page.data.url.startsWith("https://github.com")
              ? t.details.viewRepository
              : t.details.visitSite}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </header>

      {/* Layout relatif pour le TOC absolu à droite */}
      <div className="relative">
        <TableOfContents items={tocItems} lang={lang} />
        <article className="prose-headings:font-display prose-a:text-accent">
          <MDX components={getMDXComponents()} />
        </article>
      </div>

      {/* ── Prev / Next navigation ── */}
      {(prevProject || nextProject) && (
        <nav
          aria-label={t.details.continueReading}
          className="mt-20 pt-8 border-t border-line"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Prev */}
            {prevProject ? (
              <Link
                href={`/${lang}/work/${prevProject.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-line bg-paper-raised/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-paper-raised/70 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold tracking-widest text-accent mb-2">
                    <ArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-1" />
                    {t.details.prevProject}
                  </div>
                  <h3 className="font-display text-base font-bold text-ink group-hover:text-accent transition-colors duration-200 leading-snug">
                    {prevProject.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-ink-soft line-clamp-2 leading-relaxed">
                    {prevProject.description}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* Next */}
            {nextProject ? (
              <Link
                href={`/${lang}/work/${nextProject.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-line bg-paper-raised/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-paper-raised/70 hover:shadow-md sm:text-right"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold tracking-widest text-accent mb-2 sm:justify-end">
                    {t.details.nextProject}
                    <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                  <h3 className="font-display text-base font-bold text-ink group-hover:text-accent transition-colors duration-200 leading-snug">
                    {nextProject.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-ink-soft line-clamp-2 leading-relaxed">
                    {nextProject.description}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}
    </main>
  );
}
