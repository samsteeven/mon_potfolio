export const dynamic = "force-static";

export function GET() {
  const card = {
    name: "Samen Steeve Portfolio",
    version: "1.0.0",
    description: "Portfolio personnel — projets, articles, compétences",
    transport: {
      type: "http",
      endpoint: "https://samensteeve.com",
    },
    capabilities: {
      tools: {
        listChanged: false,
      },
      resources: {
        subscribe: false,
        listChanged: false,
      },
    },
  };

  return Response.json(card, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
