"use client";

import React, { useEffect, useState, useRef } from "react";

export default function AboutSoilCompanySection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Frame 3 Replay State Machine
  const [animationCycle, setAnimationCycle] = useState(0);
  const armedRef = useRef(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Frame 4 Replay State Machine
  const [frame4Cycle, setFrame4Cycle] = useState(0);
  const frame4ArmedRef = useRef(true);
  const frame4WrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", handleMediaChange);
    }

    // --- FRAME 3 OBSERVERS ---
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.22 &&
          armedRef.current
        ) {
          armedRef.current = false;
          setAnimationCycle((prev) => prev + 1);
        }
      },
      {
        threshold: [0, 0.1, 0.15, 0.22, 0.3],
        rootMargin: "0px",
      }
    );

    const rearmObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          armedRef.current = true;
        }
      },
      {
        threshold: 0,
        rootMargin: "20% 0px 20% 0px",
      }
    );

    if (sectionRef.current) {
      playObserver.observe(sectionRef.current);
      rearmObserver.observe(sectionRef.current);
    }

    // --- FRAME 4 OBSERVERS ---
    const f4PlayObserver = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.24 &&
          frame4ArmedRef.current
        ) {
          frame4ArmedRef.current = false;
          setFrame4Cycle((prev) => prev + 1);
        }
      },
      {
        threshold: [0, 0.1, 0.18, 0.24, 0.32],
        rootMargin: "0px",
      }
    );

    const f4RearmObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          frame4ArmedRef.current = true;
        }
      },
      {
        threshold: 0,
        rootMargin: "25% 0px 25% 0px",
      }
    );

    if (frame4WrapperRef.current) {
      f4PlayObserver.observe(frame4WrapperRef.current);
      f4RearmObserver.observe(frame4WrapperRef.current);
    }

    return () => {
      if (sectionRef.current) {
        playObserver.unobserve(sectionRef.current);
        rearmObserver.unobserve(sectionRef.current);
      }
      if (frame4WrapperRef.current) {
        f4PlayObserver.unobserve(frame4WrapperRef.current);
        f4RearmObserver.unobserve(frame4WrapperRef.current);
      }
      if ("removeEventListener" in mediaQuery) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      }
    };
  }, []);

  const isAnimated = animationCycle > 0;
  const isFrame4Animated = frame4Cycle > 0;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#EDF4ED] text-[#17251C] font-sans select-none pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
    >
      <div key={animationCycle} className="w-full">
        {/* 1. TOP TITLE COMPOSITION */}
        <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 text-center mb-8 sm:mb-10 lg:mb-12">
          <span
            className={`block text-[13px] font-semibold tracking-[0.06em] uppercase text-[#155B2A] mb-2 sm:mb-2.5 ${prefersReducedMotion
                ? "opacity-100"
                : isAnimated
                  ? "animate-s3-eyebrow opacity-0 fill-mode-forwards"
                  : "opacity-0"
              }`}
          >
            Who We Are
          </span>
          <h2
            className={`text-[clamp(34px,3vw,48px)] font-bold text-[#155B2A] tracking-[-0.025em] leading-[1.1] max-w-xl mx-auto font-sans ${prefersReducedMotion
                ? "opacity-100"
                : isAnimated
                  ? "animate-s3-title opacity-0 fill-mode-forwards"
                  : "opacity-0"
              }`}
          >
            The Soil Company
          </h2>
        </div>

        {/* 2. FULL-BLEED TRACTOR / CROP FIELD EDITORIAL LANDSCAPE BAND */}
        <div className="w-full mb-12 sm:mb-16 lg:mb-20">
          <div
            className={`relative w-full h-[310px] sm:h-[370px] md:h-[420px] lg:h-[460px] overflow-hidden ${prefersReducedMotion
                ? ""
                : isAnimated
                  ? "animate-s3-field-wrapper [clip-path:inset(0_100%_0_0)] fill-mode-forwards"
                  : "[clip-path:inset(0_100%_0_0)]"
              }`}
          >
            <img
              src="/images/about-soil-company-field.jpg"
              alt="Biofactor tractor operating in agricultural crop field"
              className={`w-full h-full object-cover object-[32%_45%] block border-none outline-none shadow-none rounded-none ${prefersReducedMotion
                  ? "opacity-100 scale-100"
                  : isAnimated
                    ? "animate-s3-field-image opacity-65 scale-[1.035] fill-mode-forwards"
                    : "opacity-65 scale-[1.035]"
                }`}
            />
            {/* Subtle Warm/White Light Sweep Overlay */}
            {!prefersReducedMotion && isAnimated && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/12 to-transparent animate-s3-light-sweep" />
            )}
          </div>
        </div>
      </div>

      {/* 3. LOWER CONTENT AREA: COMPANY INFORMATION & STAGGERED STAT CARDS (FRAME 4) */}
      <div
        ref={frame4WrapperRef}
        className="w-full max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16"
      >
        <div
          key={frame4Cycle}
          className="w-full flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 xl:gap-14"
        >
          {/* LEFT COLUMN: COMPANY DESCRIPTION & ONEHEALTH STATEMENT */}
          <div className="w-full lg:w-[45%] max-w-[520px] shrink-0 flex flex-col items-start">

            {/* STAGE 1: Company Description Paragraph */}
            <p
              className={`text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.65] text-[#17251C] font-normal max-w-[520px] mb-8 sm:mb-10 ${prefersReducedMotion
                  ? "opacity-100"
                  : isFrame4Animated
                    ? "animate-s4-desc opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
            >
              Biofac Inputs Private Limited, operating as Biofactor Biologicals, is a DSIR-recognised agri-biologicals company headquartered in Hyderabad. We’re built around two things: microbes and minerals &mdash; the Microbe &amp; Mineral&trade; platform is the center of our product portfolio &mdash; alongside a small, science-backed line of Bio Controls for pest and soil-borne diseases.
            </p>

            {/* STAGE 2: Main Soil Company / OneHealth Statement */}
            <div
              className={`w-full max-w-[520px] text-[clamp(20px,1.6vw,25px)] leading-[1.4] tracking-[-0.015em] text-[#17251C] ${prefersReducedMotion
                  ? "opacity-100"
                  : isFrame4Animated
                    ? "animate-s4-statement opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
            >
              <p>
                <span className="text-[#17251C]/65 font-normal">We call ourselves </span>
                <strong className="font-bold text-[#155B2A]">The Soil Company</strong>
                <span className="font-normal"> because soil is where the </span>
                <strong className="font-bold text-[#155B2A]">OneHealth</strong>
                <span className="font-normal"> chain starts &mdash; and where most of what we build begins its work.</span>
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: SIX STAGGERED EDITORIAL STAT CARDS */}
          <div className="w-full lg:w-[55%] max-w-[620px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 lg:gap-5">

              {/* STAGE 3: Card 1 - PRODUCT RANGE (100+) */}
              <div
                className={`relative overflow-hidden p-5 sm:p-6 rounded-[14px] flex flex-col justify-between h-[160px] min-h-[160px] lg:col-start-3 bg-[#176B3A] text-white ${prefersReducedMotion
                    ? "opacity-100"
                    : isFrame4Animated
                      ? "animate-s4-card-1 opacity-0 fill-mode-forwards"
                      : "opacity-0"
                  }`}
              >
                <div
                  className={`relative z-10 flex flex-col justify-between h-full ${!prefersReducedMotion && isFrame4Animated ? "animate-s4-card-inner-1 opacity-65 fill-mode-forwards" : ""
                    }`}
                >
                  <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/80 block mb-3">
                    PRODUCT RANGE
                  </span>
                  <div>
                    <div className="text-[30px] sm:text-[34px] font-bold tracking-[-0.02em] leading-none mb-1">
                      100+
                    </div>
                    <div className="text-[12px] sm:text-[13px] font-medium text-white/90 leading-snug w-full">
                      products, six verticals
                    </div>
                  </div>
                </div>
                <img
                  src="/images/about/about-product-range-icon.svg.svg"
                  alt=""
                  className="absolute bottom-3 right-3.5 w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] pointer-events-none select-none z-0 object-contain"
                />
              </div>

              {/* STAGE 3: Card 2 - VERTICALS */}
              <div
                className={`relative overflow-hidden p-5 sm:p-6 rounded-[14px] flex flex-col justify-between h-[160px] min-h-[160px] lg:col-start-2 bg-[#2F7A44] text-white ${prefersReducedMotion
                    ? "opacity-100"
                    : isFrame4Animated
                      ? "animate-s4-card-2 opacity-0 fill-mode-forwards"
                      : "opacity-0"
                  }`}
              >
                <div
                  className={`relative z-10 flex flex-col justify-between h-full ${!prefersReducedMotion && isFrame4Animated ? "animate-s4-card-inner-2 opacity-65 fill-mode-forwards" : ""
                    }`}
                >
                  <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/80 block mb-3">
                    VERTICALS
                  </span>
                  <div className="flex flex-col gap-1 text-[12px] sm:text-[13px] font-medium text-white/95 leading-snug w-full">
                    <div>Agri &middot; Aqua &middot; Poultry</div>
                    <div>Ruminants &middot; Pet &middot; Bio-remediation</div>
                  </div>
                </div>
                <img
                  src="/images/about/about-verticals-icon.svg.svg"
                  alt=""
                  className="absolute bottom-3 right-3.5 w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] pointer-events-none select-none z-0 object-contain"
                />
              </div>

              {/* STAGE 3: Card 3 - IP (6 patents) */}
              <div
                className={`relative overflow-hidden p-5 sm:p-6 rounded-[14px] flex flex-col justify-between h-[160px] min-h-[160px] lg:col-start-3 bg-[#C8E4A9] text-[#17251C] ${prefersReducedMotion
                    ? "opacity-100"
                    : isFrame4Animated
                      ? "animate-s4-card-3 opacity-0 fill-mode-forwards"
                      : "opacity-0"
                  }`}
              >
                <div
                  className={`relative z-10 flex flex-col justify-between h-full ${!prefersReducedMotion && isFrame4Animated ? "animate-s4-card-inner-3 opacity-65 fill-mode-forwards" : ""
                    }`}
                >
                  <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#155B2A] block mb-3">
                    IP
                  </span>
                  <div>
                    <div className="text-[26px] sm:text-[28px] font-bold text-[#155B2A] tracking-[-0.02em] leading-none mb-1">
                      6 patents
                    </div>
                    <div className="text-[12px] sm:text-[13px] font-medium text-[#17251C]/80 leading-snug w-full">
                      60+ filed / deposited strains
                    </div>
                  </div>
                </div>
                <img
                  src="/images/about/about-ip-icon.svg.svg"
                  alt=""
                  className="absolute bottom-3 right-3.5 w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] pointer-events-none select-none z-0 object-contain"
                />
              </div>

              {/* STAGE 3: Card 4 - DOMESTIC REACH (16) */}
              <div
                className={`relative overflow-hidden p-5 sm:p-6 rounded-[14px] flex flex-col justify-between h-[160px] min-h-[160px] lg:col-start-1 bg-[#C8E4A9] text-[#17251C] ${prefersReducedMotion
                    ? "opacity-100"
                    : isFrame4Animated
                      ? "animate-s4-card-4 opacity-0 fill-mode-forwards"
                      : "opacity-0"
                  }`}
              >
                <div
                  className={`relative z-10 flex flex-col justify-between h-full ${!prefersReducedMotion && isFrame4Animated ? "animate-s4-card-inner-4 opacity-65 fill-mode-forwards" : ""
                    }`}
                >
                  <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#155B2A] block mb-3">
                    DOMESTIC REACH
                  </span>
                  <div>
                    <div className="text-[28px] sm:text-[32px] font-bold text-[#155B2A] tracking-[-0.02em] leading-none mb-1">
                      16
                    </div>
                    <div className="text-[12px] sm:text-[13px] font-medium text-[#17251C]/85 leading-snug w-full">
                      Indian states, 3,000+ dealers
                    </div>
                  </div>
                </div>
                {/* Reconstructed Figma Location Pin Icon */}
                <div className="absolute bottom-2.5 right-3.5 w-[42px] h-[48px] sm:w-[46px] sm:h-[52px] pointer-events-none select-none z-0">
                  <img
                    src="/images/about/domestic-reach-part-3.svg.svg"
                    alt=""
                    className="absolute bottom-0 left-0 w-full h-auto block"
                  />
                  <img
                    src="/images/about/domestic-reach-part-2.svg.svg"
                    alt=""
                    className="absolute top-0 left-[9%] w-[82%] h-auto block"
                  />
                  <img
                    src="/images/about/domestic-reach-part-1.svg.svg"
                    alt=""
                    className="absolute top-[25%] left-[36%] w-[28%] h-auto block"
                  />
                </div>
              </div>

              {/* STAGE 3: Card 5 - TEAM (600+) */}
              <div
                className={`relative overflow-hidden p-5 sm:p-6 rounded-[14px] flex flex-col justify-between h-[160px] min-h-[160px] lg:col-start-2 bg-[#176B3A] text-white ${prefersReducedMotion
                    ? "opacity-100"
                    : isFrame4Animated
                      ? "animate-s4-card-5 opacity-0 fill-mode-forwards"
                      : "opacity-0"
                  }`}
              >
                <div
                  className={`relative z-10 flex flex-col justify-between h-full ${!prefersReducedMotion && isFrame4Animated ? "animate-s4-card-inner-5 opacity-65 fill-mode-forwards" : ""
                    }`}
                >
                  <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/80 block mb-3">
                    TEAM
                  </span>
                  <div>
                    <div className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] leading-none mb-1">
                      600+
                    </div>
                    <div className="text-[12px] sm:text-[13px] font-medium text-white/90">
                      people
                    </div>
                  </div>
                </div>
                <img
                  src="/images/about/about-team-icon.svg.svg"
                  alt=""
                  className="absolute bottom-2.5 right-3 w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] pointer-events-none select-none z-0 object-contain"
                />
              </div>

              {/* STAGE 3: Card 6 - INTERNATIONAL (Malawi & Kenya) */}
              <div
                className={`relative overflow-hidden p-5 sm:p-6 rounded-[14px] flex flex-col justify-between h-[160px] min-h-[160px] lg:col-start-3 bg-[#2F7A44] text-white ${prefersReducedMotion
                    ? "opacity-100"
                    : isFrame4Animated
                      ? "animate-s4-card-6 opacity-0 fill-mode-forwards"
                      : "opacity-0"
                  }`}
              >
                <div
                  className={`relative z-10 flex flex-col justify-between h-full ${!prefersReducedMotion && isFrame4Animated ? "animate-s4-card-inner-6 opacity-65 fill-mode-forwards" : ""
                    }`}
                >
                  <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/80 block mb-3">
                    INTERNATIONAL
                  </span>
                  <div>
                    <div className="text-[20px] sm:text-[22px] font-bold tracking-[-0.01em] leading-tight mb-0.5">
                      Malawi &amp; Kenya
                    </div>
                    <div className="text-[12px] sm:text-[13px] font-medium text-white/90">
                      East Africa
                    </div>
                  </div>
                </div>
                <img
                  src="/images/about/about-international-icon.svg.svg"
                  alt=""
                  className="absolute bottom-2.5 right-3 w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] pointer-events-none select-none z-0 object-contain"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
