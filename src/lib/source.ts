import { work, writing } from "collections/server";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { loader } from "fumadocs-core/source";
import { leafSlug } from "@/lib/slug";

export { leafSlug };

export const workSource = loader({
  baseUrl: "/work",
  source: toFumadocsSource(work, []),
});

export const writingSource = loader({
  baseUrl: "/writing",
  source: toFumadocsSource(writing, []),
});