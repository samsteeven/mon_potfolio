// Le slug "feuille" d'une page = dernier segment de son chemin dans content/.
// Avec l'arborescence content/writing/{en,fr}/<slug>.mdx, on obtient
// page.slugs = ["fr", "mon-article"] et leafSlug = "mon-article".
// Utile pour fabriquer les URLs /<lang>/writing/<slug> indépendantes du
// sous-dossier de langue dans le filesystem.
export function leafSlug(slugs: string[]): string {
  if (slugs.length === 0) return "";
  return slugs[slugs.length - 1];
}