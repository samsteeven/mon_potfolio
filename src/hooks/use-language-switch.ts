import type { Language } from "@/lib/translations";

/**
 * Retourne l'URL pour la langue opposée.
 * Ex: /fr/writing/securite-et-code → /en/writing/securite-et-code
 */
export function getOppositeUrl(pathname: string, lang: Language): string {
  if (!pathname) return "/";
  const segments = pathname.split("/");
  const targetLang: Language = lang === "en" ? "fr" : "en";
  segments[1] = targetLang;
  return segments.join("/");
}