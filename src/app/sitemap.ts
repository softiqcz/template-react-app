import type { MetadataRoute } from "next";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const APP_DIR = path.join(process.cwd(), "src", "app");
const PAGE_FILES = new Set(["page.tsx", "page.ts", "page.jsx", "page.js", "page.mdx"]);
const IGNORED_SEGMENT_PREFIXES = ["_", "@"] as const;

type RouteEntry = {
  pathname: string;
  depth: number;
  lastModified?: Date;
};

function getBaseUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  const normalizedUrl = configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`;

  return normalizedUrl.replace(/\/$/, "");
}

function getRouteSegments(segments: string[]) {
  const routeSegments: string[] = [];

  for (const segment of segments) {
    if (
      IGNORED_SEGMENT_PREFIXES.some((prefix) => segment.startsWith(prefix)) ||
      segment.startsWith("[")
    ) {
      return null;
    }

    if (segment.startsWith("(") && segment.endsWith(")")) {
      continue;
    }

    routeSegments.push(segment);
  }

  return routeSegments;
}

function getPriority(depth: number) {
  return Math.max(0.4, Number((1 - depth * 0.15).toFixed(2)));
}

function scanRoutes(directory: string, segments: string[] = []): RouteEntry[] {
  if (!existsSync(directory)) {
    return [];
  }

  const entries = readdirSync(directory, { withFileTypes: true });
  const pageFile = entries.find((entry) => entry.isFile() && PAGE_FILES.has(entry.name));
  const routes: RouteEntry[] = [];

  if (pageFile) {
    const routeSegments = getRouteSegments(segments);

    if (routeSegments) {
      const pathname = routeSegments.length > 0 ? `/${routeSegments.join("/")}` : "/";
      const pagePath = path.join(directory, pageFile.name);

      routes.push({
        pathname,
        depth: routeSegments.length,
        lastModified: statSync(pagePath).mtime,
      });
    }
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    routes.push(...scanRoutes(path.join(directory, entry.name), [...segments, entry.name]));
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return scanRoutes(APP_DIR)
    .sort((a, b) => a.pathname.localeCompare(b.pathname))
    .map((route) => ({
      url: `${baseUrl}${route.pathname === "/" ? "" : route.pathname}`,
      lastModified: route.lastModified,
      changeFrequency: route.pathname === "/" ? "weekly" : "monthly",
      priority: getPriority(route.depth),
    }));
}
