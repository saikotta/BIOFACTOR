import React from "react";

export default function PoultryClosing() {
  return (
    <section className="relative z-20 w-full overflow-hidden bg-[#173F2B] pt-9 pb-9 text-white md:pt-10 md:pb-10 lg:pt-[42px] lg:pb-[44px]" data-pm-section="closing">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        <div className="mb-7 flex items-center justify-between md:mb-9">
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
            BIOFACTOR · POULTRY
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
            FOCUS · <span className="text-[#B8E986]">WHOLE FLOCK</span>
          </span>
        </div>

        <div className="mb-9 grid grid-cols-1 items-center gap-8 md:mb-11 lg:mb-[44px] lg:grid-cols-12 lg:gap-14">
          <div className="flex max-w-[780px] lg:col-span-7 xl:col-span-8">
            <div className="mr-5 w-[2px] flex-shrink-0 self-stretch rounded-full bg-[#B8E986]/60 sm:mr-6 lg:mr-8" aria-hidden="true" />
            <h2 className="font-display text-[30px] leading-[1.02] font-extrabold tracking-tight text-[#F8FAFC] sm:text-[38px] md:text-[44px] lg:text-[48px] xl:text-[50px]" data-pm-heading="flip">
              Feed the microbes well, and{" "}
              <br className="hidden sm:block" />
              <span className="inline font-serif font-normal text-[#B8E986] italic">
                they feed the animal.
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-center gap-3.5 lg:col-span-5 xl:col-span-4">
            <div>
              <div className="mb-1.5 font-display text-lg font-extrabold tracking-[0.15em] text-white uppercase sm:text-[21px] lg:text-[22px] br-rv">
                BIOFACTOR <span className="text-[#B8E986]">BIOLOGICALS</span>
              </div>
              <p className="max-w-sm font-serif text-sm leading-relaxed text-white/70 italic sm:text-[16px] lg:text-[17px] br-rv">
                Turning microbial functions into measurable biological impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}