export const dynamic = "force-static";

export function GET() {
  const index = {
    $schema: "https://agentskills.io/schema.json",
    skills: [
      {
        name: "portfolio-bio",
        type: "reading",
        description: "Read the portfolio owner's biography, skills, and experience",
        url: "https://samensteeve.com/en",
        sha256: "",
      },
      {
        name: "portfolio-projects",
        type: "reading",
        description: "Browse portfolio projects and case studies",
        url: "https://samensteeve.com/en/work",
        sha256: "",
      },
      {
        name: "portfolio-writing",
        type: "reading",
        description: "Read technical articles and blog posts",
        url: "https://samensteeve.com/en/writing",
        sha256: "",
      },
    ],
  };

  return Response.json(index, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
