import type { Language } from "@/lib/translations";

/**
 * Retourne l'URL pour la langue opposée en conservant le hash.
 * L'anglais est la langue par défaut (pas de préfixe visible).
 * Ex: /fr/writing/securite → /writing/securite   (switch FR → EN)
 * Ex: /writing/foo        → /fr/writing/foo       (switch EN → FR)
 * Ex: /                   → /fr                   (switch EN → FR depuis root)
 */
export function getOppositeUrl(pathname: string, lang: Language, hash?: string): string {
  if (!pathname) return "/";
  const targetLang: Language = lang === "en" ? "fr" : "en";

  if (targetLang === "fr") {
    // EN → FR : ajouter /fr (enlever l'éventuel /en résiduel)
    const cleanPath = pathname.startsWith("/en") ? pathname.slice(3) || "/" : pathname;
    const base = cleanPath === "/" ? "/fr" : `/fr${cleanPath}`;
    return hash ? `${base}${hash}` : base;
  }

  // FR → EN : enlever /fr (la racine est l'anglais)
  const cleanPath = pathname.startsWith("/fr") ? pathname.slice(3) || "/" : pathname;
  return hash ? `${cleanPath}${hash}` : cleanPath;
}