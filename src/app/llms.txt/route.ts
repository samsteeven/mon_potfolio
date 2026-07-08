import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://samensteeve.com";
const WORK_DIR = join(process.cwd(), "src/content", "work");
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
    if (val.startsWith("[")) val = val.slice(1, -1);
    fm[key] = val;
  }
  return fm;
}

function loadProjects() {
  if (!existsSync(WORK_DIR)) return [];
  return readdirSync(WORK_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = readFileSync(join(WORK_DIR, file), "utf-8");
      const fm = parseFrontmatter(raw);
      const slug = file.replace(".mdx", "");
      return {
        slug,
        title: fm?.title || slug,
        description: fm?.description || "",
      };
    });
}

function loadWritings() {
  const all: { title: string; description: string; url: string }[] = [];
  const seen = new Set<string>();

  for (const lang of ["en", "fr"]) {
    const dir = join(WRITING_DIR, lang);
    if (!existsSync(dir)) continue;

    for (const file of readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
      const raw = readFileSync(join(dir, file), "utf-8");
      const fm = parseFrontmatter(raw);
      if (fm?.published === "false") continue;

      const slug = file.replace(".mdx", "");
      const baseSlug = slug.replace(/^fr\//, "");

      if (!seen.has(baseSlug)) {
        seen.add(baseSlug);
        all.push({
          title: fm?.title || slug,
          description: fm?.description || "",
          url: `${BASE_URL}/${lang}/writing/${slug}`,
        });
      }
    }
  }

  return all;
}

export function GET() {
  const projects = loadProjects();
  const writings = loadWritings();

  const projectLines = projects.map(
    (p) => `- [${p.title}](${BASE_URL}/en/work/${p.slug}): ${p.description}`,
  );

  const writingLines = writings.map(
    (w) => `- [${w.title}](${w.url}): ${w.description}`,
  );

  const body = [
    "# Samen Steeve — Portfolio",
    "",
    "> Software Engineer, Security Researcher, and AI Automation Specialist.",
    "> I build resilient systems and secure application logic.",
    "",
    "## Projects",
    "",
    ...(projectLines.length ? projectLines : ["- No projects yet."]),
    "",
    "## Writing",
    "",
    ...(writingLines.length ? writingLines : ["- No articles yet."]),
    "",
    "## Agent Discovery",
    "",
    `- [Auth.md](${BASE_URL}/auth.md): Agent registration manifest`,
    `- [Agent Skills](${BASE_URL}/.well-known/agent-skills/index.json): Available agent skills and capabilities`,
    `- [MCP Server Card](${BASE_URL}/.well-known/mcp/server-card.json): Model Context Protocol server metadata`,
    `- [API Catalog](${BASE_URL}/.well-known/api-catalog): REST API catalog following RFC 9727`,
    `- [OAuth Protected Resource](${BASE_URL}/.well-known/oauth-protected-resource): Resource metadata for OAuth agents`,
    `- [OAuth Authorization Server](${BASE_URL}/.well-known/oauth-authorization-server): Authorization server metadata with agent_auth`,
    "",
    "## Contact",
    "",
    "For inquiries: contact@samensteeve.com",
    "",
    "---",
    "",
    `For more information, visit [samensteeve.com](${BASE_URL}).`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
