"use client";

import React, { useEffect, useState, useRef } from "react";

export default function AboutBiologicalIntelligenceSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [animationCycle, setAnimationCycle] = useState(0);
  const armedRef = useRef(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", handleMediaChange);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.20 && armedRef.current) {
          armedRef.current = false;
          setAnimationCycle((prev) => prev + 1);
        } else if (entry.intersectionRatio <= 0.06 && !armedRef.current) {
          armedRef.current = true;
        }
      },
      {
        threshold: [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30],
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if ("removeEventListener" in mediaQuery) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      }
    };
  }, []);

  const isAnimated = animationCycle > 0;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#EDF4ED] text-[#17251C] overflow-hidden py-16 sm:py-20 md:py-24 lg:py-24 font-sans select-none min-h-[640px]"
    >
      <div key={animationCycle} className="w-full h-full">
        {/* STAGE 1: Tall Vertical Rear Photograph attached to right edge */}
        <div
          className={`absolute top-0 right-0 z-10 w-[260px] sm:w-[320px] md:w-[360px] lg:w-[410px] xl:w-[450px] 2xl:w-[480px] h-[520px] sm:h-[560px] md:h-[600px] lg:h-[640px] rounded-t-none rounded-bl-[3px] rounded-br-none overflow-hidden shadow-[0_2px_8px_rgba(22,70,40,0.03)] ${
            prefersReducedMotion
              ? "opacity-100"
              : isAnimated
              ? "animate-s2-rear-photo opacity-0 fill-mode-forwards"
              : "opacity-0"
          }`}
        >
          <img
            src="/images/about-farmer.jpg"
            alt="Biofactor crop field environmental vegetation background"
            className="w-[140%] h-[140%] max-w-none object-cover block object-[0%_20%]"
          />
        </div>

        {/* Main Two-Column Centered Layout Container */}
        <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Editorial Text & Prominent Main Statement */}
          <div className="w-full lg:w-[50%] xl:w-[48%] max-w-2xl flex flex-col items-start justify-center">
            
            {/* STAGE 2: Introductory Paragraphs */}
            <div className="max-w-[600px] flex flex-col gap-4 sm:gap-5">
              <p
                className={`text-[clamp(15px,1.05vw,18px)] leading-[1.62] text-[#17251C] font-normal ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : isAnimated
                    ? "animate-s2-para-1 opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                Farming today runs on chemistry. It&apos;s taken agriculture a long way &mdash; but soil, water, and animals aren&apos;t machines. They&apos;re living systems, and living systems need more than chemistry alone can give them.
              </p>
              <p
                className={`text-[clamp(15px,1.05vw,18px)] leading-[1.62] text-[#17251C] font-normal ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : isAnimated
                    ? "animate-s2-para-2 opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                So we set out to build that missing piece: biology that works alongside the chemistry farmers already use, not against it.
              </p>
            </div>

            {/* STAGE 4: Large Green Statement — 4-Line Sequential Reveal */}
            <div className="mt-10 sm:mt-12 lg:mt-14 mb-8 sm:mb-10 lg:mb-12 max-w-[570px]">
              <h2 className="text-[clamp(44px,3.2vw,58px)] font-bold tracking-[-0.025em] leading-[1.08] text-[#155B2A] font-sans">
                {[
                  { line: "We complete", animClass: "animate-s2-line-1" },
                  { line: "chemical systems", animClass: "animate-s2-line-2" },
                  { line: "with biological", animClass: "animate-s2-line-3" },
                  { line: "intelligence.", animClass: "animate-s2-line-4" },
                ].map((item, idx) => (
                  <div key={idx} className="overflow-hidden py-0.5">
                    <span
                      className={`block origin-bottom-left ${
                        prefersReducedMotion
                          ? "opacity-100"
                          : isAnimated
                          ? `${item.animClass} opacity-0 fill-mode-forwards`
                          : "opacity-0"
                      }`}
                    >
                      {item.line}
                    </span>
                  </div>
                ))}
              </h2>
            </div>

            {/* STAGE 5: Bottom Closing Paragraph */}
            <div className="max-w-[540px]">
              <p
                className={`text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.55] text-[#17251C] font-normal ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : isAnimated
                    ? "animate-s2-closing-copy opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                That idea is where we started, and it&apos;s still what every product we make comes back to.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Foreground Farmer Card */}
          <div className="w-full lg:w-[50%] xl:w-[52%] flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px] h-[440px] sm:h-[480px] lg:h-[520px] flex items-center justify-end">
              
              {/* STAGE 3: Foreground Farmer Card */}
              <div
                className={`absolute top-[60px] sm:top-[80px] lg:top-[90px] right-[40px] sm:right-[100px] lg:right-[210px] xl:right-[290px] 2xl:right-[320px] z-20 w-[270px] sm:w-[320px] lg:w-[340px] h-[255px] sm:h-[305px] lg:h-[325px] rounded-[12px] overflow-hidden border-[3px] border-white/92 shadow-[0_14px_35px_rgba(22,70,40,0.08)] ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : isAnimated
                    ? "animate-s2-farmer-card opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                <img
                  src="/images/about-farmer.jpg"
                  alt="Biofactor farmer examining healthy soybean crops in field"
                  className="w-full h-full object-cover block object-[50%_55%]"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}











