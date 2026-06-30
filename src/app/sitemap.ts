import type { MetadataRoute } from "next";
import { workSource, writingSource } from "@/lib/source";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samensteeve.com";

  const langs = ["en", "fr"];
  const staticRoutes = ["", "/writing"];

  // Static pages (home + writing index) — one URL per lang
  const staticEntries = langs.flatMap((lang) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    }))
  );

  // All writing articles (published only) — one URL per lang
  const writings = writingSource.getPages().filter((p) => p.data.published);
  const writingEntries = langs.flatMap((lang) =>
    writings.map((page) => ({
      url: `${baseUrl}/${lang}${page.url}`,
      lastModified: page.data.date ? new Date(page.data.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  // ALL work pages (featured and non-featured) — one URL per lang
  const works = workSource.getPages();
  const workEntries = langs.flatMap((lang) =>
    works.map((page) => ({
      url: `${baseUrl}/${lang}${page.url}`,
      lastModified: page.data.date ? new Date(page.data.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: page.data.featured ? 0.9 : 0.7,
    }))
  );

  return [...staticEntries, ...writingEntries, ...workEntries];
}

