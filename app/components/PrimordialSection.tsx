"use client";

import React from "react";

export default function PrimordialSection() {
  return (
    <section
      id="primordial-elements"
      className="relative z-20 w-full bg-transparent text-[#14231a] py-14 sm:py-20 md:py-24 px-5 sm:px-12 md:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Content Area */}
        <div className="max-w-2xl text-left">
          {/* Eyebrow */}
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#07552D] mb-2 sm:mb-3">
            Where it begins
          </div>

          {/* Main Heading with Subtle Cyan Underline Accent */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-[#14231a] tracking-tight leading-[1.15] mb-3 sm:mb-5">
            Biotechnology begins{" "}
            <span className="relative inline-block border-b-2 border-cyan-400/90 pb-0.5">
              here.
            </span>
          </h2>

          {/* Supporting Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-[#2C3E35]/90 font-normal leading-relaxed max-w-xl">
            Biotechnology begins here: not just by observing life, but by
            understanding it and working with it.
          </p>
        </div>

        {/* Lower Part: Client SVG Three Cards */}
        <div className="w-full mt-10 sm:mt-16 flex justify-center items-center select-none">
          <img
            src="/images/biotechnology-three-cards.svg"
            alt="Biotechnology Three Cards — Observing life, Understanding it, Working with it"
            className="w-full h-auto object-contain block max-w-6xl mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
