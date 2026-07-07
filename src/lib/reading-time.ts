import { readFileSync } from "fs";
import { join } from "path";

/**
 * Extrait le corps d'un fichier MDX (après le second séparateur ---),
 * puis calcule un temps de lecture estimé à 200 mots/minute.
 *
 * @param slug  - Le slug du fichier (sans extension), ex: "mon-article"
 * @param collection - Le sous-dossier dans src/content/, ex: "writing"
 * @param fallbackText - Texte de repli pour le comptage si le fichier ne peut pas être lu
 * @returns Le nombre de minutes de lecture (minimum 1)
 */
export function getReadingTime(
  slug: string,
  collection: string,
  fallbackText: string
): number {
  const bodyText = readMdxBodyCached(slug, collection) ?? fallbackText;
  return computeReadingTime(bodyText, fallbackText);
}

/** Calcule le temps de lecture à partir d'un texte brut. Fonction pure, testable sans mock. */
export function computeReadingTime(bodyText: string, fallbackText: string): number {
  const wordCount =
    bodyText.split(/\s+/).filter(Boolean).length ||
    fallbackText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/** Vide le cache interne (utile en test). */
export function __resetBodyCache(): void {
  bodyCache.clear();
}

/**
 * Extrait le corps brut d'un fichier MDX (texte après le frontmatter).
 * Retourne undefined si le fichier n'est pas lisible.
 *
 * @param slug       - Le slug du fichier (sans extension)
 * @param collection - Le sous-dossier dans src/content/, ex: "writing"
 * @param fallback   - Texte retourné en cas d'erreur de lecture
 * @returns Le corps brut du fichier MDX
 */
export function getMdxBody(
  slug: string,
  collection: string,
  fallback: string
): string {
  return readMdxBodyCached(slug, collection) ?? fallback;
}

// Cache module-level avec TTL 30s. Évite de relire le disque à chaque requête
// dans le même processus (dev HMR / builds successifs). Se purge
// automatiquement si le contenu change côté dev.
const bodyCache = new Map<string, { value: string | null; ts: number }>();
const CACHE_TTL_MS = 30_000;

function readMdxBodyCached(
  slug: string,
  collection: string,
): string | null {
  const key = `${collection}/${slug}`;
  const cached = bodyCache.get(key);
  if (cached !== undefined && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.value;
  }

  let result: string | null = null;
  try {
    const filePath = join(
      process.cwd(),
      "src/content",
      collection,
      `${slug}.mdx`
    );
    const rawMdx = readFileSync(filePath, "utf-8");
    const parts = rawMdx.split("---");
    result =
      parts.length > 2 ? parts.slice(2).join("---").trim() : rawMdx.trim();
  } catch {
    result = null;
  }

  bodyCache.set(key, { value: result, ts: Date.now() });
  return result;
}