"use client";

import React from "react";
import { useTranslation } from "@/app/i18n/useTranslation";

export default function BioremidationApplications() {
  const { t } = useTranslation();

  return (
    <section id="s3" className="relative w-full bg-[#EAF3EA] text-[#173522] pt-8 md:pt-12 lg:pt-16 pb-8 md:pb-12 lg:pb-14 overflow-hidden">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        {/* Section Boundary Divider */}
        <div className="w-full border-t border-[#167A4A]/14 mb-8 md:mb-10 lg:mb-12" aria-hidden="true" />

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4 br-rv">
          <span className="w-8 h-[1.5px] bg-[#2D6A4F]" />
          <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
            {t("bio_ind_eyebrow")}
          </span>
        </div>

        <h2 className="font-display font-extrabold text-[clamp(2.25rem,3.8vw,4rem)] text-[#173522] tracking-tight leading-[1.02] uppercase mb-12 md:mb-20 lg:mb-[80px] max-w-[1000px] br-rv br-d1">
          {t("bio_ind_eyebrow")}
        </h2>

        {/* 2 Application Chapters */}
        <div className="space-y-28 md:space-y-40 lg:space-y-48">

          {/* CHAPTER 1: INDUSTRIAL (LEFT = Title + Priority + Image, RIGHT = Editorial Content) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Vertically Centered Title + Priority + Image */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              <div>
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase block mb-2">
                  {t("bio_ind_sub")}
                </span>
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#173522] tracking-tight uppercase mb-2">
                  {t("bio_ind_title")}
                </h1>
                <p className="font-mono text-xs sm:text-sm text-[#26382D]/70 tracking-wide uppercase">
                  {t("bio_ind_priority")}
                </p>
              </div>

              <div className="group w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#E8EFE6] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(22,122,74,0.25)] cursor-pointer active:scale-[0.98]">
                <img
                  src="/images/bioremidation/industrial.jpg"
                  alt="Industrial Bio-Remediation"
                  className="w-full h-full object-cover object-center block transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105"
                />
              </div>
            </div>

            {/* Editorial Content Right */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="space-y-4 br-rv">
                <h5 className="font-serif font-semibold text-2xl sm:text-3xl text-[#173522] leading-snug">
                  {t("bio_ind_h5")}
                </h5>
                <p className="text-base sm:text-lg text-[#26382D]/85 leading-relaxed max-w-2xl font-sans">
                  {t("bio_ind_desc")}
                </p>
              </div>

              {/* Editorial Evidence Rows */}
              <div className="pt-6 border-t border-[#173522]/12 space-y-5 br-rv br-d1">
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
                    {t("bio_ind_dye_title")}
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    {t("bio_ind_dye_desc")}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline pt-4 border-t border-[#173522]/08">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
                    {t("bio_ind_chrom_title")}
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    {t("bio_ind_chrom_desc")}
                  </p>
                </div>
              </div>

              {/* Key Programming Note - Pull-Quote Style */}
              <div className="pt-6 pl-6 my-2 br-callout br-rv br-d2">
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#2D6A4F] uppercase block mb-1">
                  {t("bio_ind_callout_title")}
                </span>
                <p className="font-serif italic text-sm sm:text-base text-[#173522]/90 leading-relaxed">
                  {t("bio_ind_callout_desc")}
                </p>
              </div>
            </div>
          </div>


          {/* CHAPTER 2: SEPTIC (LEFT = Editorial Content, RIGHT = Vertically Centered Title + Priority + Image) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Editorial Content Left */}
            <div className="lg:col-span-7 lg:order-1 order-2 flex flex-col justify-center space-y-6">
              <div className="space-y-4 br-rv">
                <h5 className="font-serif font-semibold text-2xl sm:text-3xl text-[#173522] leading-snug">
                  {t("bio_septic_h5")}
                </h5>
                <p className="text-base sm:text-lg text-[#26382D]/85 leading-relaxed max-w-2xl font-sans">
                  {t("bio_septic_desc")}
                </p>
              </div>

              {/* Editorial Evidence Rows */}
              <div className="pt-6 border-t border-[#173522]/12 space-y-5 br-rv br-d1">
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
                    {t("bio_septic_septage_title")}
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    {t("bio_septic_septage_desc")}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline pt-4 border-t border-[#173522]/08">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
                    {t("bio_septic_odour_title")}
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    {t("bio_septic_odour_desc")}
                  </p>
                </div>
              </div>

              {/* Key Programming Note - Pull-Quote Style */}
              <div className="pt-6 pl-6 my-2 br-callout br-rv br-d2">
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#2D6A4F] uppercase block mb-1">
                  {t("bio_septic_callout_title")}
                </span>
                <p className="font-serif italic text-sm sm:text-base text-[#173522]/90 leading-relaxed">
                  {t("bio_septic_callout_desc")}
                </p>
              </div>
            </div>

            {/* Right Column: Vertically Centered Title + Priority + Image */}
            <div className="lg:col-span-5 lg:order-2 order-1 flex flex-col justify-center space-y-4">
              <div>
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase block mb-2">
                  {t("bio_septic_sub")}
                </span>
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#173522] tracking-tight uppercase mb-2">
                  {t("bio_septic_title")}
                </h1>
                <p className="font-mono text-xs sm:text-sm text-[#26382D]/70 tracking-wide uppercase">
                  {t("bio_septic_priority")}
                </p>
              </div>

              <div className="group w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#E8EFE6] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(22,122,74,0.25)] cursor-pointer active:scale-[0.98]">
                <img
                  src="/images/bioremidation/septic.jpg"
                  alt="Septic Bio-Remediation"
                  className="w-full h-full object-cover object-center block transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
