import { NextResponse } from "next/server";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import { parseFrontmatter } from "@/lib/mdx";

const WORK_DIR = join(process.cwd(), "src/content", "work");

export const dynamic = "force-static";

function loadProjectsFromDir(langDir: string, lang: string) {
  if (!existsSync(langDir)) return [];
  return readdirSync(langDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = readFileSync(join(langDir, file), "utf-8");
      const fm = parseFrontmatter(raw);
      const slug = file.replace(".mdx", "");
      return {
        slug,
        title: fm?.title || file,
        description: fm?.description || "",
        role: fm?.role || "",
        stack: fm?.stack || "",
        status: fm?.status || "",
        featured: fm?.featured === "true",
        lang: fm?.lang || lang,
        date: fm?.date || "",
      };
    });
}

export function GET() {
  const projects = [
    ...loadProjectsFromDir(join(WORK_DIR, "fr"), "fr"),
    ...loadProjectsFromDir(join(WORK_DIR, "en"), "en"),
  ];

  return NextResponse.json(projects, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
