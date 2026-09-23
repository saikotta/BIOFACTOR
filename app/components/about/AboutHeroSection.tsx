"use client";

import React, { useEffect, useState, useRef } from "react";

export default function AboutHeroSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(true);
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 1. Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", handleMediaChange);
    }

    // 2. Offscreen & Trigger Observer (triggers entrance animation at 18% visibility, resets offscreen)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.18) {
          setHasTriggered(true);
        } else if (!entry.isIntersecting || entry.intersectionRatio === 0) {
          setHasTriggered(false);
        }
      },
      { threshold: [0, 0.18] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // 3. Direct Clamped Scroll Transforms (Section 1 exit into Section 2)
    let ticking = false;
    const handleScroll = () => {
      if (prefersReducedMotion) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
              setScrollY(window.scrollY);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if ("removeEventListener" in mediaQuery) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      }
    };
  }, [prefersReducedMotion]);

  // Direct clamped scroll progress values for Section 1 exit transition into Section 2
  const scrollProgress = Math.min(1, Math.max(0, scrollY / 450));
  const textTranslateY = prefersReducedMotion ? 0 : scrollProgress * -20;
  const textOpacity = prefersReducedMotion ? 1 : 1 - scrollProgress * 0.28; // 1 -> 0.72
  const ecosystemScrollY = prefersReducedMotion ? 0 : scrollProgress * 12;

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-auto min-h-[460px] md:h-[500px] lg:h-[520px] xl:h-[550px] 2xl:h-[550px] overflow-hidden select-none font-sans border-b border-[#147A46]/12 flex items-center justify-between ${
        !isInView ? "is-paused" : ""
      }`}
      style={{
        backgroundColor: "#B8DDA3",
      }}
    >
      {/* 1. Cinematic Background Atmosphere Radial Highlight */}
      <div
        className={`absolute inset-0 pointer-events-none z-0 ${
          prefersReducedMotion
            ? "opacity-100"
            : "animate-s1-atmos fill-mode-forwards"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 42% 48%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 30%, transparent 65%)",
        }}
      />

      {/* Main Layout Container */}
      <div className="relative z-20 w-full max-w-[1700px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 h-full flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Column: Masked Headline & Supporting Copy */}
        <div
          className="w-full md:w-1/2 max-w-2xl py-8 md:py-10 flex flex-col items-start justify-center z-30"
          style={{
            transform: `translateY(${textTranslateY}px)`,
            opacity: textOpacity,
          }}
        >
          {/* Headline with Clean Masked Line Reveals (Line 1 starts at 100ms, Line 2 at 250ms) */}
          <h1 className="text-[clamp(2.1rem,3.8vw,4.25rem)] font-bold tracking-tight leading-[1.12] text-[#173522]">
            {/* Masked Line 1: Build the Best to Live, With (100ms delay) */}
            <div className="overflow-hidden py-0.5">
              <span
                className={`block ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : hasTriggered
                    ? "animate-s1-line1 opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                Build the Best to Live, With
              </span>
            </div>

            {/* Masked Line 2: Nature's Partnership (250ms delay with left-to-right clip reveal) */}
            <div className="overflow-hidden py-0.5">
              <span
                className={`block text-[#147A46] mt-1 sm:mt-2 origin-left ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : hasTriggered
                    ? "animate-s1-line2 opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                Nature&apos;s Partnership
              </span>
            </div>
          </h1>

          {/* Founding Statement (650ms delay) */}
          <p
            className={`mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-[#425A49] font-normal leading-relaxed max-w-lg ${
              prefersReducedMotion
                ? "opacity-100"
                : hasTriggered
                ? "animate-s1-subtext opacity-0 fill-mode-forwards"
                : "opacity-0"
            }`}
          >
            That&apos;s been our founding statement since 2014.
          </p>
        </div>

        {/* Right / Center Area: Soft Materialize Entrance for Ecosystem PNG Artwork (300ms delay, translateY(20px) scale(0.985) blur(2px) -> translateY(0) scale(1) blur(0)) */}
        <div
          className={`absolute right-0 bottom-0 pointer-events-none select-none z-10 w-[108vw] sm:w-[84vw] md:w-[75vw] lg:w-[75vw] max-w-[1350px] h-auto flex items-end justify-end overflow-hidden ${
            prefersReducedMotion
              ? "opacity-100"
              : hasTriggered
              ? "animate-s1-ecosystem opacity-0 fill-mode-forwards"
              : "opacity-0"
          }`}
          style={{
            transform: `translateY(${ecosystemScrollY}px)`,
          }}
        >
          {/* Ecosystem Image Wrapper */}
          <div className="relative w-full h-auto">
            <img
              src="/images/about-ecosystem.png"
              alt="Biofactor Ecosystem Artwork"
              className="w-full h-auto object-contain block drop-shadow-[0_2px_10px_rgba(20,122,70,0.04)]"
              style={{ opacity: 0.45 }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}




