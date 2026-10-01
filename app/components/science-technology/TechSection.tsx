"use client";

import React, { useEffect, useRef, useState } from "react";

const STOPS = [
  "#EDF4ED",
  "#E8EDD8",
  "#E3E1C4",
  "#DDD2B0",
  "#D6C59F",
  "#CDB68C",
  "#EDE9DA",
];

interface ParallaxItem {
  ghost: HTMLElement;
  bg: HTMLElement;
  section: HTMLElement;
}

type ScrollCallback = () => void;

const parallaxEntries = new Set<ParallaxItem>();
const scrollCallbacks = new Set<ScrollCallback>();
let isScrollListening = false;
let rafPending = false;

function updateParallax() {
  rafPending = false;
  const ih = window.innerHeight;
  parallaxEntries.forEach(({ ghost, bg, section }) => {
    const r = section.getBoundingClientRect();
    const ty = -(r.top + r.height / 2 - ih / 2) * 0.16;
    ghost.style.transform = `translateY(${ty}px)`;
    bg.style.transform = `translateY(${ty}px)`;
  });
  scrollCallbacks.forEach((cb) => cb());
}

function onScroll() {
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(updateParallax);
  }
}

function ensureScrollListener() {
  if (!isScrollListening && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    isScrollListening = true;
    window.addEventListener("scroll", onScroll, { passive: true });
    updateParallax();
  }
}

function checkScrollListenerTeardown() {
  if (parallaxEntries.size === 0 && scrollCallbacks.size === 0 && isScrollListening) {
    isScrollListening = false;
    window.removeEventListener("scroll", onScroll);
  }
}

function registerParallax(item: ParallaxItem) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  parallaxEntries.add(item);
  ensureScrollListener();
}

function unregisterParallax(item: ParallaxItem) {
  parallaxEntries.delete(item);
  checkScrollListenerTeardown();
}

export function subscribeSharedScroll(cb: ScrollCallback): () => void {
  scrollCallbacks.add(cb);
  ensureScrollListener();
  cb();
  return () => {
    scrollCallbacks.delete(cb);
    checkScrollListenerTeardown();
  };
}

export interface TechSectionProps {
  index: number;
  id: string;
  label: string;
  title: string;
  body: string;
  icon: string;
  chain?: string[];
  children?: React.ReactNode;
}

