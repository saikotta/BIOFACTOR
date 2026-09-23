"use client";

import React, { useEffect, useRef, useState } from "react";

export default function PrimordialSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [animationCycle, setAnimationCycle] = useState(0);
  const armedRef = useRef(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", handleMediaChange);
    }

    // Single stable IntersectionObserver with 20% ENTER / 6% EXIT hysteresis state machine
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.20 && armedRef.current) {
          armedRef.current = false;
          setAnimationCycle((prev) => prev + 1);
        } else if (entry.intersectionRatio <= 0.06 && !armedRef.current) {
          armedRef.current = true;
        }
      },
      {
        threshold: [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30],
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if ("removeEventListener" in mediaQuery) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      }
    };
  }, []);

  const isAnimated = animationCycle > 0;

  return (
    <section
      ref={sectionRef}
      id="primordial-elements"
      className="relative z-20 w-full bg-[#EAF3EA] text-[#0d1f1c] py-10 sm:py-14 md:py-16 lg:py-18 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div key={animationCycle} className="w-full h-full">
        <div className="max-w-[1600px] mx-auto flex flex-col justify-between items-center space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
          
          {/* TOP-LEFT: Explanatory paragraph */}
          <div className="w-full flex justify-start pl-2 md:pl-6 lg:pl-8">
            <p
              className={`max-w-md sm:max-w-lg md:max-w-xl text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#142925] tracking-tight ${
                prefersReducedMotion
                  ? "opacity-100"
                  : isAnimated
                  ? "animate-p2-para opacity-0 fill-mode-forwards"
                  : "opacity-0"
              }`}
            >
              Billions of years ago, Earth was gas, mineral, water, and energy &mdash; nothing that could be called alive. Chemistry ran its course for a very long time before it produced something that could adapt, repair, and reproduce itself. When it did, everything changed.
            </p>
          </div>

          {/* MIDDLE: Free-floating Primordial Four Elements Artwork & Primordial Flow Layers */}
          <div className="w-full flex justify-center items-center mt-0 sm:mt-1 md:-mt-14 lg:-mt-[150px] mb-2 sm:mb-3 md:mb-4 px-2">
            <div
              className={`relative w-full max-w-[1400px] mx-auto flex justify-center items-center select-none ${
                prefersReducedMotion
                  ? "opacity-100"
                  : isAnimated
                  ? "animate-p2-artwork opacity-0 fill-mode-forwards"
                  : "opacity-0"
              }`}
            >
              {/* PHASE 1 — Atmospheric Veil over Cloud Region (Left 4% - 36%) */}
              <div
                className={`absolute top-[4%] left-[4%] w-[32%] h-[72%] pointer-events-none z-10 ${
                  prefersReducedMotion ? "opacity-0" : isAnimated ? "animate-p2-atmos" : "opacity-0"
                }`}
                style={{
                  background:
                    "radial-gradient(ellipse 85% 75% at 42% 48%, rgba(255, 255, 255, 0.45) 0%, rgba(195, 235, 226, 0.35) 45%, rgba(195, 235, 226, 0.10) 70%, transparent 88%)",
                  filter: "blur(14px)",
                  borderRadius: "50% / 40%",
                }}
              />

              {/* PHASE 2 — Mineral Response: Geological Crystal Highlights (Center-Left 29% - 51%) */}
              <div
                className={`absolute top-[22%] left-[29%] w-[22%] h-[55%] pointer-events-none z-10 ${
                  prefersReducedMotion ? "opacity-0" : isAnimated ? "animate-p2-mineral" : "opacity-0"
                }`}
              >
                <div
                  className="absolute top-[28%] left-[10%] w-[80%] h-[10px] transform -rotate-[22deg]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255, 250, 240, 0.65) 45%, rgba(230, 205, 145, 0.50) 65%, transparent 100%)",
                    filter: "blur(3px)",
                  }}
                />
                <div
                  className="absolute top-[52%] left-[20%] w-[65%] h-[7px] transform -rotate-[18deg]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(248, 240, 215, 0.55) 50%, rgba(215, 185, 125, 0.40) 75%, transparent 100%)",
                    filter: "blur(2.5px)",
                  }}
                />
              </div>

              {/* PHASE 3 — Water Transmits Motion: Soft Flow Bands (Center-Right 48% - 74%) */}
              <div
                className={`absolute top-[18%] left-[48%] w-[26%] h-[62%] pointer-events-none z-10 ${
                  prefersReducedMotion ? "opacity-0" : isAnimated ? "animate-p2-water" : "opacity-0"
                }`}
              >
                <div
                  className="absolute top-[25%] left-[5%] w-[90%] h-[35%] rounded-[50%]"
                  style={{
                    background:
                      "radial-gradient(ellipse 90% 40% at 50% 50%, rgba(220, 248, 252, 0.55) 0%, rgba(175, 230, 242, 0.28) 55%, transparent 85%)",
                    filter: "blur(7px)",
                  }}
                />
                <div
                  className="absolute top-[50%] left-[10%] w-[80%] h-[28%] rounded-[50%]"
                  style={{
                    background:
                      "radial-gradient(ellipse 85% 30% at 50% 50%, rgba(255, 255, 255, 0.60) 0%, rgba(190, 238, 248, 0.22) 60%, transparent 85%)",
                    filter: "blur(6px)",
                  }}
                />
              </div>

              {/* PHASE 4A — Energy Inner Illumination Bloom (Right 71% - 96%) */}
              <div
                className={`absolute top-[8%] left-[71%] w-[25%] h-[78%] pointer-events-none z-10 ${
                  prefersReducedMotion ? "opacity-0" : isAnimated ? "animate-p2-energy-bloom" : "opacity-0"
                }`}
                style={{
                  background:
                    "radial-gradient(ellipse 75% 65% at 45% 45%, rgba(255, 235, 175, 0.48) 0%, rgba(235, 195, 110, 0.25) 50%, transparent 75%)",
                  filter: "blur(9px)",
                }}
              />

              {/* PHASE 4B — Leftward Travelling Energy Streak Across Artwork */}
              <div
                className={`absolute top-[42%] right-[5%] w-[35%] h-[11%] pointer-events-none z-10 ${
                  prefersReducedMotion ? "opacity-0" : isAnimated ? "animate-p2-energy-streak" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(270deg, transparent 0%, rgba(255, 252, 230, 0.60) 35%, rgba(255, 230, 170, 0.45) 65%, transparent 100%)",
                  filter: "blur(11px)",
                  borderRadius: "9999px",
                }}
              />

              {/* PHASE 5 — Whole System Resolves (Huge Soft Behind/Overlay Illumination) */}
              <div
                className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${
                  prefersReducedMotion ? "opacity-0" : isAnimated ? "animate-p2-system-resolve" : "opacity-0"
                }`}
                style={{
                  background:
                    "radial-gradient(ellipse 85% 70% at 50% 50%, rgba(255, 252, 240, 0.38) 0%, rgba(225, 242, 232, 0.25) 50%, transparent 80%)",
                  filter: "blur(18px)",
                }}
              />

              {/* Approved Static PNG Artwork */}
              <img
                src="/images/primordial-four-elements.png"
                alt="Primordial Elements — Gas, Minerals, Water, Energy"
                className="w-full h-auto max-h-[550px] sm:max-h-[650px] lg:max-h-[760px] object-contain block border-0 shadow-none rounded-none bg-transparent pointer-events-none mx-auto relative z-0"
              />
            </div>
          </div>

          {/* BOTTOM-CENTER: Core statement & subtitle */}
          <div className="w-full text-center space-y-2 sm:space-y-3 max-w-[1250px] mx-auto">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-[#0a1c18] leading-[1.12] lg:whitespace-nowrap ${
                prefersReducedMotion
                  ? "opacity-100"
                  : isAnimated
                  ? "animate-p2-headline opacity-0 fill-mode-forwards"
                  : "opacity-0"
              }`}
            >
              Life didn&apos;t replace chemistry. It organized it.
            </h2>
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#25423c] leading-relaxed ${
                prefersReducedMotion
                  ? "opacity-100"
                  : isAnimated
                  ? "animate-p2-subtitle opacity-0 fill-mode-forwards"
                  : "opacity-0"
              }`}
            >
              That&apos;s the same move we&apos;re making in the field.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
