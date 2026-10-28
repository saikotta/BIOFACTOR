"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/useTranslation";
import { getChapterIconSvg } from "./OneHealthChapterIcon";

interface CycleNode {
  id: string;
  name: string;
}

export default function OneHealthClosing() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isHoveredRef = useRef(false);
  const angleRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const CYCLE_NODES: CycleNode[] = [
    { id: "soil",   name: t("one_health_chapter_soil_title")   },
    { id: "plant",  name: t("one_health_chapter_plant_title")  },
    { id: "animal", name: t("one_health_chapter_animal_title") },
    { id: "food",   name: t("one_health_chapter_food_title")   },
    { id: "people", name: t("one_health_chapter_people_title") },
    { id: "planet", name: t("one_health_chapter_planet_title") },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Continuous revolving orbit animation along the ellipse track
  useEffect(() => {
    if (prefersReducedMotion) return;

    let lastTime = performance.now();

    const update = (now: number) => {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      if (!isHoveredRef.current && isRevealed) {
        // Smooth revolution: complete loop every 22 seconds
        angleRef.current = (angleRef.current + dt * ((2 * Math.PI) / 22)) % (2 * Math.PI);
      }

      const curAngle = angleRef.current;

      nodeRefs.current.forEach((el, idx) => {
        if (!el) return;

        // 6 nodes spaced by 60 degrees (PI / 3)
        // Clockwise motion: Soil starts at left (PI), revolving smoothly
        const theta = Math.PI - idx * (Math.PI / 3) - curAngle;

        // Parametric coordinates along ellipse in percentages
        const xPct = 50 + 43 * Math.cos(theta);
        const yPct = 50 + 26 * Math.sin(theta);

        // 3D depth scaling and opacity
        const sinVal = Math.sin(theta);
        const scale = 0.9 + 0.16 * ((sinVal + 1) / 2);
        const opacity = 0.8 + 0.2 * ((sinVal + 1) / 2);
        const zIndex = sinVal > 0 ? 20 : 10;

        el.style.left = `${xPct}%`;
        el.style.top = `${yPct}%`;
        el.style.transform = `translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
      });

      animFrameRef.current = requestAnimationFrame(update);
    };

    animFrameRef.current = requestAnimationFrame(update);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [prefersReducedMotion, isRevealed]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#EDF4ED] text-[#173522] py-14 sm:py-18 lg:py-20 px-6 relative z-20 font-sans overflow-hidden"
    >
      {/* 1. Large Faint Outlined Ghost Text Behind Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden">
        <span
          className="font-serif font-bold text-[clamp(100px,18vw,260px)] tracking-tighter text-transparent opacity-[0.07] whitespace-nowrap"
          style={{
            WebkitTextStroke: "1px #173522",
          }}
        >
          ONE HEALTH
        </span>
      </div>

      {/* 2. Soft Radial Green Atmosphere Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none z-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(20, 122, 70, 0.12) 0%, rgba(237, 244, 237, 0) 70%)",
        }}
      />

      {/* Main Content Layout Container */}
      <div className="max-w-[840px] mx-auto text-center flex flex-col items-center relative z-10">

        {/* 4. Chain of 6 Round Photo Nodes joined by Animated Orbit Path */}
        <div
          className="w-full max-w-[780px] h-[150px] sm:h-[175px] mb-12 sm:mb-14 relative"
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
        >
          {/* Keyframe styles for orbit energy flow */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes orbitFlowPulse {
                  from { stroke-dashoffset: 0; }
                  to { stroke-dashoffset: -1000px; }
                }
              `,
            }}
          />

          {/* SVG Connecting Loop Path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
            viewBox="0 0 1000 200"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Base Pale Orbit Track */}
            <path
              d="M 70 100 C 200 48, 800 48, 930 100 C 800 152, 200 152, 70 100 Z"
              stroke="rgba(20, 122, 70, 0.22)"
              strokeWidth="2"
            />
            {/* Animated Flowing Energy Dashes */}
            <path
              d="M 70 100 C 200 48, 800 48, 930 100 C 800 152, 200 152, 70 100 Z"
              stroke="#147A46"
              strokeWidth="2.5"
              strokeDasharray="16 22"
              style={{
                animation: prefersReducedMotion
                  ? "none"
                  : "orbitFlowPulse 20s linear infinite",
              }}
            />
          </svg>

          {/* 6 Revolving Node Icons (continuous cycle around orbit) */}
          {CYCLE_NODES.map((node, idx) => {
            // Initial SSR fallback coordinates
            const thetaInit = Math.PI - idx * (Math.PI / 3);
            const xInit = 50 + 43 * Math.cos(thetaInit);
            const yInit = 50 + 26 * Math.sin(thetaInit);
            const sinInit = Math.sin(thetaInit);
            const scaleInit = 0.9 + 0.16 * ((sinInit + 1) / 2);
            const opacityInit = 0.8 + 0.2 * ((sinInit + 1) / 2);
            const zInit = sinInit > 0 ? 20 : 10;

            return (
              <div
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[idx] = el;
                }}
                className={`absolute flex flex-col items-center gap-1.5 cursor-pointer will-change-transform select-none ${
                  isRevealed || prefersReducedMotion
                    ? "opacity-100"
                    : "opacity-0 scale-75"
                }`}
                style={{
                  left: `${xInit}%`,
                  top: `${yInit}%`,
                  transform: `translate(-50%, -50%) scale(${scaleInit})`,
                  opacity: opacityInit,
                  zIndex: zInit,
                  transition: isRevealed
                    ? "opacity 0.5s ease-out, scale 0.5s ease-out"
                    : "none",
                }}
              >
                {/* SVG icon node circle (68px) with hover pop-up */}
                <div
                  className="w-13 h-13 sm:w-16 sm:h-16 shrink-0 transform transition-transform duration-300 hover:scale-115 drop-shadow-sm"
                  dangerouslySetInnerHTML={{ __html: getChapterIconSvg(node.id) }}
                />
                {/* Node Mono Label */}
                <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-widest text-[#173522]/85 uppercase select-none whitespace-nowrap bg-[#EDF4ED]/85 px-2 py-0.5 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  {node.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* 5. Main Closing Statement Paragraph with Masked Line Reveal */}
        <div className="max-w-[560px] mx-auto overflow-hidden py-1 mb-[30px]">
          <p
            className={`font-serif font-bold text-[clamp(20px,4.6vw,27px)] leading-[1.4] text-[#173522] transition-all duration-800 ease-out transform ${
              isRevealed || prefersReducedMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{
              transitionDelay: prefersReducedMotion ? "0ms" : "750ms",
            }}
          >
            {t("one_health_closing_statement")}
          </p>
        </div>

        {/* 6. Action Link Button with Hover Sweep & Lift */}
        <Link
          href="/"
          className="group relative font-mono text-[11.5px] px-[22px] py-[14px] rounded-[3px] bg-[#173522] text-[#EDE9DA] inline-flex items-center gap-2 overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-[3px] uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#147A46] focus:ring-offset-2"
        >
          {/* Hover Sweep Green Fill Slide */}
          <span className="absolute inset-0 bg-[#147A46] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out pointer-events-none" />

          {/* Button Text & Arrow */}
          <span className="relative z-10 flex items-center gap-2">
            {t("one_health_see_verticals")}
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>

        {/* 7. Footer Brand Strip with Thin Gradient Hairline Above It */}
        <div className="w-full mt-16 text-center relative pt-6">
          {/* Gradient Hairline */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[1px] bg-gradient-to-r from-transparent via-[#100E0B]/20 to-transparent" />

          <p className="font-mono text-[10px] tracking-[0.06em] uppercase text-[#6B4226]">
            BIOFACTOR BIOLOGICALS® — MICROBE · MINERAL · METABIOME · ONE HEALTH
          </p>
        </div>

      </div>
    </section>
  );
}
