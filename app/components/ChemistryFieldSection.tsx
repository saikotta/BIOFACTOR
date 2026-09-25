"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ChemistryFieldSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgInnerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const lightLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const isPlayingRef = useRef(false);

  // Pointer & Scroll animation state refs (Zero React state updates during scroll/mouse)
  const scrollProgressRef = useRef(0.5);
  const targetPointerRef = useRef({ x: 0, y: 0 });
  const currentPointerRef = useRef({ x: 0, y: 0 });
  
  // Interactive Sunlight lerp refs (default sun position: 85% X, 22% Y, lerp = 0.050)
  const targetLightRef = useRef({ x: 85, y: 22 });
  const currentLightRef = useRef({ x: 85, y: 22 });

  // Landscape Micro-Perspective lerp refs (rotateY max ±0.5deg, rotateX max ±0.35deg, lerp = 0.045)
  const targetPerspectiveRef = useRef({ rotX: 0, rotY: 0 });
  const currentPerspectiveRef = useRef({ rotX: 0, rotY: 0 });

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

        // ENTER THRESHOLD (>= 0.20): Trigger staged cinematic reveal
        if (entry.isIntersecting && ratio >= 0.20) {
          if (!isPlayingRef.current) {
            isPlayingRef.current = true;
            setIsRevealed(true);
          }
        }
        // RESET THRESHOLD (<= 0.05): Re-arm animation when user leaves Section 3
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

  // Single Unified rAF Loop for Parallax, Pointer Depth, Micro-Perspective & Exit Progression
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let animFrameId: number;

    const updateSection = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // 1. Calculate Scroll Progress (0 when section enters bottom, 1 when leaving top)
      if (rect.top < viewportHeight && rect.bottom > 0) {
        scrollProgressRef.current = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      }

      const progress = scrollProgressRef.current;

      // 2. Weighted Pointer Translation Lerp (lerp = 0.065 speed, max ±18px X, ±10px Y)
      const pointerLerp = 0.065;
      currentPointerRef.current.x += (targetPointerRef.current.x - currentPointerRef.current.x) * pointerLerp;
      currentPointerRef.current.y += (targetPointerRef.current.y - currentPointerRef.current.y) * pointerLerp;

      // 3. Micro-Perspective Rotation Lerp (lerp = 0.045 speed, max ±0.5deg Y, ±0.35deg X)
      const perspectiveLerp = 0.045;
      currentPerspectiveRef.current.rotX += (targetPerspectiveRef.current.rotX - currentPerspectiveRef.current.rotX) * perspectiveLerp;
      currentPerspectiveRef.current.rotY += (targetPerspectiveRef.current.rotY - currentPerspectiveRef.current.rotY) * perspectiveLerp;

      // 4. Interactive Sunlight Follow Lerp (lerp = 0.050 speed)
      const lightLerp = 0.050;
      currentLightRef.current.x += (targetLightRef.current.x - currentLightRef.current.x) * lightLerp;
      currentLightRef.current.y += (targetLightRef.current.y - currentLightRef.current.y) * lightLerp;

      if (lightLayerRef.current) {
        lightLayerRef.current.style.setProperty("--light-x", `${currentLightRef.current.x.toFixed(2)}%`);
        lightLayerRef.current.style.setProperty("--light-y", `${currentLightRef.current.y.toFixed(2)}%`);
      }

      // 5. Main Background: Combined 60px Scroll Parallax + Pointer Translation + Micro-Perspective (perspective 1600px)
      const bgParallaxY = (progress - 0.5) * 60;
      if (bgInnerRef.current) {
        const totalBgY = bgParallaxY + currentPointerRef.current.y;
        const totalBgX = currentPointerRef.current.x;
        const rotX = currentPerspectiveRef.current.rotX;
        const rotY = currentPerspectiveRef.current.rotY;

        bgInnerRef.current.style.transform = `perspective(1600px) translate3d(${totalBgX.toFixed(2)}px, ${totalBgY.toFixed(2)}px, 0) rotateX(${rotX.toFixed(3)}deg) rotateY(${rotY.toFixed(3)}deg)`;
      }

      // 6. Foreground Atmospheric Parallax (78px total travel: -39px to +39px)
      const fgParallaxY = (progress - 0.5) * 78;
      if (fgRef.current) {
        const totalFgX = currentPointerRef.current.x * 1.35;
        fgRef.current.style.transform = `translate3d(${totalFgX.toFixed(2)}px, ${fgParallaxY.toFixed(2)}px, 0)`;
      }

      // 7. Exit Progression (Last 20% of section scroll: translateY 0 -> -12px, opacity 1 -> 0.94)
      if (contentRef.current) {
        if (progress > 0.8) {
          const exitFraction = Math.min(1, (progress - 0.8) / 0.2);
          const exitY = exitFraction * -12;
          const exitOpacity = 1 - exitFraction * 0.06;
          contentRef.current.style.transform = `translate3d(0, ${exitY.toFixed(2)}px, 0)`;
          contentRef.current.style.opacity = exitOpacity.toFixed(3);
        } else {
          contentRef.current.style.transform = "translate3d(0, 0px, 0)";
          contentRef.current.style.opacity = "1";
        }
      }

      animFrameId = requestAnimationFrame(updateSection);
    };

    // Pointer Event Listeners for Desktop Devices
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const relativeX = (e.clientX - rect.left) / rect.width;
        const relativeY = (e.clientY - rect.top) / rect.height;
        
        // Pointer Translation Target (±18px X, ±10px Y)
        const centeredX = relativeX - 0.5;
        const centeredY = relativeY - 0.5;
        targetPointerRef.current = {
          x: centeredX * 36,
          y: centeredY * 20
        };

        // Micro-Perspective Rotation Target (rotateY ±0.5deg, rotateX ±0.35deg)
        targetPerspectiveRef.current = {
          rotY: centeredX * 1.0,
          rotX: -centeredY * 0.7
        };

        // Interactive Sunlight Target
        targetLightRef.current = {
          x: Math.max(25, Math.min(95, relativeX * 100)),
          y: Math.max(10, Math.min(85, relativeY * 100))
        };
      } else {
        targetPointerRef.current = { x: 0, y: 0 };
        targetPerspectiveRef.current = { rotX: 0, rotY: 0 };
        targetLightRef.current = { x: 85, y: 22 };
      }
    };

    const handleMouseLeave = () => {
      targetPointerRef.current = { x: 0, y: 0 };
      targetPerspectiveRef.current = { rotX: 0, rotY: 0 };
      targetLightRef.current = { x: 85, y: 22 };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    animFrameId = requestAnimationFrame(updateSection);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chemistry-field-section"
      className="relative z-20 w-full min-h-[760px] h-[95vh] lg:h-[100vh] overflow-hidden bg-black text-white flex items-center"
    >
      {/* Keyframe stylesheet */}
      <style>{`
        @keyframes cinematicIdleDrift {
          0% { transform: translate3d(0px, 0px, 0) scale(1); }
          33% { transform: translate3d(-4px, -3px, 0) scale(1.004); }
          66% { transform: translate3d(4px, -1.5px, 0) scale(1.002); }
          100% { transform: translate3d(0px, 0px, 0) scale(1); }
        }
        .cinematic-idle-drift {
          animation: cinematicIdleDrift 16s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes primarySunlightBloom {
          0% { transform: scale(0.90); opacity: 0.12; }
          50% { transform: scale(1.12); opacity: 0.24; }
          100% { transform: scale(0.90); opacity: 0.12; }
        }
        .primary-sunlight-bloom {
          animation: primarySunlightBloom 8s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes secondaryAtmosphericGlow {
          0% { transform: scale(0.95); opacity: 0.08; }
          50% { transform: scale(1.05); opacity: 0.15; }
          100% { transform: scale(0.95); opacity: 0.08; }
        }
        .secondary-atmospheric-glow {
          animation: secondaryAtmosphericGlow 13s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes atmosphericLightTravel {
          0% { transform: translate3d(-25%, 0, 0); opacity: 0.04; }
          50% { transform: translate3d(25%, 0, 0); opacity: 0.08; }
          100% { transform: translate3d(-25%, 0, 0); opacity: 0.04; }
        }
        .atmospheric-light-travel {
          animation: atmosphericLightTravel 14s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .cinematic-idle-drift,
          .primary-sunlight-bloom,
          .secondary-atmospheric-glow,
          .atmospheric-light-travel,
          .interactive-sunlight-field {
            animation: none !important;
            opacity: 0.12 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* OUTER BACKGROUND CONTAINER */}
      <div 
        className="absolute inset-0 w-[105%] -left-[2.5%] h-[120%] -top-[10%] pointer-events-none select-none transition-transform duration-1400"
        style={{
          transform: isRevealed
            ? "scale(1.025) translateY(0px)"
            : "scale(1.075) translateY(12px)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDuration: "1400ms"
        }}
      >
        <div ref={bgInnerRef} className="w-full h-full">
          <div className="w-full h-full cinematic-idle-drift">
            <img
              src="/images/biofactor-field-premium.png"
              alt="Biofactor Agricultural Field"
              className="w-full h-full object-cover block border-0 shadow-none rounded-none"
            />
          </div>
        </div>
      </div>

      {/* MULTI-LAYERED CINEMATIC OVERLAYS */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(90deg,rgba(5,16,12,0.92)_0%,rgba(5,16,12,0.80)_25%,rgba(5,16,12,0.30)_50%,rgba(5,16,12,0)_80%)]" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_22%,rgba(0,0,0,0)_75%,rgba(0,0,0,0.65)_100%)]" />
      <div className="secondary-atmospheric-glow absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_85%_22%,rgba(255,230,160,0.16)_0%,rgba(255,200,110,0.05)_50%,transparent_80%)]" />
      <div className="primary-sunlight-bloom absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_85%_22%,rgba(255,225,150,0.26)_0%,rgba(255,200,100,0.10)_38%,transparent_68%)]" />
      <div 
        ref={lightLayerRef}
        className="interactive-sunlight-field absolute inset-0 pointer-events-none z-12 hidden md:block"
        style={{
          background: "radial-gradient(circle 460px at var(--light-x, 85%) var(--light-y, 22%), rgba(255, 221, 150, 0.14) 0%, rgba(255, 205, 120, 0.07) 20%, rgba(255, 190, 100, 0.025) 38%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, transparent 32%, black 50%, black 100%)",
          maskImage: "linear-gradient(90deg, transparent 0%, transparent 32%, black 50%, black 100%)"
        }}
      />
      <div className="atmospheric-light-travel absolute inset-y-0 right-0 w-[60%] pointer-events-none z-10 bg-[linear-gradient(90deg,transparent_0%,rgba(255,235,180,0.06)_45%,rgba(255,235,180,0.09)_55%,transparent_100%)]" />
      <div 
        ref={fgRef}
        className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none z-15 bg-[linear-gradient(0deg,rgba(3,12,9,0.35)_0%,rgba(3,12,9,0.12)_50%,transparent_100%)]"
      />

      {/* MAIN CONTENT CONTAINER */}
      <div 
        ref={contentRef}
        className="relative z-20 w-full max-w-[1500px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 pt-16 sm:pt-20 lg:pt-24 pb-10 lg:pb-14 flex flex-col justify-center min-h-[580px]"
      >
        {/* UPPER DESKTOP COMPOSITION: Headline & Supporting Text (Left) + 2x2 Scientific Table (Right) */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-10 lg:gap-12 xl:gap-14">
          
          {/* LEFT COLUMN: Large Extra-Bold Headline + Highlighted Supporting Sentence */}
          <div className="w-full lg:w-[48%] xl:w-[46%] flex flex-col justify-center space-y-5 sm:space-y-6">
            
            {/* STAGGERED HEADLINE */}
            <div className="space-y-1">
              <div className="overflow-hidden py-0.5">
                <h2
                  style={{
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "translateY(0)" : "translateY(32px)",
                    transition: isRevealed
                      ? "opacity 650ms ease-out 150ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) 150ms"
                      : "none"
                  }}
                  className="text-[36px] sm:text-[48px] md:text-[58px] lg:text-[clamp(48px,4.1vw,74px)] font-extrabold tracking-[-0.04em] text-white leading-[0.98]"
                >
                  A microorganism
                </h2>
              </div>

              <div className="overflow-hidden py-0.5">
                <h2
                  style={{
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "translateY(0)" : "translateY(34px)",
                    transition: isRevealed
                      ? "opacity 680ms ease-out 220ms, transform 680ms cubic-bezier(0.16, 1, 0.3, 1) 220ms"
                      : "none"
                  }}
                  className="text-[36px] sm:text-[48px] md:text-[58px] lg:text-[clamp(48px,4.1vw,74px)] font-extrabold tracking-[-0.04em] text-white leading-[0.98]"
                >
                  is more
                </h2>
              </div>

              <div className="overflow-hidden py-0.5">
                <h2
                  style={{
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "translateY(0)" : "translateY(36px)",
                    transition: isRevealed
                      ? "opacity 700ms ease-out 300ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 300ms"
                      : "none"
                  }}
                  className="text-[36px] sm:text-[48px] md:text-[58px] lg:text-[clamp(48px,4.1vw,74px)] font-extrabold tracking-[-0.04em] text-white leading-[0.98]"
                >
                  than a cell.
                </h2>
              </div>
            </div>

            {/* SUPPORTING SENTENCE WITH RESTRAINED BOTANICAL MINT ACCENTS */}
            <p
              style={{
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? "translateY(0)" : "translateY(20px)",
                transition: isRevealed
                  ? "opacity 550ms ease-out 450ms, transform 550ms cubic-bezier(0.16, 1, 0.3, 1) 450ms"
                  : "none"
              }}
              className="text-base sm:text-lg md:text-xl text-white/85 font-light leading-[1.55] max-w-[540px]"
            >
              It is a living system that{" "}
              <span className="text-[#9DDC72] font-medium">makes</span>,{" "}
              <span className="text-[#9DDC72] font-medium">transforms</span>,{" "}
              <span className="text-[#9DDC72] font-medium">responds</span>, and{" "}
              <span className="text-[#9DDC72] font-medium">adapts</span>.
            </p>

          </div>

          {/* RIGHT COLUMN: 2x2 SCIENTIFIC TABLE WITH SUBTLE TRANSPARENT BACKING */}
          <div
            style={{
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(24px)",
              transition: isRevealed
                ? "opacity 750ms ease-out 350ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) 350ms"
                : "none"
            }}
            className="w-full max-w-[620px] lg:w-[600px] xl:w-[620px] shrink-0 grid grid-cols-1 sm:grid-cols-2 border border-[rgba(170,220,185,0.34)] bg-[rgba(5,22,16,0.58)] rounded-none self-center"
          >
            {/* Cell 1: Makes */}
            <div className="p-7 sm:p-[30px] flex flex-col items-start justify-start sm:h-[170px] border-b border-[rgba(170,220,185,0.34)] sm:border-r">
              <div className="flex items-center text-[#A9D99A] mb-5 sm:mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <rect x="3" y="6" width="18" height="12" rx="6" />
                  <path d="M12 6v12" strokeDasharray="2 2" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-[26px] font-bold text-[#F4F7F2] tracking-tight leading-[1.1] mb-2.5 sm:mb-3">
                Makes
              </h3>
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.12em] uppercase text-[#B7D8B0] whitespace-nowrap">
                ENZYMES &middot; METABOLITES
              </div>
            </div>

            {/* Cell 2: Transforms */}
            <div className="p-7 sm:p-[30px] flex flex-col items-start justify-start sm:h-[170px] border-b border-[rgba(170,220,185,0.34)]">
              <div className="flex items-center text-[#A9D99A] mb-5 sm:mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 12a8 8 0 0114.93-4M20 12a8 8 0 01-14.93 4" strokeLinecap="round" />
                  <polyline points="19 4 19 8 15 8" />
                  <polyline points="5 20 5 16 9 16" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-[26px] font-bold text-[#F4F7F2] tracking-tight leading-[1.1] mb-2.5 sm:mb-3">
                Transforms
              </h3>
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.12em] uppercase text-[#B7D8B0] whitespace-nowrap">
                NUTRIENTS &middot; MATTER
              </div>
            </div>

            {/* Cell 3: Responds */}
            <div className="p-7 sm:p-[30px] flex flex-col items-start justify-start sm:h-[170px] border-b sm:border-b-0 border-[rgba(170,220,185,0.34)] sm:border-r">
              <div className="flex items-center text-[#A9D99A] mb-5 sm:mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="8" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-[26px] font-bold text-[#F4F7F2] tracking-tight leading-[1.1] mb-2.5 sm:mb-3">
                Responds
              </h3>
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.12em] uppercase text-[#B7D8B0] whitespace-nowrap">
                SIGNALS &middot; ENVIRONMENT
              </div>
            </div>

            {/* Cell 4: Adapts */}
            <div className="p-7 sm:p-[30px] flex flex-col items-start justify-start sm:h-[170px]">
              <div className="flex items-center text-[#A9D99A] mb-5 sm:mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path d="M2 12c4-8 8 8 12 0s8 8 8 0" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-[26px] font-bold text-[#F4F7F2] tracking-tight leading-[1.1] mb-2.5 sm:mb-3">
                Adapts
              </h3>
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.12em] uppercase text-[#B7D8B0] whitespace-nowrap">
                SOIL &middot; WATER &middot; HOST
              </div>
            </div>
          </div>

        </div>

        {/* LOWER DIVIDER & REFINED STATEMENT AREA */}
        <div
          style={{
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? "translateY(0)" : "translateY(24px)",
            transition: isRevealed
              ? "opacity 600ms ease-out 500ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 500ms"
              : "none"
          }}
          className="w-full my-8 sm:my-10 lg:my-12 pt-8 sm:pt-10 border-t border-[rgba(244,245,236,0.16)]"
        >
          {/* Final Statement with Aligned Pink x Marker */}
          <div className="flex items-baseline gap-2.5 sm:gap-3.5 max-w-[1100px]">
            <span className="text-[#FF6B8B] font-bold text-xl sm:text-2xl lg:text-[28px] leading-none select-none">
              &times;
            </span>
            <p className="text-xl sm:text-2xl lg:text-[28px] font-normal text-white/95 leading-[1.3] tracking-[-0.015em]">
              When they interact, their potential
              <br className="hidden sm:inline" />
              multiplies far beyond any single organism.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
