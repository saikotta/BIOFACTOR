"use client";

import React from "react";
import Link from "next/link";

const REFERENCES = [
  {
    id: 1,
    text: "United Nations Water (UN-Water, 2021). Summary Progress Update 2021: SDG 6 – water and sanitation for all. UN-Water, Geneva, Switzerland. unwater.org/publications",
    url: "https://www.unwater.org/publications/summary-progress-update-2021-sdg-6-water-and-sanitation-all",
  },
  {
    id: 2,
    text: "World Health Organization & UNICEF (2021). Progress on household drinking water, sanitation and hygiene 2000-2020: Five years into the SDGs. who.int / unicef.org",
    url: "https://www.who.int/publications/i/item/9789240030848",
  },
  {
    id: 3,
    text: "UNESCO / WWAP (2017). The United Nations World Water Development Report 2017: Wastewater, The Untapped Resource. unesco.org",
    url: "https://unesdoc.unesco.org/ark:/48223/pf0000247153",
  },
  {
    id: 4,
    text: "Metcalf & Eddy, Inc., Tchobanoglous, G., Burton, F. L., & Stensel, H. D. (2014). Wastewater Engineering: Treatment and Resource Recovery (5th ed.). McGraw-Hill Education.",
    url: "https://www.mheducation.com",
  },
  {
    id: 5,
    text: "Rittmann, B. E., & McCarty, P. L. (2020). Environmental Biotechnology: Principles and Applications (2nd ed.). McGraw-Hill Education. doi:10.1007/978-3-030-49807-8",
    url: "https://doi.org/10.1007/978-3-030-49807-8",
  },
  {
    id: 6,
    text: "Daims, H., Lebedeva, E. V., Pjevac, P., et al. (2015). Complete nitrification by Nitrospira bacteria. Nature, 528(7583), 504–509. nature.com/articles/nature16461",
    url: "https://www.nature.com/articles/nature16461",
  },
  {
    id: 7,
    text: "Grady, C. P. L., Daigger, G. T., Love, N. G., & Filipe, C. D. (2011). Biological Wastewater Treatment (3rd ed.). CRC Press / Taylor & Francis Group.",
    url: "https://www.routledge.com",
  },
  {
    id: 8,
    text: "Van Loosdrecht, M. C., Nielsen, P. H., Lopez-Vazquez, C. M., & Brdjanovic, D. (Eds.). (2016). Experimental Methods in Wastewater Treatment. IWA Publishing. doi:10.2166/9781780404752",
    url: "https://doi.org/10.2166/9781780404752",
  },
  {
    id: 9,
    text: "EPA (2002). Onsite Wastewater Treatment Systems Manual. EPA/625/R-00/008. U.S. Environmental Protection Agency, Office of Water. epa.gov/water-research",
    url: "https://www.epa.gov/water-research",
  },
];

export default function BioremediationClosing() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#111111] text-white pt-16 sm:pt-20 md:pt-24 pb-14 sm:pb-16 selection:bg-[#6BBF3A] selection:text-black">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        {/* CLOSING QUOTE BAND */}
        <div className="pb-16 sm:pb-20 border-b border-white/10">
          <p className="font-[family-name:var(--font-bricolage)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[1.08] max-w-4xl">
            Clean water is not the absence of microbes. It is the{" "}
            <span className="text-[#6BBF3A] font-[family-name:var(--font-newsreader)] italic lowercase">
              right microbes
            </span>
            , doing the work.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6BBF3A] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#59A62E] hover:-translate-y-0.5 transition-all duration-200 shadow-sm cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
              Back to Top
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#6BBF3A] hover:-translate-y-0.5 transition-all duration-200"
            >
              Return to Biofactor Main Site →
            </Link>
          </div>
        </div>

        {/* FOOTER HEADER & LOGO PLACEHOLDER */}
        <div className="py-12 sm:py-16 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="font-[family-name:var(--font-bricolage)] text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-white mb-2">
              BIOFACTOR BIOLOGICALS
            </div>
            <div className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[#B8893A]">
              ADVANCING BIOLOGICAL INTELLIGENCE ACROSS WATER ECOSYSTEMS
            </div>
          </div>

          {/* Logo Placeholder Box with Gold Outline */}
          <div className="border-2 border-dashed border-[#B8893A] rounded-xl px-6 py-4 flex items-center gap-4 bg-white/[0.02]">
            <img
              src="/images/biofactor-official-logo.png"
              alt="Biofactor Biologicals official logo"
              className="h-10 sm:h-12 w-auto object-contain block select-none brightness-110"
            />
            <div className="text-left">
              <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-[#B8893A] font-bold block">
                [ LOGO PLACEHOLDER ]
              </span>
              <span className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/70 block">
                THE SOIL COMPANY • CERTIFIED
              </span>
            </div>
          </div>
        </div>

        {/* 9 NUMBERED REFERENCES */}
        <div className="py-12 sm:py-16 border-b border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.2em] text-[#B8893A] font-bold">
              REFERENCES
            </span>
            <span className="h-px w-10 bg-[#B8893A]/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {REFERENCES.map((ref) => (
              <div
                key={ref.id}
                id={`ref-${ref.id}`}
                className="text-xs text-white/70 leading-relaxed font-normal hover:text-white transition-colors"
              >
                <span className="font-[family-name:var(--font-jetbrains)] text-[#6BBF3A] font-bold mr-1.5">
                  [{ref.id}]
                </span>
                {ref.text}
              </div>
            ))}
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="pt-8 text-[11px] sm:text-xs text-white/45 leading-relaxed max-w-4xl font-normal">
          <p>
            Disclaimer: The information provided is based on published
            scientific literature and industry standards for wastewater
            treatment and bioremediation. Performance data reflects typical
            operational benchmarks and may vary depending on influent wastewater
            characteristics, ambient temperature, plant configuration, and
            existing biological health. Not intended as a warranty of specific
            compliance performance.
          </p>
        </div>
      </div>
    </footer>
  );
}
