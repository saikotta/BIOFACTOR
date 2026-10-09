"use client";

import React, { useEffect, useRef } from "react";

const D =
  "M60 10 V190 C60 250 100 285 170 285 H340 C440 285 480 395 600 395 C720 395 760 160 880 160 C1000 160 1040 395 1160 395 C1280 395 1320 160 1420 160";
const STOP_X = [250, 600, 880, 1160, 1400];
const W = 1500;
const H = 700;

const MS = [
  ["2014", "Founded", "Biofac Inputs Private Limited"],
  ["The Platform Takes Shape", "", "Microbe & Mineral™ Is Built"],
  ["Domestic Scale", "", "200+ Products"],
  ["Beyond Bharat", "", "Malawi & Kenya"],
  ["Today", "Leadership", "350+ Microbial Strain Bank & 11 Patents"],
];

const ICONS = [
  `<g transform="translate(0 -38) scale(1.4)"><path d="M-13 9 Q0 2 13 9 L11 14 H-11Z" fill="#8a5a2b"/><path d="M0 9 V-6" stroke="#3ea34f" stroke-width="2.6" stroke-linecap="round"/><path d="M0 -1 C-10 -1 -14 -9 -12 -13 C-4 -13 0 -9 0 -1Z" fill="#4cb860"/><path d="M0 -6 C8 -6 13 -12 12 -16 C4 -16 0 -12 0 -6Z" fill="#8bd36a"/></g>`,
  `<g transform="translate(0 -38) scale(1.4)"><rect x="-12" y="10" width="24" height="4" rx="2" fill="#7b8794"/><path d="M-1 10 C10 10 12 1 7 -5" stroke="#7b8794" stroke-width="3.2" fill="none" stroke-linecap="round"/><rect x="-9" y="-14" width="8" height="19" rx="2" transform="rotate(28 -5 -4)" fill="#5b6b7d"/><rect x="-7" y="-18" width="4.5" height="5" rx="1" transform="rotate(28 -5 -4)" fill="#3a4654"/><rect x="-11" y="5" width="13" height="3" rx="1" fill="#9aa7b4"/><rect x="-8" y="5.5" width="6" height="1.6" fill="#c58bd8"/></g>`,
  `<g transform="translate(0 -38) scale(1.4)"><path d="M-3 15 C-2 5 0 -4 4 -15" stroke="#2f8a47" stroke-width="2.4" fill="none" stroke-linecap="round"/><ellipse cx="-7" cy="7" rx="3" ry="6.5" transform="rotate(-55 -7 7)" fill="#5fc15a"/><ellipse cx="-5" cy="-3" rx="3" ry="6.5" transform="rotate(-55 -5 -3)" fill="#4cb860"/><ellipse cx="-1" cy="-12" rx="2.6" ry="5.5" transform="rotate(-40 -1 -12)" fill="#7ad06a"/><ellipse cx="6" cy="6" rx="3" ry="6.5" transform="rotate(55 6 6)" fill="#7ad06a"/><ellipse cx="7" cy="-4" rx="3" ry="6.5" transform="rotate(55 7 -4)" fill="#5fc15a"/></g>`,
  `<g transform="translate(0 -38) scale(1.4)"><circle r="15" fill="#3b9ad9"/><path d="M-8 -9 Q-1 -14 5 -9 Q7 -3 0 -2 Q-7 0 -8 -9Z" fill="#6cc24a"/><path d="M4 4 Q11 3 12 8 Q8 12 3 9Z" fill="#6cc24a"/><path d="M-12 5 Q-9 3 -6 6 Q-8 11 -11 9Z" fill="#6cc24a"/><ellipse cx="-5" cy="-8" rx="4" ry="2" transform="rotate(-30 -5 -8)" fill="#fff" fill-opacity=".35"/></g>`,
  `<g transform="translate(0 -38) scale(1.4)"><path d="M-9 -14 H9 V-5 C9 1 4 4 0 4 C-4 4 -9 1 -9 -5Z" fill="#f2b21b" stroke="#c98d0a" stroke-width="1.5" stroke-linejoin="round"/><path d="M-9 -11 H-14 C-14 -4 -11 -3 -8 -3 M9 -11 H14 C14 -4 11 -3 8 -3" fill="none" stroke="#c98d0a" stroke-width="2" stroke-linecap="round"/><rect x="-2" y="4" width="4" height="6" fill="#c98d0a"/><rect x="-8" y="10" width="16" height="5" rx="2" fill="#a87a0a"/><path d="M0 -12 L1.8 -8 L6 -8 L2.7 -5.5 L4 -1.5 L0 -4 L-4 -1.5 L-2.7 -5.5 L-6 -8 L-1.8 -8Z" fill="#fff" fill-opacity=".9"/></g>`,
];

