"use client";

import React, { useEffect, useState, useRef } from "react";

export default function AboutVisionMissionSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Frame 5 Replay State Machine
  const [frame5Cycle, setFrame5Cycle] = useState(0);
  const frame5ArmedRef = useRef(true);
  const frame5WrapperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", handleMediaChange);
    }

    // 1. PLAY OBSERVER (triggers entrance animation at >= 22% visibility)
    const f5PlayObserver = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.22 &&
          frame5ArmedRef.current
        ) {
          frame5ArmedRef.current = false;
          setFrame5Cycle((prev) => prev + 1);
        }
      },
      {
        threshold: [0, 0.08, 0.16, 0.22, 0.28, 0.35],
        rootMargin: "0px",
      }
    );

    // 2. RE-ARM OBSERVER (re-arms armedRef when section leaves 25% expanded margin)
    const f5RearmObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          frame5ArmedRef.current = true;
        }
      },
      {
        threshold: 0,
        rootMargin: "25% 0px 25% 0px",
      }
    );

    if (frame5WrapperRef.current) {
      f5PlayObserver.observe(frame5WrapperRef.current);
      f5RearmObserver.observe(frame5WrapperRef.current);
    }

    return () => {
      if (frame5WrapperRef.current) {
        f5PlayObserver.unobserve(frame5WrapperRef.current);
        f5RearmObserver.unobserve(frame5WrapperRef.current);
      }
      if ("removeEventListener" in mediaQuery) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      }
    };
  }, []);

  const isAnimated = frame5Cycle > 0;

  return (
    <section
      ref={frame5WrapperRef}
      className="relative w-full bg-[#E9FFD1] text-[#17251C] font-sans select-none overflow-hidden border-none shadow-none"
    >
      <div key={frame5Cycle} className="w-full flex flex-col lg:flex-row items-stretch lg:min-h-[640px] lg:h-[680px]">

        {/* LEFT PANEL: 50% FULL-HEIGHT BEE PHOTOGRAPH */}
        <div className="relative w-full lg:w-1/2 h-[320px] sm:h-[420px] lg:h-auto min-h-full overflow-hidden">
          <img
            src="/images/about/about-vision-bee.jpg"
            alt="Honeybee gathering pollen from white wildflowers in vibrant green field"
            className={`w-full h-full object-cover object-[50%_35%] block border-none rounded-none shadow-none outline-none origin-[43%_58%] ${prefersReducedMotion
                ? "opacity-100 scale-100 filter-none"
                : isAnimated
                  ? "animate-s5-bee-focus opacity-72 scale-[1.075] fill-mode-forwards"
                  : "opacity-72 scale-[1.075] [filter:blur(7px)_saturate(0.82)_brightness(0.88)]"
              }`}
          />
          {/* Organic Light Bloom Overlay */}
          {!prefersReducedMotion && isAnimated && (
            <div className="absolute inset-0 pointer-events-none mix-blend-screen bg-[radial-gradient(circle_at_43%_58%,rgba(255,255,255,0.85)_0%,rgba(233,255,209,0.40)_35%,transparent_70%)] animate-s5-light-bloom" />
          )}
        </div>

        {/* RIGHT PANEL: 50% PALE BOTANICAL VISION & MISSION CONTENT */}
        <div className="w-full lg:w-1/2 bg-[#E9FFD1] py-12 sm:py-16 lg:py-16 flex flex-col justify-center items-center">
          <div className="w-full max-w-[540px] px-6 sm:px-10 lg:px-12 xl:px-14 flex flex-col items-start">

            {/* 1. VISION BLOCK */}
            <span
              className={`block text-[13px] font-semibold tracking-[0.04em] text-[#155B2A] mb-2 ${prefersReducedMotion
                  ? "opacity-100"
                  : isAnimated
                    ? "animate-s5-vision-label opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
            >
              Vision
            </span>

            {/* HERO VISION HEADLINE — Line-by-Line Editorial Mask Reveal */}
            <h2 className="text-[clamp(30px,2.35vw,38px)] font-bold text-[#155B2A] tracking-[-0.025em] leading-[1.16] mb-4 sm:mb-5 font-sans max-w-[500px]">
              <div className="overflow-hidden py-0.5">
                <span
                  className={`block ${prefersReducedMotion
                      ? "opacity-100"
                      : isAnimated
                        ? "animate-s5-headline-line-1 opacity-20 fill-mode-forwards"
                        : "opacity-0"
                    }`}
                >
                  A World Powered by
                </span>
              </div>
              <div className="overflow-hidden py-0.5">
                <span
                  className={`block ${prefersReducedMotion
                      ? "opacity-100"
                      : isAnimated
                        ? "animate-s5-headline-line-2 opacity-20 fill-mode-forwards"
                        : "opacity-0"
                    }`}
                >
                  Biological Intelligence
                </span>
              </div>
            </h2>

            <p
              className={`text-[15.5px] sm:text-[16px] lg:text-[17px] leading-[1.54] text-[#17251C] font-normal mb-8 sm:mb-9 max-w-[530px] ${prefersReducedMotion
                  ? "opacity-100"
                  : isAnimated
                    ? "animate-s5-vision-para opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
            >
              Life on Earth began when chemistry turned into biology. We believe farming&apos;s future works the same way &mdash; chemistry and biology working together, everywhere farming happens.
            </p>

            {/* SUBTLE BIOLOGICAL TRACE ACCENT LINE */}
            {!prefersReducedMotion && isAnimated && (
              <div className="w-full max-w-[120px] h-[1.5px] bg-[#155B2A] origin-left mb-6 pointer-events-none animate-s5-bio-trace" />
            )}

            {/* 2. MISSION BLOCK */}
            <span
              className={`block text-[13px] font-semibold tracking-[0.04em] text-[#155B2A] mb-2 ${prefersReducedMotion
                  ? "opacity-100"
                  : isAnimated
                    ? "animate-s5-mission-label opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
            >
              Mission
            </span>

            <p
              className={`text-[15.5px] sm:text-[16px] lg:text-[17px] leading-[1.54] text-[#17251C] font-normal mb-8 sm:mb-9 max-w-[530px] ${prefersReducedMotion
                  ? "opacity-100"
                  : isAnimated
                    ? "animate-s5-mission-para opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
            >
              Our mission goes beyond farming. We build biological intelligence into every living system we touch &mdash; soil, water, crops, shrimp ponds, poultry, animals, even polluted lakes &mdash; because soil, animal, and human health are all part of the same chain. Wherever that chain runs, we want biology working alongside chemistry, not left out of it.
            </p>

            {/* 3. DRAFT STATUS OUTLINED BADGE */}
            <div
              className={`inline-flex items-center px-4 py-2 rounded-[6px] border border-[#155B2A]/40 bg-transparent text-[13px] font-medium tracking-[0.02em] text-[#155B2A] ${prefersReducedMotion
                  ? "opacity-100"
                  : isAnimated
                    ? "animate-s5-draft-badge opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
            >
              Draft &mdash; pending sign-off
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
