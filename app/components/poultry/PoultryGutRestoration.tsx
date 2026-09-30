import React from "react";

export default function PoultryGutRestoration() {
  return (
    <section className="w-full bg-[#EAF3EA] text-[#0a2d1a] py-20 lg:py-32">
      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <h2 className="font-display font-bold text-[clamp(2.5rem,4vw,4rem)] text-[#0a2d1a] tracking-tight leading-[0.95] mb-6">
            Probiotics bring the<br />
            right bacteria. Prebiotics<br />
            keep them there.
          </h2>
        </div>

        {/* Two Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left Card */}
          <div className="border border-[#c4d4c4] p-8 lg:p-12">
            <div className="font-mono text-xs font-semibold tracking-widest text-[#4a7c59] uppercase mb-6">
              How probiotics get there
            </div>

            <div className="space-y-6">
              <div className="border-l-2 border-[#4a7c59] pl-4">
                <h3 className="font-display font-semibold text-lg text-[#0a2d1a] mb-2">
                  Competitive exclusion
                </h3>
                <p className="text-[#2d4a3a] text-sm leading-relaxed">
                  Beneficial bacteria take the attachment sites and nutrients that Salmonella, E. coli and Clostridium need.
                </p>
              </div>

              <div className="border-l-2 border-[#6B8F7A] pl-4">
                <h3 className="font-display font-semibold text-lg text-[#0a2d1a] mb-2">
                  Antimicrobial compounds
                </h3>
                <p className="text-[#2d4a3a] text-sm leading-relaxed">
                  Bacillus and lactic acid bacteria produce substances that inhibit pathogens directly.
                </p>
              </div>

              <div className="border-l-2 border-[#8B7F6F] pl-4">
                <h3 className="font-display font-semibold text-lg text-[#0a2d1a] mb-2">
                  Stronger gut lining
                </h3>
                <p className="text-[#2d4a3a] text-sm leading-relaxed">
                  A healthy community supports taller villi and tighter junctions between gut cells.
                </p>
              </div>

              <div className="border-l-2 border-[#D4A574] pl-4">
                <h3 className="font-display font-semibold text-lg text-[#0a2d1a] mb-2">
                  Hardy spores
                </h3>
                <p className="text-[#2d4a3a] text-sm leading-relaxed">
                  Bacillus spores tolerate heat and stomach acid, surviving feed processing and reaching the intestine.
                </p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="border border-[#c4d4c4] p-8 lg:p-12">
            <div className="font-mono text-xs font-semibold tracking-widest text-[#6B8F7A] uppercase mb-6">
              How they shape the community
            </div>

            <div className="space-y-6">
              <div className="border-l-2 border-[#6B8F7A] pl-4">
                <h3 className="font-display font-semibold text-lg text-[#0a2d1a] mb-2">
                  Selective feeding
                </h3>
                <p className="text-[#2d4a3a] text-sm leading-relaxed">
                  Fibres such as mannan- and fructo-oligosaccharides pass undigested to the lower gut, where beneficial bacteria ferment them.
                </p>
              </div>

              <div className="border-l-2 border-[#D4A574] pl-4">
                <h3 className="font-display font-semibold text-lg text-[#0a2d1a] mb-2">
                  Pathogen binding
                </h3>
                <p className="text-[#2d4a3a] text-sm leading-relaxed">
                  Mannan-oligosaccharides (MOS) bind to the fimbriae that some bacteria use to attach.
                </p>
              </div>

              <div className="border-l-2 border-[#8B7F6F] pl-4">
                <h3 className="font-display font-semibold text-lg text-[#0a2d1a] mb-2">
                  Short-chain fatty acids
                </h3>
                <p className="text-[#2d4a3a] text-sm leading-relaxed">
                  Fermentation produces acids that lower gut pH, feed gut cells and discourage pathogens.
                </p>
              </div>

              <div className="border-l-2 border-[#D4A574] pl-4">
                <h3 className="font-display font-semibold text-lg text-[#0a2d1a] mb-2">
                  Synbiotic effect
                </h3>
                <p className="text-[#2d4a3a] text-sm leading-relaxed">
                  Given together, probiotic and prebiotic reinforce each other.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Panel */}
        <div className="border border-[#c4d4c4] p-8 lg:p-12">
          <div className="font-mono text-xs font-semibold tracking-widest text-[#4a7c59] uppercase mb-6">
            Prebiotic evidence: mannan-oligosaccharide in broilers
          </div>
          <p className="text-[#2d4a3a] text-sm mb-8">
            Pooled pen trials, MOS compared with a diet without antibiotics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-[#D4A574] mb-2">−21%</div>
              <div className="text-[#2d4a3a] text-sm">mortality</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-[#6B8F7A] mb-2">+1.6%</div>
              <div className="text-[#2d4a3a] text-sm">body weight</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-[#8B7F6F] mb-2">−2.0%</div>
              <div className="text-[#2d4a3a] text-sm">feed conversion ratio</div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#c4d4c4]">
            <p className="text-[#2d4a3a] text-xs mb-2">
              Compared with antibiotic-fed birds, MOS gave similar growth and 18% lower mortality.
            </p>
            <div className="text-[#4a7c59] text-[10px] font-mono">
              Hooge 2004, International Journal of Poultry Science.
            </div>
          </div>
        </div>
      </div>

      {/* Transition Band from Frame 5 to Frame 6 */}
      <div className="w-full h-[8px] sm:h-[10px] lg:h-[12px]" aria-hidden="true" />
    </section>
  );
}