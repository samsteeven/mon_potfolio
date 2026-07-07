export const dynamic = "force-static";

export function GET() {
  const card = {
    $schema: "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
    name: "com.samensteeve/portfolio",
    version: "1.0.0",
    description: "Portfolio personnel — projets, articles, compétences",
    title: "Samen Steeve Portfolio",
    websiteUrl: "https://samensteeve.com",
    remotes: [
      {
        type: "streamable-http",
        url: "https://samensteeve.com",
      },
    ],
  };

  return Response.json(card, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
