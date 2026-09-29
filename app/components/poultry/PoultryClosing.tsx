import React from "react";

export default function PoultryClosing() {
  return (
    <section className="w-full bg-[#EAF3EA] text-[#0a2d1a] py-24 lg:py-32">
      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Final Statement */}
        <div className="text-center mb-20 lg:mb-32">
          <div className="font-mono text-xs font-semibold tracking-widest text-[#4a7c59] uppercase mb-8">
            The healthiest flock
          </div>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3.5rem)] text-[#0a2d1a] leading-[1.15] mb-8 max-w-3xl mx-auto">
            The healthiest flock is not the one with the fewest microbes.
          </h2>
          <p className="font-serif text-[clamp(2rem,3.5vw,3.5rem)] text-[#D4A574] leading-[1.15] max-w-3xl mx-auto">
            It is the one where the right microbes got there first.
          </p>
        </div>

        {/* BIOFACTOR / About Section */}
        <div className="border-t border-[#c4d4c4] pt-16 lg:pt-20">
          <div className="font-mono text-xs font-semibold tracking-widest text-[#D4A574] uppercase mb-12">
            BIOFACTOR / ABOUT
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h3 className="font-display font-semibold text-xl text-[#0a2d1a] mb-6">
                Turning microbial functions into measurable biological impact.
              </h3>
              <p className="text-[#2d4a3a] text-sm leading-relaxed mb-6">
                BIOFACTOR BIOLOGICALS specializes in developing biological solutions that complete and enhance modern agricultural practices. Our approach combines cutting-edge microbiome science with practical field applications.
              </p>
              <p className="text-[#2d4a3a] text-sm leading-relaxed">
                We work with farmers, researchers, and industry partners to develop targeted biological products that improve animal health, reduce environmental impact, and increase productivity through better gut management.
              </p>
            </div>

            <div>
              <h3 className="font-display font-semibold text-xl text-[#0a2d1a] mb-6">
                The gut is the front line of animal health.
              </h3>
              <p className="text-[#2d4a3a] text-sm leading-relaxed mb-6">
                As antibiotics leave animal feed, the biological approach becomes increasingly important. Our formulations help establish beneficial microbial communities that protect animals from pathogens and improve nutrient absorption.
              </p>
              <p className="text-[#2d4a3a] text-sm leading-relaxed">
                From breeders to broilers, from layers to growers, we develop stage-specific biological solutions that match the unique challenges each animal faces throughout its lifecycle.
              </p>
            </div>
          </div>

          {/* Brand Section */}
          <div className="mt-16 lg:mt-20 pt-8 border-t border-[#c4d4c4] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <img
                src="/images/biofactor-official-logo.png"
                alt="BIOFACTOR BIOLOGICALS"
                className="h-10 lg:h-12 w-auto object-contain"
              />
              <span className="text-sm font-medium tracking-[0.12em] uppercase text-[#0a2d1a]/88">
                BIOFACTOR BIOLOGICALS
              </span>
            </div>

            <div className="text-[#4a7c59] text-xs font-mono">
              Official logo placement
            </div>
          </div>

          {/* References */}
          <div className="mt-16 lg:mt-20 pt-8 border-t border-[#c4d4c4]">
            <div className="font-mono text-xs font-semibold tracking-widest text-[#4a7c59] uppercase mb-6">
              References
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#2d4a3a] text-xs leading-relaxed">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-mono text-xs">[1]</span>
                  <p>Wade B., Keyburn A. (2015). The true cost of necrotic enteritis. Poultry World.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-mono text-xs">[2]</span>
                  <p>India bans the use of a human-critical antibiotic in poultry farms (2019). The Poultry Site.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-mono text-xs">[3]</span>
                  <p>Phosphorus, phytase, and poultry litter. Mississippi State University Extension Service.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-mono text-xs">[4]</span>
                  <p>Peeling back the many layers of competitive exclusion (2024). Frontiers in Microbiology 15:1342887.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-mono text-xs">[5]</span>
                  <p>Kosuri et al. (2025). Probiotic application reduces Salmonella Enteritidis contamination. Poultry Science 104(9):105389.</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-mono text-xs">[6]</span>
                  <p>The effects of probiotics on the performance, egg quality and blood parameters of laying hens: a meta-analysis. Journal of Animal and Feed Sciences.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-mono text-xs">[7]</span>
                  <p>Effects of probiotic supplementation on broiler growth performance: a meta-analysis (2023). Animal Production Science 63(7):645.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-mono text-xs">[8]</span>
                  <p>Efficacy of Bacillus subtilis to replace in-feed antibiotics (2023). Poultry Science.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-mono text-xs">[9]</span>
                  <p>Hooge D.M. (2004). Meta-analysis of broiler chicken pen trials evaluating dietary mannan oligosaccharide. International Journal of Poultry Science 3(3):163–174.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-mono text-xs">[10]</span>
                  <p>Askelson T.E. et al. (2014). Evaluation of phytate-degrading Lactobacillus culture administration to broiler chickens. Applied and Environmental Microbiology 80(3).</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#D4A574] font-mono text-xs">[11]</span>
                  <p>European Commission (2005). Ban on antibiotics as growth promoters in animal feed enters into effect. Press release IP/05/1687.</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 pt-6 border-t border-[#c4d4c4]">
              <p className="text-[#4a7c59] text-xs leading-relaxed max-w-3xl">
                Response to biologicals varies with strain, dose, diet, housing, disease pressure and management. Figures above come from published research and illustrate biological potential. They are not product-specific claims.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}