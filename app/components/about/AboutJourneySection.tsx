"use client";

import React, { useEffect, useRef, useState } from "react";

interface Milestone {
  id: number;
  pill: string;
  title: string;
  description: string;
  align: "left" | "right";
  hasPlaceholder: boolean;
}

const MILESTONES: Milestone[] = [
  {
    id: 1,
    pill: "2014 — FOUNDED",
    title: "BIOFAC INPUTS PRIVATE LIMITED",
    description:
      'Established in Hyderabad, under the founding statement: "Build The Best To Live With Nature\'s Partnership."',
    align: "right",
    hasPlaceholder: true,
  },
  {
    id: 2,
    pill: "THE PLATFORM TAKES SHAPE",
    title: "MICROBE & MINERAL™ IS BUILT",
    description:
      "Development of the Microbe & Mineral™ platform and the two technologies: Metabiome™ & Chemoprotect™ and Microbe™ gets later patented.",
    align: "left",
    hasPlaceholder: true,
  },
  {
    id: 3,
    pill: "DOMESTIC SCALE",
    title: "100+ PRODUCTS, SIX VERTICALS",
    description:
      "Growth to a presence in 16 Indian States, a Dealer Network Passing 3,000, and a Team Crossing 600.",
    align: "right",
    hasPlaceholder: true,
  },
  {
    id: 4,
    pill: "BEYOND BHARAT",
    title: "MALAWI & KENYA",
    description:
      "First international Product Licenses secured in East Africa — Biofactor's first steps Outside The Domestic Market.",
    align: "left",
    hasPlaceholder: true,
  },
  {
    id: 5,
    pill: "TODAY",
    title: "9 PATENTS. 60+ STRAINS. ONE CHAIN.",
    description:
      "A Commercially Packaging Journey from Soil To People Across Everything We Build.",
    align: "right",
    hasPlaceholder: true,
  },
];

