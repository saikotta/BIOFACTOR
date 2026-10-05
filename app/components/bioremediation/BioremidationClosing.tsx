import React from "react";

export default function BioremidationClosing() {
  return (
    <section className="w-full bg-[#173F2B] text-white pt-9 md:pt-10 lg:pt-[42px] pb-9 md:pb-10 lg:pb-[44px] overflow-hidden border-t border-[#167A4A]/25">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        {/* TOP MICRO-LABELS */}
        <div className="flex items-center justify-between mb-7 md:mb-9">
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
            BIOFACTOR · BIO-REMEDIATION
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
            FOCUS · <span className="text-[#B8E986]">WASTEWATER &amp; EFFLUENT</span>
          </span>
        </div>

        {/* PRIMARY CLOSING AREA — ASYMMETRIC EDITORIAL COMPOSITION (RUMINANTS & POULTRY PARITY) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-9 md:mb-11 lg:mb-[44px] br-rv">
          {/* LEFT AREA: Statement with vertical biological green accent */}
          <div className="lg:col-span-7 xl:col-span-8 flex max-w-[820px] br-callout">
            {/* Vertical Biological Green Accent Bar */}
            <div className="w-[2px] bg-[#B8E986]/60 mr-5 sm:mr-6 lg:mr-8 flex-shrink-0 self-stretch rounded-full opacity-0" />

            {/* Display Quote Text */}
            <h2 className="font-display font-extrabold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] xl:text-[48px] text-[#F8FAFC] tracking-tight leading-[1.05]">
              Clean water is not the absence <br className="hidden sm:block" />
              of microbes. It is the{" "}
              <span className="font-serif italic text-[#B8E986] font-normal">
                right microbes
              </span>
              , doing the work.
            </h2>
          </div>

          {/* RIGHT AREA: Biofactor Brand Identity Typographic Signature */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center gap-3">
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
