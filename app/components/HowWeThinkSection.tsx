"use client";

import React from "react";

export default function HowWeThinkSection() {
  return (
    <section
      id="how-we-think-section"
      className="relative z-20 w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 overflow-hidden select-none"
    >
      {/* ================================================== */}
      {/* SINGLE ROOT WHEAT BACKGROUND LAYER WITH CINEMATIC OVERLAY */}
      {/* ================================================== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/how-we-think-wheat.jpg"
          alt="Biofactor Biologicals Wheat Field Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Layered cinematic gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(90deg, rgba(4, 28, 19, 0.52) 0%, rgba(4, 28, 19, 0.32) 42%, rgba(4, 28, 19, 0.24) 70%, rgba(4, 28, 19, 0.36) 100%),
              linear-gradient(180deg, rgba(3, 24, 16, 0.10) 0%, rgba(3, 24, 16, 0.18) 100%)
            `,
          }}
        />
      </div>

      {/* ================================================== */}
      {/* SECTION CONTENT CONTAINER (z-index 1 over wheat) */}
      {/* ================================================== */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full space-y-8 sm:space-y-10 lg:space-y-12">
        {/* ================================================== */}
        {/* 1. MAIN TWO-COLUMN AREA (Upper 50/50 Desktop) */}
        {/* ================================================== */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 w-full">
          {/* LEFT COLUMN (~50% Width) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start">
            {/* Technical Mono Eyebrow */}
            <div
              className="text-[11px] sm:text-xs lg:text-[13px] font-medium uppercase tracking-[0.2em] text-[#A9E889] mb-3"
              style={{
                fontFamily:
                  'ui-monospace, "SFMono-Regular", "Cascadia Code", "Roboto Mono", monospace',
              }}
            >
              THE NEXT GENERATION OF TECHNOLOGY
            </div>

            {/* Editorial Serif Sentence 1 */}
            <p
              className="text-[clamp(24px,2.5vw,43px)] font-normal text-[#F4F5EC] tracking-[-0.02em] leading-[1.15]"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              won’t be defined by what we build
            </p>

            {/* Oversized Sans Word */}
            <div className="text-[clamp(72px,9vw,155px)] font-bold text-[#F4F5EC] tracking-[-0.055em] leading-[0.86] my-2 sm:my-3">
              larger.
            </div>

            {/* Editorial Serif Sentence 2 */}
            <p
              className="text-[clamp(24px,2.5vw,43px)] font-normal text-[#F4F5EC] tracking-[-0.02em] leading-[1.15]"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              It will be defined by what we learn to
              <br />
              understand
            </p>
          </div>

          {/* RIGHT COLUMN (~50% Width): Structurally Reserved for Future Image */}
          <div className="w-full lg:w-1/2 pointer-events-none" />
        </div>

        {/* ================================================== */}
        {/* 2. FULL-WIDTH 0–5 µm MEASURING SCALE */}
        {/* ================================================== */}
        <div className="w-full pt-2 sm:pt-4 pb-2">
          <div className="relative w-full">
            {/* Baseline & Ticks SVG */}
            <svg
              className="w-full h-7 text-[#F4F5EC]"
              viewBox="0 0 1000 28"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="22"
                x2="1000"
                y2="22"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.58"
              />
              <line x1="2" y1="8" x2="2" y2="22" stroke="currentColor" strokeWidth="2.5" opacity="0.75" />
              <line x1="200" y1="8" x2="200" y2="22" stroke="currentColor" strokeWidth="2.5" opacity="0.75" />
              <line x1="400" y1="8" x2="400" y2="22" stroke="currentColor" strokeWidth="2.5" opacity="0.75" />
              <line x1="600" y1="8" x2="600" y2="22" stroke="currentColor" strokeWidth="2.5" opacity="0.75" />
              <line x1="800" y1="8" x2="800" y2="22" stroke="currentColor" strokeWidth="2.5" opacity="0.75" />
              <line x1="998" y1="8" x2="998" y2="22" stroke="currentColor" strokeWidth="2.5" opacity="0.75" />
              {[...Array(25)].map((_, i) => {
                const x = i * 40;
                if (i % 5 === 0) return null;
                return (
                  <line
                    key={i}
                    x1={x}
                    y1="14"
                    x2={x}
                    y2="22"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    opacity="0.4"
                  />
                );
              })}
            </svg>
            {/* Ticks Labels: 0 through 5 µm */}
            <div className="flex justify-between text-xs sm:text-sm font-mono font-bold text-[#A9E889]/85 pt-1 px-0.5">
              <span>0</span>
              <span>1 µm</span>
              <span>2 µm</span>
              <span>3 µm</span>
              <span>4 µm</span>
              <span>5 µm</span>
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* 3. TRUE FULL-BLEED TRANSLUCENT BOTANICAL STRIP/RIBBON */}
        {/* ================================================== */}
        <div
          className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-6 sm:my-8 border-t border-b border-[rgba(190,232,190,0.12)] rounded-none backdrop-blur-[8px]"
          style={{ backgroundColor: "rgba(5, 48, 34, 0.82)" }}
        >
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-12 py-5 sm:py-6 lg:py-7 min-h-[118px] md:min-h-[130px] flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6 md:gap-0">
              {/* Column 1 */}
              <div className="md:border-r border-[rgba(220,240,220,0.18)] md:pr-8 flex flex-col justify-center border-b border-[rgba(220,240,220,0.12)] md:border-b-0 pb-3 md:pb-0">
                <div
                  className="text-[11px] sm:text-xs lg:text-[13px] font-medium uppercase tracking-[0.2em] text-[#A9E889] mb-1.5"
                  style={{
                    fontFamily:
                      'ui-monospace, "SFMono-Regular", "Cascadia Code", "Roboto Mono", monospace',
                  }}
                >
                  SYSTEM
                </div>
                <div className="text-2xl sm:text-[26px] lg:text-[28px] font-normal text-[#F4F5EC] tracking-[-0.025em] leading-[1.1]">
                  Living systems.
                </div>
              </div>

              {/* Column 2 */}
              <div className="md:px-8 flex flex-col justify-center md:border-r border-[rgba(220,240,220,0.18)] border-b border-[rgba(220,240,220,0.12)] md:border-b-0 pb-3 md:pb-0">
                <div
                  className="text-[11px] sm:text-xs lg:text-[13px] font-medium uppercase tracking-[0.2em] text-[#A9E889] mb-1.5"
                  style={{
                    fontFamily:
                      'ui-monospace, "SFMono-Regular", "Cascadia Code", "Roboto Mono", monospace',
                  }}
                >
                  SIGNAL
                </div>
                <div className="text-2xl sm:text-[26px] lg:text-[28px] font-normal text-[#F4F5EC] tracking-[-0.025em] leading-[1.1]">
                  Microbial intelligence.
                </div>
              </div>

              {/* Column 3 */}
              <div className="md:pl-8 flex flex-col justify-center pt-2 md:pt-0">
                <div
                  className="text-[11px] sm:text-xs lg:text-[13px] font-medium uppercase tracking-[0.2em] text-[#A9E889] mb-1.5"
                  style={{
                    fontFamily:
                      'ui-monospace, "SFMono-Regular", "Cascadia Code", "Roboto Mono", monospace',
                  }}
                >
                  SCALE
                </div>
                <div className="text-2xl sm:text-[26px] lg:text-[28px] font-normal text-[#F4F5EC] tracking-[-0.025em] leading-[1.1]">
                  Biological potential.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* 4. LARGE CLOSING STATEMENT */}
        {/* ================================================== */}
        <div className="w-full mt-14 sm:mt-16 lg:mt-18 mb-14 sm:mb-16 text-left relative">
          <h2
            className="relative z-10 uppercase text-[#F4F5EC] text-[clamp(44px,6.2vw,108px)] tracking-[-0.045em] leading-[0.92] font-bold"
            style={{
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 0.92,
            }}
          >
            <div>THE NEXT BIG</div>
            <div className="flex flex-wrap items-baseline gap-x-4 sm:gap-x-6 gap-y-2 mt-1 sm:mt-2">
              <span>THING IS REALLY</span>
              <span className="text-[#9DDC72] font-bold ml-1 sm:ml-2">
                SMALL.
              </span>
            </div>
          </h2>
        </div>

        {/* ================================================== */}
        {/* 5. BRAND / CTA ROW */}
        {/* ================================================== */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-6 mb-4 border-t border-[rgba(244,245,236,0.18)] mt-14 sm:mt-16">
          {/* Middle / Left: Official Logo / Branding */}
          <div className="flex items-center gap-3">
            <img
              src="/images/biofactor-official-logo.png"
              alt="Biofactor Biologicals"
              className="h-9 sm:h-11 w-auto object-contain brightness-200"
            />
            <span className="text-sm sm:text-base font-medium tracking-[0.12em] uppercase text-[#F4F5EC]/88">
              BIOFACTOR BIOLOGICALS
            </span>
          </div>

          {/* Right: CTA Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="/science-technology"
              className="bg-[#A9E889] hover:bg-[#97d876] text-[#06271A] font-semibold text-xs sm:text-sm px-6 sm:px-7 h-[46px] sm:h-[50px] flex items-center justify-center rounded-lg transition-colors text-center shadow-sm"
            >
              EXPLORE OUR SCIENCE
            </a>
            <a
              href="#contact"
              className="bg-[rgba(5,48,34,0.30)] border border-[rgba(244,245,236,0.55)] hover:bg-[rgba(5,48,34,0.50)] hover:border-[#F4F5EC] text-[#F4F5EC] font-semibold text-xs sm:text-sm px-6 sm:px-7 h-[46px] sm:h-[50px] flex items-center justify-center rounded-lg transition-colors text-center"
            >
              WORK WITH US
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}





