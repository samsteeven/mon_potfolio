export const dynamic = "force-static";

export function GET() {
  const metadata = {
    resource: "https://samensteeve.com",
    authorization_servers: [],
    scopes_supported: [],
    bearer_methods_supported: [],
    resource_documentation: "https://samensteeve.com/en",
  };

  return Response.json(metadata, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
