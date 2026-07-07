import { NextRequest } from "next/server";
import {
  generateKeyPairSync,
  sign,
  randomBytes,
  createHash,
  type KeyObject,
} from "crypto";

let cached: {
  publicKey: KeyObject;
  privateKey: KeyObject;
  jwk: { kty: string; crv: string; x: string };
  thumbprint: string;
} | null = null;

function init() {
  if (cached) return cached;
  const pair = generateKeyPairSync("ed25519");
  const der = pair.publicKey.export({ type: "spki", format: "der" });
  // Ed25519 SPKI: 30 2a 30 05 06 03 2b 65 70 03 21 00 <32 bytes raw key>
  const rawKey = der.subarray(-32);
  const x = rawKey.toString("base64url");
  const jwk = { kty: "OKP", crv: "Ed25519", x };
  const canonical = JSON.stringify({ crv: "Ed25519", kty: "OKP", x });
  const thumbprint = createHash("sha256").update(canonical).digest("base64url");
  cached = { publicKey: pair.publicKey, privateKey: pair.privateKey, jwk, thumbprint };
  return cached;
}

export function GET(request: NextRequest) {
  const { jwk, thumbprint, privateKey } = init();
  const host = request.headers.get("host") || "samensteeve.com";
  const now = Math.floor(Date.now() / 1000);
  const created = now;
  const expires = now + 86400;
  const nonce = randomBytes(32).toString("base64url");

  const sigParams = `("@authority";req);created=${created};expires=${expires};keyid="${thumbprint}";alg="ed25519";nonce="${nonce}";tag="http-message-signatures-directory"`;
  const sigBase = `"@authority": ${host}\n"@signature-params": ${sigParams}`;

  const sig = sign(null, Buffer.from(sigBase, "utf-8"), privateKey);
  const sigB64url = sig.toString("base64url");

  const body = JSON.stringify({ keys: [jwk] });

  return new Response(body, {
    headers: {
      "Content-Type": "application/http-message-signatures-directory+json",
      "Cache-Control": "max-age=86400",
      "Signature-Input": `sig1=${sigParams}`,
      "Signature": `sig1=:${sigB64url}:`,
      "Access-Control-Allow-Origin": "*",
    },
  });
}
