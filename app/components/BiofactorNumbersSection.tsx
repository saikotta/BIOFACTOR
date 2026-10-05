"use client";

import React, { useEffect, useRef, useState } from "react";

const STATISTICS = [
  // ROW 1
  { number: "11", label: "PATENTS GRANTED" },
  { number: "60+", label: "PROPRIETARY AND DEPOSITED STRAINS" },
  { number: "100+", label: "PRODUCTS ACROSS SIX VERTICALS" },
  { number: "550+", label: "TEAM MEMBERS" },
  { number: "2000+", label: "DEALERS’ NETWORK" },
  // ROW 2
  { number: "2", label: "COUNTRIES BEYOND BHARAT" },
  { number: "20+", label: "INDIAN STATES" },
  { number: "2014", label: "FOUNDED, HYDERABAD" },
  { number: "5 Lakhs+", label: "HAPPY FARMERS" },
];

export default function BiofactorNumbersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="biofactor-numbers-section"
      className="relative z-20 w-full py-16 lg:py-24 text-[#0a1a14] overflow-hidden select-none"
    >
      <div className="w-full max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-between">
        
        {/* ELEGANT TOP COMPOSITION (HEADLINE REMOVED, PRESERVED COPY RE-INTEGRATED) */}
        <div className="max-w-3xl flex flex-col items-start text-left space-y-3 mb-12 lg:mb-16">
          
          {/* Eyebrow */}
          <div
            className={`flex items-center gap-2.5 transition-all duration-700 ease-out ${
              isRevealed || prefersReducedMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            <span className="text-xs sm:text-sm font-mono font-semibold tracking-[0.2em] text-[#059669] uppercase">
              THE NUMBER BEHIND THE NAME
            </span>
          </div>

          {/* Primary Statement */}
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#071a14] leading-[1.2] transition-all duration-800 ease-out ${
              isRevealed || prefersReducedMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
            style={{
              transitionDelay: prefersReducedMotion ? "0ms" : "100ms",
            }}
          >
            A DSIR-recognised R&amp;D operation, built and sold from Hyderabad since 2014.
          </h2>

          {/* Biofactor Conviction Copy with Thin Green Left Border */}
          <div
            className={`border-l-2 border-[#059669]/40 pl-4 sm:pl-5 pt-1 transition-all duration-800 ease-out ${
              isRevealed || prefersReducedMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
            style={{
              transitionDelay: prefersReducedMotion ? "0ms" : "200ms",
            }}
          >
            <p className="text-base sm:text-lg text-[#2a4d3e] font-normal leading-relaxed max-w-2xl">
              At Biofactor, we explore this frontier with one conviction:
              The more deeply we understand biology, the more intelligently we can innovate with it.
            </p>
          </div>

        </div>

        {/* FULL-WIDTH HORIZONTAL STATISTICS STRIP (10 STATS: 2 ROWS OF 5 ON DESKTOP/TABLET) */}
        <div
          className={`w-full border-t border-b border-[#071a14]/15 transition-all duration-1000 ease-out ${
            isRevealed || prefersReducedMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{
            transitionDelay: prefersReducedMotion ? "0ms" : "300ms",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 w-full">
            {STATISTICS.map((stat, idx) => {
              // Exact editorial border math for 9 items:
              // Mobile (2 cols): right border on odd items except last (idx % 2 === 0 && idx < 8), bottom border on rows 1..4 (idx < 8)
              // Desktop/Tablet (5 cols): right border on items 0..3 & 5..7 ((idx + 1) % 5 !== 0 && idx !== 8), bottom border on row 1 (idx < 5)
              const isMobileRight = (idx + 1) % 2 !== 0 && idx < 8;
              const isDesktopRight = (idx + 1) % 5 !== 0 && idx !== 8;

              const isMobileBottom = idx < 8;
              const isDesktopBottom = idx < 5;

              const borderClasses = [
                isMobileRight ? "max-md:border-r" : "max-md:border-r-0",
                isDesktopRight ? "md:border-r" : "md:border-r-0",
                isMobileBottom ? "max-md:border-b" : "max-md:border-b-0",
                isDesktopBottom ? "md:border-b" : "md:border-b-0",
                "border-[#071a14]/15",
              ].join(" ");

              return (
                <div
                  key={idx}
                  className={`flex flex-col justify-start py-7 lg:py-9 px-4 sm:px-6 lg:px-8 ${borderClasses} transition-all duration-700 ease-out`}
                  style={{
                    opacity: isRevealed || prefersReducedMotion ? 1 : 0,
                    transform: isRevealed || prefersReducedMotion ? "translateY(0)" : "translateY(16px)",
                    transitionDelay: prefersReducedMotion ? "0ms" : `${350 + idx * 45}ms`,
                  }}
                >
                  {/* Large Visually Dominant Number */}
                  <span className="font-sans font-black tracking-tight text-3xl sm:text-4xl lg:text-5xl text-[#071a14] leading-none mb-3">
                    {stat.number}
                  </span>

                  {/* Restrained Uppercase Label */}
                  <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#134e3a] uppercase leading-tight">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RESTRAINED INTERNATIONAL FOOTNOTE PROOF STATEMENT BELOW GRID */}
        <div
          className={`mt-6 lg:mt-8 pt-2 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 text-left transition-all duration-1000 ease-out ${
            isRevealed || prefersReducedMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: prefersReducedMotion ? "0ms" : "800ms",
          }}
        >
          <span className="font-mono text-xs font-semibold tracking-wider text-[#059669] uppercase shrink-0">
            2 COUNTRIES BEYOND BHARAT –
          </span>
          <p className="text-xs sm:text-sm font-medium text-[#2a4d3e]/90 leading-relaxed">
            Reach extended into Malawi and Kenya
          </p>
        </div>

      </div>
    </section>
  );
}
