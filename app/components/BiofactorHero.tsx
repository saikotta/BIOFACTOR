"use client";

import React from "react";
import MicrobeField from "./MicrobeField";

const HERO_EXCLUSION_ZONES = [
  // Band A: Eyebrow ("BEYOND THE NAKED EYE")
  { xMinPct: 0.35, xMaxPct: 0.65, yMinPct: 0.22, yMaxPct: 0.30 },
  // Band B: Headline (2-line centered statement)
  { xMinPct: 0.16, xMaxPct: 0.84, yMinPct: 0.33, yMaxPct: 0.61 },
  // Band C: Subtitle ("A new frontier exists beyond the naked eye.")
  { xMinPct: 0.30, xMaxPct: 0.70, yMinPct: 0.65, yMaxPct: 0.74 },
];

export default function BiofactorHero() {
  return (
    <div className="relative w-full h-full bg-transparent select-none font-sans flex flex-col items-center justify-center px-6 sm:px-12 md:px-16 overflow-hidden">
      {/* Restored MicrobeField Component - Frame 1 Population (~30 visible microbes, headline protected) */}
      <div className="absolute inset-0 pointer-events-none z-0 contrast-125">
        <MicrobeField
          position="absolute"
          densityMultiplier={4.6}
          opacityMultiplier={1.65}
          minVisibleCount={30}
          exclusionZones={HERO_EXCLUSION_ZONES}
        />
      </div>

      {/* Centered Content Area: Typography (Above Microbe Layer) */}
      <div className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl py-12 md:py-16 my-auto relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#0B3D2E] mb-3 sm:mb-4 text-center">
          BEYOND THE NAKED EYE
        </div>

        {/* 2-Line Centered Desktop Headline */}
        <h1 className="text-[2.25rem] sm:text-4xl md:text-5xl lg:text-[clamp(3.5rem,4.8vw,5.5rem)] font-extrabold uppercase text-[#0A1A14] leading-[1.08] tracking-tight flex flex-col items-center justify-center gap-2 sm:gap-3 text-center w-full">
          <span className="whitespace-normal md:whitespace-nowrap block text-[#0A1A14]">
            THE NEXT <span className="text-[#1F8A57]">BIG</span> THING
          </span>
          <span className="inline-flex items-center justify-center flex-wrap md:flex-nowrap gap-x-3.5 sm:gap-x-4 lg:gap-x-5">
            <span className="text-[#0A1A14]">IS REALLY</span>
            <span className="inline-flex shrink-0 items-center justify-center px-3.5 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-1.5 md:py-1.5 lg:py-2 text-[13.5px] sm:text-[15.5px] md:text-[18px] lg:text-[21px] font-mono font-semibold tracking-[0.18em] uppercase text-[#0F3824] border border-[#1F8A57]/60 bg-[#1F8A57]/15 rounded-full shadow-sm select-none whitespace-nowrap align-middle">
              SMALL...
            </span>
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-[#1B382B] font-light italic leading-relaxed tracking-wide max-w-xl mx-auto text-center">
          A new frontier exists beyond the naked eye.
        </p>
      </div>
    </div>
  );
}
