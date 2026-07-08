import type { Language } from "@/lib/translations";

/**
 * Retourne l'URL pour la langue opposée en conservant le hash.
 * Ex: /fr/writing/securite-et-code → /en/writing/securite-et-code
 * Ex: /en#work → /fr#work
 */
export function getOppositeUrl(pathname: string, lang: Language, hash?: string): string {
  if (!pathname) return "/";
  const segments = pathname.split("/");
  const targetLang: Language = lang === "en" ? "fr" : "en";
  segments[1] = targetLang;
  const base = segments.join("/");
  return hash ? `${base}${hash}` : base;
}