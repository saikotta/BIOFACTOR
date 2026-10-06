import React from "react";

export default function PoultryDataStrip() {
  return (
    <section className="w-full" data-ruminants-section="stats" data-n="Key Stats">
      {/* Full-Bleed Dark Brown Table */}
      <div
        className="w-full bg-[#1B3B2B] py-9 lg:py-[44px] relative overflow-hidden"
        style={{
          borderTop: '1px solid rgba(109, 190, 69, 0.3)',
          borderBottom: '1px solid rgba(109, 190, 69, 0.3)'
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[clamp(48px,5vw,72px)] relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-stretch">
            {/* Cell 1: ~US$6 bn */}
            <div className="led rv md:pr-8 lg:pr-10 md:border-r pb-6 md:pb-0 border-b md:border-b-0 flex flex-col justify-between h-full" style={{ borderColor: 'rgba(109, 190, 69, 0.25)', borderRightWidth: '1px' }} data-stat>
              <div>
                <div className="font-display font-normal text-[clamp(2.9rem,3.5vw,3.8rem)] tracking-tight leading-none mb-5" style={{ color: '#6DBE45' }} data-cu="~US$6 bn">
                  ~US$6 bn
                </div>
                <p className="text-[15px] sm:text-[16px] leading-[1.55] font-normal" style={{ color: '#E8F3DD' }}>
                  Estimated yearly global cost of necrotic enteritis, a gut disease of broilers.
                </p>
              </div>

              <div className="pt-2.5 mt-6 border-t" style={{ borderColor: 'rgba(109, 190, 69, 0.2)', borderTopWidth: '1px' }}>
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: '#6DBE45' }}>
                  2015 industry estimate
                </span>
              </div>
            </div>

            {/* Cell 2: 2006 */}
            <div className="led rv d1 md:px-8 lg:px-10 md:border-r pb-6 md:pb-0 border-b md:border-b-0 flex flex-col justify-between h-full" style={{ borderColor: 'rgba(109, 190, 69, 0.25)', borderRightWidth: '1px' }} data-stat>
              <div>
                <div className="font-display font-normal text-[clamp(2.9rem,3.5vw,3.8rem)] tracking-tight leading-none mb-5" style={{ color: '#6DBE45' }} data-cu="2006">
                  2006
                </div>
                <p className="text-[15px] sm:text-[16px] leading-[1.55] font-normal" style={{ color: '#E8F3DD' }}>
                  The EU banned all antibiotics as feed growth promoters. Other markets have followed, including India&apos;s 2019 ban on colistin for food animals.
                </p>
              </div>

              <div className="pt-2.5 mt-6 border-t" style={{ borderColor: 'rgba(109, 190, 69, 0.2)', borderTopWidth: '1px' }}>
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: '#6DBE45' }}>
                  European Commission · India
                </span>
              </div>
            </div>

            {/* Cell 3: 10–30% */}
            <div className="led rv d2 md:pl-8 lg:pl-10 flex flex-col justify-between h-full" data-stat>
              <div>
                <div className="font-display font-normal text-[clamp(2.9rem,3.5vw,3.8rem)] tracking-tight leading-none mb-5" style={{ color: '#6DBE45' }} data-cu="10–30%">
                  10–30%
                </div>
                <p className="text-[15px] sm:text-[16px] leading-[1.55] font-normal" style={{ color: '#E8F3DD' }}>
                  of the phosphorus in corn and soybean meal is available to poultry. The rest passes through into the litter.
                </p>
              </div>

              <div className="pt-2.5 mt-6 border-t" style={{ borderColor: 'rgba(109, 190, 69, 0.2)', borderTopWidth: '1px' }}>
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: '#6DBE45' }}>
                  Feed phosphorus
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Editorial Paragraph */}
      <div className="rv w-full pt-6 lg:pt-8 pb-3 lg:pb-4 bg-[#E8F3EA] !min-h-0">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[clamp(48px,5vw,72px)]">
          <div className="max-w-[850px]">
            <div
              className="text-[clamp(1.25rem,1.55vw,1.5rem)] leading-[1.52]"
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                color: '#0a2d1a',
              }}
            >
              As antibiotics leave poultry feed, the gut has to be protected in other ways.{" "}
              <span className="font-medium" style={{ color: '#6DBE45' }}>Beneficial microbes and the fibres that feed them</span> can hold back pathogens, support growth and free up minerals the bird would otherwise waste.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}