export const dynamic = "force-static";

export function GET() {
  const metadata = {
    resource: "https://samensteeve.com",
    authorization_servers: ["https://samensteeve.com"],
    scopes_supported: ["public:read"],
    bearer_methods_supported: ["header"],
    resource_documentation: "https://samensteeve.com/en",
  };

  return Response.json(metadata, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
