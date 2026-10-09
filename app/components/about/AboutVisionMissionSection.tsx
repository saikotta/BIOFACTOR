"use client";

import React, { useEffect, useRef } from "react";

const CHAIN = [
  ["Soil", "🌱"],
  ["Crops", "🌾"],
  ["Water", "💧"],
  ["Shrimp ponds", "🦐"],
  ["Poultry", "🐔"],
  ["Animals", "🐄"],
  ["Human health", "PERSON"]
];

const PTS: [number, number][] = [
  [230, 130],
  [580, 215],
  [230, 300],
  [580, 385],
  [230, 470],
  [580, 555],
  [400, 690]
];

const TRAVEL = 1100;
const PAUSE = 450;
const FIRST = 900;
const LOOP_DELAY = 3000;

export default function AboutVisionMissionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const beeRef = useRef<SVGGElement>(null);
  const nodesGRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const track = trackRef.current;
    const bee = beeRef.current;
    const nodesG = nodesGRef.current;
    if (!line || !track || !bee || !nodesG) return;

    const seg = (a: [number, number], b: [number, number]) => {
      const m = (a[0] + b[0]) / 2;
      return `C${m} ${a[1]} ${m} ${b[1]} ${b[0]} ${b[1]}`;
    };

    let d = `M${PTS[0][0]} ${PTS[0][1]}`;
    PTS.slice(1).forEach((p, i) => (d += seg(PTS[i], p)));

    line.setAttribute("d", d);
    track.setAttribute("d", d);

    const L = line.getTotalLength();
    line.style.strokeDasharray = `${L}`;
    line.style.strokeDashoffset = `${L}`;

    const NS = "http://www.w3.org/2000/svg";
    const tmp = document.createElementNS(NS, "path");
    let acc = 0;
    const STOPS: number[] = [0];
    PTS.slice(1).forEach((p, i) => {
      tmp.setAttribute("d", `M${PTS[i][0]} ${PTS[i][1]}${seg(PTS[i], p)}`);
      acc += tmp.getTotalLength();
      STOPS.push(acc);
    });

    const total = STOPS[STOPS.length - 1];
    for (let i = 0; i < STOPS.length; i++) {
      STOPS[i] = STOPS[i] / total;
    }

    nodesG.innerHTML = "";
    const PERSON = `<g transform="translate(0 2) scale(1.3)"><circle cx="0" cy="-14" r="8.5" fill="#f1c19b"/><path d="M-17 20 C-17 2 -10 -3 0 -3 C10 -3 17 2 17 20Z" fill="#2f9a57"/><path d="M0 16 C-11 8 -7 0 0 5 C7 0 11 8 0 16Z" fill="#e8453c"/></g>`;

    const nodeEls = CHAIN.map(([name, emoji], i) => {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "node-chain");
      g.setAttribute("transform", `translate(${PTS[i][0]} ${PTS[i][1]})`);
      g.innerHTML = `<circle class="ring-chain" r="40"/><g class="pop-chain"><circle class="disc-chain" r="36"/>${
        emoji === "PERSON"
          ? PERSON
          : `<text text-anchor="middle" dominant-baseline="central" font-size="38">${emoji}</text>`
      }</g><text class="lab-chain" y="68" text-anchor="middle">${name}</text>`;
      nodesG.appendChild(g);
      return g;
    });

    function place(prog: number, bob = 0) {
      if (!line || !bee) return;
      const dd = prog * L;
      const p = line.getPointAtLength(dd);
      const a = line.getPointAtLength(Math.max(0, dd - 2));
      const b = line.getPointAtLength(Math.min(L, dd + 2));
      const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      const flip = Math.cos((ang * Math.PI) / 180) < 0 ? -1 : 1;
      bee.setAttribute(
        "transform",
        `translate(${p.x} ${p.y + bob}) rotate(${ang}) scale(1 ${flip})`
      );
      line.style.strokeDashoffset = `${L - dd}`;
    }

    const reveal = (n: number) =>
      nodeEls.forEach((e, i) => e.classList.toggle("on", i < n));
    const ease = (u: number) => 0.5 - Math.cos(Math.PI * u) / 2;

    const segs: Array<{
      s: number;
      d: number;
      a: number;
      b: number;
      n: number;
      p: boolean;
    }> = [];
    let tt = 0;
    let prev = 0;

    STOPS.forEach((f, i) => {
      if (i === 0) {
        segs.push({ s: 0, d: FIRST, a: 0, b: 0, n: 0, p: true });
        tt = FIRST;
        return;
      }
      segs.push({ s: tt, d: TRAVEL, a: prev, b: f, n: i, p: false });
      tt += TRAVEL;
      segs.push({ s: tt, d: PAUSE, a: f, b: f, n: i, p: true });
      tt += PAUSE;
      prev = f;
    });

    const TOTAL = tt;
    let raf = 0;
    let timer: NodeJS.Timeout;

    function play() {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        reveal(CHAIN.length);
        place(1);
        return;
      }
      reveal(0);
      place(0);
      if (bee) bee.style.opacity = "1";
      const t0 = performance.now();
      (function frame(now) {
        const t = Math.max(0, now - t0);
        if (t >= TOTAL) {
          place(1);
          if (bee) bee.style.opacity = "0";
          reveal(CHAIN.length);
          timer = setTimeout(play, LOOP_DELAY);
          return;
        }
        const s = segs.find((segItem) => t >= segItem.s && t < segItem.s + segItem.d);
        if (s) {
          const u = (t - s.s) / s.d;
          place(s.p ? s.b : s.a + (s.b - s.a) * ease(u), Math.sin(now / 200) * 2);
          if (s.p) reveal(s.n + 1);
        }
        raf = requestAnimationFrame(frame);
      })(t0);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          play();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="w-full bg-[#e6fbc9] text-[#14210f] font-sans">
      <style jsx global>{`
        .track-chain {
          fill: none;
          stroke: #bff58a;
          stroke-opacity: 0.14;
          stroke-width: 5;
          stroke-linecap: round;
        }
        .line-chain {
          fill: none;
          stroke: #9be564;
          stroke-width: 5;
          stroke-linecap: round;
        }
        .pop-chain {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          transform: scale(0.8);
          opacity: 0.3;
          transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s;
        }
        .node-chain.on .pop-chain {
          transform: scale(1);
          opacity: 1;
        }
        .disc-chain {
          fill: #0b3d12;
          stroke: #9be564;
          stroke-opacity: 0.5;
          stroke-width: 2;
        }
        .node-chain.on .disc-chain {
          fill: #e9fbd2;
          stroke-opacity: 1;
        }
        .ring-chain {
          fill: none;
          stroke: #f2b21b;
          stroke-width: 3;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }
        .node-chain.on .ring-chain {
          animation: pulse-chain 1.2s ease-out;
        }
        @keyframes pulse-chain {
          0% {
            opacity: 0.9;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }
        .lab-chain {
          font: 600 16px Poppins, system-ui, sans-serif;
          fill: #d6f5b5;
          opacity: 0.45;
          transition: opacity 0.4s, fill 0.4s;
        }
        .node-chain.on .lab-chain {
          opacity: 1;
          fill: #fff;
        }
        .wing-chain {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: flap-chain 0.08s linear infinite;
        }
        @keyframes flap-chain {
          50% {
            transform: scaleY(0.25);
          }
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px] items-stretch">
        {/* LEFT PANEL: ANIMATED CHAIN SCENE */}
        <div
          ref={containerRef}
          className="relative overflow-hidden min-h-[480px] lg:min-h-[640px] bg-[linear-gradient(160deg,#052b01_0%,#082800_50%,#0d2e00_100%)]"
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 800 780"
            preserveAspectRatio="xMidYMid meet"
          >
            <path ref={trackRef} className="track-chain" />
            <path ref={lineRef} className="line-chain" />
            <g ref={nodesGRef} />
            <g ref={beeRef}>
              <g transform="scale(1.7)">
                <g transform="rotate(-18 -2 -2)">
                  <ellipse
                    className="wing-chain"
                    cx="-2"
                    cy="-11"
                    rx="7"
                    ry="9"
                    fill="#fff"
                    fillOpacity=".85"
                    stroke="#14703a"
                    strokeOpacity=".4"
                  />
                </g>
                <g transform="rotate(12 5 -2)">
                  <ellipse
                    className="wing-chain"
                    cx="5"
                    cy="-11"
                    rx="6"
                    ry="8"
                    fill="#fff"
                    fillOpacity=".7"
                    stroke="#14703a"
                    strokeOpacity=".4"
                  />
                </g>
                <clipPath id="bb-vision">
                  <ellipse rx="14" ry="9" />
                </clipPath>
                <ellipse rx="14" ry="9" fill="#f2b21b" />
                <g clipPath="url(#bb-vision)" fill="#2a1d0a">
                  <rect x="-8" y="-10" width="4" height="20" />
                  <rect x="0" y="-10" width="4" height="20" />
                </g>
                <path
                  d="M-14 0L-20 0"
                  stroke="#2a1d0a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="14" cy="-1" r="6" fill="#2a1d0a" />
                <circle cx="16" cy="-3" r="1.4" fill="#fff" />
                <path
                  d="M16 -6Q20 -12 24 -11M13 -6Q15 -13 19 -13"
                  stroke="#2a1d0a"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* RIGHT PANEL: VISION & MISSION TEXT */}
        <div className="self-center px-6 sm:px-12 lg:px-16 py-14 max-w-[640px]">
          <p className="m-0 mb-2 text-[14px] font-semibold text-[#14602b] tracking-[0.02em]">
            Vision
          </p>
          <h2 className="m-0 mb-5 text-[clamp(32px,3.6vw,48px)] leading-[1.12] font-bold text-[#14602b]">
            A World Powered by Biological Intelligence
          </h2>
          <p className="m-0 text-[clamp(16px,1.25vw,18px)] leading-[1.75] text-[#14210f]">
            Life on Earth began when chemistry turned into biology. We believe
            farming&apos;s future works the same way &mdash; chemistry and
            biology working together, everywhere farming happens.
          </p>

          <p className="m-0 mt-14 mb-2 text-[14px] font-semibold text-[#14602b] tracking-[0.02em]">
            Mission
          </p>
          <p className="m-0 text-[clamp(16px,1.25vw,18px)] leading-[1.75] text-[#14210f]">
            Our mission goes beyond farming. We build biological intelligence
            into every living system we touch &mdash; soil, water, crops, shrimp
            ponds, poultry, animals, even polluted lakes &mdash; because soil,
            animal, and human health are all part of the same chain. Wherever
            that chain runs, we want biology working alongside chemistry, not left
            out of it.
          </p>
        </div>
      </div>
    </section>
  );
}
