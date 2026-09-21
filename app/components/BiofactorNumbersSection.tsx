"use client";

import React, { useEffect, useRef, useState } from "react";

// The 8 official statistics
const STATISTICS = [
  { number: "9", label: "Patents Filed" },
  { number: "60+", label: "Elite / Deposited Strains" },
  { number: "100+", label: "Products Across Six Verticals" },
  { number: "2014", label: "Founded, Hyderabad" },
  { number: "600+", label: "Team Members" },
  { number: "3,000+", label: "Dealer Network" },
  { number: "16", label: "Indian States" },
  { number: "2", label: "Countries Beyond Bharat" },
];

export default function BiofactorNumbersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftStageRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLDivElement>(null);
  const statItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const closingTextRef = useRef<HTMLDivElement>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const isPlayingRef = useRef(false);

  // Scroll progress (0 to 1 across 400vh section) & Pointer lerp refs
  const scrollProgressRef = useRef(0);
  const targetPointerRef = useRef({ x: 0, y: 0 });
  const currentPointerRef = useRef({ x: 0, y: 0 });

  // IntersectionObserver for entrance reveal & hysteresis replay
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const ratio = entry.intersectionRatio;

        // ENTER THRESHOLD (>= 0.20): Trigger section entrance
        if (entry.isIntersecting && ratio >= 0.20) {
          if (!isPlayingRef.current) {
            isPlayingRef.current = true;
            setIsRevealed(true);
          }
        }
        // RESET THRESHOLD (<= 0.05): Re-arm entrance when user leaves section
        else if (ratio <= 0.05) {
          if (isPlayingRef.current || isRevealed) {
            isPlayingRef.current = false;
            setIsRevealed(false);
          }
        }
      },
      {
        threshold: [0, 0.05, 0.20, 0.5, 1.0]
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isRevealed]);

  // Unified rAF loop for Physical Vertical Scroll Rail, Focus Zone Interpolation & Pointer Depth
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let animFrameId: number;
    const ROW_SPACING = 125; // 125px between row centers
    const TOTAL_TRAVEL = 875; // 7 steps * 125px = 875px total track travel

    const updateScrollAndPointer = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;

      if (scrollableHeight > 0) {
        // Calculate clamped scroll progress (0.0 to 1.0)
        const rawProgress = -rect.top / scrollableHeight;
        const clampedProgress = Math.max(0, Math.min(1, rawProgress));
        scrollProgressRef.current = clampedProgress;

        // Update progress bar indicator & travelling glow dot
        if (progressBarRef.current) {
          progressBarRef.current.style.height = `${(clampedProgress * 100).toFixed(1)}%`;
        }
        if (progressDotRef.current) {
          progressDotRef.current.style.top = `${(clampedProgress * 100).toFixed(1)}%`;
        }

        // 1. PHYSICAL VERTICAL SCROLL RAIL TRANSLATION
        // Map progress 0.0 -> 0.80 to trackY 0px -> -875px. Progress 0.80 -> 1.00 is final hold.
        const scrollStepProgress = Math.min(1, clampedProgress / 0.80);
        const trackY = -scrollStepProgress * TOTAL_TRAVEL;

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(0, ${trackY.toFixed(1)}px, 0)`;
        }

        // 2. PROXIMITY-BASED FOCUS ZONE INTERPOLATION FOR EACH STATISTIC ITEM
        statItemsRef.current.forEach((itemEl, i) => {
          if (!itemEl) return;

          // Distance of item center from focus point (0 when centered)
          const itemDistance = Math.abs(i * ROW_SPACING + trackY);
          const range = 180; // 180px fade range
          const p = Math.max(0, Math.min(1, 1 - itemDistance / range)); // Proximity 1.0 at focus, 0.0 far

          const opacity = 0.22 + p * 0.78; // 0.22 -> 1.00
          const scale = 0.94 + p * 0.06;   // 0.94 -> 1.00
          const numTranslateX = (1 - p) * 12; // +12px -> 0px
          const descTranslateX = (1 - p) * -10; // -10px -> 0px
          const dividerScaleX = 0.35 + p * 0.65; // 0.35 -> 1.00

          itemEl.style.opacity = opacity.toFixed(3);
          itemEl.style.transform = `scale(${scale.toFixed(3)})`;

          const numEl = itemEl.querySelector<HTMLElement>(".stat-num");
          if (numEl) {
            numEl.style.transform = `translate3d(${numTranslateX.toFixed(1)}px, 0, 0)`;
            numEl.style.color = p > 0.6 ? "#041a12" : "#134e3a";
          }

          const descEl = itemEl.querySelector<HTMLElement>(".stat-desc");
          if (descEl) {
            descEl.style.transform = `translate3d(${descTranslateX.toFixed(1)}px, 0, 0)`;
            descEl.style.color = p > 0.6 ? "#051f15" : "#2d6a54";
          }

          const dividerEl = itemEl.querySelector<HTMLElement>(".stat-divider");
          if (dividerEl) {
            dividerEl.style.transform = `scaleX(${dividerScaleX.toFixed(3)})`;
            dividerEl.style.backgroundColor = p > 0.6 ? "#059669" : "rgba(16, 185, 129, 0.25)";

            const energyEl = dividerEl.querySelector<HTMLElement>(".stat-divider-energy");
            if (energyEl) {
              const energyOpacity = Math.max(0, (p - 0.6) * 2.5);
              energyEl.style.opacity = energyOpacity.toFixed(3);
            }
          }
        });

        // 3. FINAL MILESTONE CLOSING TEXT REVEAL (Triggers when progress >= 0.78)
        if (closingTextRef.current) {
          if (clampedProgress >= 0.78) {
            const closingP = Math.min(1, (clampedProgress - 0.78) / 0.12);
            closingTextRef.current.style.opacity = closingP.toFixed(3);
            closingTextRef.current.style.transform = `translate3d(0, ${((1 - closingP) * 18).toFixed(1)}px, 0)`;
          } else {
            closingTextRef.current.style.opacity = "0";
            closingTextRef.current.style.transform = "translate3d(0, 18px, 0)";
          }
        }

        // 4. DYNAMIC LEFT STAGE ATMOSPHERE EVOLUTION ACCORDING TO SCROLL PROGRESS
        if (ambientGlowRef.current) {
          if (clampedProgress < 0.25) {
            ambientGlowRef.current.style.opacity = "0.35";
          } else if (clampedProgress < 0.75) {
            ambientGlowRef.current.style.opacity = "0.75";
          } else {
            ambientGlowRef.current.style.opacity = "0.45";
          }
        }
      }

      // Pointer Lerp (Image container max ±4px X, ±3px Y; lerp = 0.06)
      const lerpSpeed = 0.06;
      currentPointerRef.current.x += (targetPointerRef.current.x - currentPointerRef.current.x) * lerpSpeed;
      currentPointerRef.current.y += (targetPointerRef.current.y - currentPointerRef.current.y) * lerpSpeed;

      if (logoWrapperRef.current) {
        const logoX = currentPointerRef.current.x * 0.5; // ±4px X
        const logoY = currentPointerRef.current.y * 0.6; // ±3px Y
        logoWrapperRef.current.style.transform = `translate3d(${logoX.toFixed(2)}px, ${logoY.toFixed(2)}px, 0)`;
      }

      animFrameId = requestAnimationFrame(updateScrollAndPointer);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        targetPointerRef.current = {
          x: relX * 8, // max ±4px
          y: relY * 5  // max ±3px
        };
      } else {
        targetPointerRef.current = { x: 0, y: 0 };
      }
    };

    const handleMouseLeave = () => {
      targetPointerRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    animFrameId = requestAnimationFrame(updateScrollAndPointer);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="biofactor-numbers-section"
      className="relative z-20 w-full h-[100%] lg:h-[400vh] bg-[#EAF3EA] text-[#0a1a14] overflow-visible select-none"
    >
      <style>{`
        @keyframes bioAmbientGlowBreathing {
          0% {
            transform: scale(0.95);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.06);
            opacity: 0.35;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.15;
          }
        }

        .bio-ambient-glow-layer {
          animation: bioAmbientGlowBreathing 8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .bio-ambient-glow-layer {
            animation: none !important;
            transform: none !important;
            opacity: 0.25 !important;
          }
        }
      `}</style>

      {/* STICKY VIEWPORT CONTAINER (100vh pinned on desktop LG+ displays) */}
      <div className="relative lg:sticky top-0 w-full h-auto lg:h-[100vh] overflow-hidden flex flex-col justify-between">

        {/* DESKTOP SPLIT LAYOUT (45% Left Pinned Stage / 55% Right Statistics Narrative) */}
        <div className="w-full max-w-[1700px] mx-auto h-full flex flex-col lg:flex-row items-stretch">

          {/* LEFT SIDE (45% Width): Pinned Branding, Headline & Agriculture Visual Stage */}
          <div className="w-full lg:w-[45%] h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 z-20 border-b lg:border-b-0 lg:border-r border-emerald-900/10">

            {/* Left Top: Eyebrow & Headline */}
            <div className="space-y-2 max-w-xl">
              {/* Eyebrow */}
              <div
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0)" : "translateY(12px)",
                  transition: isRevealed ? "opacity 500ms ease-out 100ms, transform 500ms ease-out 100ms" : "none"
                }}
                className="flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs font-semibold tracking-widest uppercase text-emerald-800 font-sans">
                  The Number Behind the Name
                </span>
              </div>

              {/* Editorial Heading */}
              <h2
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0)" : "translateY(18px)",
                  transition: isRevealed ? "opacity 600ms ease-out 200ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms" : "none"
                }}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-[#071a14] leading-[1.08]"
              >
                This Isn&apos;t a Pitch-Deck Company
              </h2>
            </div>

            {/* Left Middle: Approved Agriculture Visual Stage */}
            <div
              ref={leftStageRef}
              className="relative w-full -mt-2 lg:-mt-3 mb-auto py-0 flex flex-col items-center justify-center min-h-[340px] sm:min-h-[380px] lg:min-h-[420px]"
            >
              {/* Soft Atmospheric Background Glow */}
              <div
                ref={ambientGlowRef}
                className={`absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.18)_0%,rgba(16,185,129,0.06)_50%,transparent_75%)] transition-opacity duration-700 ${isRevealed ? "bio-ambient-glow-layer" : "opacity-0"
                  }`}
              />

              {/* Agriculture Visual Container with Broad Corner Radial Attenuation + Directional Fades & Overlays */}
              <div
                ref={logoWrapperRef}
                className="relative z-10 w-full max-w-[630px] mx-auto flex justify-center items-center pointer-events-auto"
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0)" : "translateY(16px)",
                  transition: isRevealed ? "opacity 700ms ease-out 250ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 250ms" : "none"
                }}
              >
                {/* WRAPPER 1: Broad Elliptical Radial Corner Attenuation Mask */}
                <div
                  className="agri-oval-corner-mask relative w-full h-[320px] sm:h-[380px] lg:h-[430px] xl:h-[440px] flex justify-center items-center overflow-hidden"
                  style={{
                    WebkitMaskImage: "radial-gradient(ellipse 78% 72% at 50% 52%, black 0%, black 58%, rgba(0,0,0,0.95) 66%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.40) 84%, rgba(0,0,0,0.12) 92%, transparent 100%)",
                    maskImage: "radial-gradient(ellipse 78% 72% at 50% 52%, black 0%, black 58%, rgba(0,0,0,0.95) 66%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.40) 84%, rgba(0,0,0,0.12) 92%, transparent 100%)"
                  }}
                >
                  {/* WRAPPER 2: Horizontal Linear Directional Mask */}
                  <div
                    className="agri-horizontal-fade relative w-full h-full flex justify-center items-center overflow-hidden"
                    style={{
                      WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.7) 10%, black 22%, black 78%, rgba(0,0,0,0.7) 90%, transparent 100%)",
                      maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.7) 10%, black 22%, black 78%, rgba(0,0,0,0.7) 90%, transparent 100%)"
                    }}
                  >
                    {/* WRAPPER 3: Vertical Linear Directional Mask */}
                    <div
                      className="agri-vertical-fade relative w-full h-full flex justify-center items-center overflow-hidden"
                      style={{
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 10%, black 22%, black 65%, rgba(0,0,0,0.5) 82%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 10%, black 22%, black 65%, rgba(0,0,0,0.5) 82%, transparent 100%)"
                      }}
                    >
                      {/* Perimeter #EAF3EA Atmospheric Overlay Gradients */}
                      <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-[#EAF3EA] via-[#EAF3EA]/50 to-transparent pointer-events-none z-20" />
                      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#EAF3EA] via-[#EAF3EA]/60 to-transparent pointer-events-none z-20" />
                      <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-[#EAF3EA] via-[#EAF3EA]/40 to-transparent pointer-events-none z-20" />
                      <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[#EAF3EA] via-[#EAF3EA]/40 to-transparent pointer-events-none z-20" />

                      {/* Central Sharp Plant Image */}
                      <img
                        src="/images/biofactor-agri-science.png"
                        alt="Biofactor Agricultural Science"
                        className="w-full h-full object-cover object-center block border-0 shadow-none bg-transparent select-none pointer-events-none relative z-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Bottom: Subtle Status Indicator */}
            <div className="pt-2 text-xs font-medium text-emerald-900/60 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Verified Corporate Records</span>
            </div>

          </div>

          {/* RIGHT SIDE (55% Width): Physical Vertical Scroll Rail & Focus Zone */}
          <div className="w-full lg:w-[55%] h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 z-20 relative">

            {/* Story Introduction (Static Header on Right Panel) */}
            <div
              style={{
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? "translateY(0)" : "translateY(16px)",
                transition: isRevealed ? "opacity 600ms ease-out 400ms, transform 600ms ease-out 400ms" : "none"
              }}
              className="mb-6 lg:mb-8 max-w-xl"
            >
              <p className="text-base sm:text-lg md:text-xl font-medium text-emerald-950/90 leading-relaxed border-l-2 border-emerald-600 pl-4">
                A DSIR-recognised R&amp;D operation, built and sold from Hyderabad since 2014.
              </p>
            </div>

            {/* STICKY TRACK VIEWPORT CONTAINER WITH PROGRESS INDICATOR */}
            <div className="relative pl-6 lg:pl-8 flex-1 min-h-[460px] lg:min-h-[500px] overflow-hidden max-w-2xl">

              {/* Thin Vertical Story Progress Indicator Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-900/15 rounded-full overflow-hidden z-20">
                <div
                  ref={progressBarRef}
                  className="w-full bg-emerald-600 rounded-full transition-all duration-75 ease-out"
                  style={{ height: "0%" }}
                />
              </div>

              {/* Travelling Glowing Indicator Dot */}
              <div
                ref={progressDotRef}
                className="absolute -left-[3px] w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] pointer-events-none z-30 -translate-y-1/2 transition-all duration-75"
                style={{ top: "0%" }}
              />

              {/* PHYSICAL VERTICAL SCROLL TRACK (Translates 875px upward as user scrolls page down) */}
              <div
                ref={trackRef}
                className="relative z-10 flex flex-col space-y-[45px] pt-[220px] will-change-transform"
              >
                {STATISTICS.map((stat, idx) => (
                  <div
                    key={idx}
                    ref={(el) => { statItemsRef.current[idx] = el; }}
                    className="relative transition-all duration-150 ease-out h-[80px] flex flex-col justify-center"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 pb-3">
                      {/* Large Number Typography */}
                      <span className="stat-num font-sans font-black tracking-tight text-3xl sm:text-4xl lg:text-5xl xl:text-6xl transition-all duration-200">
                        {stat.number}
                      </span>

                      {/* Statistic Label */}
                      <span className="stat-desc font-sans text-sm sm:text-base lg:text-lg font-semibold transition-all duration-200">
                        {stat.label}
                      </span>
                    </div>

                    {/* Proximity-Animated Divider Line with Subtle Energy Shimmer Highlight */}
                    <div className="stat-divider relative w-full h-[2px] origin-left transition-all duration-200 overflow-hidden">
                      <div className="stat-divider-energy absolute inset-0 bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-500 opacity-0 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}

                {/* Final Milestone Closing Sentence Container (Clean, integrated text styling) */}
                <div
                  ref={closingTextRef}
                  className="pt-4 transition-all duration-500 ease-out"
                  style={{ opacity: 0, transform: "translate3d(0, 18px, 0)" }}
                >
                  <div className="pl-4 py-2 border-l-2 border-emerald-600/80 bg-transparent">
                    <p className="text-sm sm:text-base font-bold text-emerald-950 leading-relaxed">
                      Reach extends into Malawi and Kenya — Biofactor&apos;s first international product licences.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
