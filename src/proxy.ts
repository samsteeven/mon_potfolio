import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const CACHE_HEADERS = "public, s-maxage=3600, stale-while-revalidate=3600";

const LINK_HEADERS = [
  "</.well-known/agent-skills/index.json>; rel=\"agent-skills\"",
  "</.well-known/mcp/server-card.json>; rel=\"mcp-server\"",
  "</.well-known/api-catalog>; rel=\"api-catalog\"",
].join(", ");

function setPageHeaders(response: NextResponse) {
  response.headers.set("Link", LINK_HEADERS);
  response.headers.set("Cache-Control", CACHE_HEADERS);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/.well-known") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLang = pathname.startsWith("/en") || pathname.startsWith("/fr");
  const langPath = hasLang ? pathname : `/en${pathname}`;

  const accept = request.headers.get("accept") || "";
  if (accept.includes("text/markdown")) {
    const url = new URL(`/api/md${langPath}`, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.rewrite(url);
  }

  if (!hasLang) {
    const url = new URL(`/en${pathname}`, request.url);
    url.search = request.nextUrl.search;
    const response = NextResponse.rewrite(url);
    setPageHeaders(response);
    return response;
  }

  const response = NextResponse.next();
  setPageHeaders(response);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|\\.well-known).*)"],
};
