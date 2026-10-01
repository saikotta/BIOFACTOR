"use client";

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   All animation CSS lives here so we keep the
   component fully self-contained (no extra CSS
   file needed). prefers-reduced-motion is
   handled with a media-query override block.
───────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@800&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,wght@0,400;1,400&display=swap');

  /* ── page-load animations ── */
  @keyframes eyebrow-line {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes slide-up {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes frame-rise {
    from { transform: translateY(24px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }

  /* ── always-running ── */
  @keyframes particle-fall {
    0%   { transform: translateY(0);   opacity: .9; }
    80%  { opacity: .8; }
    100% { transform: translateY(88px); opacity: 0; }
  }
  @keyframes dash-flow {
    to { stroke-dashoffset: -24; }
  }
  @keyframes bob {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-4px); }
  }
  @keyframes gas-dot-rise {
    0%   { transform: translateY(0);    opacity: .9; }
    100% { transform: translateY(-110px); opacity: 0; }
  }
  @keyframes microbe-drift {
    0%,100% { transform: translateX(0px); }
    50%     { transform: translateX(6px); }
  }
  @keyframes sludge-breathe {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-3px); }
  }

  /* ── background bubbles ── */
  @keyframes bubble-rise {
    0%   { transform: translateY(0) translateX(0); opacity: .55; }
    50%  { transform: translateY(-50vh) translateX(var(--bx)); opacity: .35; }
    100% { transform: translateY(-105vh) translateX(calc(var(--bx)*2)); opacity: 0; }
  }

  /* ── scroll-triggered ── */
  .pb-interface-line {
    stroke-dasharray: 1300;
    stroke-dashoffset: 1300;
    transition: stroke-dashoffset 2s cubic-bezier(.16,1,.3,1);
  }
  .pb-interface-line.pb-drawn { stroke-dashoffset: 0; }

  .pb-label-fade {
    opacity: 0;
    transition: opacity .6s ease;
  }
  .pb-label-fade.pb-visible { opacity: 1; }

  .pb-arrow-group {
    transform-origin: bottom center;
    transform: scaleY(0);
    transition: transform 1.6s cubic-bezier(.16,1,.3,1);
  }
  .pb-arrow-group.pb-risen { transform: scaleY(1); }

  .pb-sed-label {
    opacity: 0;
    transform: translateY(8px);
    transition: opacity .7s ease, transform .7s ease;
  }
  .pb-sed-label.pb-visible { opacity: 1; transform: translateY(0); }

  /* ── page-load ── */
  .pb-eyebrow-line {
    transform-origin: left center;
    animation: eyebrow-line .7s cubic-bezier(.16,1,.3,1) both;
  }
  .pb-h1-line1 {
    display: block; overflow: hidden;
  }
  .pb-h1-line1 span {
    display: block;
    animation: slide-up 1.1s cubic-bezier(.16,1,.3,1) both;
  }
  .pb-h1-line2 {
    display: block; overflow: hidden;
  }
  .pb-h1-line2 span {
    display: block;
    animation: slide-up 1.1s cubic-bezier(.16,1,.3,1) .14s both;
  }
  .pb-para {
    animation: fade-in .8s ease .55s both;
  }
  .pb-frame {
    animation: frame-rise .9s cubic-bezier(.16,1,.3,1) .8s both;
  }

  /* ── reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .pb-eyebrow-line,
    .pb-h1-line1 span, .pb-h1-line2 span,
    .pb-para, .pb-frame { animation: none !important; opacity: 1 !important; transform: none !important; }

    .pb-interface-line { stroke-dashoffset: 0 !important; transition: none !important; }
    .pb-label-fade, .pb-arrow-group, .pb-sed-label { opacity: 1 !important; transform: none !important; transition: none !important; }

    .pb-particle, .pb-gas-dot, .pb-microbe, .pb-sludge-crust,
    .pb-arrowhead, .pb-bubble { animation: none !important; }
    .pb-dash-line { animation: none !important; }
  }
`;

function seededRange(lo: number, hi: number, seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  const normalized = value - Math.floor(value);
  return lo + normalized * (hi - lo);
}

type Bubble = { id: number; size: number; left: number; dur: number; delay: number; bx: number };
type Particle = { id: number; cx: number; cy: number; dur: string; delay: string };

export default function BottomBlock() {
  const frameRef = useRef<HTMLDivElement>(null);
  const observed = useRef(false);
  const [bubbles, setBubbles] = useState<Bubble[] | null>(null);
  const [particles, setParticles] = useState<Particle[] | null>(null);

  // Generate random content only on the client to avoid SSR/hydration mismatch
  useEffect(() => {
    setBubbles(
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        size: seededRange(18, 60, i * 5 + 1),
        left: seededRange(0, 100, i * 5 + 2),
        dur: seededRange(9, 22, i * 5 + 3),
        delay: seededRange(-22, 0, i * 5 + 4),
        bx: seededRange(-30, 30, i * 5 + 5),
      }))
    );
    setParticles(
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        cx: 70 + i * 10 + seededRange(-4, 4, i * 4 + 1),
        cy: 60 + seededRange(-8, 8, i * 4 + 2),
        dur: `${seededRange(2.2, 4.2, i * 4 + 3).toFixed(2)}s`,
        delay: `${seededRange(-4, 0, i * 4 + 4).toFixed(2)}s`,
      }))
    );
  }, []);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    // respect reduced-motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // instantly show final state
      el.querySelectorAll<SVGElement>(
        ".pb-interface-line,.pb-label-fade,.pb-arrow-group,.pb-sed-label"
      ).forEach((n) => {
        n.classList.add("pb-drawn", "pb-visible", "pb-risen");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || observed.current) return;
        observed.current = true;

        setTimeout(() => {
          // 1. draw interface line
          el.querySelectorAll<SVGElement>(".pb-interface-line").forEach((n) =>
            n.classList.add("pb-drawn")
          );

          // 2. staggered label fades (zone labels)
          const labels = el.querySelectorAll<SVGElement>(".pb-label-fade");
          labels.forEach((n, i) => {
            setTimeout(() => n.classList.add("pb-visible"), 500 + i * 120);
          });

          // 3. arrows grow up, staggered .3s each
          const arrows = el.querySelectorAll<SVGElement>(".pb-arrow-group");
          arrows.forEach((n, i) => {
            setTimeout(() => n.classList.add("pb-risen"), 2200 + i * 300);
          });

          // 4. sediment labels slide up
          const sedLabels = el.querySelectorAll<SVGElement>(".pb-sed-label");
          sedLabels.forEach((n, i) => {
            setTimeout(() => n.classList.add("pb-visible"), 3500 + i * 200);
          });
        }, 900);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── generate gas dots per arrow ── */
  const gasArrows = [
    { x: 460, label: "NH₃ · ammonia",          id: "nh3" },
    { x: 600, label: "NO₂⁻ · nitrite",         id: "no2" },
    { x: 738, label: "H₂S · hydrogen sulphide", id: "h2s" },
  ];

  /* ── background bubbles rendered client-side only (see useState above) ── */

  return (
    <>
    <section className="relative w-full bg-[#EAF6EC] px-6 py-20 md:px-12 lg:px-20 xl:px-32 overflow-hidden">
      {/* inject styles */}
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── background ring bubbles (client-only) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {bubbles && bubbles.map((b) => (
          <div
            key={b.id}
            className="pb-bubble absolute rounded-full border-2 border-[#6bbf5a44]"
            style={{
              width: b.size,
              height: b.size,
              left: `${b.left.toFixed(4)}%`,
              bottom: "-80px",
              ["--bx" as string]: `${b.bx.toFixed(4)}px`,
              animation: `bubble-rise ${b.dur.toFixed(1)}s linear ${b.delay.toFixed(1)}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex w-full flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div
                className="pb-eyebrow-line h-[1.5px] w-7 bg-[#4b6b57]"
                style={{ transformOrigin: "left center" }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 400,
                  fontSize: "12px",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "#4b6b57",
                }}
              >
                THE POND BOTTOM
              </span>
            </div>

            <h1
              className="w-full text-left"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(44px,7.2vw,92px)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                color: "#10301f",
                margin: 0,
              }}
            >
              <span className="pb-h1-line1">
                <span>Where organic load</span>
              </span>
              <span className="pb-h1-line2">
                <span>turns into toxic gas.</span>
              </span>
            </h1>

          <p
            className="pb-para"
            style={{
              fontFamily: "'Newsreader', serif",
              fontWeight: 400,
              fontSize: "17px",
              lineHeight: 1.7,
              color: "#4b6b57",
              maxWidth: "41em",
              margin: 0,
              textAlign: "left",
            }}
          >
            Uneaten feed, faeces and dead plankton settle on the bottom every
            day. Just below the surface of that sludge there is no oxygen, and
            microbes break it down anaerobically. The by-products seep up into
            the water where the shrimp live.
          </p>
        </div>

          {/* ── THE FRAME ── */}
          <div
            ref={frameRef}
            className="pb-frame"
            style={{
              border: "1px solid #9cc7a6",
              borderRadius: "4px",
              padding: "44px",
              background: "rgba(255,255,255,0.18)",
              width: "100%",
              overflowX: "auto",
            }}
          >
            <svg
              viewBox="0 0 1092 438"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", minWidth: "480px", display: "block" }}
              aria-label="Animated cross-section of pond bottom showing organic matter settling, anaerobic sediment, and toxic gas rising"
              role="img"
            >
              <defs>
                {/* water gradient */}
                <linearGradient id="pbWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e2f3ef" />
                  <stop offset="100%" stopColor="#bfe2dd" />
                </linearGradient>
                {/* sediment gradient */}
                <linearGradient id="pbSed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3a2a1d" />
                  <stop offset="100%" stopColor="#271b13" />
                </linearGradient>
                {/* clip for sediment zone */}
                <clipPath id="pbSedClip">
                  <rect x="0" y="228" width="1092" height="210" />
                </clipPath>
                {/* arrowhead marker */}
                <marker
                  id="pbArrowPink"
                  markerWidth="8"
                  markerHeight="8"
                  refX="4"
                  refY="4"
                  orient="auto"
                >
                  <path d="M0,0 L8,4 L0,8 Z" fill="#d6456a" />
                </marker>
              </defs>

              {/* ── WATER COLUMN ── */}
              <rect x="0" y="0" width="1092" height="228" fill="url(#pbWater)" />

              {/* ── SEDIMENT ── */}
              <rect x="0" y="228" width="1092" height="210" fill="url(#pbSed)" />

              {/* ── SLUDGE CRUST (animates up/down) ── */}
              <g className="pb-sludge-crust" style={{ animation: "sludge-breathe 3.8s ease-in-out infinite" }}>
                <rect x="0" y="222" width="1092" height="12" fill="#4a3520" opacity="0.7" />
              </g>

              {/* ── SAND INTERFACE LINE (drawn in on scroll) ── */}
              <line
                className="pb-interface-line"
                x1="0" y1="228" x2="1092" y2="228"
                stroke="#c58f4a"
                strokeWidth="2.5"
              />

              {/* dotted line just below interface */}
              <line
                x1="0" y1="240" x2="1092" y2="240"
                stroke="#c58f4a"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.45"
              />

              {/* ── ZONE LABELS ── */}
              {/* Water column label */}
              <text
                className="pb-label-fade"
                x="546" y="32"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', monospace"
                fontSize="11.5"
                fontWeight="500"
                fill="#10301f"
                letterSpacing="2"
                textDecoration="none"
                style={{ textTransform: "uppercase" }}
              >
                WATER COLUMN · SHRIMP
              </text>

              {/* Interface label */}
              <text
                className="pb-label-fade"
                x="546" y="218"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', monospace"
                fontSize="11"
                fontWeight="400"
                fill="#7a5a2f"
                letterSpacing="1.8"
              >
                SOIL-WATER INTERFACE · THIN OXIDISED LAYER
              </text>

              {/* Sediment label */}
              <text
                className="pb-label-fade"
                x="546" y="420"
                textAnchor="middle"
                fontFamily="'JetBrains Mono', monospace"
                fontSize="11.5"
                fontWeight="500"
                fill="#d9a566"
                letterSpacing="2"
              >
                ANAEROBIC SEDIMENT · NO OXYGEN
              </text>

              {/* ── SETTLING PARTICLES (client-only) ── */}
              {particles && particles.map((p) => (
                <circle
                  key={p.id}
                  className="pb-particle"
                  cx={p.cx}
                  cy={p.cy}
                  r={seededRange(2.5, 4.5, p.id + 100)}
                  fill="#9a6c3e"
                  style={{
                    animation: `particle-fall ${p.dur} linear ${p.delay} infinite`,
                  }}
                />
              ))}

              {/* Settling particles label */}
              <text
                className="pb-label-fade"
                x="42" y="52"
                fontFamily="'Newsreader', serif"
                fontSize="13"
                fill="#4b6b57"
              >
                Feed, faeces, dead plankton
              </text>
              <text
                className="pb-label-fade"
                x="42" y="68"
                fontFamily="'Newsreader', serif"
                fontSize="13"
                fill="#4b6b57"
              >
                settle daily
              </text>

              {/* ── GAS ARROWS ── */}
              {gasArrows.map((a, i) => {
                const isH2S = i === 2;
                const arrowTopY = isH2S ? 42 : 68;
                const arrowBotY = 268;
                return (
                  <g key={a.id}>
                    {/* arrow shaft group – scales up from bottom */}
                    <g
                      className="pb-arrow-group"
                      style={{
                        transformOrigin: `${a.x}px ${arrowBotY}px`,
                      }}
                    >
                      {/* dashed shaft */}
                      <line
                        className="pb-dash-line"
                        x1={a.x} y1={arrowTopY + 18}
                        x2={a.x} y2={arrowBotY}
                        stroke="#d6456a"
                        strokeWidth="2"
                        strokeDasharray="6 5"
                        style={{
                          animation: "dash-flow .9s linear infinite",
                        }}
                      />
                      {/* arrowhead – bobs */}
                      <polygon
                        className="pb-arrowhead"
                        points={`${a.x - 7},${arrowTopY + 18} ${a.x + 7},${arrowTopY + 18} ${a.x},${arrowTopY}`}
                        fill="#d6456a"
                        style={{
                          animation: `bob 1.8s ease-in-out ${(i * 0.4).toFixed(1)}s infinite`,
                        }}
                      />
                    </g>

                    {/* gas dots that rise along shaft */}
                    {[0, 1, 2].map((d) => (
                      <circle
                        key={d}
                        className="pb-gas-dot"
                        cx={a.x + seededRange(-3, 3, i * 3 + d + 200)}
                        cy={arrowBotY - 20}
                        r={3}
                        fill="#d6456a"
                        opacity="0.85"
                        style={{
                          animation: `gas-dot-rise ${(1.4 + d * 0.5).toFixed(1)}s ease-in ${(d * 0.55 + i * 0.3).toFixed(2)}s infinite`,
                        }}
                      />
                    ))}

                    {/* arrow label (fades in after arrows rise) */}
                    <text
                      className="pb-label-fade"
                      x={a.x}
                      y={arrowTopY - 10}
                      textAnchor="middle"
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="11.5"
                      fontWeight="500"
                      fill="#d6456a"
                      letterSpacing="1.2"
                    >
                      {a.label}
                    </text>
                  </g>
                );
              })}

              {/* ── SEDIMENT TEXT LABELS (slide up on scroll) ── */}
              <text
                className="pb-sed-label"
                x="350" y="310"
                textAnchor="middle"
                fontFamily="'Newsreader', serif"
                fontSize="14"
                fill="rgba(255,255,255,0.82)"
                fontStyle="normal"
              >
                Organic N → ammonia
              </text>
              <text
                className="pb-sed-label"
                x="546" y="355"
                textAnchor="middle"
                fontFamily="'Newsreader', serif"
                fontSize="14"
                fill="rgba(255,255,255,0.82)"
              >
                Incomplete nitrification
              </text>
              <text
                className="pb-sed-label"
                x="760" y="310"
                textAnchor="middle"
                fontFamily="'Newsreader', serif"
                fontSize="14"
                fill="rgba(255,255,255,0.82)"
              >
                Sulphate-reducing bacteria
              </text>

              {/* ── MICROBES BOTTOM-LEFT (mint outline) ── */}
              <g className="pb-microbe" style={{ animation: "microbe-drift 5s ease-in-out infinite" }}>
                {/* pills */}
                <rect x="30" y="338" width="28" height="14" rx="7" fill="none" stroke="#a8ecc7" strokeWidth="1.5" />
                <rect x="66" y="344" width="22" height="12" rx="6" fill="none" stroke="#a8ecc7" strokeWidth="1.5" />
                {/* circles */}
                <circle cx="104" cy="350" r="7" fill="none" stroke="#a8ecc7" strokeWidth="1.5" />
                <circle cx="46" cy="362" r="5" fill="none" stroke="#a8ecc7" strokeWidth="1.5" />
                <rect x="55" y="368" width="26" height="11" rx="5.5" fill="none" stroke="#a8ecc7" strokeWidth="1.5" />

                <text
                  x="30" y="390"
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="9.5"
                  fontWeight="500"
                  fill="#a8ecc7"
                  letterSpacing="1.2"
                >
                  ANAEROBIC CONSORTIA
                </text>
                <text
                  x="30" y="403"
                  fontFamily="'Newsreader', serif"
                  fontSize="10.5"
                  fill="#a8ecc7"
                  opacity="0.75"
                >
                  digest the organic load
                </text>
              </g>

              {/* ── MICROBES BOTTOM-RIGHT (mint outline) ── */}
              <g className="pb-microbe" style={{ animation: "microbe-drift 6.5s ease-in-out .8s infinite" }}>
                <rect x="880" y="338" width="28" height="14" rx="7" fill="none" stroke="#a8ecc7" strokeWidth="1.5" />
                <circle cx="918" cy="345" r="7" fill="none" stroke="#a8ecc7" strokeWidth="1.5" />
                <rect x="930" y="342" width="22" height="12" rx="6" fill="none" stroke="#a8ecc7" strokeWidth="1.5" />
                <circle cx="966" cy="350" r="5" fill="none" stroke="#a8ecc7" strokeWidth="1.5" />
                <rect x="898" y="358" width="26" height="11" rx="5.5" fill="none" stroke="#a8ecc7" strokeWidth="1.5" />

                <text
                  x="870" y="390"
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="9.5"
                  fontWeight="500"
                  fill="#a8ecc7"
                  letterSpacing="1.2"
                >
                  DENITRIFIERS · SULPHIDE OXIDISERS
                </text>
                <text
                  x="880" y="403"
                  fontFamily="'Newsreader', serif"
                  fontSize="10.5"
                  fill="#a8ecc7"
                  opacity="0.75"
                >
                  N → N₂ gas · H₂S → sulphur
                </text>
              </g>

            </svg>
          </div>



      </div>
    </section>

    <section className="w-full bg-[#EAF6EC] px-6 py-16 text-[#10301f] md:px-12 lg:px-20 xl:px-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 md:grid-cols-12">
        <div
          role="img"
          aria-label="Pond bottom image"
          className="min-h-[280px] rounded-sm bg-[#dcecdf] bg-cover bg-center md:col-span-4"
          style={{ backgroundImage: "url('/images/aquaculture-pond-bottom.jpg')" }}
        />

        <div className="md:col-span-8">
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#5A7A5E]">
            HOW TOXINS FORM
          </p>
          <h2 className="mt-2 font-inter-tight text-[clamp(64px,8vw,96px)] font-extrabold leading-[0.88] text-[#1F8A57]">
            BOTTOM
          </h2>
          <ul className="mt-5 flex flex-col gap-2 font-mono text-[12px] leading-[1.5] tracking-[0.08em] text-[#4b6b57]">
            <li className="flex items-start gap-2">
              <span className="mt-[5px] h-[7px] w-4 shrink-0 rounded-full bg-[#B8893A]" />
              No oxygen below a few mm
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[5px] h-[7px] w-4 shrink-0 rounded-full bg-[#B8893A]" />
              Organic load builds up every day
            </li>
          </ul>

          <h2 className="mb-5 mt-10 font-inter-tight text-[clamp(24px,3vw,36px)] font-bold leading-tight text-[#10301f]">
            Three toxic metabolites, one source.
          </h2>
          <div className="grid grid-cols-1 border border-[#B8D5BF] bg-white/40 sm:grid-cols-2">
            <article className="border-b border-[#B8D5BF] p-5 sm:border-r">
              <h3 className="font-inter-tight text-[16px] font-bold text-[#10301f]">Ammonia (NH₃)</h3>
              <p className="mt-1 font-newsreader text-[15px] leading-[1.5] text-[#4b6b57]">
                Released as proteins in feed and faeces break down in the sediment.
              </p>
            </article>
            <article className="border-b border-[#B8D5BF] p-5">
              <h3 className="font-inter-tight text-[16px] font-bold text-[#10301f]">Nitrite (NO₂⁻)</h3>
              <p className="mt-1 font-newsreader text-[15px] leading-[1.5] text-[#4b6b57]">
                Accumulates when low oxygen at the bottom stops nitrification halfway.
              </p>
            </article>
            <article className="border-b border-[#B8D5BF] p-5 sm:border-b-0 sm:border-r">
              <h3 className="font-inter-tight text-[16px] font-bold text-[#10301f]">Hydrogen sulphide (H₂S)</h3>
              <p className="mt-1 font-newsreader text-[15px] leading-[1.5] text-[#4b6b57]">
                Produced by sulphate-reducing bacteria such as <em>Desulfovibrio</em> in oxygen-free sediment.
              </p>
            </article>
            <article className="p-5">
              <h3 className="font-inter-tight text-[16px] font-bold text-[#10301f]">Released upward</h3>
              <p className="mt-1 font-newsreader text-[15px] leading-[1.5] text-[#4b6b57]">
                All three diffuse into the water column, where they stress shrimp, suppress feeding and weaken immunity.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
