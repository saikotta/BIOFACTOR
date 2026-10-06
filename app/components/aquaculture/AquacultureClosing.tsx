"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const STATS = [
  { value: 93, unit: "%", label: "less H₂S in treated sediment" },
  { value: 40, unit: "%", label: "of production lost to disease annually" },
  { value: 3,  unit: "×", label: "more feed converts to growth" },
];

export default function AquacultureClosing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(STATS.map(() => 0));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setVisible(true);
        observer.disconnect();

        if (reduced) {
          setCounts(STATS.map((s) => s.value));
          return;
        }

        // animate counters
        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const e = 1 - Math.pow(1 - p, 3);
          setCounts(STATS.map((s) => Math.round(e * s.value)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#12301f]"
      aria-label="Aquaculture closing section"
    >
      {/* subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 110%, rgba(31,138,87,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ── STAT BAND ── */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center px-10 py-14 text-center"
              style={{
                borderRight:
                  i < STATS.length - 1
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "none",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(16px)",
                transition: `opacity .7s ease ${i * 0.15}s, transform .7s ease ${i * 0.15}s`,
              }}
            >
              <span
                className="font-inter-tight font-extrabold leading-none text-[#6fbf73]"
                style={{ fontSize: "clamp(3rem,5.5vw,4.5rem)", letterSpacing: "-0.03em" }}
              >
                {counts[i]}
                {s.unit}
              </span>
              <span
                className="mt-3 font-newsreader text-[15px] leading-[1.55] text-white/55"
                style={{ maxWidth: "18ch" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CLOSING BLOCK ── */}
      <div className="relative mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
        <div
          className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity .9s ease .35s, transform .9s ease .35s",
          }}
        >
          {/* Left — headline */}
          <div className="max-w-3xl">
            {/* eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span
                className="h-[1.5px] w-7 bg-[#6fbf73]"
                style={{
                  transformOrigin: "left center",
                  animation: visible ? "acGrow .7s cubic-bezier(.16,1,.3,1) .4s both" : "none",
                }}
              />
              <span
                className="font-jetbrains text-[11px] font-medium uppercase tracking-[0.2em] text-[#6fbf73]"
              >
                THE BIOFACTOR APPROACH
              </span>
            </div>

            <h2
              className="font-inter-tight font-extrabold leading-[0.96] text-white"
              style={{ fontSize: "clamp(44px,6.5vw,82px)", letterSpacing: "-0.03em" }}
            >
              Manage the bottom,
              <br />
              <em className="font-newsreader font-normal not-italic text-[#6fbf73]">
                and the water follows.
              </em>
            </h2>

            <p
              className="mt-7 font-newsreader text-[17px] leading-[1.7] text-[#cfe6bd]"
              style={{ maxWidth: "52ch" }}
            >
              A healthy pond starts a few millimetres below the surface of the
              sediment. Our anaerobic and facultative consortia work exactly
              there — breaking down organic load, removing toxic gases and
              restoring the soil–water interface that shrimp depend on.
            </p>
          </div>

          {/* Right — CTA stack */}
          <div className="flex flex-shrink-0 flex-col gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 border border-[#6fbf73]/40 px-8 py-4 font-inter-tight text-[14px] font-bold uppercase tracking-[0.14em] text-[#6fbf73] transition-colors duration-200 hover:bg-[#6fbf73] hover:text-[#12301f]"
            >
              About Biofactor
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="/bioremediation"
              className="inline-flex items-center gap-3 border border-white/15 px-8 py-4 font-inter-tight text-[14px] font-bold uppercase tracking-[0.14em] text-white/60 transition-colors duration-200 hover:border-white/40 hover:text-white"
            >
              Bioremediation products
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* ── REFERENCE LIST ── */}
        <div
          className="mt-16 border-t border-white/10 pt-10"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity .8s ease .7s",
          }}
        >
          <p className="mb-4 font-jetbrains text-[10px] uppercase tracking-[0.18em] text-white/30">
            References
          </p>
          <ol className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["1", "Páez-Osuna et al. 2003, Aquaculture — Nutrient budget, vannamei pond."],
              ["2", "Shinn et al. 2018, Rev Aquac — Disease losses in tropical shrimp farming."],
              ["3", "Boyd 2014, Global Aquac Advocate — H₂S safe limits, marine species LC₅₀."],
              ["4", "Nimrat et al. 2012, Aquaculture — Bacillus probiotic, growth, FCR."],
              ["5", "Toledo et al. 2019, Aquaculture — Meta-analysis, 100 probiotic experiments."],
              ["6", "Vinoj et al. 2014, Front Microbiol — AHL-lactonase, quorum quenching, Vibrio."],
              ["7", "Xu & Pan 2013, Aquaculture — H₂S, Desulfovibrio, sulphate reduction."],
              ["8", "Deng et al. 2021, Aquaculture — Biofloc, nitrification, water quality."],
              ["9", "Hoseinifar et al. 2017, Front Immunol — Prebiotics, synbiotic, gut microbiota, shrimp."],
              ["14", "Boyd 2004, Global Aquaculture Alliance — Sediment oxygen depletion."],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-2">
                <sup className="mt-[3px] font-jetbrains text-[10px] font-semibold text-[#86EFAC] flex-shrink-0">
                  {n}
                </sup>
                <span className="font-newsreader text-[12px] leading-[1.5] text-white/30">
                  {text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style>{`
        @keyframes acGrow {
          from { transform: scaleX(0) }
          to   { transform: scaleX(1) }
        }
      `}</style>
    </section>
  );
}
