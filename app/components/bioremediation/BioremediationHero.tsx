"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import GrowingBars from "./GrowingBars";

interface StatItemProps {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  source: string;
  citationId: number;
  delay?: number;
}

function StatCard({ value, suffix = "", decimals = 0, label, source, citationId, delay = 0 }: StatItemProps) {
  const [currentVal, setCurrentVal] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const duration = 1600; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCurrentVal(progress * value);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCurrentVal(value);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timer);
  }, [hasStarted, value, delay]);

  const displayString =
    decimals > 0
      ? currentVal.toFixed(decimals)
      : Math.round(currentVal).toString();

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg p-6 sm:p-7 md:p-8 border border-black/8 border-t-4 border-t-[#6BBF3A] shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300"
    >
      <div>
        <div className="font-[family-name:var(--font-bricolage)] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#6BBF3A] tracking-tight leading-none mb-3">
          {displayString}
          <span className="text-3xl sm:text-4xl lg:text-5xl ml-1 font-bold">{suffix}</span>
        </div>
        <p className="text-[#223328] text-sm sm:text-base leading-relaxed font-normal">
          {label}
        </p>
      </div>
      <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between">
        <span className="font-[family-name:var(--font-jetbrains)] text-[11px] sm:text-xs text-[#B8893A] tracking-wider uppercase font-semibold">
          {source}
        </span>
        <a
          href={`#ref-${citationId}`}
          className="font-[family-name:var(--font-jetbrains)] text-[11px] text-[#6BBF3A] hover:underline font-mono"
          title={`Jump to Reference [${citationId}]`}
        >
          [{citationId}]
        </a>
      </div>
    </div>
  );
}

export default function BioremediationHero() {
  const [inView, setInView] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="w-full pt-8 pb-12 sm:pb-16 px-6 sm:px-10 md:px-14 lg:px-20 max-w-[1400px] mx-auto"
    >
      {/* Top Bar with Navigation Back Button & Brand Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-black/8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6BBF3A] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#59A62E] hover:-translate-y-0.5 transition-all duration-200 shadow-xs hover:shadow-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Main Page
        </Link>

        {/* Brand stream badge */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#6BBF3A] animate-pulse" />
          <span className="font-[family-name:var(--font-jetbrains)] text-[11px] sm:text-xs uppercase tracking-widest text-[#B8893A] font-medium">
            Biofactor Biological Intelligence • Water Treatment
          </span>
        </div>
      </div>

      {/* Hero Content Container */}
      <div
        className={`transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Eyebrow & Hero Growing Bars */}
        <div className="flex items-center justify-between gap-6 mb-4">
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-jetbrains)] text-xs sm:text-sm uppercase tracking-[0.25em] text-[#B8893A] font-semibold">
              BIOREMEDIATION
            </span>
            <span className="h-px w-10 sm:w-16 bg-[#B8893A]/30" />
          </div>

          {/* Hero Bars Graphic from Logo (Grows Upward on Load) */}
          <GrowingBars size="md" />
        </div>

        {/* Primary Headline with Green Accent */}
        <h1 className="font-[family-name:var(--font-bricolage)] text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-extrabold uppercase tracking-tight text-[#111111] leading-[0.92] max-w-[16ch] mb-8">
          BIOLOGY THAT{" "}
          <span className="text-[#6BBF3A] inline-block">CLEANS</span>{" "}
          WATER.
        </h1>

        {/* Italic Serif Subline */}
        <p className="font-[family-name:var(--font-newsreader)] italic text-2xl sm:text-3xl md:text-4xl text-[#111111] leading-[1.25] max-w-3xl mb-12 sm:mb-16">
          Every sewage plant, septic tank and effluent pond already depends on
          microbes. The question is whether they are the right ones, doing enough
          of the work.
        </p>

        {/* Three Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          <StatCard
            value={3.4}
            decimals={1}
            suffix=" bn"
            label="people affected by poor water quality globally today [1]"
            source="UN-WATER, 2021"
            citationId={1}
            delay={100}
          />
          <StatCard
            value={14}
            label="countries with more than one-third of their freshwater resources severely stressed. Nine of the world's ten are in Asia/Africa [2]"
            source="WHO / UNICEF, 2021"
            citationId={2}
            delay={250}
          />
          <StatCard
            value={56}
            suffix="%"
            label="of household wastewater collected globally receives at least secondary treatment. The rest is discharged into waterways untreated [3]"
            source="UNESCO / WWAP, 2017"
            citationId={3}
            delay={400}
          />
        </div>

        {/* Hero Intro Paragraph */}
        <div className="max-w-4xl bg-white/70 backdrop-blur-xs rounded-xl p-6 sm:p-8 border border-black/6 shadow-xs">
          <p className="text-[#223328] text-base sm:text-lg md:text-xl leading-relaxed">
            The gap between what our plants treat and what we leave to decay in
            rivers, lakes and open streams.{" "}
            <span className="text-[#6BBF3A] font-semibold">
              Microbes are the workhorses that clean: they break down organic
              load, remove nitrogen, decolorize dyes and toxicants, remake it to
              less harmful forms.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
