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
    <section ref={sectionRef} className="w-full">
      {/* Full-Bleed Dark Brown Table */}
      <div
        ref={tableRef}
        className="w-full bg-[#2D2416] py-9 lg:py-[44px] relative overflow-hidden"
        style={{
          borderTop: '1px solid rgba(139, 90, 43, 0.3)',
          borderBottom: '1px solid rgba(139, 90, 43, 0.3)'
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
            <div className="md:pr-8 lg:pr-10 md:border-r pb-6 md:pb-0 border-b md:border-b-0 flex flex-col justify-between h-full" style={{ borderColor: 'rgba(139, 90, 43, 0.25)', borderRightWidth: '1px' }}>
              <div>
                <div className="font-display font-normal text-[clamp(2.9rem,3.5vw,3.8rem)] tracking-tight leading-none mb-5" style={{ color: '#D4C4A8' }}>
                  ~US$6 bn
                </div>
                <p className="text-[15px] sm:text-[16px] leading-[1.55] font-normal" style={{ color: '#E8DCC8' }}>
                  Estimated yearly global cost of necrotic enteritis, a gut disease of broilers.
                </p>
              </div>

              <div className="pt-2.5 mt-6 border-t" style={{ borderColor: 'rgba(139, 90, 43, 0.2)', borderTopWidth: '1px' }}>
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: '#A87932' }}>
                  2015 industry estimate
                </span>
              </div>
            </div>

            {/* Cell 2: 2006 */}
            <div className="md:px-8 lg:px-10 md:border-r pb-6 md:pb-0 border-b md:border-b-0 flex flex-col justify-between h-full" style={{ borderColor: 'rgba(139, 90, 43, 0.25)', borderRightWidth: '1px' }}>
              <div>
                <div className="font-display font-normal text-[clamp(2.9rem,3.5vw,3.8rem)] tracking-tight leading-none mb-5" style={{ color: '#D4C4A8' }}>
                  2006
                </div>
                <p className="text-[15px] sm:text-[16px] leading-[1.55] font-normal" style={{ color: '#E8DCC8' }}>
                  The EU banned all antibiotics as feed growth promoters. Other markets have followed, including India's 2019 ban on colistin for food animals.
                </p>
              </div>

              <div className="pt-2.5 mt-6 border-t" style={{ borderColor: 'rgba(139, 90, 43, 0.2)', borderTopWidth: '1px' }}>
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: '#A87932' }}>
                  European Commission · India
                </span>
              </div>
            </div>

            {/* Cell 3: 10–30% */}
            <div className="md:pl-8 lg:pl-10 flex flex-col justify-between h-full">
              <div>
                <div className="font-display font-normal text-[clamp(2.9rem,3.5vw,3.8rem)] tracking-tight leading-none mb-5" style={{ color: '#D4C4A8' }}>
                  10–30%
                </div>
                <p className="text-[15px] sm:text-[16px] leading-[1.55] font-normal" style={{ color: '#E8DCC8' }}>
                  of the phosphorus in corn and soybean meal is available to poultry. The rest passes through into the litter.
                </p>
              </div>

              <div className="pt-2.5 mt-6 border-t" style={{ borderColor: 'rgba(139, 90, 43, 0.2)', borderTopWidth: '1px' }}>
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: '#A87932' }}>
                  Feed phosphorus
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Editorial Paragraph */}
      <div className="w-full py-8 lg:py-11">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[clamp(48px,5vw,72px)] pb-8 lg:pb-11">
          <div className="max-w-[850px]">
            <div
              className="text-[clamp(1.25rem,1.55vw,1.5rem)] leading-[1.52]"
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                color: '#3D2914',
                opacity: textRevealed ? 1 : 0,
                transform: textRevealed ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'opacity 1000ms ease-out, transform 1000ms ease-out',
              }}
            >
              As antibiotics leave poultry feed, the gut has to be protected in other ways.{" "}
              <span className="font-medium" style={{ color: '#8B5A2B' }}>Beneficial microbes and the fibres that feed them</span> can hold back pathogens, support growth and free up minerals the bird would otherwise waste.
            </div>
          </div>
        </div>
      </div>

      {/* Transition Band from Frame 2 to Frame 3 */}
      <div className="w-full h-[8px] sm:h-[10px] lg:h-[12px]" aria-hidden="true" />
    </section>
  );
}