"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/useTranslation";

interface ServiceItem {
  num: string;
  titleKey: string;
  defaultTitle: string;
  descKey: string;
  defaultDesc: string;
}

const SERVICES: ServiceItem[] = [
  {
    num: "01",
    titleKey: "ohc_service_1_title",
    defaultTitle: "Soil & Water Testing",
    descKey: "ohc_service_1_desc",
    defaultDesc: "Lab-backed nutrient and microbial health reports for every field.",
  },
  {
    num: "02",
    titleKey: "ohc_service_2_title",
    defaultTitle: "Crop Advisory",
    descKey: "ohc_service_2_desc",
    defaultDesc: "Agronomists guide you from sowing to harvest, season after season.",
  },
  {
    num: "03",
    titleKey: "ohc_service_3_title",
    defaultTitle: "Biological Inputs",
    descKey: "ohc_service_3_desc",
    defaultDesc: "Genuine Biofactor bio-fertilisers and bio-stimulants, at the right dose.",
  },
  {
    num: "04",
    titleKey: "ohc_service_4_title",
    defaultTitle: "Pest & Disease Diagnosis",
    descKey: "ohc_service_4_desc",
    defaultDesc: "Quick field diagnosis with safe, residue-free solutions.",
  },
  {
    num: "05",
    titleKey: "ohc_service_5_title",
    defaultTitle: "Training & Field Days",
    descKey: "ohc_service_5_desc",
    defaultDesc: "Hands-on demos on regenerative and sustainable practices.",
  },
  {
    num: "06",
    titleKey: "ohc_service_6_title",
    defaultTitle: "Market Linkages",
    descKey: "ohc_service_6_desc",
    defaultDesc: "Connect healthy produce to buyers who value quality.",
  },
  {
    num: "07",
    titleKey: "ohc_service_7_title",
    defaultTitle: "Pre & Post-Harvest Machinery",
    descKey: "ohc_service_7_desc",
    defaultDesc: "Access harvesters, threshers and other farm machinery on hire, before and after harvest.",
  },
  {
    num: "08",
    titleKey: "ohc_service_8_title",
    defaultTitle: "IoT & Smart Farming",
    descKey: "ohc_service_8_desc",
    defaultDesc: "Get connected to trusted IoT vendors for sensors, weather stations and farm monitoring.",
  },
  {
    num: "09",
    titleKey: "ohc_service_9_title",
    defaultTitle: "Crop Insurance",
    descKey: "ohc_service_9_desc",
    defaultDesc: "Guidance and enrolment support for crop and farm insurance schemes.",
  },
];

function ServiceCardItem({
  srv,
  isRevealed,
  delayMs,
  setRef,
}: {
  srv: ServiceItem;
  isRevealed: boolean;
  delayMs: number;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const { t } = useTranslation();
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMouse((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={setRef}
      suppressHydrationWarning
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl bg-white p-5 sm:p-6 border border-[#173522]/8 hover:border-[#3F7D4B]/40 shadow-[0_3px_16px_rgba(23,53,34,0.03)] hover:shadow-[0_20px_42px_rgba(23,53,34,0.12)] hover:-translate-y-2 hover:scale-[1.025] transition-all duration-350 ease-out cursor-pointer flex flex-col justify-start h-[175px] sm:h-[182px] overflow-hidden"
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? "scale(1) translateY(0)" : "scale(0.88) translateY(24px)",
        transitionProperty: "opacity, transform, box-shadow, border-color",
        transitionDuration: "700ms, 700ms, 350ms, 300ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: isRevealed ? `${delayMs}ms` : "0ms",
      }}
    >
      {/* Bento cursor spotlight sheen */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: mouse.active
            ? `radial-gradient(circle 220px at ${mouse.x}px ${mouse.y}px, rgba(63, 125, 75, 0.12), transparent 70%)`
            : "none",
        }}
        aria-hidden="true"
      />

      {/* Number Badge with subtle kinetic pop */}
      <div className="relative z-10 flex items-center justify-between mb-2">
        <span className="font-mono text-sm font-bold text-[#9A6B2E] tracking-wider group-hover:text-[#3F7D4B] group-hover:scale-110 transform transition-all duration-300">
          {srv.num}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#3F7D4B]/25 group-hover:bg-[#3F7D4B] group-hover:scale-150 transition-all duration-300" />
      </div>

      {/* Service Title */}
      <h3 className="relative z-10 font-serif font-bold text-[17px] sm:text-[19px] text-[#173522] leading-snug mb-2 group-hover:text-[#1d4f2f] transition-colors duration-300">
        {t(srv.titleKey, srv.defaultTitle)}
      </h3>

      {/* Service Description */}
      <p className="relative z-10 font-sans text-[13px] sm:text-[14px] text-[#173522]/75 leading-relaxed">
        {t(srv.descKey, srv.defaultDesc)}
      </p>
    </div>
  );
}

export default function OneHealthServices() {
  const { t } = useTranslation();
  const [revealedCards, setRevealedCards] = useState<boolean[]>(
    new Array(SERVICES.length).fill(false)
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((el, idx) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealedCards((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section className="relative w-full bg-[#EDF4ED] text-[#173522] pt-8 sm:pt-10 lg:pt-12 pb-16 lg:pb-24 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-30 blur-3xl -z-0"
        style={{
          background: "radial-gradient(circle, rgba(203,234,123,0.2) 0%, rgba(237,244,237,0) 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#173522]/10 text-[#173522] text-xs font-mono font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#3F7D4B] animate-pulse" />
            {t("ohc_services_eyebrow", "SERVICES")}
          </div>
          <h2 className="text-[clamp(30px,4vw,50px)] font-serif font-bold text-[#173522] leading-[1.1] tracking-tight max-w-[800px]">
            {t("ohc_services_heading", "What every centre offers")}
          </h2>
        </div>

        {/* 3x3 Grid of 9 Rectangular Service Cards with Bento Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((srv, idx) => {
            const isRevealed = revealedCards[idx];
            // Stagger animation: left-to-right cascading within rows
            const colIndex = idx % 3;
            const rowIndex = Math.floor(idx / 3);
            const delayMs = colIndex * 90 + rowIndex * 60;

            return (
              <ServiceCardItem
                key={srv.num}
                srv={srv}
                isRevealed={isRevealed}
                delayMs={delayMs}
                setRef={(el) => {
                  cardRefs.current[idx] = el;
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
