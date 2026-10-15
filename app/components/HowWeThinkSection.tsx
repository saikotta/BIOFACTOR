"use client";

import React from "react";
import { useTranslation } from "../i18n";

export default function HowWeThinkSection() {
  const { t, language } = useTranslation();
  return (
    <section
      id="how-we-think-section"
      className="relative z-20 w-full overflow-hidden select-none"
    >
      {/* About-style light green hero with the ecosystem artwork integrated behind the copy. */}
      <div
        className="relative isolate overflow-hidden"
        style={{ backgroundColor: "#B8DDA3" }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 42% 42%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 34%, transparent 68%)",
          }}
        />
        <img
          src="/images/about-ecosystem.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 z-0 w-[92vw] max-w-[1080px] opacity-35 sm:w-[82vw] lg:w-[78vw]"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1700px] px-6 pt-16 pb-2 sm:px-12 md:px-16 md:pt-20 lg:px-20">
        {/* ================================================== */}
        {/* 1. MAIN TWO-COLUMN AREA (Upper 50/50 Desktop) */}
        {/* ================================================== */}
        <div className="relative flex min-h-[340px] flex-col items-start gap-8 md:min-h-[390px] lg:flex-row lg:gap-12">
          {/* LEFT COLUMN (~50% Width) */}
          <div className="flex w-full max-w-[780px] flex-col justify-center gap-3 sm:gap-4 lg:w-[62%]">
            {/* Technical Mono Eyebrow */}
            <div
              className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#147A46] sm:text-xs lg:text-[13px]"
              style={{
                fontFamily:
                  'ui-monospace, "SFMono-Regular", "Cascadia Code", "Roboto Mono", monospace',
              }}
            >
              {t("how_we_think_eyebrow", "THE NEXT GENERATION OF TECHNOLOGY")}
            </div>

            {/* Editorial Serif Sentence 1 */}
            <p
              className="text-[clamp(24px,2.5vw,43px)] font-normal tracking-[-0.02em] leading-[1.2] text-[#173522]"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              {t("how_we_think_quote_1", "won’t be defined by what we build")}
            </p>

            {/* Oversized Sans Word */}
            <div className="my-1 text-[clamp(48px,7vw,130px)] font-bold tracking-[-0.04em] leading-[1] text-[#147A46] sm:my-2">
              {t("how_we_think_larger", "larger.")}
            </div>

            {/* Editorial Serif Sentence 2 */}
            <p
              className="text-[clamp(24px,2.5vw,43px)] font-normal tracking-[-0.02em] leading-[1.2] text-[#173522]"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              {t("how_we_think_quote_2", "It will be defined by what we unlock in biology.")}
            </p>
          </div>

        </div>

        {/* ================================================== */}
        {/* 2. FULL-WIDTH 0–5 µm MEASURING SCALE */}
        {/* ================================================== */}
        <div className="w-full max-w-[1400px] pt-2 pb-2 sm:pt-4">
          <div className="relative w-full">
            {/* Baseline & Ticks SVG */}
            <svg
              className="h-7 w-full text-[#06271A]"
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
            <div className="flex justify-between px-0.5 pt-1 font-mono text-xs font-bold text-[#06271A] sm:text-sm">
              <span>0</span>
              <span>1 µm</span>
              <span>2 µm</span>
              <span>3 µm</span>
              <span>4 µm</span>
              <span>5 µm</span>
            </div>
          </div>
        </div>

        </div>
      </div>

      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/how-we-think-wheat.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(90deg, rgba(4, 28, 19, 0.68) 0%, rgba(4, 28, 19, 0.52) 42%, rgba(4, 28, 19, 0.42) 70%, rgba(4, 28, 19, 0.58) 100%),
                linear-gradient(180deg, rgba(3, 24, 16, 0.22) 0%, rgba(3, 24, 16, 0.34) 100%)
              `,
            }}
          />
        </div>
        <div className="relative z-10">
        {/* ================================================== */}
        {/* 3. TRUE FULL-BLEED TRANSLUCENT BOTANICAL STRIP/RIBBON */}
        {/* ================================================== */}
        <div
          className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-0 border-t border-b border-[rgba(190,232,190,0.12)] rounded-none backdrop-blur-[8px]"
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
                  {t("how_we_think_systems_tag", "SYSTEMS")}
                </div>
                <div className="text-xl sm:text-[22px] lg:text-2xl font-normal text-[#F4F5EC] tracking-[-0.025em] leading-[1.2]">
                  {t("how_we_think_systems_desc", "Chemical, Biological & Organic")}
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
                  {t("how_we_think_signal_tag", "SIGNAL")}
                </div>
                <div className="text-xl sm:text-[22px] lg:text-2xl font-normal text-[#F4F5EC] tracking-[-0.025em] leading-[1.2]">
                  {t("how_we_think_signal_desc", "Microbial intelligence.")}
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
                  {t("how_we_think_scale_tag", "SCALE")}
                </div>
                <div className="text-xl sm:text-[22px] lg:text-2xl font-normal text-[#F4F5EC] tracking-[-0.025em] leading-[1.2]">
                  {t("how_we_think_scale_desc", "Biological potential.")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* 5. BRAND / CTA ROW */}
        {/* ================================================== */}
        <div className="mx-auto flex w-full max-w-[1400px] flex-row items-center justify-end gap-6 px-8 pt-6 pb-6 sm:px-12 lg:px-20">
          {/* Right: CTA Button */}
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="/science-technology/"
              className="bg-[#A9E889] hover:bg-[#97d876] text-[#06271A] font-semibold text-xs sm:text-sm px-6 sm:px-7 h-[46px] sm:h-[50px] flex items-center justify-center rounded-lg transition-colors text-center shadow-sm uppercase tracking-wider"
            >
              {t("nav_science_tech", "EXPLORE OUR SCIENCE")}
            </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}




