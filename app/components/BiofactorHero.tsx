"use client";

import React from "react";
import MicrobeField from "./MicrobeField";
import styles from "./BiofactorHero.module.css";

export default function BiofactorHero() {
  return (
    <div className="relative w-full min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] flex flex-col items-center justify-center px-6 sm:px-12 md:px-16 overflow-hidden select-none font-sans bg-transparent isolate">
      {/* MicrobeField Component - Frame 1 Full Viewport Coverage with Text-Safe Smooth Fading */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <MicrobeField
          position="absolute"
          desktopCount={56}
          mobileCount={28}
          opacityMultiplier={1.0}
          textFading={true}
        />
      </div>

      {/* Centered Content Area: Typography (Above Microbe Layer) */}
      <div className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl py-12 md:py-16 my-auto relative z-10 flex flex-col items-center text-center">


        {/* 2-Line Centered Desktop Headline */}
        <h1 className="text-[2.25rem] sm:text-4xl md:text-5xl lg:text-[clamp(3.5rem,4.8vw,5.5rem)] font-extrabold uppercase text-[#EAF3EA] leading-[1.08] tracking-tight flex flex-col items-center justify-center gap-2 sm:gap-3 text-center w-full">
          <span className="whitespace-normal md:whitespace-nowrap block text-[#EAF3EA]">
            THE NEXT <span className="text-[#7FE0A4]">BIG</span> THING
          </span>
          <span className="inline-flex items-end justify-center flex-wrap md:flex-nowrap gap-x-2 sm:gap-x-2.5 lg:gap-x-3">
            <span className="text-[#EAF3EA] leading-none">IS REALLY</span>
            <span className={`${styles.smallWord} inline-flex shrink-0 items-center justify-center px-2.5 sm:px-3 md:px-4 lg:px-4 py-0.5 sm:py-0.5 md:py-1 lg:py-1.5 text-[9px] sm:text-[10px] md:text-[12px] lg:text-[14px] font-mono font-bold tracking-[0.2em] normal-case text-white bg-[#1a4225] rounded-full shadow-sm select-none whitespace-nowrap border-none`}>
              Small.
            </span>
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-[#7FE0A4] font-light italic leading-relaxed tracking-wide max-w-xl mx-auto text-center">
          A new frontier exists beyond the naked eye.
        </p>
      </div>
    </div>
  );
}

