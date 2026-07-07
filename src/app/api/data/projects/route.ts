import { NextResponse } from "next/server";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const WORK_DIR = join(process.cwd(), "src/content", "work");

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

export function GET() {
  const files = readdirSync(WORK_DIR).filter((f) => f.endsWith(".mdx"));

  const projects = files.map((file) => {
    const raw = readFileSync(join(WORK_DIR, file), "utf-8");
    const fm = parseFrontmatter(raw);
    return {
      slug: file.replace(".mdx", ""),
      title: fm?.title || file,
      description: fm?.description || "",
      role: fm?.role || "",
      stack: fm?.stack || "",
      status: fm?.status || "",
      featured: fm?.featured === "true",
      lang: fm?.lang || "fr",
      date: fm?.date || "",
    };
  });

  return NextResponse.json(projects, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
