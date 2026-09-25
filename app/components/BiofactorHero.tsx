"use client";

import React from "react";

export default function BiofactorHero() {
  return (
    <div className="relative w-full h-full bg-transparent select-none font-sans flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1700px] mx-auto">
      {/* Left Side Content Area: Headline & Subtitle */}
      <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl py-12 md:py-20 my-auto relative">
        {/* Eyebrow */}
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#0B3D2E] mb-3 sm:mb-4">
          BEYOND THE NAKED EYE
        </div>

        {/* Headline */}
        <h1 className="text-[2.125rem] sm:text-5xl md:text-6xl lg:text-[5.25rem] xl:text-[5.75rem] font-extrabold uppercase text-white leading-[0.98] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] flex flex-col gap-1 sm:gap-2">
          <span>THE NEXT</span>
          <span>
            <span className="text-[#4F8A4C]">BIG</span> THING
          </span>
          <span className="relative inline-flex items-baseline w-max">
            <span>IS REALLY</span>
            <span className="absolute left-full bottom-[0.12em] ml-3 sm:ml-4 lg:ml-5 inline-block text-xs sm:text-sm md:text-base lg:text-lg font-mono font-semibold tracking-[0.18em] uppercase text-[#A9E889] border border-[#A9E889]/80 bg-[#053022]/60 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-[3px] shadow-lg select-none whitespace-nowrap z-30">
              SMALL.
            </span>
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-white/90 font-light italic leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] max-w-xl">
          A new frontier exists beyond the naked eye.
        </p>
      </div>
    </div>
  );
}
