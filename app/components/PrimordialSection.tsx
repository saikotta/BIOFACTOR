"use client";

import React, { useEffect, useRef, useState } from "react";

export default function PrimordialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bottomContainerRef = useRef<HTMLDivElement>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isBottomRevealed, setIsBottomRevealed] = useState(false);

  const isPlayingRef = useRef(false);
  const isRevealedRef = useRef(false);
  const isBottomRevealedRef = useRef(false);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      isRevealedRef.current = true;
      isBottomRevealedRef.current = true;
      setIsRevealed(true);
      setIsBottomRevealed(true);
      return;
    }

    // Observer 1: Callouts & Primordial Artwork Reveal
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const ratio = entry.intersectionRatio;

        // ENTER THRESHOLD (>= 0.20): Trigger staggered reveal when section enters
        if (entry.isIntersecting && ratio >= 0.20) {
          if (!isPlayingRef.current || !isRevealedRef.current) {
            isPlayingRef.current = true;
            isRevealedRef.current = true;
            setIsRevealed(true);
          }
        }
        // RESET / ARM THRESHOLD (!isIntersecting or ratio <= 0.12): Immediately reset ALL callouts together
        else if (!entry.isIntersecting || ratio <= 0.12) {
          if (isPlayingRef.current || isRevealedRef.current) {
            isPlayingRef.current = false;
            isRevealedRef.current = false;
            setIsRevealed(false);
          }
        }
      },
      {
        threshold: [0, 0.05, 0.12, 0.20, 0.5, 1.0]
      }
    );

    // Observer 2: Independent Viewport Trigger for Closing Bottom Statement & Subtitle
    const bottomObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const ratio = entry.intersectionRatio;

        if (entry.isIntersecting && ratio >= 0.15) {
          if (!isBottomRevealedRef.current) {
            isBottomRevealedRef.current = true;
            setIsBottomRevealed(true);
          }
        } else if (!entry.isIntersecting || ratio <= 0.05) {
          if (isBottomRevealedRef.current) {
            isBottomRevealedRef.current = false;
            setIsBottomRevealed(false);
          }
        }
      },
      {
        threshold: [0, 0.05, 0.15, 0.5, 1.0],
        rootMargin: "0px 0px -40px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    if (bottomContainerRef.current) {
      bottomObserver.observe(bottomContainerRef.current);
    }

    return () => {
      observer.disconnect();
      bottomObserver.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="primordial-elements"
      className="relative z-20 w-full bg-[#EAF3EA] text-[#0d1f1c] py-16 md:py-24 lg:py-28 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      {/* Keyframe stylesheet for continuous levitation animation */}
      <style>{`
        @keyframes primordialLevitate {
          0% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-8px) rotate(-0.08deg) scale(1.002);
          }
          50% {
            transform: translateY(-14px) rotate(0deg) scale(1.003);
          }
          75% {
            transform: translateY(-7px) rotate(0.08deg) scale(1.002);
          }
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
        }

        .primordial-levitate-unit {
          animation: primordialLevitate 6s ease-in-out infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .primordial-levitate-unit {
            animation: none !important;
          }
        }
      `}</style>

      <div className="max-w-[1600px] mx-auto flex flex-col justify-between items-center space-y-10 md:space-y-14 lg:space-y-16">
        
        {/* TOP-LEFT: Explanatory paragraph (Static - Does NOT float) */}
        <div className="w-full flex justify-start pl-2 md:pl-6 lg:pl-8">
          <p className="max-w-md sm:max-w-lg md:max-w-xl text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#142925] tracking-tight">
            Billions of years ago, Earth was gas, mineral, water, and energy — nothing that could be called alive. Chemistry ran its course for a very long time before it produced something that could adapt, repair, and reproduce itself. When it did, everything changed.
          </p>
        </div>

        {/* MIDDLE: 3D primordial visual container */}
        <div className="w-full flex justify-center items-center my-2 md:my-4">
          
          {/* OUTER WRAPPER: Handles continuous 6s levitation for transparent PNG + Callouts as ONE unit */}
          <div className="w-full primordial-levitate-unit">
            
            {/* INNER CONTAINER: Houses relative coordinate system and entrance Scan & Identify animation */}
            <div className="relative w-[88vw] max-w-[1500px] aspect-[1942/809] mx-auto select-none">
              
              {/* Transparent 3D Artwork PNG */}
              <img
                src="/images/primordial-elements-transparent.png"
                alt="Primordial Elements — Gas, Minerals, Water, Energy"
                className="w-full h-full object-contain block border-0 shadow-none rounded-none bg-transparent pointer-events-none"
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed 
                    ? "translateY(0px) scale(1)" 
                    : "translateY(30px) scale(0.94)",
                  transition: isRevealed
                    ? "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)"
                    : "none"
                }}
              />

              {/* SVG Connector Lines & Target Markers Overlay */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden sm:block" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="subtleLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="0.2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* CONNECTOR LINES (Target → Label upward draw) */}
                {/* 1. Primordial Gas Connector Line */}
                <line 
                  x1="16" y1="11.5" x2="22" y2="36" 
                  stroke="rgba(255,255,255,0.65)" 
                  strokeWidth="0.1" 
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={isRevealed ? "0" : "-1"}
                  filter="url(#subtleLineGlow)"
                  style={{
                    transition: isRevealed ? "stroke-dashoffset 500ms ease-out 400ms" : "none"
                  }}
                />
                {/* 2. Minerals Connector Line */}
                <line 
                  x1="39" y1="15.5" x2="42" y2="50" 
                  stroke="rgba(255,255,255,0.65)" 
                  strokeWidth="0.1" 
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={isRevealed ? "0" : "-1"}
                  filter="url(#subtleLineGlow)"
                  style={{
                    transition: isRevealed ? "stroke-dashoffset 500ms ease-out 1050ms" : "none"
                  }}
                />
                {/* 3. Water Connector Line */}
                <line 
                  x1="64" y1="15.5" x2="62" y2="56" 
                  stroke="rgba(255,255,255,0.65)" 
                  strokeWidth="0.1" 
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={isRevealed ? "0" : "-1"}
                  filter="url(#subtleLineGlow)"
                  style={{
                    transition: isRevealed ? "stroke-dashoffset 500ms ease-out 1700ms" : "none"
                  }}
                />
                {/* 4. Energy Connector Line */}
                <line 
                  x1="84" y1="11.5" x2="82" y2="42" 
                  stroke="rgba(255,255,255,0.65)" 
                  strokeWidth="0.1" 
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={isRevealed ? "0" : "-1"}
                  filter="url(#subtleLineGlow)"
                  style={{
                    transition: isRevealed ? "stroke-dashoffset 500ms ease-out 2350ms" : "none"
                  }}
                />

                {/* TARGET MARKERS & ELEMENTAL EXPANDING PULSE RINGS */}
                {/* 1. Primordial Gas Target */}
                <g transform="translate(22, 36)">
                  <circle
                    cx="0" cy="0" r="0.55" fill="none" stroke="#c2ece6" strokeWidth="0.15"
                    style={{
                      opacity: isRevealed ? 0 : 0.9,
                      transform: isRevealed ? "scale(2.4)" : "scale(0.6)",
                      transformOrigin: "center",
                      transition: isRevealed ? "opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1) 400ms, transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1) 400ms" : "none"
                    }}
                  />
                  <g style={{
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "scale(1)" : "scale(0.5)",
                    transformOrigin: "center",
                    transition: isRevealed ? "opacity 300ms ease-out 400ms, transform 300ms ease-out 400ms" : "none"
                  }}>
                    <circle cx="0" cy="0" r="0.55" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.85)" strokeWidth="0.08" filter="url(#subtleLineGlow)" />
                    <circle cx="0" cy="0" r="0.12" fill="#ffffff" />
                  </g>
                </g>

                {/* 2. Minerals Target */}
                <g transform="translate(42, 50)">
                  <circle
                    cx="0" cy="0" r="0.55" fill="none" stroke="#e8d5a7" strokeWidth="0.15"
                    style={{
                      opacity: isRevealed ? 0 : 0.9,
                      transform: isRevealed ? "scale(2.4)" : "scale(0.6)",
                      transformOrigin: "center",
                      transition: isRevealed ? "opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1) 1050ms, transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1) 1050ms" : "none"
                    }}
                  />
                  <g style={{
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "scale(1)" : "scale(0.5)",
                    transformOrigin: "center",
                    transition: isRevealed ? "opacity 300ms ease-out 1050ms, transform 300ms ease-out 1050ms" : "none"
                  }}>
                    <circle cx="0" cy="0" r="0.55" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.85)" strokeWidth="0.08" filter="url(#subtleLineGlow)" />
                    <circle cx="0" cy="0" r="0.12" fill="#ffffff" />
                  </g>
                </g>

                {/* 3. Water Target */}
                <g transform="translate(62, 56)">
                  <circle
                    cx="0" cy="0" r="0.55" fill="none" stroke="#9ee3f4" strokeWidth="0.15"
                    style={{
                      opacity: isRevealed ? 0 : 0.9,
                      transform: isRevealed ? "scale(2.4)" : "scale(0.6)",
                      transformOrigin: "center",
                      transition: isRevealed ? "opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1) 1700ms, transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1) 1700ms" : "none"
                    }}
                  />
                  <g style={{
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "scale(1)" : "scale(0.5)",
                    transformOrigin: "center",
                    transition: isRevealed ? "opacity 300ms ease-out 1700ms, transform 300ms ease-out 1700ms" : "none"
                  }}>
                    <circle cx="0" cy="0" r="0.55" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.85)" strokeWidth="0.08" filter="url(#subtleLineGlow)" />
                    <circle cx="0" cy="0" r="0.12" fill="#ffffff" />
                  </g>
                </g>

                {/* 4. Energy Target */}
                <g transform="translate(82, 42)">
                  <circle
                    cx="0" cy="0" r="0.55" fill="none" stroke="#f9c799" strokeWidth="0.15"
                    style={{
                      opacity: isRevealed ? 0 : 0.9,
                      transform: isRevealed ? "scale(2.4)" : "scale(0.6)",
                      transformOrigin: "center",
                      transition: isRevealed ? "opacity 600ms cubic-bezier(0.2, 0.8, 0.2, 1) 2350ms, transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1) 2350ms" : "none"
                    }}
                  />
                  <g style={{
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "scale(1)" : "scale(0.5)",
                    transformOrigin: "center",
                    transition: isRevealed ? "opacity 300ms ease-out 2350ms, transform 300ms ease-out 2350ms" : "none"
                  }}>
                    <circle cx="0" cy="0" r="0.55" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.85)" strokeWidth="0.08" filter="url(#subtleLineGlow)" />
                    <circle cx="0" cy="0" r="0.12" fill="#ffffff" />
                  </g>
                </g>
              </svg>

              {/* GLASS CALLOUT LABELS */}
              {/* Label 1: Primordial Gas */}
              <div 
                style={{ 
                  backgroundColor: "rgba(30, 45, 50, 0.58)",
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0) scale(1)" : "translateY(8px) scale(0.94)",
                  boxShadow: isRevealed 
                    ? "0 8px 24px rgba(0,0,0,0.25)" 
                    : "0 0 16px rgba(194, 236, 230, 0.5)",
                  transition: isRevealed ? "opacity 350ms ease-out 600ms, transform 350ms ease-out 600ms, box-shadow 600ms ease-out 600ms" : "none"
                }}
                className="absolute top-[6%] left-[10%] z-20 hidden sm:flex items-center gap-2 backdrop-blur-md border border-white/25 text-white h-[34px] px-3.5 rounded-[9px] font-medium text-[13px] tracking-wide pointer-events-auto"
              >
                <svg className="w-[15px] h-[15px] text-[#c2ece6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19A3.5 3.5 0 0 0 18 12a4.5 4.5 0 0 0-8.5-1.5A3.5 3.5 0 0 0 4 14a3.5 3.5 0 0 0 3.5 5h10z" />
                </svg>
                <span>Primordial Gas</span>
              </div>

              {/* Label 2: Minerals */}
              <div 
                style={{ 
                  backgroundColor: "rgba(30, 45, 50, 0.58)",
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0) scale(1)" : "translateY(8px) scale(0.94)",
                  boxShadow: isRevealed 
                    ? "0 8px 24px rgba(0,0,0,0.25)" 
                    : "0 0 16px rgba(232, 213, 167, 0.5)",
                  transition: isRevealed ? "opacity 350ms ease-out 1250ms, transform 350ms ease-out 1250ms, box-shadow 600ms ease-out 1250ms" : "none"
                }}
                className="absolute top-[10%] left-[33%] z-20 hidden sm:flex items-center gap-2 backdrop-blur-md border border-white/25 text-white h-[34px] px-3.5 rounded-[9px] font-medium text-[13px] tracking-wide pointer-events-auto"
              >
                <svg className="w-[15px] h-[15px] text-[#e8d5a7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 3 4 8 5-5 4 15H3L8 3z" />
                </svg>
                <span>Minerals</span>
              </div>

              {/* Label 3: Water */}
              <div 
                style={{ 
                  backgroundColor: "rgba(30, 45, 50, 0.58)",
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0) scale(1)" : "translateY(8px) scale(0.94)",
                  boxShadow: isRevealed 
                    ? "0 8px 24px rgba(0,0,0,0.25)" 
                    : "0 0 16px rgba(158, 227, 244, 0.5)",
                  transition: isRevealed ? "opacity 350ms ease-out 1900ms, transform 350ms ease-out 1900ms, box-shadow 600ms ease-out 1900ms" : "none"
                }}
                className="absolute top-[10%] left-[58%] z-20 hidden sm:flex items-center gap-2 backdrop-blur-md border border-white/25 text-white h-[34px] px-3.5 rounded-[9px] font-medium text-[13px] tracking-wide pointer-events-auto"
              >
                <svg className="w-[15px] h-[15px] text-[#9ee3f4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                <span>Water</span>
              </div>

              {/* Label 4: Energy */}
              <div 
                style={{ 
                  backgroundColor: "rgba(30, 45, 50, 0.58)",
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0) scale(1)" : "translateY(8px) scale(0.94)",
                  boxShadow: isRevealed 
                    ? "0 8px 24px rgba(0,0,0,0.25)" 
                    : "0 0 16px rgba(249, 199, 153, 0.5)",
                  transition: isRevealed ? "opacity 350ms ease-out 2550ms, transform 350ms ease-out 2550ms, box-shadow 600ms ease-out 2550ms" : "none"
                }}
                className="absolute top-[6%] left-[78%] z-20 hidden sm:flex items-center gap-2 backdrop-blur-md border border-white/25 text-white h-[34px] px-3.5 rounded-[9px] font-medium text-[13px] tracking-wide pointer-events-auto"
              >
                <svg className="w-[15px] h-[15px] text-[#f9c799]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span>Energy</span>
              </div>

              {/* Mobile simplified label bar (< 640px) */}
              <div 
                style={{ 
                  opacity: isRevealed ? 1 : 0,
                  transition: isRevealed ? "opacity 400ms ease-out 400ms" : "none"
                }}
                className="sm:hidden absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-1.5 w-[94%]"
              >
                <div style={{ backgroundColor: "rgba(30, 45, 50, 0.75)" }} className="backdrop-blur-md border border-white/25 text-white px-2 py-0.5 rounded-[6px] text-[10px] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c2ece6]"></span>
                  <span>Primordial Gas</span>
                </div>
                <div style={{ backgroundColor: "rgba(30, 45, 50, 0.75)" }} className="backdrop-blur-md border border-white/25 text-white px-2 py-0.5 rounded-[6px] text-[10px] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e8d5a7]"></span>
                  <span>Minerals</span>
                </div>
                <div style={{ backgroundColor: "rgba(30, 45, 50, 0.75)" }} className="backdrop-blur-md border border-white/25 text-white px-2 py-0.5 rounded-lg text-[10px] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9ee3f4]"></span>
                  <span>Water</span>
                </div>
                <div style={{ backgroundColor: "rgba(30, 45, 50, 0.75)" }} className="backdrop-blur-md border border-white/25 text-white px-2 py-0.5 rounded-lg text-[10px] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f9c799]"></span>
                  <span>Energy</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM-CENTER: Core statement & subtitle (Static - Does NOT float) */}
        <div ref={bottomContainerRef} className="w-full text-center space-y-3 sm:space-y-4 max-w-[1250px] mx-auto">
          <h2 
            style={{
              opacity: isBottomRevealed ? 1 : 0,
              transform: isBottomRevealed ? "translateY(0)" : "translateY(16px)",
              transition: isBottomRevealed ? "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)" : "none"
            }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-[#0a1c18] leading-[1.12] lg:whitespace-nowrap"
          >
            Life didn&apos;t replace chemistry. It organized it.
          </h2>
          <p 
            style={{
              opacity: isBottomRevealed ? 1 : 0,
              transform: isBottomRevealed ? "translateY(0)" : "translateY(10px)",
              transition: isBottomRevealed ? "opacity 450ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, transform 450ms cubic-bezier(0.16, 1, 0.3, 1) 100ms" : "none"
            }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#25423c] leading-relaxed"
          >
            That&apos;s the same move we&apos;re making in the field.
          </p>
        </div>

      </div>
    </section>
  );
}