const TRAVEL = 1700;
const PAUSE = 1100;
const FIRST = 2400;
const LOOP_DELAY = 3000;

export default function AboutJourneySection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const beeRef = useRef<SVGGElement>(null);
  const nodesGRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const bee = beeRef.current;
    const nodesG = nodesGRef.current;
    const stage = stageRef.current;
    if (!line || !bee || !nodesG || !stage) return;

    line.setAttribute("d", D);
    const L = line.getTotalLength();
    const STOPS = STOP_X.map((x) => {
      let d = 0;
      while (d < L && line.getPointAtLength(d).x < x) d += 1;
      return d / L;
    });

    line.style.strokeDasharray = `${L}`;
    line.style.strokeDashoffset = `${L}`;

    const NS = "http://www.w3.org/2000/svg";
    nodesG.innerHTML = "";

    const existingCards = stage.querySelectorAll(".card-journey");
    existingCards.forEach((c) => c.remove());

    const nodeEls: SVGGElement[] = [];
    const cardEls: HTMLDivElement[] = [];

    STOPS.forEach((f, i) => {
      const p = line.getPointAtLength(f * L);
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "node-journey");
      g.setAttribute("transform", `translate(${p.x} ${p.y})`);
      g.innerHTML = `<g class="stem-journey">${ICONS[i]}</g><circle class="dot-journey" r="5" fill="#f2b21b" stroke="#eef5e6" stroke-width="2"/>`;
      nodesG.appendChild(g);
      nodeEls.push(g);

      const up = i % 2 === 0;
      const m = MS[i];
      const c = document.createElement("div");
      c.className = "card-journey " + (up ? "up" : "down");
      c.style.left = Math.min(Math.max((p.x / W) * 100, 9), 91) + "%";
      c.style.top = (p.y / H) * 100 + "%";
      c.style.transform = `translate(-50%, ${up ? "calc(-100% - 50px)" : "12px"})`;
      const metaHtml = m[1] ? `${m[0]} <i class="meta-i">•</i> ${m[1]}` : m[0];
      c.innerHTML = `<div class="card-inner"><p class="meta-journey">${metaHtml}</p><p class="ttl-journey">${m[2]}</p></div>`;
      stage.appendChild(c);
      cardEls.push(c);
    });

    function place(prog: number, bob = 0) {
      if (!line || !bee) return;
      const d = prog * L;
      const p = line.getPointAtLength(d);
      const a = line.getPointAtLength(Math.max(0, d - 2));
      const b = line.getPointAtLength(Math.min(L, d + 2));
      const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      bee.setAttribute("transform", `translate(${p.x} ${p.y + bob}) rotate(${ang})`);
      line.style.strokeDashoffset = `${L - d}`;
    }

    function reveal(n: number) {
      nodeEls.forEach((e, i) => {
        e.classList.toggle("on", i < n);
        if (cardEls[i]) cardEls[i].classList.toggle("on", i < n);
      });
    }

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
      const dur = i ? TRAVEL : FIRST;
      segs.push({ s: tt, d: dur, a: prev, b: f, n: i, p: false });
      tt += dur;
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
        reveal(5);
        place(1);
        return;
      }
      reveal(0);
      place(0);
      const t0 = performance.now();
      (function frame(now) {
        const t = Math.max(0, now - t0);
        if (t >= TOTAL) {
          place(1, Math.sin(now / 160) * 2);
          reveal(5);
          timer = setTimeout(play, LOOP_DELAY);
          return;
        }
        const s = segs.find((segItem) => t >= segItem.s && t < segItem.s + segItem.d);
        if (s) {
          const u = (t - s.s) / s.d;
          place(
            s.p ? s.b : s.a + (s.b - s.a) * ease(u),
            s.p ? Math.sin(now / 140) * 3 : Math.sin(now / 220) * 1.5
          );
          if (s.p) reveal(s.n + 1);
        }
        raf = requestAnimationFrame(frame);
      })(t0);
    }

    place(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          play();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(stage);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="w-full bg-[#eef5e6] text-[#0f3d24] py-8 sm:py-12">
      <style jsx global>{`
        .card-journey {
          position: absolute;
          width: 240px;
          text-align: center;
          z-index: 10;
        }
        .card-journey .card-inner {
          background: #ffffff;
          border-radius: 16px;
          padding: 12px 16px;
          box-shadow: 0 10px 30px -12px rgba(20, 112, 58, 0.45);
          opacity: 0;
          transform: scale(0.7);
          transition: opacity 0.45s, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .card-journey.on .card-inner {
          opacity: 1;
          transform: scale(1);
        }
        .card-journey.up .card-inner {
          transform-origin: 50% 100%;
        }
        .card-journey.down .card-inner {
          transform-origin: 50% 0;
        }
        .meta-journey {
          margin: 0;
          font-size: 13px;
          font-weight: 600;
          color: #b8820f;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .meta-i {
          font-style: normal;
          opacity: 0.5;
          color: #0f3d24;
        }
        .ttl-journey {
          margin: 4px 0 0;
          font-family: var(--font-fraunces, Georgia, serif);
          font-weight: 700;
          font-size: 16px;
          line-height: 1.25;
          word-wrap: break-word;
        }
        .wing-journey {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: flap-journey 0.09s linear infinite;
        }
        @keyframes flap-journey {
          50% {
            transform: scaleY(0.25);
          }
        }
        .stem-journey {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          transform: scale(0);
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
        }
        .node-journey.on .stem-journey {
          transform: scale(1);
        }
        .dot-journey {
          opacity: 0;
          transition: opacity 0.3s;
        }
        .node-journey.on .dot-journey {
          opacity: 1;
        }
      `}</style>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <header className="flex justify-between items-end gap-4 mt-3 mb-2">
          <div>
            <p className="text-[14px] font-bold tracking-[0.14em] uppercase text-[#14703a] mb-1.5 m-0">
              OUR JOURNEY
            </p>
            <h2 className="font-serif text-[clamp(28px,4.5vw,42px)] m-0 text-[#14703a] font-bold">
              From 2014 to Now
            </h2>
          </div>
        </header>

        <div className="overflow-x-auto overflow-y-visible pt-4 pb-10">
          <div ref={stageRef} className="relative min-w-[1000px] aspect-[1500/700]">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1500 700"
              role="img"
              aria-label="Company timeline from 2014 to today"
            >
              <path
                ref={lineRef}
                fill="none"
                stroke="#2f9a57"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <g ref={nodesGRef} />
              <g ref={beeRef}>
                <g transform="scale(1.35)">
                  <ellipse
                    className="wing-journey"
                    cx="-2"
                    cy="-11"
                    rx="7"
                    ry="9"
                    fill="#fff"
                    fillOpacity=".8"
                    stroke="#14703a"
                    strokeOpacity=".4"
                    transform="rotate(-18 -2 -2)"
                  />
                  <ellipse
                    className="wing-journey"
                    cx="5"
                    cy="-11"
                    rx="6"
                    ry="8"
                    fill="#fff"
                    fillOpacity=".65"
                    stroke="#14703a"
                    strokeOpacity=".4"
                    transform="rotate(12 5 -2)"
                  />
                  <clipPath id="bb-journey">
                    <ellipse rx="14" ry="9" />
                  </clipPath>
                  <ellipse rx="14" ry="9" fill="#f2b21b" />
                  <g clipPath="url(#bb-journey)" fill="#2a1d0a">
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
        </div>
      </div>
    </section>
  );
}
