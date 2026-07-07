import { NextRequest, NextResponse } from "next/server";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const WRITING_DIR = join(process.cwd(), "src/content", "writing");

export const dynamic = "force-static";

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const fm: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    let val = line.slice(sep + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("[")) val = val.slice(1, -1).split(",").map((s: string) => s.trim().replace(/^"|"$/g, "")).join(", ");
    fm[key] = val;
  }
  return fm;
}

export function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang") || "";
  const langs = lang ? [lang] : ["en", "fr"];

  const articles: Record<string, unknown>[] = [];

  for (const l of langs) {
    const dir = join(WRITING_DIR, l);
    if (!existsSync(dir)) continue;
    const files = readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const raw = readFileSync(join(dir, file), "utf-8");
      const fm = parseFrontmatter(raw);
      articles.push({
        slug: file.replace(".mdx", ""),
        title: fm?.title || file,
        description: fm?.description || "",
        date: fm?.date || "",
        tags: fm?.tags || "",
        published: fm?.published !== "false",
        lang: l,
      });
    }
  }

  articles.sort((a, b) => ((a.date as string) < (b.date as string) ? 1 : -1));

  return NextResponse.json(articles, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
