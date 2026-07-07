export const dynamic = "force-static";

export function GET() {
  const body = [
    "# Samen Steeve — Portfolio",
    "",
    "> Software Engineer, Security Researcher, and AI Automation Specialist.",
    "> I build resilient systems and secure application logic.",
    "",
    "## Projects",
    "",
    "- [Digitram](https://samensteeve.com/en/work/digitram): A modern platform for managing and tracking digital transformation projects",
    "- [Tribune Justice](https://samensteeve.com/en/work/tribunejustice): A legal case management and analysis tool for justice professionals",
    "",
    "## Writing",
    "",
    "- [Inertia + Laravel + React](https://samensteeve.com/en/writing/inertia-laravel-react): Building modern monoliths with Inertia.js, Laravel, and React",
    "- [React + Laravel + Inertia](https://samensteeve.com/en/writing/react-laravel-inertia): A practical guide to full-stack development with React and Laravel through Inertia",
    "- [Sécurité et Code](https://samensteeve.com/en/writing/securite-et-code): Best practices for writing secure code in modern web applications",
    "",
    "## Agent Discovery",
    "",
    "- [Auth.md](https://samensteeve.com/auth.md): Agent registration manifest",
    "- [Agent Skills](https://samensteeve.com/.well-known/agent-skills/index.json): Available agent skills and capabilities",
    "- [MCP Server Card](https://samensteeve.com/.well-known/mcp/server-card.json): Model Context Protocol server metadata",
    "- [API Catalog](https://samensteeve.com/.well-known/api-catalog): REST API catalog following RFC 9727",
    "- [OAuth Protected Resource](https://samensteeve.com/.well-known/oauth-protected-resource): Resource metadata for OAuth agents",
    "- [OAuth Authorization Server](https://samensteeve.com/.well-known/oauth-authorization-server): Authorization server metadata with agent_auth",
    "",
    "## Contact",
    "",
    "For inquiries: contact@samensteeve.com",
    "",
    "---",
    "",
    "For more information, visit [samensteeve.com](https://samensteeve.com).",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
