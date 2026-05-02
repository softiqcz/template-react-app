import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/* ---------------------------------
 * RATE LIMITING STORAGE
 * --------------------------------- */
const RATE_LIMIT_WINDOW = 1000; // 1 second
const RATE_LIMIT_MAX = 10; // max requests per window
const requestTimestamps: Record<string, number[]> = {};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ----------------------------
  // DETECT IP
  // ----------------------------
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  if (!requestTimestamps[ip]) requestTimestamps[ip] = [];
  // Remove timestamps outside window
  requestTimestamps[ip] = requestTimestamps[ip].filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW,
  );

  const isStatic =
    pathname.startsWith("/image") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/_next");

  // ----------------------------
  // RATE LIMIT CHECK
  // ----------------------------
  if (requestTimestamps[ip].length === RATE_LIMIT_MAX) {
    console.warn(`[RATE LIMIT HIT] IP: ${ip}, PATH: ${pathname}`);
  }

  // Block only if over limit AND NOT static
  if (requestTimestamps[ip].length >= RATE_LIMIT_MAX && !isStatic) {
    return new NextResponse("Too many requests", { status: 429 });
  }

  // Add current timestamp
  requestTimestamps[ip].push(now);
  /* ---------------------------------
   * 1️⃣ API ROUTES — allowed but guarded
   * --------------------------------- */

  /* ---------------------------------
   * 2️⃣ PAGE ROUTES — GET only
   * --------------------------------- */
  if (request.method == "POST") {
    console.warn("[BLOCKED PAGE METHOD]", request.method, pathname);

    return new NextResponse("Method Not Allowed", { status: 405 });
  }
}