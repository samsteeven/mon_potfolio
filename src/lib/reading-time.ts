import { readFileSync } from "fs";
import { join } from "path";

/**
 * Calcule le temps de lecture à partir d'un texte brut.
 * Fonction pure — pas d'I/O, testable sans mock.
 */
export function computeReadingTime(bodyText: string, fallbackText: string): number {
  const wordCount =
    bodyText.split(/\s+/).filter(Boolean).length ||
    fallbackText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Retourne le corps + temps de lecture en une seule lecture fichier.
 * Remplace les appels séparés à getReadingTime + getMdxBody.
 */
export function getPageContent(
  slug: string,
  collection: string,
  fallback: string,
): { body: string; readTime: number } {
  const raw = readMdxBodyCached(slug, collection);
  const body = raw ?? fallback;
  return { body, readTime: computeReadingTime(body, fallback) };
}

/**
 * Extrait le corps (après frontmatter) + temps de lecture, avec fallback.
 * @deprecated Utilise getPageContent à la place — une seule lecture fichier.
 */
export function getReadingTime(
  slug: string,
  collection: string,
  fallbackText: string,
): number {
  const body = readMdxBodyCached(slug, collection) ?? fallbackText;
  return computeReadingTime(body, fallbackText);
}

/**
 * Extrait le corps brut d'un fichier MDX (texte après le frontmatter).
 * @deprecated Utilise getPageContent à la place.
 */
export function getMdxBody(
  slug: string,
  collection: string,
  fallback: string,
): string {
  return readMdxBodyCached(slug, collection) ?? fallback;
}

// --- Interne ---

const bodyCache = new Map<string, { value: string | null; ts: number }>();
const CACHE_TTL_MS = 30_000;

/**
 * Lit un fichier MDX sur le disque et extrait le corps après le frontmatter YAML.
 * Interface publique pour les tests (__resetBodyCache) et pour caller via getPageContent.
 */
function readMdxBody(slug: string, collection: string): string | null {
  try {
    const filePath = join(process.cwd(), "src/content", collection, `${slug}.mdx`);
    const rawMdx = readFileSync(filePath, "utf-8");
    const parts = rawMdx.split("---");
    return parts.length > 2 ? parts.slice(2).join("---").trim() : rawMdx.trim();
  } catch {
    return null;
  }
}

function readMdxBodyCached(slug: string, collection: string): string | null {
  const key = `${collection}/${slug}`;
  const cached = bodyCache.get(key);
  if (cached !== undefined && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.value;
  }
  const value = readMdxBody(slug, collection);
  bodyCache.set(key, { value, ts: Date.now() });
  return value;
}

/** Vide le cache interne (utile en test). */
export function __resetBodyCache(): void {
  bodyCache.clear();
}