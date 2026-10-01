"use client";

import React, { useState, useEffect, useRef } from "react";

export default function PoultryDataStrip() {
  const [isHovered, setIsHovered] = useState(false);
  const [stripPosition, setStripPosition] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle cursor movement over table
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tableRef.current) return;
    const rect = tableRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setStripPosition(percentage);
  };

  // Intersection observer for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Delay text reveal for elegant staggered effect
            setTimeout(() => setTextRevealed(true), 400);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full" data-pm-section="datastrip">
      {/* Full-Bleed Dark Brown Table */}
      <div
        ref={tableRef}
        className="w-full bg-[#1B3B2B] py-9 lg:py-[44px] relative overflow-hidden"
        style={{
          borderTop: '1px solid rgba(109, 190, 69, 0.3)',
          borderBottom: '1px solid rgba(109, 190, 69, 0.3)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Subtle horizontal strip that follows cursor */}
        {isHovered && (
          <div
            className="absolute top-0 bottom-0 w-[25%] pointer-events-none"
            style={{
              left: `${stripPosition - 12.5}%`,
              background: 'linear-gradient(90deg, transparent, rgba(232, 220, 200, 0.08), transparent)',
              transition: 'left 0.12s ease-out',
            }}
          />
        )}

        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[clamp(48px,5vw,72px)] relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-stretch">
            {/* Cell 1: ~US$6 bn */}
            <div className="md:pr-8 lg:pr-10 md:border-r pb-6 md:pb-0 border-b md:border-b-0 flex flex-col justify-between h-full" style={{ borderColor: 'rgba(109, 190, 69, 0.25)', borderRightWidth: '1px' }} data-pm-strip-panel="0">
              <div>
                <div className="font-display font-normal text-[clamp(2.9rem,3.5vw,3.8rem)] tracking-tight leading-none mb-5" style={{ color: '#6DBE45' }}>
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
            <div className="md:px-8 lg:px-10 md:border-r pb-6 md:pb-0 border-b md:border-b-0 flex flex-col justify-between h-full" style={{ borderColor: 'rgba(109, 190, 69, 0.25)', borderRightWidth: '1px' }} data-pm-strip-panel="1">
              <div>
                <div className="font-display font-normal text-[clamp(2.9rem,3.5vw,3.8rem)] tracking-tight leading-none mb-5" style={{ color: '#6DBE45' }}>
                  2006
                </div>
                <p className="text-[15px] sm:text-[16px] leading-[1.55] font-normal" style={{ color: '#E8F3DD' }}>
                  The EU banned all antibiotics as feed growth promoters. Other markets have followed, including India's 2019 ban on colistin for food animals.
                </p>
              </div>

              <div className="pt-2.5 mt-6 border-t" style={{ borderColor: 'rgba(109, 190, 69, 0.2)', borderTopWidth: '1px' }}>
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: '#6DBE45' }}>
                  European Commission · India
                </span>
              </div>
            </div>

            {/* Cell 3: 10–30% */}
            <div className="md:pl-8 lg:pl-10 flex flex-col justify-between h-full" data-pm-strip-panel="2">
              <div>
                <div className="font-display font-normal text-[clamp(2.9rem,3.5vw,3.8rem)] tracking-tight leading-none mb-5" style={{ color: '#6DBE45' }}>
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
      <div className="w-full py-8 lg:py-11 bg-[#E8F3EA]">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[clamp(48px,5vw,72px)]">
          <div className="max-w-[850px]">
            <div
              className="text-[clamp(1.25rem,1.55vw,1.5rem)] leading-[1.52]"
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                color: '#0a2d1a',
                opacity: textRevealed ? 1 : 0,
                transform: textRevealed ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'opacity 1000ms ease-out, transform 1000ms ease-out',
              }}
            >
              As antibiotics leave poultry feed, the gut has to be protected in other ways.{" "}
              <span className="font-medium" style={{ color: '#6DBE45' }}>Beneficial microbes and the fibres that feed them</span> can hold back pathogens, support growth and free up minerals the bird would otherwise waste.
            </div>
          </div>
        </div>
      </div>

      {/* Transition Band from Frame 2 to Frame 3 */}
      <div className="w-full h-[4px] sm:h-[6px] lg:h-[8px] bg-[#E8F3EA]" aria-hidden="true" />
    </section>
  );
}