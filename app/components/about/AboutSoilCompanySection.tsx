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
      className="relative w-full bg-[#EDF4ED] text-[#17251C] font-sans select-none pt-16 pb-20 sm:pt-22 sm:pb-24 lg:pt-28 lg:pb-28"
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
        className="w-full max-w-[1280px] xl:max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16"
      >
        <div
          key={frame4Cycle}
          className="w-full flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 xl:gap-14"
        >
          {/* LEFT COLUMN: COMPANY DESCRIPTION & ONEHEALTH STATEMENT */}
          <div className="w-full lg:w-[44%] max-w-[520px] shrink-0 flex flex-col items-start">

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
          <div className="w-full lg:w-[56%] xl:w-[58%] max-w-[680px] xl:max-w-[700px] shrink-0 lg:-ml-[80px] xl:-ml-[96px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 lg:gap-5">

              {/* STAGE 3: Card 1 - PRODUCT RANGE (100+) */}
              <div
                className={`relative overflow-hidden p-5 sm:p-6 rounded-[14px] flex flex-col justify-between h-[180px] min-h-[180px] lg:col-start-3 bg-[#176B3A] text-white ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : isFrame4Animated
                    ? "animate-s4-card-1 opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                <div
                  className={`relative z-10 flex flex-col justify-between h-full ${
                    !prefersReducedMotion && isFrame4Animated
                      ? "animate-s4-card-inner-1 opacity-65 fill-mode-forwards"
                      : ""
                  }`}
                >
                  <span className="text-[13px] sm:text-[14px] font-semibold tracking-[0.03em] uppercase leading-none text-white/80 block">
                    PRODUCT RANGE
                  </span>
                  <div>
                    <div className="text-[34px] sm:text-[36px] font-bold tracking-[-0.035em] leading-[0.95] mb-1.5">
                      100+
                    </div>
                    <div className="text-[14px] sm:text-[15px] font-medium leading-[1.25] text-white/95 max-w-[110px] sm:max-w-[115px]">
                      products, six<br />verticals
                    </div>
                  </div>
                </div>
                <svg
                  viewBox="0 0 81 81"
                  fill="none"
                  className="absolute bottom-[10px] right-[12px] w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] pointer-events-none select-none z-0 opacity-100"
                >
                  <path
                    d="M12.5616 39.9712L28.8591 49.9532L34.9126 44.1667L19.496 20.1464L35.8744 43.2441L45.8957 33.6684L36.0364 12.1186L46.8942 32.7141L56.2852 23.7357L57.1382 7.43829L57.5976 22.4828L78.4222 2.57956C78.4222 2.57956 31.4852 0.863374 14.4601 17.8886C14.1588 18.1872 13.9019 18.4745 13.6146 18.7682C16.1231 20.3742 17.7621 22.9903 17.7621 25.9544C17.7621 30.8435 13.3172 34.8036 7.83704 34.8036C6.27278 34.8054 4.72651 34.47 3.30357 33.8202C-1.2223 47.913 15.3409 52.8299 21.526 56.9609L27.9162 50.853L12.5616 39.9712Z"
                    fill="#A9DF86"
                  />
                  <path
                    d="M77.5092 24.947C78.7824 12.5413 78.4217 2.57959 78.4217 2.57959L58.5172 23.4004L73.5617 23.8573L57.2592 24.7116L48.2834 34.1076L68.8764 44.959L47.3266 35.1011L37.7496 45.1223L60.8523 61.497L36.8282 46.0842L31.0418 52.1364L41.0263 68.4326L30.1444 53.0768L24.0378 59.4644C29.4433 67.5644 36.1954 93.4489 63.1114 66.5354C68.3448 61.3008 71.8025 53.2413 74.0895 44.587C72.4682 43.2239 71.5114 41.4988 71.5607 39.6422C71.5785 39.0511 71.7038 38.4778 71.9113 37.931C69.5459 36.4794 68.0752 34.3835 68.1372 32.0927C68.2347 28.3971 72.2733 25.4431 77.5092 24.947ZM21.5268 56.961L12.1877 65.8861L15.1075 68.8047L24.0378 59.4644C23.6644 58.9062 23.2974 58.4316 22.9316 58.0659C22.5659 57.7001 22.0849 57.3331 21.5268 56.961Z"
                    fill="#A9DF86"
                  />
                </svg>
              </div>

              {/* STAGE 3: Card 2 - VERTICALS */}
              <div
                className={`relative overflow-hidden p-5 sm:p-6 rounded-[14px] flex flex-col justify-start h-[180px] min-h-[180px] lg:col-start-2 bg-[#2F7A44] text-white ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : isFrame4Animated
                    ? "animate-s4-card-2 opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                <div
                  className={`relative z-10 flex flex-col justify-start h-full ${
                    !prefersReducedMotion && isFrame4Animated
                      ? "animate-s4-card-inner-2 opacity-65 fill-mode-forwards"
                      : ""
                  }`}
                >
                  <span className="text-[13px] sm:text-[14px] font-semibold tracking-[0.03em] uppercase leading-none text-white/80 block mb-3">
                    VERTICALS
                  </span>
                  <div className="text-[14px] sm:text-[15px] font-medium leading-[1.25] text-white/95 w-full mt-0.5">
                    <span className="whitespace-nowrap">Agri &middot;</span>{" "}
                    <span className="whitespace-nowrap">Aqua &middot;</span>{" "}
                    <span className="whitespace-nowrap">Poultry</span>
                    <br />
                    <span className="whitespace-nowrap">Ruminants &middot;</span>{" "}
                    <span className="whitespace-nowrap">Pet &middot;</span>
                    <br />
                    <span className="whitespace-nowrap max-w-[115px] inline-block">Bio-remediation</span>
                  </div>
                </div>
                <svg
                  viewBox="0 0 77 77"
                  fill="none"
                  className="absolute bottom-[10px] right-[12px] w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] pointer-events-none select-none z-0 opacity-100"
                >
                  <path
                    d="M73.2462 13.81C56.4756 23.6506 57.6768 43.8631 45.9266 52.9837C37.0832 59.8483 24.6053 56.3717 17.3904 53.4188C17.3904 53.4188 12.5009 59.5903 8.99359 67.8178C7.81934 70.5782 2.66419 67.5367 3.56894 65.1997C15.0342 35.6125 54.0424 20.8516 54.0424 20.8516C54.0424 20.8516 26.5188 19.6851 8.12349 43.7206C7.63069 38.2305 6.81449 23.3772 21.0595 14.2681C40.3711 1.90576 77.1617 11.5154 73.2462 13.81Z"
                    fill="#A9DF86"
                  />
                </svg>
              </div>

              {/* STAGE 3: Card 3 - IP (6 patents) */}
              <div
                className={`relative overflow-hidden p-5 sm:p-6 rounded-[14px] flex flex-col justify-between h-[180px] min-h-[180px] lg:col-start-3 bg-[#C8E4A9] text-[#17251C] ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : isFrame4Animated
                    ? "animate-s4-card-3 opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                <div
                  className={`relative z-10 flex flex-col justify-between h-full ${
                    !prefersReducedMotion && isFrame4Animated
                      ? "animate-s4-card-inner-3 opacity-65 fill-mode-forwards"
                      : ""
                  }`}
                >
                  <span className="text-[13px] sm:text-[14px] font-semibold tracking-[0.03em] uppercase leading-none text-[#155B2A] block">
                    IP
                  </span>
                  <div>
                    <div className="text-[27px] sm:text-[29px] font-bold text-[#155B2A] tracking-[-0.025em] leading-[1.02] mb-1.5">
                      6 patents
                    </div>
                    <div className="text-[14px] sm:text-[15px] font-medium leading-[1.25] text-[#17251C]/85 max-w-[125px] sm:max-w-[135px]">
                      60+ filed / deposited<br />strains
                    </div>
                  </div>
                </div>
                <svg
                  viewBox="0 0 90 90"
                  fill="none"
                  className="absolute bottom-[10px] right-[12px] w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] pointer-events-none select-none z-0 opacity-90 sm:opacity-95"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M75.9001 8.34336C77.5314 7.93086 79.2001 8.41836 80.3814 9.63711H80.4001C81.5814 10.8559 82.0126 12.5434 81.5439 14.1746L71.2314 50.5871C70.9623 43.2576 68.1136 36.2586 63.1876 30.8246L67.5001 26.5121L63.5251 22.5371L59.0626 26.9996C55.5865 24.3137 51.5691 22.4138 47.2876 21.4309L38.1001 19.3121C40.4864 17.6187 43.1709 16.391 46.0126 15.6934L75.9001 8.34336ZM65.5126 53.9621C65.0626 58.9496 63.0564 63.5434 60.0376 67.3121L70.4251 77.6996L66.4501 81.6746L56.0626 71.2871C52.2939 74.3059 47.7001 76.3121 42.7126 76.7621C41.9439 76.8371 41.1564 76.8746 40.3876 76.8746C28.7251 76.8746 18.3189 68.7746 15.6751 57.2434L8.25011 25.1246C7.89386 23.5309 8.36261 21.9184 9.50636 20.7559C10.6501 19.5934 12.2814 19.1434 13.8751 19.4996L45.9939 26.9059C58.2939 29.7371 66.6751 41.3621 65.5126 53.9621ZM30.8251 46.0496L52.2189 67.4434L56.1939 63.4684L34.8001 42.0746L30.8251 46.0496Z"
                    fill="#5E9F43"
                  />
                </svg>
              </div>

              {/* STAGE 3: Card 4 - DOMESTIC REACH (16) */}
              <div
                className={`relative overflow-hidden p-5 sm:p-6 rounded-[14px] flex flex-col justify-between h-[180px] min-h-[180px] lg:col-start-1 bg-[#C8E4A9] text-[#17251C] ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : isFrame4Animated
                    ? "animate-s4-card-4 opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                <div
                  className={`relative z-10 flex flex-col justify-between h-full ${
                    !prefersReducedMotion && isFrame4Animated
                      ? "animate-s4-card-inner-4 opacity-65 fill-mode-forwards"
                      : ""
                  }`}
                >
                  <span className="text-[13px] sm:text-[14px] font-semibold tracking-[0.03em] uppercase leading-none text-[#155B2A] block">
                    DOMESTIC REACH
                  </span>
                  <div>
                    <div className="text-[34px] sm:text-[36px] font-bold text-[#155B2A] tracking-[-0.035em] leading-[0.95] mb-1.5">
                      16
                    </div>
                    <div className="text-[14px] sm:text-[15px] font-medium leading-[1.25] text-[#17251C]/85 max-w-[120px] sm:max-w-[128px]">
                      Indian states,<br />3,000+ dealers
                    </div>
                  </div>
                </div>
                {/* Unified Location Pin SVG Icon */}
                <div className="absolute bottom-[10px] right-[12px] w-[44px] h-[48px] sm:w-[48px] sm:h-[52px] pointer-events-none select-none z-0 opacity-90 sm:opacity-95">
                  <svg viewBox="0 0 63 80" fill="none" className="w-full h-full">
                    <path d="M12.4644 57.3444C13.1826 57.7035 13.7289 58.3329 13.9835 59.0945C14.2381 59.856 14.1802 60.6874 13.8224 61.4063L7.93369 73.1878H54.7079L48.8152 61.4063C48.6337 61.0498 48.5246 60.6608 48.4941 60.2619C48.4637 59.863 48.5125 59.4621 48.6377 59.0821C48.763 58.7022 48.9622 58.3508 49.2239 58.0483C49.4856 57.7457 49.8047 57.4979 50.1626 57.3192C50.5205 57.1405 50.9103 57.0344 51.3094 57.0071C51.7085 56.9797 52.1091 57.0317 52.488 57.1599C52.867 57.2881 53.2168 57.49 53.5173 57.7541C53.8179 58.0181 54.0632 58.3391 54.2391 58.6984L62.3224 74.865C62.5531 75.3272 62.6619 75.8406 62.6385 76.3566C62.615 76.8726 62.4601 77.3741 62.1884 77.8134C61.9167 78.2527 61.5373 78.6153 61.0861 78.8668C60.6349 79.1182 60.127 79.2502 59.6104 79.2503H3.02711C2.51092 79.2495 2.00346 79.117 1.55283 78.8653C1.1022 78.6135 0.723324 78.2509 0.452114 77.8117C0.180903 77.3725 0.0263416 76.8713 0.00307991 76.3556C-0.0201817 75.8399 0.0886267 75.3269 0.319192 74.865L8.40252 58.6984C8.76164 57.9802 9.39104 57.4338 10.1526 57.1792C10.9141 56.9246 11.7456 56.9866 12.4644 57.3444Z" fill="#5E9F43" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M30.3738 0C24.1318 0.000244844 18.1181 2.34786 13.5269 6.57672C8.93564 10.8056 6.1026 16.6064 5.59029 22.8273C5.02068 29.7612 7.16197 36.6458 11.5639 42.0333L26.0937 59.8005C26.6919 60.5312 27.4449 61.1199 28.2983 61.5242C29.1517 61.9284 30.0842 62.1381 31.0285 62.1381C31.9729 62.1381 32.9054 61.9284 33.7588 61.5242C34.6122 61.1199 35.3652 60.5312 35.9634 59.8005L50.4932 42.0333C54.8989 36.6478 57.0407 29.7617 56.4668 22.8273C55.9545 16.6064 53.1215 10.8056 48.5302 6.57672C43.939 2.34786 37.9253 0.000244844 31.6833 0H30.3738ZM31.0285 11.1146C27.0089 11.1146 23.1538 12.7114 20.3115 15.5537C17.4691 18.3961 15.8723 22.2511 15.8723 26.2708C15.8723 30.2905 17.4691 34.1456 20.3115 36.9879C23.1538 39.8303 27.0089 41.4271 31.0285 41.4271C35.0482 41.4271 38.9033 39.8303 41.7456 36.9879C44.588 34.1456 46.1848 30.2905 46.1848 26.2708C46.1848 22.2511 44.588 18.3961 41.7456 15.5537C38.9033 12.7114 35.0482 11.1146 31.0285 11.1146Z" fill="#5E9F43" />
                    <path d="M21.9062 26.0938C21.9062 23.6819 22.8643 21.3689 24.5698 19.6635C26.2752 17.9581 28.5882 17 31 17C33.4118 17 35.7248 17.9581 37.4302 19.6635C39.1357 21.3689 40.0938 23.6819 40.0938 26.0938C40.0938 28.5056 39.1357 30.8186 37.4302 32.524C35.7248 34.2294 33.4118 35.1875 31 35.1875C28.5882 35.1875 26.2752 34.2294 24.5698 32.524C22.8643 30.8186 21.9062 28.5056 21.9062 26.0938Z" fill="#5E9F43" />
                  </svg>
                </div>
              </div>

              {/* STAGE 3: Card 5 - TEAM (600+) */}
              <div
                className={`relative overflow-hidden p-5 sm:p-6 rounded-[14px] flex flex-col justify-between h-[180px] min-h-[180px] lg:col-start-2 bg-[#176B3A] text-white ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : isFrame4Animated
                    ? "animate-s4-card-5 opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                <div
                  className={`relative z-10 flex flex-col justify-between h-full ${
                    !prefersReducedMotion && isFrame4Animated
                      ? "animate-s4-card-inner-5 opacity-65 fill-mode-forwards"
                      : ""
                  }`}
                >
                  <span className="text-[13px] sm:text-[14px] font-semibold tracking-[0.03em] uppercase leading-none text-white/80 block">
                    TEAM
                  </span>
                  <div>
                    <div className="text-[31px] sm:text-[33px] font-bold tracking-[-0.035em] leading-[0.95] mb-1.5">
                      600+
                    </div>
                    <div className="text-[14px] sm:text-[15px] font-medium leading-[1.25] text-white/95 w-full">
                      people
                    </div>
                  </div>
                </div>
                <svg
                  viewBox="0 0 116 116"
                  fill="none"
                  className="absolute bottom-[10px] right-[12px] w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] pointer-events-none select-none z-0 opacity-100"
                >
                  <path
                    d="M76.125 58C71.4669 58 66.9628 55.9202 63.4375 52.1456C60.0096 48.464 57.9162 43.5544 57.5469 38.3253C57.1526 32.7473 58.8541 27.618 62.3364 23.8797C65.8187 20.1414 70.6875 18.125 76.125 18.125C81.524 18.125 86.4064 20.1777 89.8773 23.9069C93.3823 27.6723 95.0883 32.7927 94.694 38.323C94.3157 43.5589 92.2245 48.4662 88.8034 52.1434C85.2872 55.9202 80.7854 58 76.125 58ZM105.993 97.875H46.2595C45.2991 97.8801 44.3504 97.6649 43.4863 97.2458C42.6222 96.8267 41.8657 96.2149 41.2751 95.4576C40.6487 94.6366 40.2161 93.6845 40.0097 92.6726C39.8033 91.6607 39.8285 90.6153 40.0834 89.6145C41.9911 81.9544 46.7172 75.6016 53.7497 71.2448C59.9915 67.3797 67.937 65.25 76.125 65.25C84.4738 65.25 92.2109 67.2891 98.489 71.1519C105.537 75.4861 110.27 81.8752 112.169 89.6281C112.421 90.6296 112.443 91.675 112.234 92.6864C112.026 93.6977 111.591 94.6489 110.964 95.4689C110.374 96.2227 109.619 96.8315 108.757 97.2486C107.896 97.6656 106.95 97.8799 105.993 97.875ZM33.3047 58.9062C25.3319 58.9062 18.3221 51.4931 17.6719 42.383C17.3501 37.7159 18.8047 33.3998 21.75 30.2348C24.6636 27.1014 28.7734 25.375 33.3047 25.375C37.8359 25.375 41.914 27.1105 44.8435 30.262C47.8115 33.452 49.2615 37.7589 48.9216 42.3876C48.2714 51.4954 41.2638 58.9062 33.3047 58.9062ZM48.1808 66.0316C44.1955 64.0832 39.0231 63.109 33.3069 63.109C26.6324 63.109 20.1505 64.849 15.0528 68.0073C9.27319 71.5938 5.38538 76.816 3.8153 83.1212C3.58553 84.0282 3.5638 84.9753 3.75173 85.8918C3.93966 86.8083 4.33239 87.6704 4.90053 88.4137C5.43963 89.1058 6.13028 89.665 6.91936 90.0484C7.70843 90.4317 8.57492 90.629 9.45217 90.625H34.6006C35.0251 90.6249 35.4361 90.4759 35.7619 90.2039C36.0877 89.9319 36.3078 89.5541 36.3837 89.1365C36.4086 88.9937 36.4403 88.851 36.4765 88.7105C38.3978 80.9938 42.8996 74.4734 49.5515 69.7201C49.7961 69.5437 49.9929 69.3091 50.124 69.0375C50.2551 68.7659 50.3163 68.4658 50.3021 68.1646C50.2879 67.8633 50.1988 67.5703 50.0428 67.3122C49.8868 67.0541 49.6689 66.839 49.4087 66.6864C49.053 66.478 48.6452 66.2582 48.1808 66.0316Z"
                    fill="#A9DF86"
                  />
                </svg>
              </div>

              {/* STAGE 3: Card 6 - INTERNATIONAL (Malawi & Kenya) */}
              <div
                className={`relative overflow-hidden p-5 sm:p-6 rounded-[14px] flex flex-col justify-between h-[180px] min-h-[180px] lg:col-start-3 bg-[#2F7A44] text-white ${
                  prefersReducedMotion
                    ? "opacity-100"
                    : isFrame4Animated
                    ? "animate-s4-card-6 opacity-0 fill-mode-forwards"
                    : "opacity-0"
                }`}
              >
                <div
                  className={`relative z-10 flex flex-col justify-between h-full ${
                    !prefersReducedMotion && isFrame4Animated
                      ? "animate-s4-card-inner-6 opacity-65 fill-mode-forwards"
                      : ""
                  }`}
                >
                  <span className="text-[13px] sm:text-[14px] font-semibold tracking-[0.03em] uppercase leading-none text-white/80 block">
                    INTERNATIONAL
                  </span>
                  <div>
                    <div className="text-[22px] sm:text-[24px] font-bold tracking-[-0.02em] leading-[1.05] mb-1.5 max-w-[125px]">
                      Malawi &amp;<br />Kenya
                    </div>
                    <div className="text-[14px] sm:text-[15px] font-medium leading-[1.25] text-white/95 w-full">
                      East Africa
                    </div>
                  </div>
                </div>
                <svg
                  viewBox="0 0 70 70"
                  fill="none"
                  className="absolute bottom-[10px] right-[12px] w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] pointer-events-none select-none z-0 opacity-100"
                >
                  <g clipPath="url(#clip_intl)">
                    <path
                      d="M70 35.0001V34.9826C70 24.6255 65.4908 15.3242 58.3304 8.92799L58.2954 8.89882C58.207 8.80356 58.1082 8.71845 58.0008 8.64507L57.995 8.64216C51.6351 3.05899 43.4571 -0.0126974 34.9942 0.00298948C26.1508 0.00298948 18.0775 3.28716 11.9233 8.70632L11.9613 8.67424C11.8873 8.73077 11.8189 8.79426 11.7571 8.86382C8.05753 12.1399 5.09623 16.1676 3.06935 20.6744C1.04247 25.1812 -0.00374321 30.0672 1.00629e-05 35.0088C1.00629e-05 45.363 4.50334 54.6642 11.6579 61.0634L11.6929 61.0926C11.786 61.1972 11.8896 61.292 12.0021 61.3755L12.0079 61.3784C18.3658 66.954 26.5378 70.0213 34.9942 70.0059C43.49 70.019 51.6971 66.9233 58.0679 61.3026L58.03 61.3347C61.7938 58.0623 64.8109 54.0197 66.877 49.4804C68.9432 44.941 70.0102 40.0108 70.0059 35.0234V35.003L70 35.0001ZM56.9858 57.7647C55.2514 56.3631 53.3869 55.1306 51.4179 54.0838L51.2283 53.9905C53.0163 48.8367 54.0925 42.8955 54.1946 36.7151V36.6684H66.6225C66.2046 44.6644 62.7628 52.2027 56.9946 57.7559L56.9858 57.7647ZM36.6683 53.3751C40.4104 53.5763 43.9075 54.3988 47.1333 55.7376L46.9233 55.6617C44.3392 61.5534 40.7021 65.6017 36.6683 66.4913V53.3751ZM36.6683 50.0384V36.6684H50.8667C50.7537 42.205 49.7937 47.6916 48.02 52.9376L48.1338 52.5555C44.5132 51.0651 40.6615 50.2144 36.75 50.0413L36.6713 50.0384H36.6683ZM36.6683 33.3317V19.9617C40.6852 19.779 44.6397 18.8997 48.3554 17.363L48.125 17.4476C49.7438 22.1697 50.7383 27.6122 50.8667 33.2705V33.3317H36.6683ZM36.6683 16.6251V3.51466C40.7021 4.40424 44.3392 8.43507 46.9233 14.3442C43.9075 15.5984 40.4104 16.418 36.7529 16.6222L36.6683 16.6251ZM44.9925 4.95841C48.4303 6.10256 51.645 7.83125 54.495 10.0684L54.4279 10.0159C53.1358 11.0309 51.6863 11.9876 50.1579 12.8188L49.9946 12.9005C48.7628 9.98427 47.0645 7.28803 44.9663 4.91757L44.9925 4.94966V4.95841ZM33.3258 3.52341V16.6251C29.7281 16.4418 26.1884 15.6427 22.8608 14.2626L23.0708 14.3384C25.6667 8.44674 29.2979 4.40132 33.3317 3.51174L33.3258 3.52341ZM20.0025 12.8917C18.4219 12.0404 16.9155 11.058 15.4992 9.95466L15.5692 10.0072C18.3361 7.83555 21.4503 6.14732 24.78 5.01382L25.0017 4.94674C22.9604 7.2545 21.2977 9.87111 20.0754 12.6992L20.0025 12.8917ZM33.3317 19.9588V33.3288H19.1333C19.2617 27.6092 20.2563 22.1667 21.9888 17.0626L21.875 17.4447C25.4956 18.9278 29.3444 19.7773 33.2529 19.9559L33.3317 19.9588ZM33.3317 36.6655V50.0355C29.3149 50.2182 25.3603 51.0975 21.6446 52.6342L21.875 52.5497C20.2563 47.8305 19.2617 42.3851 19.1333 36.7267V36.6655H33.3317ZM33.3317 53.3722V66.4826C29.2979 65.593 25.6608 61.5622 23.0767 55.653C26.0925 54.3988 29.5896 53.5822 33.2471 53.378L33.3317 53.3722ZM25.0192 65.0388C21.5845 63.8929 18.3707 62.1687 15.5167 59.9405L15.5867 59.993C16.8788 58.978 18.3283 58.0213 19.8567 57.1901L20.02 57.1084C21.2426 60.0252 22.9408 62.7189 25.0454 65.0797L25.0192 65.0505V65.0388ZM49.9975 57.1055C51.6892 58.0242 53.1388 58.978 54.5008 60.0426L54.4308 59.9901C51.6639 62.1617 48.5497 63.8499 45.22 64.9834L44.9983 65.0505C47.0393 62.7436 48.702 60.128 49.9246 57.3009L49.9975 57.1113V57.1055ZM66.6225 33.3317H54.1946C54.1034 27.2972 53.062 21.3147 51.1088 15.6042L51.2283 16.0067C53.2885 14.9217 55.2391 13.6402 57.0529 12.1801L56.9829 12.2326C62.7414 17.7633 66.1848 25.2745 66.6167 33.2472L66.6225 33.3317ZM13.0142 12.2355C14.6942 13.6005 16.5813 14.8517 18.5821 15.9163L18.7717 16.0097C16.9838 21.1634 15.9075 27.1047 15.8054 33.2851V33.3317H3.37459C3.79254 25.3357 7.23426 17.7975 13.0025 12.2442L13.0142 12.2355ZM3.37751 36.6684H15.8054C15.8966 42.703 16.938 48.6855 18.8913 54.3959L18.7717 53.9934C16.5813 55.1572 14.6971 56.4084 12.9471 57.8201L13.0171 57.7676C7.2586 52.2368 3.81525 44.7256 3.38334 36.753L3.38043 36.6713L3.37751 36.6684Z"
                      fill="#A9DF86"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip_intl">
                      <rect width="70" height="70" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