export default function AboutJourneySection() {
  // Heading entrance animation cycle & armed state
  const headingRef = useRef<HTMLDivElement | null>(null);
  const [headingCycle, setHeadingCycle] = useState(0);
  const headingArmedRef = useRef(true);

  // Active timeline axis line & container refs for passive scroll calculation
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  // Milestone individual observers & animation state machine
  const [activeCycles, setActiveCycles] = useState<{ [id: number]: number }>({});
  const armedRefs = useRef<{ [id: number]: boolean }>({});
  const milestoneRefs = useRef<{ [id: number]: HTMLDivElement | null }>({});

  // 1. Heading IntersectionObserver with replay support
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (headingArmedRef.current) {
            headingArmedRef.current = false;
            setHeadingCycle((prev) => prev + 1);
          }
        } else {
          headingArmedRef.current = true;
        }
      },
      {
        rootMargin: "-10% 0px -10% 0px",
        threshold: 0.15,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Active Timeline Line Scroll Progress (scaleY) via rAF passive listener
  useEffect(() => {
    let animationFrameId: number;

    const updateLineProgress = () => {
      if (!timelineContainerRef.current || !activeLineRef.current) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        activeLineRef.current.style.transform = "scaleY(1)";
        return;
      }

      const rect = timelineContainerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const topThreshold = vh * 0.75;
      const bottomThreshold = vh * 0.25;

      const geometricProgress = (topThreshold - rect.top) / (rect.height + topThreshold - bottomThreshold);

      const scrollBottom = window.scrollY + vh;
      const documentHeight = document.documentElement.scrollHeight;
      const distanceFromDocumentBottom = Math.max(0, documentHeight - scrollBottom);

      const completionZone = Math.min(vh * 0.35, 320);
      const bottomProgress = 1 - Math.min(Math.max(distanceFromDocumentBottom / completionZone, 0), 1);

      let progress = Math.max(geometricProgress, bottomProgress);
      progress = Math.min(Math.max(progress, 0), 1);

      if (distanceFromDocumentBottom <= 2) {
        progress = 1;
      }

      activeLineRef.current.style.transform = `scaleY(${progress})`;
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateLineProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateLineProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 3. Per-Milestone Observers & Re-arm State Machine
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    MILESTONES.forEach((item) => {
      const el = milestoneRefs.current[item.id];
      if (!el) return;

      armedRefs.current[item.id] = true;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            if (armedRefs.current[item.id] !== false) {
              armedRefs.current[item.id] = false;
              setActiveCycles((prev) => ({
                ...prev,
                [item.id]: (prev[item.id] || 0) + 1,
              }));
            }
          } else {
            armedRefs.current[item.id] = true;
          }
        },
        {
          rootMargin: "0px 0px -25% 0px",
          threshold: 0.15,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section className="relative w-full bg-[#EDF4ED] text-[#17251C] font-sans select-none pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20 border-none shadow-none">
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* SECTION INTRO */}
        <div
          ref={headingRef}
          key={`heading-${headingCycle}`}
          className={`mb-6 sm:mb-7 lg:mb-8 text-center lg:text-left ${
            headingCycle > 0 ? "animate-s7-heading" : "opacity-0 translate-y-[22px]"
          }`}
        >
          <span className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#155B2A] mb-1.5">
            OUR JOURNEY
          </span>
          <h2 className="text-[clamp(28px,2.4vw,34px)] font-bold text-[#155B2A] tracking-[-0.025em] leading-[1.15] font-sans">
            From 2014 to Now
          </h2>
        </div>

        {/* VERTICAL EDITORIAL TIMELINE */}
        <div ref={timelineContainerRef} className="relative w-full max-w-[1400px] mx-auto">
          
          {/* Delicate Central Vertical Base Axis Line */}
          <div className="absolute top-3 bottom-4 left-4 lg:left-1/2 w-[1px] bg-[#155B2A]/25 -translate-x-1/2 pointer-events-none z-0" />

          {/* Active Progress Vertical Axis Line */}
          <div
            ref={activeLineRef}
            className="absolute top-3 bottom-4 left-4 lg:left-1/2 w-[2px] bg-[#155B2A] opacity-80 -translate-x-1/2 pointer-events-none z-0 origin-top"
            style={{ transform: "scaleY(0)" }}
          />

          {/* TIMELINE MILESTONES */}
          <div className="flex flex-col gap-8 sm:gap-9 lg:gap-10">
            {MILESTONES.map((item) => {
              const isRight = item.align === "right";
              const cycle = activeCycles[item.id] || 0;
              const isActivated = cycle > 0;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    milestoneRefs.current[item.id] = el;
                  }}
                  className="relative z-10 flex flex-col items-start lg:items-center group cursor-pointer"
                >
                  {/* Timeline Connection Pulse Dot */}
                  <div
                    key={`pulse-${item.id}-${cycle}`}
                    className={`absolute top-4 left-4 lg:left-1/2 w-3 h-3 rounded-full bg-[#155B2A] pointer-events-none z-0 ${
                      isActivated ? "animate-s7-pulse" : "opacity-0"
                    }`}
                  />

                  {/* Milestone Centered Pill */}
                  <div className="relative self-start lg:self-center mb-4 lg:mb-5 z-10 ml-0 lg:ml-0">
                    {/* Pill Halo Effect */}
                    <div
                      key={`halo-${item.id}-${cycle}`}
                      className={`absolute -inset-1 rounded-full bg-[#155B2A] pointer-events-none ${
                        isActivated ? "animate-s7-pill-halo" : "opacity-0"
                      }`}
                    />

                    {/* TODAY Milestone Finishing Pulse */}
                    {item.id === 5 && (
                      <div
                        key={`today-pulse-${cycle}`}
                        className={`absolute -inset-1 rounded-full bg-[#155B2A]/20 pointer-events-none ${
                          isActivated ? "animate-s7-today-pulse" : "opacity-0"
                        }`}
                      />
                    )}

                    <div
                      key={`pill-${item.id}-${cycle}`}
                      className={`relative bg-[#155B2A] text-white text-[12px] font-semibold tracking-[0.04em] uppercase px-4 py-1.5 rounded-full shadow-[0_2px_6px_rgba(21,91,42,0.12)] block z-10 s7-pill-interactive ${
                        isActivated
                          ? "animate-s7-pill"
                          : "opacity-[0.35] scale-[0.88]"
                      }`}
                    >
                      {item.pill}
                    </div>
                  </div>

                  {/* Desktop Alternating Row Composition (Full 50/50 split across 1400px container) */}
                  <div className="w-full flex flex-col lg:flex-row items-start lg:items-center">
                    
                    {/* LEFT HALF (width: 50% on desktop) */}
                    <div className="w-full lg:w-1/2 flex justify-start lg:justify-end items-start lg:items-center pl-10 lg:pl-0 lg:pr-9 xl:pr-10">
                      {!isRight ? (
                        <div className="w-full flex flex-col sm:flex-row lg:flex-row items-start lg:items-center justify-end gap-5 lg:gap-7 xl:gap-8">
                          {/* Left-side Text (extending outward to the left) */}
                          <div
                            key={`copy-${item.id}-${cycle}`}
                            className={`flex flex-col items-start lg:items-end text-left lg:text-right max-w-[320px] ${
                              isActivated ? "animate-s7-copy" : "opacity-0 translate-y-[16px]"
                            }`}
                          >
                            <h3 className="text-[15px] font-bold text-[#17251C] tracking-[-0.01em] leading-[1.25] uppercase mb-1.5">
                              {item.title}
                            </h3>
                            <p className="text-[14px] leading-[1.5] text-[#17251C]/80 font-normal">
                              {item.description}
                            </p>
                          </div>
                          {/* Left-side Grey Square */}
                          {item.hasPlaceholder && (
                            <div
                              key={`img-${item.id}-${cycle}`}
                              className={`w-[110px] h-[110px] sm:w-[125px] sm:h-[125px] lg:w-[140px] lg:h-[140px] bg-[#D2D3D2] rounded-[6px] flex-shrink-0 ${
                                isActivated
                                  ? "animate-s7-image-left"
                                  : "opacity-[0.25] translate-x-[24px] translate-y-[14px] scale-[0.96]"
                              }`}
                            />
                          )}
                        </div>
                      ) : (
                        <div className="hidden lg:block w-full" />
                      )}
                    </div>

                    {/* RIGHT HALF (width: 50% on desktop) */}
                    <div className="w-full lg:w-1/2 flex justify-start items-start lg:items-center pl-10 lg:pl-9 xl:pl-10">
                      {isRight ? (
                        <div className="w-full flex flex-col sm:flex-row lg:flex-row items-start lg:items-center justify-start gap-5 lg:gap-7 xl:gap-8">
                          {/* Right-side Grey Square */}
                          {item.hasPlaceholder && (
                            <div
                              key={`img-${item.id}-${cycle}`}
                              className={`w-[110px] h-[110px] sm:w-[125px] sm:h-[125px] lg:w-[140px] lg:h-[140px] bg-[#D2D3D2] rounded-[6px] flex-shrink-0 ${
                                isActivated
                                  ? "animate-s7-image-right"
                                  : "opacity-[0.25] -translate-x-[24px] translate-y-[14px] scale-[0.96]"
                              }`}
                            />
                          )}
                          {/* Right-side Text (extending outward to the right) */}
                          <div
                            key={`copy-${item.id}-${cycle}`}
                            className={`flex flex-col items-start text-left max-w-[320px] ${
                              isActivated ? "animate-s7-copy" : "opacity-0 translate-y-[16px]"
                            }`}
                          >
                            <h3 className="text-[15px] font-bold text-[#17251C] tracking-[-0.01em] leading-[1.25] uppercase mb-1.5">
                              {item.title}
                            </h3>
                            <p className="text-[14px] leading-[1.5] text-[#17251C]/80 font-normal">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="hidden lg:block w-full" />
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* BOTTOM DISCLAIMER */}
        <div className="text-[10px] font-medium tracking-[0.05em] uppercase text-[#17251C]/60 text-center max-w-xl mx-auto mt-12 sm:mt-14 lg:mt-16 mb-10 sm:mb-12">
          MILESTONES ABOVE ARE SEQUENCED LOGICALLY, NOT DATED &mdash; ONLY 2014 IS A CONFIRMED YEAR. SEND THE REAL DATES AND THIS BECOMES A PROPER TIMELINE.
        </div>

        {/* FINAL CLOSING TAGLINE */}
        <div className="pt-6 sm:pt-8 border-t border-[#155B2A]/15 text-center">
          <span className="text-[9px] font-medium tracking-[0.14em] uppercase text-[#155B2A]/70">
            BIOFACTOR BIOLOGICALS&trade; &middot; MICROBE &middot; MINERAL &middot; METABIOME &middot; ONE HEALTH
          </span>
        </div>

      </div>
    </section>
  );
}




