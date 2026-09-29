import React from "react";
import MicrobeField from "../MicrobeField";

export default function RuminantsLifeStages() {
  return (
    <section className="relative w-full bg-[#EAF3EA] text-[#173522] pt-6 md:pt-7 lg:pt-8 pb-20 md:pb-28 lg:pb-36 overflow-hidden">
      {/* Floating Microorganism Graphics Layer over #EAF3EA */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-90 overflow-hidden">
        <MicrobeField
          position="absolute"
          densityMultiplier={2.8}
          motionMultiplier={0.8}
          opacityMultiplier={0.95}
          rotationMultiplier={0.6}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        {/* Subtle Restrained Section Boundary Divider */}
        <div className="w-full border-t border-[#167A4A]/14 mb-8 md:mb-10 lg:mb-12" aria-hidden="true" />

        {/* Main Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1.5px] bg-[#2D6A4F]" />
          <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
            02 / TARGETED ANIMAL APPLICATIONS
          </span>
        </div>

        <h2 className="font-display font-extrabold text-[clamp(2.25rem,3.8vw,4rem)] text-[#173522] tracking-tight leading-[1.02] uppercase mb-12 md:mb-20 lg:mb-[80px] max-w-[1000px]">
          From the first week of life to peak lactation.
        </h2>

        {/* 3 Life Stage Editorial Chapters */}
        <div className="space-y-28 md:space-y-40 lg:space-y-48">
          {/* CHAPTER 1: CALVES (LEFT = Photo ~46%, RIGHT = Editorial Content) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Photo Composition Left */}
            <div className="lg:col-span-5">
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#E8EFE6]">
                <img
                  src="/images/ruminants/calves-pre-weaning.png"
                  alt="Calves pre-weaning stage"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Editorial Content Right */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div>
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase block mb-2">
                  STAGE 01 — REARING
                </span>
                <h3 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#173522] tracking-tight uppercase mb-3">
                  CALVES
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[#26382D]/70 tracking-wide uppercase">
                  Early-life gut colonisation &amp; early rumen development.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="font-serif font-semibold text-2xl sm:text-3xl text-[#173522] leading-snug">
                  A calf starts life as a single-stomached animal.
                </h4>
                <p className="text-base sm:text-lg text-[#26382D]/85 leading-relaxed max-w-2xl font-sans">
                  The first few weeks of life determine how quickly the calf transitions from milk dependence to a fully functioning adult rumen. Early microbial seeding accelerates ruminal papillae development and establishes foundational gut immunity that persists into adulthood.
                </p>
              </div>

              {/* Editorial Evidence Rows (No Colored Cards) */}
              <div className="pt-6 border-t border-[#173522]/12 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
                    EARLY WEANING
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    Up to 14 days earlier transition to solid feed through accelerated ruminal papillae growth.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline pt-4 border-t border-[#173522]/08">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
                    IMMUNE BOOSTER
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    Lower incidence of calf scours and early respiratory issues through competitive exclusion.
                  </p>
                </div>
              </div>

              {/* Key Programming Note - Refined Pull-Quote Style */}
              <div className="pt-6 border-l-2 border-[#2D6A4F] pl-6 my-2">
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#2D6A4F] uppercase block mb-1">
                  EARLY MICROBIOME PROGRAMMING
                </span>
                <p className="font-serif italic text-sm sm:text-base text-[#173522]/90 leading-relaxed">
                  Intervention in the first 4 weeks of life creates a permanent shift in ruminal microbial architecture that improves feed conversion efficiency across the animal&apos;s entire productive lifetime.
                </p>
              </div>
            </div>
          </div>

          {/* CHAPTER 2: TRANSITION (LEFT = Editorial Content, RIGHT = Photo ~46%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Editorial Content Left */}
            <div className="lg:col-span-7 lg:order-1 flex flex-col justify-center space-y-6">
              <div>
                <span className="font-mono text-xs font-semibold tracking-widest text-[#B45309] uppercase block mb-2">
                  STAGE 02 — PERIPARTURIENT
                </span>
                <h3 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#173522] tracking-tight uppercase mb-3">
                  TRANSITION
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[#26382D]/70 tracking-wide uppercase">
                  Periparturient metabolic balance &amp; dry matter intake recovery.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="font-serif font-semibold text-2xl sm:text-3xl text-[#173522] leading-snug">
                  The critical weeks around calving.
                </h4>
                <p className="text-base sm:text-lg text-[#26382D]/85 leading-relaxed max-w-2xl font-sans">
                  The transition period (3 weeks pre-calving to 3 weeks post-calving) is the highest metabolic risk window in a dairy cow&apos;s life. Rapid diet changes, immune suppression, and energy deficits create severe ruminal dysbiosis if not actively managed.
                </p>
              </div>

              {/* Editorial Evidence Rows */}
              <div className="pt-6 border-t border-[#173522]/12 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#B45309] uppercase">
                    METABOLIC STABILITY
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    Reduced incidence of subclinical ketosis and displaced abomasum by keeping ruminal pH stable.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline pt-4 border-t border-[#173522]/08">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#B45309] uppercase">
                    DRY MATTER INTAKE
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    1.2–1.8 kg higher daily dry matter intake during early lactation post-calving recovery.
                  </p>
                </div>
              </div>

              {/* Key Programming Note - Refined Pull-Quote Style */}
              <div className="pt-6 border-l-2 border-[#B45309] pl-6 my-2">
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#B45309] uppercase block mb-1">
                  INFLAMMATION CONTROL
                </span>
                <p className="font-serif italic text-sm sm:text-base text-[#173522]/90 leading-relaxed">
                  Targeted biologicals reduce systemic inflammatory response after calving, redirecting energy from immune activation toward milk synthesis and rapid reproductive recovery.
                </p>
              </div>
            </div>

            {/* Photo Composition Right */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#E8EFE6]">
                <img
                  src="/images/ruminants/transition-periparturient.png"
                  alt="Transition periparturient stage"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* CHAPTER 3: LACTATION (LEFT = Photo ~46%, RIGHT = Editorial Content) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Photo Composition Left */}
            <div className="lg:col-span-5">
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#E8EFE6]">
                <img
                  src="/images/ruminants/lactation-production.png"
                  alt="Lactation production stage"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Editorial Content Right */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div>
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase block mb-2">
                  STAGE 03 — PRODUCTION
                </span>
                <h3 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#173522] tracking-tight uppercase mb-3">
                  LACTATION
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[#26382D]/70 tracking-wide uppercase">
                  Peak milk production &amp; sustained feed efficiency.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="font-serif font-semibold text-2xl sm:text-3xl text-[#173522] leading-snug">
                  A more efficient rumen turns more food into milk.
                </h4>
                <p className="text-base sm:text-lg text-[#26382D]/85 leading-relaxed max-w-2xl font-sans">
                  During peak lactation, the cow&apos;s metabolic demand is extreme. Optimising the ratio of propionate to acetate in the rumen unlocks additional energy for milk fat and protein synthesis without increasing feed intake.
                </p>
              </div>

              {/* Editorial Evidence Rows */}
              <div className="pt-6 border-t border-[#173522]/12 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
                    MILK YIELD &amp; QUALITY
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    +1.4–2.2 L/hd/day increase in energy-corrected milk yield with improved fat and protein ratio.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6 items-baseline pt-4 border-t border-[#173522]/08">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
                    FEED CONVERSION RATIO
                  </span>
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    4.8–6.5% improvement in overall herd feed efficiency across total lactation length.
                  </p>
                </div>
              </div>

              {/* Key Programming Note - Refined Pull-Quote Style */}
              <div className="pt-6 border-l-2 border-[#2D6A4F] pl-6 my-2">
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#2D6A4F] uppercase block mb-1">
                  SUSTAINED PRODUCTION
                </span>
                <p className="font-serif italic text-sm sm:text-base text-[#173522]/90 leading-relaxed">
                  Maintains peak milk yield for 3–5 weeks longer while reducing body condition loss during negative energy balance in early lactation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

