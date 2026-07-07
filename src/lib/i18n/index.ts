import { en } from "./en";
import { fr } from "./fr";

export type Language = "en" | "fr";

export const translations = { en, fr } as const;

export type Translation = (typeof translations)[Language];

/** Helper centralisé : récupère les traductions avec fallback vers l'anglais.
 *  Tous les callers devraient utiliser ceci au lieu de
 *  `translations[lang] || translations.en`. */
export function getT(lang: Language): Translation {
  return translations[lang] ?? translations.en;
}