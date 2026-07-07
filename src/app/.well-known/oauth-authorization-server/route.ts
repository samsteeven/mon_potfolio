export const dynamic = "force-static";

export function GET() {
  const metadata = {
    issuer: "https://samensteeve.com",
    authorization_endpoint: "",
    token_endpoint: "",
    revocation_endpoint: "",
    jwks_uri: "",
    grant_types_supported: [],
    response_types_supported: [],
    subject_types_supported: [],
    id_token_signing_alg_values_supported: [],
    service_documentation: "https://samensteeve.com/en",
    agent_auth: {
      skill: "https://samensteeve.com/auth.md",
      identity_endpoint: "",
      claim_endpoint: "",
      events_endpoint: "",
      identity_types_supported: ["anonymous"],
      anonymous: {
        credential_types_supported: [],
      },
      events_supported: [],
    },
  };

  return Response.json(metadata, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
