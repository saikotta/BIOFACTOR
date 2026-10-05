"use client";

import React, { useEffect, useRef, useState } from "react";
import MicrobeField3D from "./MicrobeField3D";
import { HERO_CONTENT, TILES } from "./content";

export default function ScienceHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // IntersectionObserver to pause hint animation when hero is off-screen
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsPaused(!entry.isIntersecting);
        });
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const handleTileClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: isReduced ? "auto" : "smooth" });
    }
  };

  return (
    <header
      ref={heroRef}
      className={`st-hero ${isLoaded ? "loaded" : ""} ${isPaused ? "paused" : ""}`}
      id="top"
    >
      <MicrobeField3D />

      <div className="st-hero-wrap">
        <p className="st-eyebrow">{HERO_CONTENT.eyebrow}</p>

        <h1 className="st-h1">
          <span className="st-mask">
            <span>{HERO_CONTENT.h1Line1}</span>
          </span>
          <span className="st-mask">
            <span>{HERO_CONTENT.h1Line2}</span>
          </span>
        </h1>

        <p className="st-lede">{HERO_CONTENT.lede}</p>

        <nav className="st-tiles-nav" aria-label="Technologies">
          {TILES.map((tile, index) => (
            <a
              key={tile.id}
              href={`#${tile.id}`}
              onClick={(e) => handleTileClick(e, tile.id)}
              className="st-tile group"
              style={{ "--tile-index": index } as React.CSSProperties}
            >
              <svg
                className="st-tile-ic"
                viewBox="0 0 24 24"
                dangerouslySetInnerHTML={{ __html: tile.iconSvg }}
              />
              <b className="st-tile-num">{tile.number}</b>
              <span className="st-tile-label">
                {tile.labelLines.map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </span>
            </a>
          ))}
        </nav>

        <p className="st-hint">{HERO_CONTENT.hint}</p>
      </div>

      <svg
        className="st-hz"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 40C200 0 420 70 700 36S1180 6 1440 44V90H0Z"
          fill="#C4DCC2"
          opacity="0.75"
        />
        <path
          d="M0 62C260 22 500 84 760 56S1210 30 1440 64V90H0Z"
          fill="#EDF4ED"
        />
      </svg>

      <style jsx>{`
        .st-hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          background: radial-gradient(
              60% 55% at 74% 45%,
              rgba(31, 122, 77, 0.13),
              transparent 70%
            ),
            linear-gradient(180deg, #EDF4ED, #DCEADA 80%, #D0E3CE);
        }

        .st-hero.paused .st-hint {
          animation-play-state: paused !important;
        }

        .st-hero-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
          padding-top: 104px;
          padding-bottom: 96px;
          text-align: left;
        }

        @media (min-width: 768px) {
          .st-hero-wrap {
            padding-top: 112px;
          }
        }

        @media (min-width: 1024px) {
          .st-hero-wrap {
            padding-left: 40px;
            padding-right: 40px;
          }
        }

        .st-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #1f7a4d;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .st-eyebrow::before {
          content: "";
          width: 28px;
          height: 1px;
          background: #1f7a4d;
          flex-shrink: 0;
        }

        .st-hero.loaded .st-eyebrow {
          opacity: 1;
          transform: translateY(0);
        }

        .st-h1 {
          font-size: clamp(32px, 6.2vw, 92px);
          font-weight: 600;
          line-height: 1.02;
          letter-spacing: -0.02em;
          color: #143324;
          max-width: 14ch;
          margin: 20px 0 26px;
        }

        .st-mask {
          display: block;
          overflow: hidden;
          padding-bottom: 0.12em;
        }

        .st-mask > span {
          display: block;
          transform: translateY(105%);
          transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .st-hero.loaded .st-mask > span {
          transform: translateY(0);
        }

        .st-hero.loaded .st-mask:nth-child(2) > span {
          transition-delay: 120ms;
        }

        .st-lede {
          font-size: clamp(15px, 1.2vw, 18px);
          line-height: 1.7;
          max-width: 52ch;
          color: rgba(20, 51, 36, 0.84);
          font-style: normal;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: 450ms;
        }

        .st-hero.loaded .st-lede {
          opacity: 1;
          transform: translateY(0);
        }

        .st-tiles-nav {
          margin-top: 52px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        @media (min-width: 640px) {
          .st-tiles-nav {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .st-tiles-nav {
            grid-template-columns: repeat(4, 1fr);
            gap: 14px;
          }
        }

        .st-tile {
          display: grid;
          gap: 8px;
          padding: 16px 16px 18px;
          border-radius: 18px;
          border: 1px solid rgba(31, 122, 77, 0.25);
          background: rgba(255, 255, 255, 0.62);
          color: #143324;
          text-decoration: none;
          visibility: hidden;
          scroll-margin-top: 64px;
          transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
            background 300ms, color 300ms, border-color 300ms, box-shadow 300ms;
        }

        @media (min-width: 768px) {
          .st-tile {
            scroll-margin-top: 72px;
          }
        }

        .st-hero.loaded .st-tile {
          visibility: visible;
          animation: stTileIn 800ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
          animation-delay: calc(var(--tile-index) * 80ms + 700ms);
        }

        @keyframes stTileIn {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (hover: hover) {
          .st-tile:hover {
            transform: translateY(-6px);
            background: #1f7a4d;
            color: #f6f3e9;
            border-color: #1f7a4d;
            box-shadow: 0 18px 30px -16px rgba(20, 51, 36, 0.5);
          }

          .st-tile:hover :global(.st-tile-ic *) {
            stroke: #f6f3e9 !important;
          }
        }

        .st-tile:focus-visible {
          outline: 2px solid #1f7a4d !important;
          outline-offset: 3px !important;
          box-shadow: none !important;
        }

        .st-tile-ic {
          width: 26px;
          height: 26px;
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        :global(.st-tile-ic circle) {
          stroke: #6b4226;
        }

        :global(.st-tile-ic path),
        :global(.st-tile-ic rect) {
          stroke: #1f7a4d;
        }

        .st-tile-num {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          opacity: 0.55;
        }

        .st-tile-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1.3;
        }

        .st-hint {
          margin-top: 30px;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          animation: stPulse 2.4s ease-in-out infinite;
        }

        @keyframes stPulse {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.75;
          }
        }

        .st-hz {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          width: 100%;
          height: 90px;
          display: block;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .st-eyebrow,
          .st-lede,
          .st-tile {
            opacity: 1 !important;
            transform: none !important;
            visibility: visible !important;
            transition: none !important;
            animation: none !important;
          }
          .st-mask > span {
            transform: none !important;
            transition: none !important;
          }
          .st-hint {
            animation: none !important;
            opacity: 0.75;
          }
        }
      `}</style>
    </header>
  );
}
