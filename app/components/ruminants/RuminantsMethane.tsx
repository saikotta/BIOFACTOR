import React from "react";

export default function RuminantsMethane() {
  return (
    <section className="w-full relative bg-[#DDE9D8] text-[#173522] overflow-hidden" data-ruminants-section="methane" data-motion>
      {/* 50 / 50 Split Architectural Section */}
      <div className="w-full flex flex-col lg:flex-row items-stretch">
        {/* LEFT HALF: Full-Height Architectural Photograph (Edge-to-Edge Left, Top-to-Bottom) */}
        <div className="w-full lg:w-1/2 relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex-shrink-0 bg-[#c5d5c5]" data-methane-image>
          <img
            src="/images/ruminants/methane-feed-energy.png"
            alt="Dairy cow feeding in open pasture — Methane feed energy reduction"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center block will-change-transform"
          />
        </div>

        {/* RIGHT HALF: Solid Pale Botanical #DDE9D8 Content Panel */}
        <div className="w-full lg:w-1/2 bg-[#DDE9D8] text-[#173522] flex flex-col justify-center py-10 sm:py-12 lg:py-14 px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="max-w-[680px] w-full mx-auto lg:mx-0">
            {/* Header Block */}
            <div className="mb-7 sm:mb-8">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[1.5px] bg-[#2D6A4F]" />
                <span className="font-mono text-xs sm:text-[13px] font-semibold tracking-widest text-[#2D6A4F] uppercase">
                  03 / ENTERIC EMISSIONS REDUCTION
                </span>
              </div>

              {/* Display Headline */}
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[42px] xl:text-[44px] text-[#173522] tracking-tight leading-[0.96] uppercase mb-4">
                Methane is feed energy
                <br className="hidden lg:block" />{" "}
                the animal never uses.
              </h2>

              {/* Intro Paragraph */}
              <p className="font-serif text-base sm:text-lg text-[#26382D]/85 leading-relaxed">
                Enteric methane from ruminants represents not only 14.5% of global human-induced greenhouse gas emissions, but also 2–12% of the gross feed energy the animal consumes without gaining any benefit.
              </p>
            </div>

            {/* Compact 32% Evidence Block — Horizontal Layout */}
            <div className="mb-7 sm:mb-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div className="font-display font-extrabold text-5xl sm:text-6xl text-[#2D6A4F] tracking-tight leading-none flex-shrink-0">
                <span data-methane-value>32%</span>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#2D6A4F] uppercase tracking-widest block">
                  MAX COMMERCIAL REDUCTION
                </span>
                <p className="text-sm sm:text-base text-[#26382D]/85 leading-relaxed font-sans">
                  Maximum enteric methane reduction achieved in commercial dairy trial without impacting dry matter intake or milk yield.
                </p>
              </div>
            </div>

            {/* Biologicals Chapter */}
            <div className="space-y-4">
              <div>
                <span className="font-mono text-xs sm:text-[13px] font-bold text-[#2D6A4F] uppercase tracking-widest block mb-2">
                  WHERE BIOLOGICALS STAND TODAY
                </span>
                <p className="text-sm sm:text-base text-[#26382D]/85 leading-relaxed font-sans">
                  Chemical inhibitors can reduce methane drastically, but often suffer from consumer rejection, regulatory hurdles, or rapid microbial adaptation. Synthetic additives can also disrupt beneficial ruminal fermentation if overdosed.
                </p>
              </div>

              <div className="border-l-2 border-[#2D6A4F] pl-4 sm:pl-5 py-1 mt-3" data-motion-row>
                <p className="font-serif italic text-sm sm:text-base text-[#173522]/90 leading-relaxed">
                  Biological solutions (direct-fed microbials, targeted enzyme blends, and precision bio-actives) work WITH the animal&apos;s natural rumen ecology, providing consistent emission reduction while simultaneously improving digestible energy yield.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



