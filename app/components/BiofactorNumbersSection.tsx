"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import MicrobeField from "./MicrobeField";
import { useTranslation } from "../i18n";

const NUMBERS_EXCLUSION_ZONES = [
  // Band A: Top intro heading & statement block
  { xMinPct: 0.04, xMaxPct: 0.62, yMinPct: 0.04, yMaxPct: 0.26 },
  // Band B: Stats Grid Row 1 text region
  { xMinPct: 0.06, xMaxPct: 0.94, yMinPct: 0.32, yMaxPct: 0.52 },
  // Band C: Stats Grid Row 2 text region
  { xMinPct: 0.06, xMaxPct: 0.94, yMinPct: 0.62, yMaxPct: 0.82 },
  // Band D: Bottom international footnote
  { xMinPct: 0.06, xMaxPct: 0.70, yMinPct: 0.88, yMaxPct: 0.96 },
];

const STATISTICS = [
  // ROW 1
  { number: "11", key: "stat_patents", defaultLabel: "PATENTS GRANTED" },
  { number: "42", key: "stat_strains", defaultLabel: "PROPRIETARY AND DEPOSITED STRAINS" },
  { number: "350+", key: "stat_strain_bank", defaultLabel: "MICROBIAL STRAIN BANK" },
  { number: "200+", key: "stat_products", defaultLabel: "PRODUCTS ACROSS SIX VERTICALS" },
  { number: "600+", key: "stat_team", defaultLabel: "TEAM MEMBERS" },
  { number: "3000+", key: "stat_dealers", defaultLabel: "DEALERS’ NETWORK" },
  // ROW 2
  { number: "2", key: "stat_countries", defaultLabel: "COUNTRIES BEYOND BHARAT" },
  { number: "20+", key: "stat_states", defaultLabel: "INDIAN STATES" },
  { number: "2014", key: "stat_founded", defaultLabel: "FOUNDED, HYDERABAD" },
  { number: "1 Million+", key: "stat_farmers", defaultLabel: "HAPPY FARMERS" },
];

/**
 * Parses a numeric statistic string into its numeric value and textual suffix/prefix.
 * e.g., "350+" -> { numericValue: 350, suffix: "+" }
 *       "1 Million+" -> { numericValue: 1, suffix: " Million+" }
 */
function parseStatNumber(raw: string) {
  const match = raw.match(/^(\d+)(.*)$/);
  if (match) {
    return {
      numericValue: parseInt(match[1], 10),
      suffix: match[2],
    };
  }
  return { numericValue: null, suffix: raw };
}

/**
 * Smooth easeOutCubic animated counter component
 */
function AnimatedCounter({
  targetString,
  isRevealed,
  prefersReducedMotion,
  className,
}: {
  targetString: string;
  isRevealed: boolean;
  prefersReducedMotion: boolean;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const { numericValue, suffix } = useMemo(
    () => parseStatNumber(targetString),
    [targetString]
  );

  useEffect(() => {
    if (!isRevealed || numericValue === null || prefersReducedMotion) {
      if (numericValue !== null) setCount(numericValue);
      return;
    }

    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 1600; // 1.6s

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic easing for smooth count deceleration
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * numericValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(update);
      }
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRevealed, numericValue, prefersReducedMotion]);

  if (numericValue === null || prefersReducedMotion) {
    return <span className={className}>{targetString}</span>;
  }

  return (
    <span className={className}>
      {count}
      {suffix}
    </span>
  );
}

export default function BiofactorNumbersSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
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
      {/* MicrobeField Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 contrast-110">
        <MicrobeField
          position="absolute"
          densityMultiplier={3.0}
          opacityMultiplier={1.25}
          minVisibleCount={20}
          exclusionZones={NUMBERS_EXCLUSION_ZONES}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-between">
        
        {/* ELEGANT TOP COMPOSITION */}
        <div className="max-w-3xl flex flex-col items-start text-left space-y-3 mb-12 lg:mb-16">
          
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

        {/* FULL-WIDTH HORIZONTAL STATISTICS STRIP (REMAINS IN GRID SHAPE) */}
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
              const isMobileRight = (idx + 1) % 2 !== 0 && idx < 8;
              const isDesktopRight = ((idx + 1) % 5 !== 0 && idx !== 8) || idx === 8;

              const isMobileBottom = idx < 8;
              const isDesktopBottom = idx < 5;

              const borderClasses = [
                isMobileRight ? "max-md:border-r" : "max-md:border-r-0",
                isDesktopRight ? "md:border-r" : "md:border-r-0",
                isMobileBottom ? "max-md:border-b" : "max-md:border-b-0",
                isDesktopBottom ? "md:border-b" : "md:border-b-0",
                "border-[#071a14]/15",
              ].join(" ");

              const isActive = activeCard === idx;

              return (
                <div
                  key={idx}
                  tabIndex={0}
                  onClick={() => setActiveCard((prev) => (prev === idx ? null : idx))}
                  aria-label={`${stat.number} ${t(stat.key, stat.defaultLabel)}`}
                  className={`group relative flex flex-col justify-start py-7 lg:py-9 px-4 sm:px-6 lg:px-8 ${borderClasses} 
                    cursor-pointer outline-none transition-none rounded-none
                    ${
                      isActive
                        ? "bg-[#167A4A] border-[#167A4A] z-10"
                        : "hover:bg-[#167A4A] hover:border-[#167A4A] focus-visible:bg-[#167A4A] focus-visible:border-[#167A4A] focus-within:bg-[#167A4A] focus-within:border-[#167A4A]"
                    }
                  `}
                >
                  {/* Large Visually Dominant Number with Count Animation */}
                  <AnimatedCounter
                    targetString={stat.number}
                    isRevealed={isRevealed}
                    prefersReducedMotion={prefersReducedMotion}
                    className={`font-sans font-black tracking-tight leading-none mb-3 whitespace-nowrap transition-none ${
                      stat.number.length > 5
                        ? "text-2xl sm:text-3xl lg:text-[clamp(1.85rem,2.8vw,2.75rem)]"
                        : "text-3xl sm:text-4xl lg:text-5xl"
                    } ${
                      isActive
                        ? "text-white"
                        : "text-[#071a14] group-hover:text-white group-focus:text-white group-focus-within:text-white group-focus-visible:text-white"
                    }`}
                  />

                  {/* Restrained Uppercase Label */}
                  <span
                    className={`font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase leading-tight transition-none ${
                      isActive
                        ? "text-[#E2F8CE]"
                        : "text-[#134e3a] group-hover:text-[#E2F8CE] group-focus:text-[#E2F8CE] group-focus-within:text-[#E2F8CE] group-focus-visible:text-[#E2F8CE]"
                    }`}
                  >
                    {t(stat.key, stat.defaultLabel)}
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

