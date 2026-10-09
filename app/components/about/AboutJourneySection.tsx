"use client";

import React, { useEffect, useRef } from "react";

export default function AboutJourneySection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeSrc = "/journey/";

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const setHeight = () => {
      const w = Math.max(1000, iframe.offsetWidth || 1000);
      const h = Math.round(w * (760 / 1500));
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
      style={{ width: "100%", background: "#eef5e6", lineHeight: 0, padding: "20px 0 40px" }}
    >
      <div className="w-full overflow-x-auto overflow-y-hidden" style={{ WebkitOverflowScrolling: "touch" }}>
        <div style={{ minWidth: "1000px", position: "relative" }}>
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title="Our Journey — Biofactor Bee Timeline"
            scrolling="no"
            style={{
              display: "block",
              width: "100%",
              height: "760px",
              border: "none",
              overflow: "hidden",
            }}
          />
        </div>
      </div>
    </section>
  );
}
