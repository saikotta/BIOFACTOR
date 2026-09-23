"use client";

import React, { useEffect, useState, useRef } from "react";

const LEADERS = [
  {
    name: "Dr. L.N. Reddy",
    role: "Founder & CEO",
  },
  {
    name: "Dr. Anil Ahire",
    role: "Director",
  },
  {
    name: "Krishna Murali",
    role: "Director",
  },
  {
    name: "S. Reddy",
    role: "Director, R&D",
  },
];

export default function AboutLeadershipSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Frame 6 Replay State Machine
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

    // 1. PLAY OBSERVER (triggers entrance animation at >= 20% visibility)
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.20 &&
          armedRef.current
        ) {
          armedRef.current = false;
          setAnimationCycle((prev) => prev + 1);
        }
      },
      {
        threshold: [0, 0.08, 0.14, 0.20, 0.26, 0.32],
        rootMargin: "0px",
      }
    );

    // 2. RE-ARM OBSERVER (re-arms armedRef when section leaves 25% expanded margin)
    const rearmObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          armedRef.current = true;
        }
      },
      {
        threshold: 0,
        rootMargin: "25% 0px 25% 0px",
      }
    );

    if (sectionRef.current) {
      playObserver.observe(sectionRef.current);
      rearmObserver.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        playObserver.unobserve(sectionRef.current);
        rearmObserver.unobserve(sectionRef.current);
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
      className="relative w-full bg-[#EDF4ED] text-[#17251C] font-sans select-none pt-18 pb-18 sm:pt-20 sm:pb-20 lg:pt-22 lg:pb-22 border-none shadow-none overflow-hidden"
    >
      <div key={animationCycle} className="w-full max-w-[1450px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        
        {/* SECTION HEADING */}
        <div className="mb-14 sm:mb-16 lg:mb-16">
          <span
            className={`block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#155B2A] mb-2 ${
              prefersReducedMotion
                ? "opacity-100"
                : isAnimated
                ? "animate-s6-label opacity-0 fill-mode-forwards"
                : "opacity-0"
            }`}
          >
            LEADERSHIP
          </span>
          <h2 className="text-[clamp(26px,2.1vw,34px)] font-bold text-[#155B2A] tracking-[-0.025em] leading-[1.15] max-w-[400px] font-sans">
            <div className="overflow-hidden py-0.5">
              <span
                className={`block ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : isAnimated
                    ? "animate-s6-title-1 opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                The People Behind the
              </span>
            </div>
            <div className="overflow-hidden py-0.5">
              <span
                className={`block ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : isAnimated
                    ? "animate-s6-title-2 opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                Platform
              </span>
            </div>
          </h2>
        </div>

        {/* FOUR TALL LEADERSHIP CARDS GRID (WITH 3D PERSPECTIVE & LIGHT PASS) */}
        <div className="relative w-full max-w-[1240px] [perspective:1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-4">
            {LEADERS.map((leader, idx) => {
              const cardAnimClass = `animate-s6-card-${idx + 1}`;
              const surfaceAnimClass = `animate-s6-surface-${idx + 1}`;
              const plateAnimClass = `animate-s6-plate-${idx + 1}`;
              const innerAnimClass = `animate-s6-plate-inner-${idx + 1}`;

              return (
                <div
                  key={idx}
                  className={`relative w-full h-[290px] sm:h-[305px] lg:h-[320px] bg-[#D2D6D0] rounded-[8px] overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.03)] border-none ${
                    prefersReducedMotion
                      ? "opacity-100 transform-none"
                      : isAnimated
                      ? `${cardAnimClass} opacity-25 fill-mode-forwards`
                      : "opacity-0"
                  }`}
                >
                  {/* OPTICAL PORTRAIT SURFACE REVEAL SWEEP */}
                  {!prefersReducedMotion && isAnimated && (
                    <div
                      className={`absolute inset-0 pointer-events-none bg-gradient-to-t from-white/14 via-white/06 to-transparent z-10 ${surfaceAnimClass}`}
                    />
                  )}

                  {/* INSET WHITE NAME PLATE AT BOTTOM */}
                  <div
                    className={`absolute bottom-2.5 left-2.5 right-2.5 z-20 bg-white rounded-[6px] py-2 px-2.5 text-center flex flex-col items-center justify-center min-h-[48px] shadow-[0_2px_6px_rgba(0,0,0,0.04)] ${
                      prefersReducedMotion
                        ? "opacity-100"
                        : isAnimated
                        ? `${plateAnimClass} opacity-0 fill-mode-forwards`
                        : "opacity-0"
                    }`}
                  >
                    <div
                      className={`w-full flex flex-col items-center justify-center ${
                        !prefersReducedMotion && isAnimated
                          ? `${innerAnimClass} opacity-65 fill-mode-forwards`
                          : ""
                      }`}
                    >
                      <h3 className="text-[12px] font-semibold text-[#17251C] tracking-[-0.01em] leading-tight">
                        {leader.name}
                      </h3>
                      <p className="text-[9px] font-normal text-[#17251C]/70 tracking-normal mt-0.5">
                        {leader.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* OPTIONAL GALLERY LIGHT PASS OVERLAY */}
          {!prefersReducedMotion && isAnimated && (
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/08 to-transparent z-30 animate-s6-gallery-light" />
          )}
        </div>

      </div>
    </section>
  );
}
