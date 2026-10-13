"use client";

import React from "react";
import { useTranslation } from "@/app/i18n/useTranslation";

export default function RuminantsMethane() {
  const { t } = useTranslation();

  return (
    <section id="s3" data-n="Methane" className="w-full relative bg-[#DDE9D8] text-[#173522] overflow-hidden" data-ruminants-section="methane" data-motion>
      {/* 50 / 50 Split Architectural Section */}
      <div className="w-full flex flex-col lg:flex-row items-stretch split">
        {/* LEFT HALF: Full-Height Architectural Photograph (Edge-to-Edge Left, Top-to-Bottom) */}
        <div className="w-full lg:w-1/2 relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex-shrink-0 bg-[#c5d5c5] overflow-hidden !rounded-none">
          <img
            src="/images/ruminants/methane-feed-energy.png"
            alt="Dairy cow feeding in open pasture — Methane feed energy reduction"
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center block !rounded-none"
          />
        </div>

        {/* RIGHT HALF: Solid Pale Botanical #DDE9D8 Content Panel */}
        <div className="w-full lg:w-1/2 bg-[#DDE9D8] text-[#173522] flex flex-col justify-center py-10 sm:py-12 lg:py-14 px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="max-w-[680px] w-full mx-auto lg:mx-0">
            {/* Header Block */}
            <div className="mb-7 sm:mb-8 rv">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[1.5px] bg-[#2D6A4F]" />
                <span className="font-mono text-xs sm:text-[13px] font-semibold tracking-widest text-[#2D6A4F] uppercase">
                  {t("ruminants_methane_eyebrow")}
                </span>
              </div>

              {/* Display Headline */}
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[42px] xl:text-[44px] text-[#173522] tracking-tight leading-[0.96] uppercase mb-4">
                {t("ruminants_methane_title")}
              </h2>

              {/* Intro Paragraph */}
              <p className="font-serif text-base sm:text-lg text-[#26382D]/85 leading-relaxed">
                {t("ruminants_methane_desc")}
              </p>
            </div>

            {/* Compact 32% Evidence Block — Horizontal Layout */}
            <div className="mb-7 sm:mb-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 rv d1">
              <div className="font-display font-extrabold text-5xl sm:text-6xl text-[#2D6A4F] tracking-tight leading-none flex-shrink-0">
                <span data-cu="32%" data-methane-value>32%</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block">
                  {t("ruminants_methane_stat_title")}
                </span>
                <p className="text-sm sm:text-base text-[#26382D]/85 leading-relaxed font-sans">
                  {t("ruminants_methane_stat_desc")}
                </p>
              </div>
            </div>

            {/* Biologicals Chapter */}
            <div className="space-y-4 rv d2">
              <div>
                <span className="font-mono text-xs sm:text-[13px] font-bold text-[#2D6A4F] uppercase tracking-widest block mb-2">
                  {t("ruminants_methane_stand_title")}
                </span>
                <p className="text-sm sm:text-base text-[#26382D]/85 leading-relaxed font-sans">
                  {t("ruminants_methane_stand_desc")}
                </p>
              </div>

              <div className="border-l-2 border-[#2D6A4F] pl-4 sm:pl-5 py-1 mt-3 call" data-motion-row>
                <p className="font-serif italic text-sm sm:text-base text-[#173522]/90 leading-relaxed">
                  {t("ruminants_methane_callout")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



