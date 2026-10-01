import React from "react";

export default function RuminantsClosing() {
  return (
    <section className="w-full bg-[#173F2B] text-white pt-9 md:pt-10 lg:pt-[42px] pb-9 md:pb-10 lg:pb-[44px] overflow-hidden relative z-20" data-ruminants-section="closing" data-motion style={{ minHeight: 0 }}>
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        {/* TOP MICRO-LABELS */}
        <div className="flex items-center justify-between mb-7 md:mb-9">
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
            BIOFACTOR · RUMINANTS
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
            FOCUS · <span className="text-[#B8E986]">WHOLE ANIMAL</span>
          </span>
        </div>

        {/* PRIMARY CLOSING AREA — ASYMMETRIC EDITORIAL COMPOSITION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-9 md:mb-11 lg:mb-[44px]">
          {/* LEFT / PRIMARY AREA: Quote with thin vertical accent */}
          <div className="lg:col-span-7 xl:col-span-8 flex max-w-[780px]">
            {/* Vertical Biological Green Accent */}
            <div className="w-[2px] bg-[#B8E986]/60 mr-5 sm:mr-6 lg:mr-8 flex-shrink-0 self-stretch rounded-full" data-closing-rule />

            {/* Display Quote — Forced Exact 2 Lines on Desktop */}
            <h2 className="font-display font-extrabold text-[30px] sm:text-[38px] md:text-[44px] lg:text-[48px] xl:text-[50px] text-[#F8FAFC] tracking-tight leading-[1.02]">
              Feed the microbes well, and{" "}
              <br className="hidden sm:block" />
              <span className="font-serif italic text-[#B8E986] font-normal inline">
                they feed the animal.
              </span>
            </h2>
          </div>

          {/* RIGHT AREA: Biofactor Brand Identity Signature */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center gap-3.5">
            <div>
              <div className="font-display font-extrabold text-lg sm:text-[21px] lg:text-[22px] tracking-[0.15em] uppercase text-white mb-1.5">
                BIOFACTOR <span className="text-[#B8E986]">BIOLOGICALS</span>
              </div>
              <p className="font-serif italic text-sm sm:text-[16px] lg:text-[17px] text-white/70 leading-relaxed max-w-sm">
                Turning microbial functions into measurable biological impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




