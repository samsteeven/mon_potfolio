import React from "react";
import { work, writing } from "collections/server";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { loader } from "fumadocs-core/source";
import { leafSlug } from "@/lib/slug";
import { getPageContent } from "@/lib/reading-time";

export const workSource = loader({
  baseUrl: "/work",
  source: toFumadocsSource(work, []),
});

export const writingSource = loader({
  baseUrl: "/writing",
  source: toFumadocsSource(writing, []),
});

// ─── Types partagés pour le pipeline d'écriture ───

export interface WritingItem {
  url: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  lang: string;
  cover?: string;
  readTime: number;
}

/**
 * Retourne tous les articles publiés dans une langue, triés du plus récent
 * au plus ancien. Chaque article est enrichi avec son temps de lecture.
 * Centralise le filtre + tri + enrichissement dupliqué dans 3 fichiers.
 */
export function getWritingPages(lang: string): WritingItem[] {
  return writingSource
    .getPages()
    .filter((p) => p.data.published && (p.data.lang || "fr") === lang)
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
    .map((page) => {
      const slug = leafSlug(page.slugs);
      const pageLang = page.data.lang || "fr";
      const { readTime } = getPageContent(slug, `writing/${pageLang}`, page.data.description);
      return {
        url: `/writing/${slug}`,
        title: page.data.title,
        description: page.data.description,
        date: page.data.date,
        tags: page.data.tags,
        lang: pageLang,
        cover: page.data.cover,
        readTime,
      };
    });
}

export interface WritingPageContent {
  title: string;
  description: string;
  date: string;
  tags: string[];
  lang: string;
  cover?: string;
  bodyText: string;
  readTime: number;
  /** Composant MDX pour le rendu article */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MDX: React.ComponentType<any>;
  /** TOC généré par Fumadocs — headings h2/h3 */
  toc: { url: string; title: React.ReactNode; depth: number }[];
}

/**
 * Récupère une page d'article enrichie (corps + temps de lecture) en une
 * seule lecture fichier. Remplace les appels séparés à getReadingTime + getMdxBody.
 * Retourne `null` si l'article n'existe pas ou n'est pas publié.
 */
export function getWritingPageContent(
  lang: string,
  slug: string,
): WritingPageContent | null {
  const page = writingSource.getPage([lang, slug]);
  if (!page || !page.data.published || (page.data.lang || "fr") !== lang) return null;

  const { body, readTime } = getPageContent(slug, `writing/${lang}`, page.data.description);

  return {
    title: page.data.title,
    description: page.data.description,
    date: page.data.date,
    tags: page.data.tags,
    lang: page.data.lang || "fr",
    cover: page.data.cover,
    bodyText: body,
    readTime,
    MDX: page.data.body,
    toc: page.data.toc ?? [],
  };
}