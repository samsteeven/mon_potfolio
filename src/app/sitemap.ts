import type { MetadataRoute } from "next";
import { workSource, writingSource } from "@/lib/source";
import { leafSlug } from "@/lib/slug";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samensteeve.com";

  const langs = ["en", "fr"];
  const staticRoutes = ["", "/writing", "/work"];

  // Pages statiques — EN à la racine, FR sous /fr
  const staticEntries = langs.flatMap((lang) =>
    staticRoutes.map((route) => ({
      url: lang === "en" ? `${baseUrl}${route}` : `${baseUrl}/fr${route}`,
      lastModified: new Date(),
      priority: route === "" ? 1.0 : 0.8,
      changeFrequency: route === "/work" ? ("monthly" as const) : ("weekly" as const),
    }))
  );

  // All writing articles (published only) — one URL per lang
  const writings = writingSource.getPages().filter((p) => p.data.published);
  // Articles writing — EN à la racine, FR sous /fr
  const writingEntries = langs.flatMap((lang) =>
    writings
      .filter((page) => (page.data.lang || "fr") === lang)
      .map((page) => ({
        url: lang === "en"
          ? `${baseUrl}/writing/${leafSlug(page.slugs)}`
          : `${baseUrl}/fr/writing/${leafSlug(page.slugs)}`,
        lastModified: page.data.date ? new Date(page.data.date) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  );

  // Work pages — one URL per lang
  const works = workSource.getPages();
  // Work pages — EN à la racine, FR sous /fr
  const workEntries = langs.flatMap((lang) =>
    works
      .filter((page) => (page.data.lang || "fr") === lang)
      .map((page) => ({
        url: lang === "en"
          ? `${baseUrl}/work/${leafSlug(page.slugs)}`
          : `${baseUrl}/fr/work/${leafSlug(page.slugs)}`,
        lastModified: page.data.date ? new Date(page.data.date) : new Date(),
        changeFrequency: "monthly" as const,
        priority: page.data.featured ? 0.9 : 0.7,
      }))
  );

  return [...staticEntries, ...writingEntries, ...workEntries];
}

