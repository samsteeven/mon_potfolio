import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import { z } from "zod";

// Champs communs aux deux collections de contenu
const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  published: z.boolean().default(true),
  lang: z.enum(["en", "fr"]).default("fr"),
  cover: z.string().optional(),
});

// Collection "work" — études de cas projets (TribuneJustice, etc.)
export const work = defineCollections({
  type: "doc",
  dir: "src/content/work",
  schema: baseSchema.extend({
    role: z.string(),
    stack: z.array(z.string()).default([]),
    status: z.enum(["shipped", "in-progress"]).optional(),
    featured: z.boolean().default(false),
    url: z.string().optional(),
  }),
});

// Collection "writing" — articles de blog
export const writing = defineCollections({
  type: "doc",
  dir: "src/content/writing",
  schema: baseSchema.extend({
    tags: z.array(z.string()).default([]),
  }),
});

export default defineConfig();