export default function TechSection({
  index,
  id,
  label,
  title,
  body,
  icon,
  chain,
  children,
}: TechSectionProps) {
  const [isIn, setIsIn] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<HTMLDivElement>(null);

  // 1. One-time reveal IntersectionObserver
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setIsIn(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIn(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.22 }
    );

    observer.observe(sec);
    return () => observer.disconnect();
  }, []);

  // 2. Parallax registration
  useEffect(() => {
    const sec = sectionRef.current;
    const ghost = ghostRef.current;
    const bg = bgRef.current;

    if (!sec || !ghost || !bg) return;

    const item: ParallaxItem = { ghost, bg, section: sec };
    registerParallax(item);

    return () => unregisterParallax(item);
  }, []);

  // 3. Off-screen visual panel pausing observer
  useEffect(() => {
    const pan = panRef.current;
    if (!pan) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const svgList = entry.target.querySelectorAll("svg");
          if (!entry.isIntersecting) {
            entry.target.classList.add("paused");
            svgList.forEach((svg: SVGElement) => {
              if (typeof (svg as unknown as { pauseAnimations: () => void }).pauseAnimations === "function") {
                (svg as unknown as { pauseAnimations: () => void }).pauseAnimations();
              }
            });
          } else {
            entry.target.classList.remove("paused");
            svgList.forEach((svg: SVGElement) => {
              if (typeof (svg as unknown as { unpauseAnimations: () => void }).unpauseAnimations === "function") {
                (svg as unknown as { unpauseAnimations: () => void }).unpauseAnimations();
              }
            });
          }
        });
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(pan);
    return () => observer.disconnect();
  }, []);

  const numStr = String(index + 1).padStart(2, "0");
  const words = title.split(" ");
  const stopStart = STOPS[index] || STOPS[0];
  const stopEnd = STOPS[index + 1] || STOPS[1];

  return (
    <section
      ref={sectionRef}
      id={id}
      data-i={index}
      className={`s ${index % 2 === 1 ? "rev" : ""} ${isIn ? "in" : ""}`}
      style={{
        background: `linear-gradient(180deg, ${stopStart}, ${stopEnd})`,
      }}
    >
      <div
        ref={bgRef}
        className="bg"
        style={{ "--k": index } as React.CSSProperties}
      />

      <div className="wrap">
        <div className="txt">
          <div ref={ghostRef} className="ghost" aria-hidden="true">
            {numStr}
          </div>

          <div className="tile">
            <svg
              className="ic"
              viewBox="0 0 24 24"
              dangerouslySetInnerHTML={{ __html: icon }}
            />
          </div>

          <p className="eyebrow fade">{label}</p>

          <h2>
            {words.map((word, k) => (
              <span key={k} className="w">
                <i style={{ "--i": k } as React.CSSProperties}>{word}</i>
              </span>
            ))}
          </h2>

          <p className="body fade d1">{body}</p>

          {chain && chain.length > 0 && (
            <div className="chain">
              <b style={{ "--i": 0 } as React.CSSProperties}>{chain[0]}</b>
              {chain.slice(1).map((c, k) => (
                <span key={k} className="chain-unit">
                  <u style={{ "--i": k } as React.CSSProperties}>→</u>
                  <b style={{ "--i": k + 1 } as React.CSSProperties}>{c}</b>
                </span>
              ))}
            </div>
          )}
        </div>

        <div ref={panRef} className="pan" aria-hidden="true">
          {children}
        </div>
      </div>

      <style jsx>{`
        .s {
          position: relative;
          isolation: isolate;
          overflow-x: clip;
          padding: 80px 0;
          scroll-margin-top: 64px;
        }

        @media (min-width: 768px) {
          .s {
            scroll-margin-top: 72px;
          }
        }

        @media (min-width: 1024px) {
          .s {
            padding: 110px 0;
          }
        }

        .bg {
          position: absolute;
          inset: -120px 0;
          z-index: -2;
          pointer-events: none;
          opacity: calc(0.35 + var(--k, 0) * 0.13);
          background: radial-gradient(
              circle at 12% 30%,
              rgba(107, 66, 38, 0.14) 0 6px,
              transparent 7px
            ),
            radial-gradient(
              circle at 80% 70%,
              rgba(107, 66, 38, 0.1) 0 11px,
              transparent 12px
            ),
            radial-gradient(
              circle at 55% 15%,
              rgba(31, 122, 77, 0.12) 0 4px,
              transparent 5px
            ),
            radial-gradient(
              circle at 30% 85%,
              rgba(139, 94, 52, 0.12) 0 8px,
              transparent 9px
            );
          background-size: 230px 230px, 370px 370px, 170px 170px, 300px 300px;
          will-change: transform;
        }

        .wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          gap: 36px;
          align-items: center;
          position: relative;
        }

        @media (min-width: 1024px) {
          .wrap {
            padding: 0 40px;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
            gap: 72px;
          }
          .s.rev .txt {
            order: 2;
          }
        }

        .txt {
          position: relative;
        }

        .ghost {
          position: absolute;
          right: 0;
          top: -80px;
          z-index: -1;
          font-size: clamp(120px, 14vw, 210px);
          font-weight: 700;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1.4px rgba(31, 122, 77, 0.22);
          pointer-events: none;
          will-change: transform;
        }

        .tile {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(31, 122, 77, 0.25);
          display: grid;
          place-items: center;
          margin-bottom: 22px;
        }

        .ic {
          width: 30px;
          height: 30px;
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        :global(.ic circle) {
          stroke: #6b4226;
        }

        :global(.ic path),
        :global(.ic rect),
        :global(.ic polygon) {
          stroke: #1f7a4d;
        }

        :global(.ic *) {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset 1.3s ease 0.3s;
        }

        :global(.s.in .ic *) {
          stroke-dashoffset: 0;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #1f7a4d;
        }

        .eyebrow::before {
          content: "";
          width: 28px;
          height: 1px;
          background: #1f7a4d;
          flex-shrink: 0;
        }

        h2 {
          font-size: clamp(28px, 3.4vw, 46px);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.018em;
          margin: 14px 0 20px;
          max-width: 16ch;
          color: #143324;
        }

        .w {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          padding-bottom: 0.12em;
          margin-right: 0.26em;
        }

        .w > i {
          display: inline-block;
          font-style: normal;
          transform: translateY(108%);
          transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: calc(var(--i) * 55ms);
        }

        :global(.s.in) .w > i {
          transform: translateY(0);
        }

        .body {
          font-size: clamp(15px, 1.2vw, 18px);
          line-height: 1.7;
          max-width: 46ch;
          opacity: 0.84;
          color: #143324;
        }

        .fade {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        :global(.s.in) .fade {
          opacity: 1;
          transform: none;
        }

        :global(.s.in) .fade.d1 {
          transition-delay: 0.25s;
        }

        .chain {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          margin-top: 26px;
          font-size: 12px;
          font-weight: 500;
        }

        .chain-unit {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .chain b {
          font-weight: 500;
          padding: 7px 12px;
          border-radius: 999px;
          border: 1px solid rgba(31, 122, 77, 0.35);
          background: rgba(255, 255, 255, 0.6);
          color: #143324;
          opacity: 0;
          transform: scale(0.85);
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s;
          transition-delay: calc(var(--i) * 0.18s + 0.5s);
          font-size: 12px;
        }

        .chain-unit b {
          font-weight: 500;
          padding: 7px 12px;
          border-radius: 999px;
          border: 1px solid rgba(31, 122, 77, 0.35);
          background: rgba(255, 255, 255, 0.6);
          color: #143324;
          opacity: 0;
          transform: scale(0.85);
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s;
          transition-delay: calc(var(--i) * 0.18s + 0.5s);
          font-size: 12px;
        }

        .chain-unit:last-child b {
          background: #1f7a4d;
          color: #f6f3e9;
          border-color: #1f7a4d;
        }

        .chain u {
          text-decoration: none;
          color: #1f7a4d;
          font-weight: 700;
          opacity: 0;
          transition: opacity 0.4s calc(var(--i) * 0.18s + 0.65s);
        }

        :global(.s.in) .chain b,
        :global(.s.in) .chain-unit b {
          opacity: 1;
          transform: none;
        }

        :global(.s.in) .chain u {
          opacity: 1;
        }

        .pan {
          position: relative;
          height: clamp(320px, 40vw, 480px);
          border-radius: 32px;
          overflow: hidden;
          background: radial-gradient(90% 90% at 30% 20%, #fbf8ee, #e4ebd9);
          border: 1px solid rgba(31, 122, 77, 0.18);
          box-shadow: 0 30px 60px -30px rgba(20, 51, 36, 0.35);
          clip-path: inset(12% 8% 12% 8% round 32px);
          opacity: 0;
          transition: clip-path 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.15s,
            opacity 0.8s 0.15s;
        }

        .pan.paused :global(*) {
          animation-play-state: paused !important;
        }

        :global(.s.in) .pan {
          clip-path: inset(0 round 32px);
          opacity: 1;
        }

        :global(.pan svg) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        :global(svg text) {
          font: 600 11px Poppins, system-ui, sans-serif;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          fill: #143324;
        }

        :global(.ln) {
          fill: none;
          stroke: #1f7a4d;
          stroke-width: 1.6;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset 1.6s ease 0.5s;
        }

        :global(.s.in .ln) {
          stroke-dashoffset: 0;
        }

        :global(.rp) {
          transform-box: fill-box;
          transform-origin: center;
          animation: rp2 2.4s ease-out infinite;
        }

        @keyframes rp2 {
          0% {
            transform: scale(0.7);
            opacity: 0.7;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        :global(.bb) {
          transform-box: fill-box;
          transform-origin: center;
          animation: br 4s ease-in-out infinite;
        }

        @keyframes br {
          50% {
            transform: scale(1.08) rotate(6deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fade,
          .chain b,
          .chain-unit b,
          .chain u,
          .pan {
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
            transition: none !important;
          }
          .w > i {
            transform: none !important;
            transition: none !important;
          }
          :global(.ic *),
          :global(.ln) {
            stroke-dashoffset: 0 !important;
            transition: none !important;
          }
          :global(.rp),
          :global(.bb) {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
