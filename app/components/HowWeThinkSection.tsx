"use client";

import React, { useEffect, useRef, useState } from "react";

export default function HowWeThinkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animActive, setAnimActive] = useState(false);

  useEffect(() => {
    // IntersectionObserver to pause when offscreen & restart animation from 0s when entering viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setAnimActive(false);
          // Brief tick to restart CSS animation cycle from Microbe (0s)
          requestAnimationFrame(() => {
            setAnimActive(true);
          });
        } else {
          setAnimActive(false);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-we-think-section"
      className="relative z-20 w-full bg-[#EAF3EA] text-[#0A1F13] pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center overflow-hidden select-none"
    >
      {/* SCOPED CSS ANIMATION STYLES PORTED FAITHFULLY FROM CLAUDE HTML REFERENCE */}
      <style>{`
        :root {
          --metabiome-bg: #fbfbf9;
          --metabiome-ink: #14231a;
          --metabiome-leaf: #3c7a4e;
          --metabiome-gold: #c9a24b;
          --metabiome-spark: #fff6c9;
          --metabiome-line: rgba(20,35,26,0.10);
        }

        /* LEVEL 1: SPHERE SLOTS (POSITION ONLY & REFINED MASK SIZES) */
        .sphere-slot {
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 10;
        }
        .sphere-slot.microbe    { left: 12.234%; top: 47.753%; width: 13.220%; aspect-ratio: 1/1; }
        .sphere-slot.metabolite { left: 36.424%; top: 48.411%; width: 13.023%; aspect-ratio: 1/1; }
        .sphere-slot.metabiome  { left: 62.229%; top: 49.068%; width: 13.023%; aspect-ratio: 1/1; }
        .sphere-slot.intel      { left: 88.203%; top: 47.425%; width: 14.886%; aspect-ratio: 1/1; }

        /* LEVEL 2: SPHERE THUMP (ACTIVATION SCALE ONLY) */
        .sphere-thump {
          width: 100%;
          height: 100%;
          transform: scale(1);
          transform-origin: 50% 50%;
        }
        .anim-running .sphere-thump.microbe-thump    { animation: sphereThump 6s ease-in-out infinite; animation-delay: 0s; }
        .anim-running .sphere-thump.metabolite-thump { animation: sphereThump 6s ease-in-out infinite; animation-delay: 1.1s; }
        .anim-running .sphere-thump.metabiome-thump  { animation: sphereThump 6s ease-in-out infinite; animation-delay: 2.2s; }
        .anim-running .sphere-thump.intel-thump      { animation: sphereThump 6s ease-in-out infinite; animation-delay: 3.3s; }

        @keyframes sphereThump {
          0%     { transform: scale(1); }
          17.5%  { transform: scale(1.025); }
          20%    { transform: scale(1.08); }
          24%    { transform: scale(1.02); }
          30%    { transform: scale(1); }
          100%   { transform: scale(1); }
        }

        /* LEVEL 3: SPHERE SPIN (CONTINUOUS ROTATION & CIRCULAR CLIP MASK) */
        .sphere-spin {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          transform-origin: 50% 50%;
        }

        /* REFINED BIOLOGICAL ROTATION SPEEDS: 28s, 32s, 30s, 34s */
        .anim-running .spin-microbe    { animation: spinCW 28s linear infinite; }
        .anim-running .spin-metabolite { animation: spinCCW 32s linear infinite; }
        .anim-running .spin-metabiome  { animation: spinCW 30s linear infinite; }
        .anim-running .spin-intel      { animation: spinCCW 34s linear infinite; }

        @keyframes spinCW  { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
        @keyframes spinCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }

        /* LEVEL 4: SPHERE CROP (POSITIONED ARTWORK & OVERSIZED SCALE) */
        .sphere-crop-img {
          position: absolute;
          max-width: none !important;
          height: auto !important;
          display: block;
          pointer-events: none;
          user-select: none;
          transform: scale(1.15);
        }

        .microbe-crop {
          width: 756.43%;
          left: -42.54%;
          top: -72.51%;
          transform-origin: 12.234% 47.753%;
        }
        .metabolite-crop {
          width: 767.87%;
          left: -229.69%;
          top: -75.90%;
          transform-origin: 36.424% 48.411%;
        }
        .metabiome-crop {
          width: 767.87%;
          left: -427.84%;
          top: -77.61%;
          transform-origin: 62.229% 49.068%;
        }
        .intel-crop {
          width: 671.77%;
          left: -542.52%;
          top: -58.05%;
          transform-origin: 88.203% 47.425%;
        }

        /* CHARGE / DISCHARGE GLOW - SOFT BIOLOGICAL BREATHING */
        .glow {
          position: absolute;
          width: 15%;
          aspect-ratio: 1/1;
          border-radius: 50%;
          transform: translate(-50%,-50%) scale(0.95);
          filter: blur(13px) brightness(1.0);
          opacity: 0;
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 25;
        }
        .anim-running .glow {
          animation: chargeDischarge 6s ease-in-out infinite;
        }
        .glow-microbe {
          left: 12.239%; top: 47.740%;
          background: radial-gradient(circle, rgba(255,246,201,0.85) 0%, rgba(120,200,140,0.5) 45%, rgba(120,200,140,0) 72%);
          animation-delay: 0s;
        }
        .glow-metabolite {
          left: 36.577%; top: 48.151%;
          background: radial-gradient(circle, rgba(255,246,201,0.85) 0%, rgba(201,162,75,0.5) 45%, rgba(201,162,75,0) 72%);
          animation-delay: 1.1s;
        }
        .glow-metabiome {
          left: 62.262%; top: 49.247%;
          background: radial-gradient(circle, rgba(255,246,201,0.85) 0%, rgba(120,200,140,0.5) 45%, rgba(120,200,140,0) 72%);
          animation-delay: 2.2s;
        }
        .glow-intel {
          left: 88.179%; top: 47.466%;
          background: radial-gradient(circle, rgba(255,246,201,0.9) 0%, rgba(201,162,75,0.6) 45%, rgba(201,162,75,0) 72%);
          animation-delay: 3.3s;
        }

        @keyframes chargeDischarge {
          0%     { opacity:0;    transform: translate(-50%,-50%) scale(0.95); filter: blur(13px) brightness(1.0); }
          3%     { opacity:0.20; transform: translate(-50%,-50%) scale(1.02); filter: blur(13px) brightness(1.08); }
          7%     { opacity:0.50; transform: translate(-50%,-50%) scale(1.20); filter: blur(11px) brightness(1.35); }
          12%    { opacity:0.18; transform: translate(-50%,-50%) scale(1.05); filter: blur(13px) brightness(1.08); }
          18%    { opacity:0;    transform: translate(-50%,-50%) scale(0.95); filter: blur(13px) brightness(1.0); }
          100%   { opacity:0;    transform: translate(-50%,-50%) scale(0.95); filter: blur(13px) brightness(1.0); }
        }

        /* RESTING BRIDGES */
        .bridge {
          fill: none;
          stroke: url(#bridgeGrad);
          stroke-width: 2.5;
          stroke-linecap: round;
          opacity: 0.18;
        }

        svg.wire {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          z-index: 20;
        }

        /* LABELS LIT RESPONSE */
        .label-text-lit {
          transition: color 0.4s ease, text-shadow 0.4s ease;
        }
        .anim-running .l-microbe-lit     { animation: label-lit 6s ease-in-out infinite; animation-delay: 0s; }
        .anim-running .l-metabolite-lit  { animation: label-lit 6s ease-in-out infinite; animation-delay: 1.1s; }
        .anim-running .l-metabiome-lit   { animation: label-lit 6s ease-in-out infinite; animation-delay: 2.2s; }
        .anim-running .l-intel-lit       { animation: label-lit 6s ease-in-out infinite; animation-delay: 3.3s; }

        @keyframes label-lit {
          0%     { color: rgba(20,35,26,0.32); text-shadow: none; }
          4%     { color: #14231a; text-shadow: 0 0 10px rgba(201,162,75,0.4); }
          8%     { color: #14231a; text-shadow: 0 0 16px rgba(255,246,201,0.8); }
          14%    { color: rgba(20,35,26,0.32); text-shadow: none; }
          100%   { color: rgba(20,35,26,0.32); text-shadow: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .glow, .bridge { animation: none !important; opacity: 0 !important; }
          .sphere-spin { animation: none !important; }
        }
      `}</style>

      {/* SECTION CONTENT CONTAINER */}
      <div className="w-full max-w-[1240px] w-[85vw] mx-auto flex flex-col items-start justify-start">
        
        {/* TOP COPY */}
        <div className="w-full text-left flex flex-col items-start space-y-2 sm:space-y-2.5 z-10 mb-0">
          <div className="flex items-center justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-[#07552D]" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#07552D] font-sans">
              How We Think
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight text-[#0A1F13] leading-[1.08] max-w-[660px]">
            Nature Works Through
            <br /> Communities, Not
            <br /> Single Organisms
          </h2>

          <p className="text-base sm:text-lg lg:text-[18px] font-normal text-[#2C3E35] leading-relaxed max-w-[740px]">
            Microbes talking to minerals. Minerals feeding plants. Plants
            feeding soil back. We call the unit of that conversation the
            Metabiome — and it&apos;s the reason our products are built as
            systems, not single-strain silver bullets.
          </p>
        </div>

        {/* BIOLOGICAL SYSTEM ARTWORK & OVERLAY STAGE */}
        <div className="relative w-full max-w-[1240px] w-[85vw] mx-auto flex flex-col items-center mt-6 sm:mt-7">
          
          {/* Viewport Box (aspect ratio 2153/415 exposes full artwork y=160 to y=575) */}
          <div className="relative w-full overflow-hidden aspect-[2153/415]">
            
            {/* Shifted Wrapper (aspect-[2153/730], top: -38.554%) */}
            <div
              className={`absolute inset-x-0 w-full aspect-[2153/730] ${animActive ? "anim-running" : ""}`}
              style={{ top: "-38.554%" }}
            >
              {/* 1. Base Clean PNG Artwork */}
              <img
                src="/images/metabiome-intelligence-system.png"
                alt="Metabiome Intelligence System"
                className="w-full h-full block select-none pointer-events-none"
              />

              {/* 2. ROTATING SPHERE VISUAL LAYERS (4-LEVEL NESTED ARCHITECTURE) */}
              <div className="sphere-slot microbe">
                <div className="sphere-thump microbe-thump">
                  <div className="sphere-spin spin-microbe">
                    <img
                      src="/images/metabiome-intelligence-system.png"
                      alt=""
                      className="sphere-crop-img microbe-crop"
                    />
                  </div>
                </div>
              </div>
              <div className="sphere-slot metabolite">
                <div className="sphere-thump metabolite-thump">
                  <div className="sphere-spin spin-metabolite">
                    <img
                      src="/images/metabiome-intelligence-system.png"
                      alt=""
                      className="sphere-crop-img metabolite-crop"
                    />
                  </div>
                </div>
              </div>
              <div className="sphere-slot metabiome">
                <div className="sphere-thump metabiome-thump">
                  <div className="sphere-spin spin-metabiome">
                    <img
                      src="/images/metabiome-intelligence-system.png"
                      alt=""
                      className="sphere-crop-img metabiome-crop"
                    />
                  </div>
                </div>
              </div>
              <div className="sphere-slot intel">
                <div className="sphere-thump intel-thump">
                  <div className="sphere-spin spin-intel">
                    <img
                      src="/images/metabiome-intelligence-system.png"
                      alt=""
                      className="sphere-crop-img intel-crop"
                    />
                  </div>
                </div>
              </div>

              {/* 3. SVG OVERLAY (Wire, Resting Bridges, Active Progressive Drawing Paths, & 16px Leading Comets) */}
              <svg className="wire" viewBox="0 0 2153 730" fill="none">
                <defs>
                  <radialGradient id="cometGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff6c9" />
                    <stop offset="40%" stopColor="#c9a24b" />
                    <stop offset="70%" stopColor="#7ec88c" />
                    <stop offset="100%" stopColor="rgba(126,200,140,0)" />
                  </radialGradient>

                  <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fff6c9" />
                    <stop offset="50%" stopColor="#c9a24b" />
                    <stop offset="100%" stopColor="#7ec88c" />
                  </linearGradient>

                  <filter id="cometGlow" x="-600%" y="-600%" width="1300%" height="1300%" colorInterpolationFilters="sRGB">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="wideBlur" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="tightBlur" />
                    <feMerge>
                      <feMergeNode in="wideBlur" />
                      <feMergeNode in="tightBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <filter id="lineGlow" x="-150%" y="-400%" width="400%" height="900%" colorInterpolationFilters="sRGB">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Paths Definition */}
                  <path id="pathAB" d="M 427.5,348.5 C 480,376 560,402 626.5,351.5" />
                  <path id="pathBC" d="M 948.5,351.5 C 1010,344 1092,388 1178.5,359.5" />
                  <path id="pathCD" d="M 1502.5,359.5 C 1560,349 1652,396 1712.5,346.5" />
                </defs>

                {/* Main Resting Bridge Paths */}
                <path d="M 427.5,348.5 C 480,376 560,402 626.5,351.5" className="bridge" filter="url(#lineGlow)" />
                <path d="M 948.5,351.5 C 1010,344 1092,388 1178.5,359.5" className="bridge" filter="url(#lineGlow)" />
                <path d="M 1502.5,359.5 C 1560,349 1652,396 1712.5,346.5" className="bridge" filter="url(#lineGlow)" />

                {/* Active Transfer Progressive Drawing Paths & Leading Comets */}
                {animActive && (
                  <>
                    {/* BRIDGE AB: Active 0.5s to 1.1s */}
                    {/* Outer Soft Green Glow (stroke-width 16, #7ec88c, opacity 0.55) */}
                    <path
                      d="M 427.5,348.5 C 480,376 560,402 626.5,351.5"
                      fill="none"
                      stroke="#7ec88c"
                      strokeWidth="16"
                      strokeLinecap="round"
                      filter="url(#lineGlow)"
                      pathLength="1"
                      strokeDasharray="1"
                      strokeDashoffset="1"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="1;1;0;0;1"
                        keyTimes="0;0.0833;0.1833;0.2200;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;0;0.55;0.55;0;0"
                        keyTimes="0;0.0833;0.0834;0.2000;0.2300;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    </path>

                    {/* Inner Bright Core (stroke-width 8, #fff6c9, opacity 1) */}
                    <path
                      d="M 427.5,348.5 C 480,376 560,402 626.5,351.5"
                      fill="none"
                      stroke="#fff6c9"
                      strokeWidth="8"
                      strokeLinecap="round"
                      filter="url(#lineGlow)"
                      pathLength="1"
                      strokeDasharray="1"
                      strokeDashoffset="1"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="1;1;0;0;1"
                        keyTimes="0;0.0833;0.1833;0.2200;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;0;1;1;0;0"
                        keyTimes="0;0.0833;0.0834;0.2000;0.2300;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    </path>

                    {/* Leading Edge Comet AB (r=16) */}
                    <circle r="16" fill="url(#cometGrad)" filter="url(#cometGlow)">
                      <animateMotion
                        dur="6s"
                        repeatCount="indefinite"
                        keyPoints="0;0;1;1;0"
                        keyTimes="0;0.0833;0.1833;0.999;1"
                        calcMode="linear"
                      >
                        <mpath href="#pathAB" />
                      </animateMotion>
                      <animate
                        attributeName="opacity"
                        values="0;0;1;1;0;0"
                        keyTimes="0;0.0800;0.0833;0.1833;0.2000;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* BRIDGE BC: Active 1.6s to 2.2s */}
                    {/* Outer Soft Green Glow (stroke-width 16, #7ec88c, opacity 0.55) */}
                    <path
                      d="M 948.5,351.5 C 1010,344 1092,388 1178.5,359.5"
                      fill="none"
                      stroke="#7ec88c"
                      strokeWidth="16"
                      strokeLinecap="round"
                      filter="url(#lineGlow)"
                      pathLength="1"
                      strokeDasharray="1"
                      strokeDashoffset="1"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="1;1;0;0;1"
                        keyTimes="0;0.2667;0.3667;0.4000;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;0;0.55;0.55;0;0"
                        keyTimes="0;0.2667;0.2668;0.3833;0.4133;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    </path>

                    {/* Inner Bright Core (stroke-width 8, #fff6c9, opacity 1) */}
                    <path
                      d="M 948.5,351.5 C 1010,344 1092,388 1178.5,359.5"
                      fill="none"
                      stroke="#fff6c9"
                      strokeWidth="8"
                      strokeLinecap="round"
                      filter="url(#lineGlow)"
                      pathLength="1"
                      strokeDasharray="1"
                      strokeDashoffset="1"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="1;1;0;0;1"
                        keyTimes="0;0.2667;0.3667;0.4000;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;0;1;1;0;0"
                        keyTimes="0;0.2667;0.2668;0.3833;0.4133;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    </path>

                    {/* Leading Edge Comet BC (r=16) */}
                    <circle r="16" fill="url(#cometGrad)" filter="url(#cometGlow)">
                      <animateMotion
                        dur="6s"
                        repeatCount="indefinite"
                        keyPoints="0;0;1;1;0"
                        keyTimes="0;0.2667;0.3667;0.999;1"
                        calcMode="linear"
                      >
                        <mpath href="#pathBC" />
                      </animateMotion>
                      <animate
                        attributeName="opacity"
                        values="0;0;1;1;0;0"
                        keyTimes="0;0.2634;0.2667;0.3667;0.3833;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* BRIDGE CD: Active 2.7s to 3.3s */}
                    {/* Outer Soft Green Glow (stroke-width 16, #7ec88c, opacity 0.55) */}
                    <path
                      d="M 1502.5,359.5 C 1560,349 1652,396 1712.5,346.5"
                      fill="none"
                      stroke="#7ec88c"
                      strokeWidth="16"
                      strokeLinecap="round"
                      filter="url(#lineGlow)"
                      pathLength="1"
                      strokeDasharray="1"
                      strokeDashoffset="1"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="1;1;0;0;1"
                        keyTimes="0;0.4500;0.5500;0.5833;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;0;0.55;0.55;0;0"
                        keyTimes="0;0.4500;0.4501;0.5667;0.5967;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    </path>

                    {/* Inner Bright Core (stroke-width 8, #fff6c9, opacity 1) */}
                    <path
                      d="M 1502.5,359.5 C 1560,349 1652,396 1712.5,346.5"
                      fill="none"
                      stroke="#fff6c9"
                      strokeWidth="8"
                      strokeLinecap="round"
                      filter="url(#lineGlow)"
                      pathLength="1"
                      strokeDasharray="1"
                      strokeDashoffset="1"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="1;1;0;0;1"
                        keyTimes="0;0.4500;0.5500;0.5833;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;0;1;1;0;0"
                        keyTimes="0;0.4500;0.4501;0.5667;0.5967;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    </path>

                    {/* Leading Edge Comet CD (r=16) */}
                    <circle r="16" fill="url(#cometGrad)" filter="url(#cometGlow)">
                      <animateMotion
                        dur="6s"
                        repeatCount="indefinite"
                        keyPoints="0;0;1;1;0"
                        keyTimes="0;0.4500;0.5500;0.999;1"
                        calcMode="linear"
                      >
                        <mpath href="#pathCD" />
                      </animateMotion>
                      <animate
                        attributeName="opacity"
                        values="0;0;1;1;0;0"
                        keyTimes="0;0.4467;0.4500;0.5500;0.5667;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                )}
              </svg>

              {/* 4. SOFT SPHERE ACTIVATION GLOWS (No large expanding rings) */}
              <div className="glow glow-microbe" />
              <div className="glow glow-metabolite" />
              <div className="glow glow-metabiome" />
              <div className="glow glow-intel" />
            </div>

          </div>

          {/* SCIENTIFIC LABELS WITH REF-LIT ANIMATION */}
          <div className="relative w-full mt-4 sm:mt-5 flex items-start">
            
            {/* MICROBE */}
            <div className="absolute -translate-x-1/2" style={{ left: "12.87%" }}>
              <span className={`text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] leading-[1.2] uppercase text-center whitespace-nowrap block label-text-lit ${animActive ? "l-microbe-lit" : ""}`}>
                Microbe
              </span>
            </div>

            {/* METABOLITE */}
            <div className="absolute -translate-x-1/2" style={{ left: "37.13%" }}>
              <span className={`text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] leading-[1.2] uppercase text-center whitespace-nowrap block label-text-lit ${animActive ? "l-metabolite-lit" : ""}`}>
                Metabolite
              </span>
            </div>

            {/* METABIOME */}
            <div className="absolute -translate-x-1/2" style={{ left: "62.48%" }}>
              <span className={`text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] leading-[1.2] uppercase text-center whitespace-nowrap block label-text-lit ${animActive ? "l-metabiome-lit" : ""}`}>
                Metabiome
              </span>
            </div>

            {/* BIOLOGICAL INTELLIGENCE */}
            <div className="absolute -translate-x-1/2" style={{ left: "87.16%" }}>
              <span className={`text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] leading-[1.2] uppercase text-center whitespace-nowrap block label-text-lit ${animActive ? "l-intel-lit" : ""}`}>
                Biological Intelligence
              </span>
            </div>

          </div>

        </div>

        {/* CTA BUTTON */}
        <div className="w-full flex justify-start pt-10 sm:pt-11 lg:pt-12 z-10">
          <button
            type="button"
            className="group inline-flex items-center gap-3 bg-[#07552D] hover:bg-[#054424] active:scale-[0.99] text-white text-base font-semibold px-7 h-[54px] rounded-lg transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer select-none"
            onClick={() => {
              // Interactive button action placeholder
            }}
          >
            <span>Read about our approach</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
