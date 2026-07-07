export const dynamic = "force-static";

export function GET() {
  const body = [
    "# Auth.md",
    "",
    "This is a public-facing portfolio website. All content is publicly accessible.",
    "",
    "## Authentication",
    "",
    "No authentication is required to access any resource on this site.",
    "All pages, projects, and articles are publicly available.",
    "",
    "## Agent Access",
    "",
    "Agents may freely read and index all public content.",
    "No API keys, tokens, or registration are required.",
    "",
    "## Contact",
    "",
    "For inquiries: contact@samensteeve.com",
    "",
    "---",
    "",
    "Generated at build time. See https://workos.com/auth-md for the Auth.md specification.",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
