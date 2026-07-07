import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

/**
 * Proxy Next.js 16+ (anciennement "middleware" — renommé en Next.js 16).
 * Redirige toute URL sans préfixe de langue vers /en/.
 * Fichier : src/proxy.ts (convention Next.js 16+, ex-middleware.ts)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorer les internals Next.js, les API et les fichiers statiques
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Si l'URL n'a pas de préfixe de langue, rediriger vers /en
  const pathnameHasLocale =
    pathname.startsWith("/en") || pathname.startsWith("/fr");

  if (!pathnameHasLocale) {
    const url = new URL(`/en${pathname}`, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
