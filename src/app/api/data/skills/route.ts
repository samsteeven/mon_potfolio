import { NextResponse } from "next/server";
import { en } from "@/lib/i18n/en";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(en.stack.items, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}
