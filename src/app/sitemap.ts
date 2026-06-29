import type { MetadataRoute } from "next";
import { workSource, writingSource } from "@/lib/source";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samensteeve.com";

  // Base routes for both languages
  const langs = ["en", "fr"];
  const routes = ["", "/writing"];

  const staticEntries = langs.flatMap((lang) =>
    routes.map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    }))
  );

  // Dynamic writing pages
  const writings = writingSource.getPages();
  const writingEntries = langs.flatMap((lang) =>
    writings.map((page) => ({
      url: `${baseUrl}/${lang}${page.url}`,
      lastModified: page.data.date ? new Date(page.data.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  // Dynamic work pages (featured case studies like TribuneJustice)
  const works = workSource.getPages().filter((page) => page.data.featured);
  const workEntries = langs.flatMap((lang) =>
    works.map((page) => ({
      url: `${baseUrl}/${lang}${page.url}`,
      lastModified: page.data.date ? new Date(page.data.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...writingEntries, ...workEntries];
}
