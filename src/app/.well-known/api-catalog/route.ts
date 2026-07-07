export const dynamic = "force-static";

export function GET() {
  const linkset = [
    {
      anchor: "https://samensteeve.com",
      rel: "service-doc",
      href: "https://samensteeve.com/en",
    },
    {
      anchor: "https://samensteeve.com",
      rel: "describedby",
      href: "https://samensteeve.com/en",
      type: "text/html",
    },
  ];

  return Response.json({ linkset }, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
