"use client";

import React, { useEffect, useState, useRef } from "react";

export default function AboutHeroSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", handleMediaChange);
    }

    // Gentle scroll parallax calculation
    let animationFrameId: number;
    const handleScroll = () => {
      if (prefersReducedMotion) return;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setScrollY(window.scrollY);
      }
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if ("removeEventListener" in mediaQuery) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      }
    };
  }, [prefersReducedMotion]);

  // Parallax offsets (restrained displacement)
  const textTranslateY = prefersReducedMotion ? 0 : Math.min(45, scrollY * 0.08);
  const ecosystemParallaxY = prefersReducedMotion ? 0 : Math.min(22, scrollY * 0.03);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[76vh] min-h-[580px] max-h-[820px] overflow-hidden select-none font-sans border-b border-[#147A46]/12 flex items-center justify-between"
      style={{
        backgroundColor: "#B8DDA3",
      }}
    >

      {/* Organic Pollen Particles (8-12 subtle drifting points) */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[
            { top: "25%", left: "45%", delay: "0s", duration: "14s" },
            { top: "35%", left: "65%", delay: "2s", duration: "18s" },
            { top: "60%", left: "80%", delay: "4s", duration: "16s" },
            { top: "45%", left: "30%", delay: "1s", duration: "20s" },
            { top: "70%", left: "55%", delay: "3s", duration: "15s" },
            { top: "20%", left: "85%", delay: "5s", duration: "17s" },
            { top: "50%", left: "40%", delay: "2.5s", duration: "19s" },
            { top: "30%", left: "75%", delay: "0.5s", duration: "13s" },
            { top: "65%", left: "90%", delay: "3.5s", duration: "21s" },
            { top: "80%", left: "35%", delay: "1.5s", duration: "16s" },
          ].map((particle, idx) => (
            <span
              key={idx}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#147A46]/15 blur-[0.5px] animate-pollen-float"
              style={{
                top: particle.top,
                left: particle.left,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-20 w-full max-w-[1700px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 h-full flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Column: Headline & Supporting Copy */}
        <div
          className="w-full md:w-1/2 max-w-2xl py-10 md:py-16 flex flex-col items-start justify-center z-30"
          style={{
            transform: `translateY(${textTranslateY}px)`,
            transition: prefersReducedMotion ? "none" : "transform 0.1s ease-out",
          }}
        >
          {/* Headline */}
          <h1 className="text-[clamp(2.25rem,4.2vw,4.5rem)] font-bold tracking-tight leading-[1.12] text-[#173522]">
            <span
              className={`block ${
                prefersReducedMotion
                  ? "opacity-100"
                  : "animate-fade-slide-up opacity-0 fill-mode-forwards"
              }`}
              style={{ animationDelay: "150ms", animationDuration: "750ms" }}
            >
              Build the Best to Live, With
            </span>
            <span
              className={`block text-[#147A46] mt-1 sm:mt-2 ${
                prefersReducedMotion
                  ? "opacity-100"
                  : "animate-fade-slide-up opacity-0 fill-mode-forwards"
              }`}
              style={{ animationDelay: "280ms", animationDuration: "750ms" }}
            >
              Nature&apos;s Partnership
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            className={`mt-6 text-base sm:text-lg md:text-xl text-[#425A49] font-normal leading-relaxed max-w-lg ${
              prefersReducedMotion
                ? "opacity-100"
                : "animate-fade-slide-up opacity-0 fill-mode-forwards"
            }`}
            style={{ animationDelay: "450ms", animationDuration: "650ms" }}
          >
            That&apos;s been our founding statement since 2014.
          </p>
        </div>

        {/* Right / Center Area: Enlarged Approved Ecosystem PNG Artwork */}
        <div
          className={`absolute -right-[2vw] bottom-0 pointer-events-none select-none z-10 w-[108vw] sm:w-[84vw] md:w-[75vw] lg:w-[75vw] max-w-[1400px] h-auto flex items-end justify-end ${
            prefersReducedMotion
              ? "opacity-80"
              : "animate-ecosystem-reveal opacity-0 fill-mode-forwards"
          }`}
          style={{
            transform: `translateY(${ecosystemParallaxY}px)`,
            transition: prefersReducedMotion ? "none" : "transform 0.1s ease-out",
            animationDelay: "350ms",
          }}
        >
          <img
            src="/images/about-ecosystem.png"
            alt="Biofactor Ecosystem Artwork"
            className="w-full h-auto object-contain block opacity-80 drop-shadow-[0_2px_14px_rgba(20,122,70,0.06)]"
          />
        </div>

      </div>
    </section>
  );
}
