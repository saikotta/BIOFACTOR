"use client";

import React, { useEffect, useState } from "react";

const CHAIN_ITEMS = ["SOIL", "PLANT", "ANIMAL", "FOOD", "PEOPLE", "PLANET"];

export default function OneHealthChainBand() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Repeat sequence for a smooth infinite marquee scroll loop
  const marqueeItems = [...CHAIN_ITEMS, ...CHAIN_ITEMS, ...CHAIN_ITEMS, ...CHAIN_ITEMS];

  return (
    <div className="w-full py-16 sm:py-24 bg-[#EDF4ED] overflow-hidden border-t border-b border-[#173522]/10 relative z-10 select-none">
      <style jsx>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          animation: marqueeScroll 40s linear infinite;
        }
        .marquee-track.paused {
          animation-play-state: paused;
        }
      `}</style>
      <div
        className={`flex items-center whitespace-nowrap marquee-track will-change-transform ${
          prefersReducedMotion ? "paused" : ""
        }`}
      >
        {marqueeItems.map((item, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <span
              className="font-serif font-bold text-[clamp(42px,7vw,96px)] tracking-wider uppercase px-6 sm:px-10"
              style={{
                WebkitTextStroke: "1px rgba(23, 53, 34, 0.4)",
                color: "transparent",
              }}
            >
              {item}
            </span>
            <span className="text-[clamp(24px,4vw,48px)] text-[#173522]/30 px-2 sm:px-4 font-serif">
              ·
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
