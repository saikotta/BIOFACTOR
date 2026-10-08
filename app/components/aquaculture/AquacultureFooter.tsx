import React from "react";
import BiofactorFooter from "../BiofactorFooter";

export default function AquacultureFooter() {
  return (
    <footer className="w-full" data-pm-section="footer" data-n="Closing" data-motion>
      {/* Top quote band */}
      <div className="w-full bg-[#173F2B] px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)] pt-9 pb-9 text-[#BFD9B4] md:pt-10 md:pb-10 lg:pt-[42px] lg:pb-[44px]">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-7 md:mb-9 rv">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50">
              BIOFACTOR · AQUACULTURE
            </span>
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50">
              FOCUS · <span className="text-white font-bold">POND HEALTH</span>
            </span>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="call rv d1 flex max-w-[780px] lg:col-span-7 xl:col-span-8">
              <div className="mr-5 w-[2px] flex-shrink-0 self-stretch rounded-full bg-[#B8E986]/60 sm:mr-6 lg:mr-8" aria-hidden="true" />
              <h2 className="font-inter-tight text-[30px] leading-[1.02] font-extrabold text-[#F8FAFC] sm:text-[38px] md:text-[44px] lg:text-[48px] xl:text-[50px]">
                Manage the bottom, <br className="hidden sm:block" />
                <span className="font-newsreader font-normal text-[#B8E986] italic">and the water follows.</span>
              </h2>
            </div>

            <div className="rv d2 flex flex-col justify-center gap-3.5 lg:col-span-5 xl:col-span-4">
              <p className="font-inter-tight text-lg font-extrabold tracking-[0.15em] text-white sm:text-[21px] lg:text-[22px]">
                BIOFACTOR <span className="text-[#B8E986]">BIOLOGICALS</span>
              </p>
              <p className="font-newsreader max-w-sm text-sm leading-relaxed text-white/70 italic sm:text-[16px] lg:text-[17px]">
                Turning microbial functions into measurable biological impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BiofactorFooter />
    </footer>
  );
}
