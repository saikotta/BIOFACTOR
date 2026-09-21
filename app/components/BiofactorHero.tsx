"use client";

import React from "react";

export default function BiofactorHero() {
  return (
    <div className="relative w-full h-full bg-transparent overflow-hidden select-none font-sans flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 max-w-[1700px] mx-auto">
      {/* Left Side Content Area: Headline & Subtitle */}
      <div className="w-full max-w-xl lg:max-w-2xl py-12 md:py-20 my-auto">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.12] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
          Completing Chemical Systems with Biological Intelligence
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-white/95 font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] max-w-xl">
          Chemistry built modern agriculture. It can&apos;t finish the job alone.
        </p>
      </div>
    </div>
  );
}
