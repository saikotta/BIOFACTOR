"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "../../i18n";

export default function OneHealthHero() {
  const { t, language } = useTranslation();
  const [hasEntered, setHasEntered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasEntered(true);
      return;
    }

    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  const headlineText = "Everything Is Connected";
  const headlineWords = headlineText.split(" ");

  return (
    <section className="relative w-full min-h-screen bg-[#fcfcf8] text-[#173522] font-sans overflow-visible flex flex-col justify-start select-none">
      <div className="one-health-atmosphere absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <i className="one-health-blob one-health-blob-green" />
        <i className="one-health-blob one-health-blob-peach" />
      </div>
      {/* Main Content Layout Wrapper (pt-20 md:pt-24 for floating capsule header clearance) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-20 md:pt-24 pb-10 flex-1 flex flex-col items-center justify-start text-center overflow-visible">

        {/* TOP TEXT BLOCK: Centered Hierarchy (relative z-20 to stay above orbit canvas) */}
        <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center relative z-20">

          {/* Eyebrow: ONE HEALTH */}
          <div
            className={`transition-all duration-700 ease-out transform ${
              hasEntered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#147A46]/25 bg-[#147A46]/10 text-[11px] font-mono font-semibold tracking-[0.25em] text-[#147A46] uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#147A46] animate-pulse" />
              {t("nav_one_health", "ONE HEALTH")}
            </span>
          </div>

          {/* Primary Headline */}
          <h1 className="mt-[12px] text-3xl sm:text-4xl lg:text-[clamp(2.4rem,3.8vw,4.2rem)] font-bold tracking-tight text-[#173522] leading-[1.05] flex flex-wrap justify-center gap-x-3">
            {language === "en" ? (
              headlineWords.map((word, idx) => (
                <span key={idx} className="overflow-hidden inline-block py-1">
                  <span
                    className="inline-block transition-transform duration-700 ease-out"
                    style={{
                      transform:
                        hasEntered || prefersReducedMotion
                          ? "translateY(0)"
                          : "translateY(110%)",
                      transitionDelay: prefersReducedMotion ? "0ms" : `${idx * 70}ms`,
                      color: word === "Connected" ? "#147A46" : undefined,
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))
            ) : (
              <span className="text-[#147A46]">{t("one_health_hero_title", "Everything Is Connected")}</span>
            )}
          </h1>

          {/* Supporting Copy (10px gap below heading) */}
          <p
            className={`mt-[10px] text-sm sm:text-base text-[#425A49] font-light italic leading-relaxed max-w-[720px] mx-auto transition-all duration-800 delay-300 ease-out transform ${
              hasEntered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {t("one_health_hero_subtitle", "“Soil, plant, animal, food, and people don't just feed into each other — they all draw on the same planet. That's not a supply chain. It's a cycle.”")}
          </p>
        </div>

        {/* Self-contained One Planet scene from the supplied design */}
        <div className="w-full mx-auto flex items-center justify-center mt-0 pt-12 sm:pt-16 relative z-10 overflow-visible">
          <div
            className={`relative w-full max-w-[1100px] aspect-[1100/780] flex items-center justify-center overflow-visible transition-all duration-1000 delay-300 ease-out transform ${
              hasEntered
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <iframe
              src="/one-health-planet-b.html"
              title="There is no Planet B: soil, plants, animals, food and people share one planet"
              className="absolute inset-0 h-full w-full border-0"
              style={{ backgroundColor: "transparent" }}
              loading="eager"
            />
          </div>
        </div>

        {/* HINT LINE AT HERO BOTTOM: Scroll to follow the chain with mt-4 (16px) in normal flow */}
        <div className="mt-4 flex flex-col items-center gap-1.5 opacity-60 relative z-30">
          <span className="text-xs font-mono tracking-widest uppercase text-[#173522]">
            Scroll to follow the chain
          </span>
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-none stroke-[#173522] animate-bounce"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              animationDuration: "2.4s",
            }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>

      </div>

      {/* Soft 40px Bottom Gradient Overlay fading into the first chapter's background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40px] pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #EDF4ED 100%)",
        }}
      />
    </section>
  );
}
