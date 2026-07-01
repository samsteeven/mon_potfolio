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
  let bodyText = "";

  try {
    const filePath = join(process.cwd(), "src/content", collection, `${slug}.mdx`);
    const rawMdx = readFileSync(filePath, "utf-8");
    const parts = rawMdx.split("---");
    bodyText = parts.length > 2 ? parts.slice(2).join("---").trim() : rawMdx.trim();
  } catch {
    bodyText = fallbackText;
  }

  const wordCount =
    bodyText.split(/\s+/).filter(Boolean).length ||
    fallbackText.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Extrait le corps brut d'un fichier MDX (texte après le frontmatter).
 * Retourne le texte de repli si le fichier n'est pas lisible.
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
  try {
    const filePath = join(process.cwd(), "src/content", collection, `${slug}.mdx`);
    const rawMdx = readFileSync(filePath, "utf-8");
    const parts = rawMdx.split("---");
    return parts.length > 2 ? parts.slice(2).join("---").trim() : rawMdx.trim();
  } catch {
    return fallback;
  }
}
