"use client";

import React from "react";

export default function BioremidationMetabiomeCycle() {
  return (
    <section id="metabiome-cycle" className="relative w-full bg-[#0F2015] text-[#EAF3EA] py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background SVG / Glow Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#167A4A]/30 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1.5px] bg-[#B8E986]" />
          <span className="font-mono text-xs font-semibold tracking-widest text-[#B8E986] uppercase">
            HOW WE THINK
          </span>
          <span className="w-8 h-[1.5px] bg-[#B8E986]" />
        </div>

        {/* Main Heading */}
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase max-w-4xl mb-4">
          Nature works through communities, not single organisms
        </h2>
        <p className="font-sans text-base sm:text-lg text-[#EAF3EA]/80 max-w-2xl mb-16 leading-relaxed">
          The Metabiome Cycle illustrates how single microbes synthesize active metabolites to construct a resilient, intelligent biological web that self-regulates complex ecosystems.
        </p>

        {/* METABIOME CYCLE ANIMATION CONTAINER */}
        <div className="w-full max-w-[1100px] bg-[#142B1D]/80 border border-[#167A4A]/30 rounded-2xl p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-2xl shadow-black/60 relative overflow-hidden">
          
          {/* Animated Metabiome Display */}
          <div className="relative w-full aspect-[2.4/1] min-h-[300px] sm:min-h-[380px] flex items-center justify-center">
            
            {/* SVG Flowing Bridges */}
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="none">
              <defs>
                <linearGradient id="bridgeGradBio" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#78C88C" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#B8E986" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#78C88C" stopOpacity="0.2" />
                </linearGradient>
                <filter id="glowBio">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Connecting Arc Lines */}
              <path d="M 120 200 Q 240 130 365 200" fill="none" stroke="url(#bridgeGradBio)" strokeWidth="3" className="animate-pulse opacity-60" />
              <path d="M 365 200 Q 490 270 622 200" fill="none" stroke="url(#bridgeGradBio)" strokeWidth="3" className="animate-pulse opacity-60" />
              <path d="M 622 200 Q 750 130 880 200" fill="none" stroke="url(#bridgeGradBio)" strokeWidth="3" className="animate-pulse opacity-60" />
              
              {/* Return Loop Arc */}
              <path d="M 880 200 Q 500 340 120 200" fill="none" stroke="url(#bridgeGradBio)" strokeWidth="2" strokeDasharray="8 8" className="opacity-40" />
            </svg>

            {/* 4 NODES DISPLAY */}
            <div className="relative z-10 w-full h-full flex items-center justify-between px-4 sm:px-12">
              
              {/* NODE 1: MICROBE */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#1A3826] border-2 border-[#B8E986] flex items-center justify-center shadow-lg shadow-[#B8E986]/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[#B8E986]/50">
                  <div className="absolute inset-0 rounded-full border border-[#B8E986]/40 animate-ping opacity-30" />
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#B8E986]/20 flex items-center justify-center">
                    <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#B8E986]" />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#B8E986] uppercase block">
                    01. MICROBE
                  </span>
                  <span className="font-sans text-xs text-[#EAF3EA]/70 mt-1 block">
                    Single Organism Focus
                  </span>
                </div>
              </div>

              {/* NODE 2: METABOLITE */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#1A3826] border-2 border-[#78C88C] flex items-center justify-center shadow-lg shadow-[#78C88C]/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[#78C88C]/50">
                  <div className="absolute inset-0 rounded-full border border-[#78C88C]/40 animate-ping opacity-30" style={{ animationDelay: "1s" }} />
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#78C88C]/20 flex items-center justify-center">
                    <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#78C88C]" />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#78C88C] uppercase block">
                    02. METABOLITE
                  </span>
                  <span className="font-sans text-xs text-[#EAF3EA]/70 mt-1 block">
                    Biochemical Output
                  </span>
                </div>
              </div>

              {/* NODE 3: METABIOME */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#1A3826] border-2 border-[#52B788] flex items-center justify-center shadow-lg shadow-[#52B788]/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[#52B788]/50">
                  <div className="absolute inset-0 rounded-full border border-[#52B788]/40 animate-ping opacity-30" style={{ animationDelay: "2s" }} />
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#52B788]/20 flex items-center justify-center">
                    <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#52B788]" />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#52B788] uppercase block">
                    03. METABIOME
                  </span>
                  <span className="font-sans text-xs text-[#EAF3EA]/70 mt-1 block">
                    Interconnected Web
                  </span>
                </div>
              </div>

              {/* NODE 4: INTEL */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#1A3826] border-2 border-[#B8E986] flex items-center justify-center shadow-lg shadow-[#B8E986]/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[#B8E986]/50">
                  <div className="absolute inset-0 rounded-full border border-[#B8E986]/40 animate-ping opacity-30" style={{ animationDelay: "3s" }} />
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[#B8E986]/20 flex items-center justify-center">
                    <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#B8E986]" />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#B8E986] uppercase block">
                    04. INTEL
                  </span>
                  <span className="font-sans text-xs text-[#EAF3EA]/70 mt-1 block">
                    Systemic Intelligence
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* CYCLE TAG INDICATOR */}
          <div className="mt-8 pt-6 border-t border-[#167A4A]/30 flex items-center justify-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8E986] animate-ping" />
            <span className="font-mono text-xs font-semibold tracking-widest text-[#B8E986] uppercase">
              METABIOME CYCLE — ACTIVE CONTINUOUS SYNCHRONIZATION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
