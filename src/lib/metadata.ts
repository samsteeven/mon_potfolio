import type { Metadata } from "next";
import type { Language } from "@/lib/translations";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://samensteeve.com";

const PROFILE_IMAGE = "/profil.png";

export interface PageMetadataOptions {
  lang: Language;
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}

/**
 * Fabrique un objet Metadata Next.js complet avec :
 * - canonical + lang alternates (hreflang)
 * - Open Graph + Twitter card (toujours summary_large_image)
 * - image par défaut (profil) ou personnalisée avec dimensions
 *
 * Chaque page appelle cette fonction au lieu de répéter la
 * construction de BASE_URL, altLang, alternates, OG, Twitter.
 */
export function createPageMetadata({
  lang,
  title,
  description,
  path,
  image = PROFILE_IMAGE,
  type = "website",
}: PageMetadataOptions): Metadata {
  const altLang: Language = lang === "fr" ? "en" : "fr";
  const canonicalUrl = `${BASE_URL}/${lang}${path}`;
  const altUrl = `${BASE_URL}/${altLang}${path}`;
  const ogImage = image === PROFILE_IMAGE
    ? { url: image, width: 800, height: 800, alt: title }
    : { url: image, alt: title };

  return {
    title: `${title} — Samen Steeve`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        [lang]: canonicalUrl,
        [altLang]: altUrl,
        "x-default": `${BASE_URL}/en${path}`,
      },
    },
    openGraph: {
      type,
      title,
      description,
      url: canonicalUrl,
      siteName: "Samen Steeve",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: altLang === "fr" ? "fr_FR" : "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export { BASE_URL, PROFILE_IMAGE };