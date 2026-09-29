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
        <h1 className="text-[1.875rem] sm:text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5rem] font-extrabold uppercase text-white leading-[0.98] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] flex flex-col gap-1 sm:gap-2">
          <span className="whitespace-nowrap block">THE NEXT</span>
          <span className="whitespace-nowrap block">
            <span className="text-[#4F8A4C]">BIG</span> THING
          </span>
          <span className="inline-flex w-fit items-end flex-nowrap whitespace-nowrap gap-x-3.5 sm:gap-x-4 lg:gap-x-5">
            <span>IS REALLY</span>
            <span className="inline-flex shrink-0 items-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 text-xs sm:text-sm md:text-base lg:text-lg font-mono font-semibold tracking-[0.18em] uppercase text-[#A9E889] border border-[#A9E889]/80 bg-[#053022]/60 rounded-[3px] shadow-lg select-none whitespace-nowrap mb-[6px] sm:mb-[8px] md:mb-[10px] lg:mb-[12px]">
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
