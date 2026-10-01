import React from "react";
import Image from "next/image";

export default function NutrientsClosing() {
  return (
    <section className="w-full bg-[#173F2B] text-white pt-9 md:pt-10 lg:pt-[42px] pb-9 md:pb-10 lg:pb-[44px] overflow-hidden border-t border-[#167A4A]/25">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)] space-y-10">
        {/* TOP MICRO-LABELS */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
            BIOFACTOR · NUTRIENT BIOLOGY
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase">
            FOCUS · <span className="text-[#B8E986]">RHIZOSPHERE &amp; PLANT NUTRITION</span>
          </span>
        </div>

        {/* PRIMARY CLOSING AREA — ASYMMETRIC EDITORIAL COMPOSITION WITH FUTURE OF PLANT IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-6">
          {/* LEFT AREA: Statement with vertical biological green accent */}
          <div className="lg:col-span-7 flex max-w-[820px]">
            {/* Vertical Biological Green Accent Bar */}
            <div className="w-[2px] bg-[#B8E986]/60 mr-5 sm:mr-6 lg:mr-8 flex-shrink-0 self-stretch rounded-full" />

            {/* Display Quote Text */}
            <h2 className="font-display font-extrabold text-[26px] sm:text-[34px] md:text-[38px] lg:text-[42px] text-[#F8FAFC] tracking-tight leading-[1.08]">
              Because the future of plant nutrition is not only about what we put into the soil. <br className="hidden sm:block" />
              It is also about what{" "}
              <span className="font-serif italic text-[#B8E986] font-normal">
                biology can unlock from it.
              </span>
            </h2>
          </div>

          {/* RIGHT AREA: Featured Future of Plant Image Card */}
          <div className="lg:col-span-5 relative w-full h-[240px] sm:h-[280px] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <Image
              src="/images/nutriants/future-of-plant.jpg"
              alt="The Future of Plant Nutrition"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#173F2B] via-transparent to-transparent opacity-60 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="font-display font-bold text-sm sm:text-base tracking-widest uppercase text-white">
                BIOFACTOR <span className="text-[#B8E986]">BIOLOGICALS</span>
              </div>
              <p className="font-serif italic text-xs text-white/80">
                Turning microbial functions into measurable biological impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
