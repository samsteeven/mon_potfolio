const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://samensteeve.com";

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Content-Signals (https://contentsignals.org/)",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    `Sitemap: ${BASE_URL}/sitemap.xml`,
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
