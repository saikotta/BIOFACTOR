"use client";

/* ==========================================================================
   AboutJourneySection.tsx

   Embeds the self-contained "Our Journey" infographic (public/journey.html)
   inside a zero-border iframe so its inline CSS, JS and SVG run in isolation
   from the Next.js runtime — no hydration conflicts, no string escaping.

   Sizing strategy
   ───────────────
   The iframe has no intrinsic height.  A ResizeObserver watches the iframe's
   rendered width and drives the height via the same 1480:830 aspect ratio used
   inside journey.html.  This keeps the single-frame constraint even if the
   parent layout changes width after mount.
   ========================================================================== */

import React, { useEffect, useRef } from "react";

export default function AboutJourneySection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    /* Recompute height whenever the iframe's width changes */
    const setHeight = () => {
      // If we enforce a minWidth, the actual pixel width we want the ratio calculated on is at least 960
      const w = Math.max(960, iframe.offsetWidth || 960);
      /* Match the infographic aspect ratio and preserve the 85px heading-to-art gap. */
      const artOffset = w < 900 ? 85 : 85 - (w * 0.0147);
      const h = Math.round(w * (830 / 1480) + artOffset);
      iframe.style.height = `${h}px`;
    };

    /* Initial call — wait one frame so layout is settled */
    requestAnimationFrame(setHeight);

    /* Watch for width changes (e.g. sidebar collapse, window resize) */
    const ro = new ResizeObserver(setHeight);
    ro.observe(iframe);

    window.addEventListener("resize", setHeight, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setHeight);
    };
  }, []);

  return (
    <section
      aria-label="Our Journey"
      style={{ width: "100%", background: "#eef6ec", lineHeight: 0 }}
    >
      <div className="w-full overflow-x-auto overflow-y-hidden" style={{ WebkitOverflowScrolling: "touch" }}>
        <div style={{ minWidth: "960px", position: "relative" }}>
          <iframe
            ref={iframeRef}
            src="/journey.html"
            title="Our Journey — Biofac infographic"
            scrolling="no"
            style={{
              display: "block",
              width: "100%",
              height: "650px", // Will be overridden by ResizeObserver
              border: "none",
              overflow: "hidden",
            }}
          />
        </div>
      </div>
    </section>
  );
}
