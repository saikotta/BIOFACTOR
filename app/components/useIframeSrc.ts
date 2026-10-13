"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/app/i18n/useTranslation";

/**
 * Returns the environment-appropriate source URL for embedded HTML infographics.
 *
 * Background:
 * Next.js static export (`output: 'export'`) with `trailingSlash: true` deployed on Vercel
 * routes HTML files as directory paths with trailing slashes (e.g. `/first-colonisers/`).
 * When an iframe requests `/first-colonisers.html`, Vercel redirects or returns a 404,
 * which in turn renders the site layout (including duplicate headers) inside the iframe.
 *
 * In local development (`next dev`), static files in `public/` are served by filename (`/first-colonisers.html`).
 *
 * This hook serves:
 * - Production / SSR: `/{slug}/{query}` (clean directory route with trailing slash)
 * - Local dev (localhost): `/{slug}.html{query}` (direct file path)
 */
export function useIframeSrc(initialPath: string): string {
  const { language } = useTranslation();
  const [pathname, search] = initialPath.split("?");
  const cleanSlug = pathname.replace(/^\/|\.html$/g, "");
  
  const params = new URLSearchParams(search || "");
  if (language) {
    params.set("lang", language);
  }
  const queryStr = params.toString();
  const query = queryStr ? `?${queryStr}` : "";

  const prodSrc = `/${cleanSlug}/${query}`;
  const devSrc = `/${cleanSlug}.html${query}`;

  const [src, setSrc] = useState(prodSrc);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.endsWith(".local"))
    ) {
      setSrc(devSrc);
    } else {
      setSrc(prodSrc);
    }
  }, [devSrc, prodSrc]);

  return src;
}
