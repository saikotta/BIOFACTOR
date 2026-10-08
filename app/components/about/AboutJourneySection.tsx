"use client";

/* ==========================================================================
   AboutJourneySection.tsx

   Embeds the self-contained "Our Journey" infographic (public/journey.html)
   inside a zero-border iframe so its inline CSS, JS and SVG run in isolation
   from the Next.js runtime — no hydration conflicts, no string escaping.
   ========================================================================== */

import React, { useEffect, useRef } from "react";

export default function AboutJourneySection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeSrc = "/journey.html";

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    /* Recompute height whenever the iframe's width changes */
    const setHeight = () => {
      const w = Math.max(960, iframe.offsetWidth || 960);
      const artOffset = w < 900 ? 85 : 85 - (w * 0.0147);
      const h = Math.round(w * (830 / 1480) + artOffset);
      iframe.style.height = `${h}px`;
    };

    requestAnimationFrame(setHeight);

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
            src={iframeSrc}
            title="Our Journey — Biofac infographic"
            scrolling="no"
            style={{
              display: "block",
              width: "100%",
              height: "650px",
              border: "none",
              overflow: "hidden",
            }}
          />
        </div>
      </div>
    </section>
  );
}
