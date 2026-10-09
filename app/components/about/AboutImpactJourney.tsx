"use client";

import React, { useEffect, useRef } from "react";

export default function AboutImpactJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const updateIframeHeight = () => {
      const width = Math.max(960, iframe.offsetWidth || 1200);
      const height = Math.round(width * (680 / 1440));
      iframe.style.height = `${height}px`;
    };

    updateIframeHeight();
    const ro = new ResizeObserver(updateIframeHeight);
    ro.observe(iframe);
    window.addEventListener("resize", updateIframeHeight, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateIframeHeight);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#eef6ec] py-8 md:py-12 overflow-hidden border-t border-[#14702f]/15"
      aria-label="Biofactor Journey of Impact"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full overflow-x-auto overflow-y-hidden shadow-2xl rounded-3xl border border-[#14702f]/20 bg-[#eef6ec]">
          <div className="min-w-[960px] relative">
            <iframe
              ref={iframeRef}
              src="/journey.html"
              title="Biofactor Honey Bee Journey"
              scrolling="no"
              className="w-full border-none block rounded-3xl"
              style={{ height: "680px", overflow: "hidden" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
