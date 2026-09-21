"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ChemistryFieldSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgInnerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const lightLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);

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

  // Magnetic button offset refs (max ±3px)
  const primaryMagTarget = useRef({ x: 0, y: 0 });
  const primaryMagCurrent = useRef({ x: 0, y: 0 });
  const secondaryMagTarget = useRef({ x: 0, y: 0 });
  const secondaryMagCurrent = useRef({ x: 0, y: 0 });

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

  // Single Unified rAF Loop for Parallax, Pointer Depth, Micro-Perspective, Interactive Sunlight & Exit Progression
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

      // 8. Magnetic CTA Button Lerp (max ±3px)
      const btnLerpSpeed = 0.12;
      
      primaryMagCurrent.current.x += (primaryMagTarget.current.x - primaryMagCurrent.current.x) * btnLerpSpeed;
      primaryMagCurrent.current.y += (primaryMagTarget.current.y - primaryMagCurrent.current.y) * btnLerpSpeed;
      if (primaryBtnRef.current) {
        primaryBtnRef.current.style.transform = `translate3d(${primaryMagCurrent.current.x.toFixed(2)}px, ${primaryMagCurrent.current.y.toFixed(2)}px, 0)`;
      }

      secondaryMagCurrent.current.x += (secondaryMagTarget.current.x - secondaryMagTarget.current.x) * btnLerpSpeed;
      secondaryMagCurrent.current.y += (secondaryMagTarget.current.y - secondaryMagTarget.current.y) * btnLerpSpeed;
      if (secondaryBtnRef.current) {
        secondaryBtnRef.current.style.transform = `translate3d(${secondaryMagCurrent.current.x.toFixed(2)}px, ${secondaryMagCurrent.current.y.toFixed(2)}px, 0)`;
      }

      animFrameId = requestAnimationFrame(updateSection);
    };

    // Pointer Event Listeners for Desktop Devices (Fine pointers only)
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
          x: centeredX * 36, // ±18px
          y: centeredY * 20  // ±10px
        };

        // Micro-Perspective Rotation Target (rotateY ±0.5deg, rotateX ±0.35deg)
        targetPerspectiveRef.current = {
          rotY: centeredX * 1.0,  // ±0.5deg
          rotX: -centeredY * 0.7  // ±0.35deg
        };

        // Interactive Sunlight Target (Follows pointer over middle/right region 25% - 95%)
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

  // Handlers for Magnetic CTA Buttons (Max ±3px)
  const handleBtnMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetRef: React.MutableRefObject<{ x: number; y: number }>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    targetRef.current = {
      x: Math.max(-3, Math.min(3, relX * 3)),
      y: Math.max(-3, Math.min(3, relY * 3))
    };
  };

  const handleBtnMouseLeave = (
    targetRef: React.MutableRefObject<{ x: number; y: number }>
  ) => {
    targetRef.current = { x: 0, y: 0 };
  };

  return (
    <section
      ref={sectionRef}
      id="chemistry-field-section"
      className="relative z-20 w-full min-h-[760px] h-[95vh] lg:h-[100vh] overflow-hidden bg-black text-white flex items-center"
    >
      {/* Keyframe stylesheet for 16s Idle Drift, Primary & Secondary Sunlight Blooms, and Atmospheric Light Travel */}
      <style>{`
        /* 16s Slow Cinematic Idle Camera Drift */
        @keyframes cinematicIdleDrift {
          0% {
            transform: translate3d(0px, 0px, 0) scale(1);
          }
          33% {
            transform: translate3d(-4px, -3px, 0) scale(1.004);
          }
          66% {
            transform: translate3d(4px, -1.5px, 0) scale(1.002);
          }
          100% {
            transform: translate3d(0px, 0px, 0) scale(1);
          }
        }

        .cinematic-idle-drift {
          animation: cinematicIdleDrift 16s ease-in-out infinite;
          will-change: transform;
        }

        /* 8s Primary Sunlight Bloom (0.12 -> 0.24 opacity, 0.90 -> 1.12 scale) */
        @keyframes primarySunlightBloom {
          0% {
            transform: scale(0.90);
            opacity: 0.12;
          }
          50% {
            transform: scale(1.12);
            opacity: 0.24;
          }
          100% {
            transform: scale(0.90);
            opacity: 0.12;
          }
        }

        .primary-sunlight-bloom {
          animation: primarySunlightBloom 8s ease-in-out infinite;
          will-change: transform, opacity;
        }

        /* 13s Secondary Atmospheric Glow (0.08 -> 0.15 opacity, 0.95 -> 1.05 scale) */
        @keyframes secondaryAtmosphericGlow {
          0% {
            transform: scale(0.95);
            opacity: 0.08;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.15;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.08;
          }
        }

        .secondary-atmospheric-glow {
          animation: secondaryAtmosphericGlow 13s ease-in-out infinite;
          will-change: transform, opacity;
        }

        /* 14s Subtle Atmospheric Light Travel Across Crops */
        @keyframes atmosphericLightTravel {
          0% {
            transform: translate3d(-25%, 0, 0);
            opacity: 0.04;
          }
          50% {
            transform: translate3d(25%, 0, 0);
            opacity: 0.08;
          }
          100% {
            transform: translate3d(-25%, 0, 0);
            opacity: 0.04;
          }
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

      {/* OUTER BACKGROUND CONTAINER (Handles 1400ms Camera Entrance Scale 1.075 -> 1.025, translateY 12px -> 0px) */}
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
        {/* PARALLAX, POINTER DEPTH & MICRO-PERSPECTIVE WRAPPER (bgInnerRef: Receives 60px Scroll Parallax + Pointer Depth + Micro-Perspective) */}
        <div ref={bgInnerRef} className="w-full h-full">
          
          {/* IDLE DRIFT WRAPPER (className="cinematic-idle-drift": Receives 16s CSS Camera Drift) */}
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
      {/* 1. Left dark forest overlay - Refined center transparency to showcase more green field */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(90deg,rgba(5,16,12,0.92)_0%,rgba(5,16,12,0.80)_25%,rgba(5,16,12,0.30)_50%,rgba(5,16,12,0)_80%)]" />
      
      {/* 2. Top & Bottom subtle atmospheric vignette */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_22%,rgba(0,0,0,0)_75%,rgba(0,0,0,0.65)_100%)]" />

      {/* 3. SECONDARY ATMOSPHERIC GLOW (13s Slower broader ambient light at 85% 22%) */}
      <div 
        className="secondary-atmospheric-glow absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_85%_22%,rgba(255,230,160,0.16)_0%,rgba(255,200,110,0.05)_50%,transparent_80%)]" 
      />

      {/* 4. PRIMARY SUNLIGHT BLOOM (8s Warm golden light breathing overlay at 85% 22% sun location) */}
      <div 
        className="primary-sunlight-bloom absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_85%_22%,rgba(255,225,150,0.26)_0%,rgba(255,200,100,0.10)_38%,transparent_68%)]" 
      />

      {/* 5. INTERACTIVE SUNLIGHT FIELD (Very large 900px soft warm pointer illumination with 0.050 lerp & left text mask protection) */}
      <div 
        ref={lightLayerRef}
        className="interactive-sunlight-field absolute inset-0 pointer-events-none z-12 hidden md:block"
        style={{
          background: "radial-gradient(circle 460px at var(--light-x, 85%) var(--light-y, 22%), rgba(255, 221, 150, 0.14) 0%, rgba(255, 205, 120, 0.07) 20%, rgba(255, 190, 100, 0.025) 38%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, transparent 32%, black 50%, black 100%)",
          maskImage: "linear-gradient(90deg, transparent 0%, transparent 32%, black 50%, black 100%)"
        }}
      />

      {/* 6. ATMOSPHERIC LIGHT TRAVEL ACROSS CROPS (14s Soft horizontal sunlight shift over middle-right) */}
      <div 
        className="atmospheric-light-travel absolute inset-y-0 right-0 w-[60%] pointer-events-none z-10 bg-[linear-gradient(90deg,transparent_0%,rgba(255,235,180,0.06)_45%,rgba(255,235,180,0.09)_55%,transparent_100%)]"
      />

      {/* 7. FOREGROUND ATMOSPHERIC DEPTH LAYER (78px total travel parallax on lower 30% of viewport) */}
      <div 
        ref={fgRef}
        className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none z-15 bg-[linear-gradient(0deg,rgba(3,12,9,0.35)_0%,rgba(3,12,9,0.12)_50%,transparent_100%)]"
      />

      {/* MAIN CONTENT CONTAINER (Positioned Left-Middle with generous rightward offset & Exit Progression) */}
      <div 
        ref={contentRef}
        className="relative z-20 w-full max-w-[1600px] mx-auto px-8 sm:px-14 md:px-20 lg:px-28 xl:px-36 2xl:px-44 flex flex-col justify-center min-h-[500px]"
      >
        <div className="max-w-[760px] space-y-7 md:space-y-9 text-left">
          
          {/* STAGED HEADLINE (Exactly two lines on desktop with overflow-hidden mask reveal & line 2 highlight sweep) */}
          <div className="space-y-1 sm:space-y-2">
            {/* Line 1 Mask */}
            <div className="overflow-hidden">
              <h2
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0)" : "translateY(32px)",
                  transition: isRevealed
                    ? "opacity 650ms ease-out 150ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) 150ms"
                    : "none"
                }}
                className="text-[32px] sm:text-[42px] md:text-[50px] lg:text-[clamp(48px,4vw,66px)] font-medium tracking-tight text-white/95 leading-[1.04] lg:whitespace-nowrap"
              >
                We don&apos;t fight chemistry.
              </h2>
            </div>

            {/* Line 2 Mask (Visually stronger emphasis with 800ms highlight sweep) */}
            <div className="overflow-hidden">
              <h2
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0)" : "translateY(36px)",
                  transition: isRevealed
                    ? "opacity 700ms ease-out 300ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) 300ms"
                    : "none"
                }}
                className="text-[32px] sm:text-[42px] md:text-[50px] lg:text-[clamp(48px,4vw,66px)] font-bold tracking-tight text-white leading-[1.04] lg:whitespace-nowrap"
              >
                <span className="relative inline-block overflow-hidden">
                  <span>We complete it.</span>
                  {/* Subtle 800ms Light Highlight Sweep Across Line 2 */}
                  <span
                    style={{
                      transform: isRevealed ? "translateX(120%)" : "translateX(-120%)",
                      transition: isRevealed
                        ? "transform 800ms cubic-bezier(0.4, 0, 0.2, 1) 900ms"
                        : "none"
                    }}
                    className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.45)_50%,transparent_100%)] pointer-events-none"
                  />
                </span>
              </h2>
            </div>
          </div>

          {/* BODY COPY REVEAL */}
          <p
            style={{
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(20px)",
              transition: isRevealed
                ? "opacity 550ms ease-out 450ms, transform 550ms cubic-bezier(0.16, 1, 0.3, 1) 450ms"
                : "none"
            }}
            className="text-base sm:text-lg md:text-xl text-emerald-50/85 font-light leading-[1.55] max-w-[660px] tracking-normal pt-1"
          >
            Biofactor works inside the systems modern agriculture, aquaculture, poultry, and animal production already run on — and adds the layer chemistry alone can&apos;t provide: living systems that interact, adapt, and regenerate.
          </p>

          {/* CALL TO ACTION BUTTON GROUP REVEAL */}
          <div
            style={{
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(16px)",
              transition: isRevealed
                ? "opacity 500ms ease-out 580ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 580ms"
                : "none"
            }}
            className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
          >
            {/* Primary CTA Button (Magnetic micro-interaction + surface highlight sweep) */}
            <a
              ref={primaryBtnRef}
              href="#science"
              onMouseMove={(e) => handleBtnMouseMove(e, primaryMagTarget)}
              onMouseLeave={() => handleBtnMouseLeave(primaryMagTarget)}
              className="group relative inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-xl bg-[#059669] hover:bg-[#10b981] text-white font-semibold text-sm sm:text-base tracking-wide shadow-lg shadow-emerald-950/40 hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 overflow-hidden"
            >
              {/* Internal Surface Light Shimmer on Hover */}
              <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.25)_50%,transparent_100%)] -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
              <span className="relative z-10">See Our Science</span>
              <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>

            {/* Secondary CTA Button (Magnetic micro-interaction + Glass surface enhancement) */}
            <a
              ref={secondaryBtnRef}
              href="#where-we-work"
              onMouseMove={(e) => handleBtnMouseMove(e, secondaryMagTarget)}
              onMouseLeave={() => handleBtnMouseLeave(secondaryMagTarget)}
              className="group relative inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 hover:border-white/45 text-white font-medium text-sm sm:text-base tracking-wide hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
            >
              <span className="relative z-10">See Where We Work</span>
              <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
