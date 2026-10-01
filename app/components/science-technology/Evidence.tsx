"use client";

import React, { useEffect, useRef, useState } from "react";
import { EVIDENCE_CONTENT } from "./content";

export default function Evidence() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isIn, setIsIn] = useState(false);
  const [counts, setCounts] = useState<string[]>(["9", "2", "60+"]);

  // 1. Reveal observer for title & stats fade-in
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

  // 2. Count-up animation when stats grid is 40% visible
  useEffect(() => {
    const statsEl = statsRef.current;
    if (!statsEl) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    let rafId = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();

            // Set initial start count to 0 right before animation
            setCounts(["0", "0", "0"]);
            const startTime = performance.now();
            const duration = 1600;

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const k = Math.min(1, elapsed / duration);
              const easeK = 1 - Math.pow(1 - k, 3);

              const c1 = Math.round(EVIDENCE_CONTENT.stats[0].to * easeK);
              const c2 = Math.round(EVIDENCE_CONTENT.stats[1].to * easeK);
              const c3 = Math.round(EVIDENCE_CONTENT.stats[2].to * easeK);

              const suf3 = k >= 1 ? EVIDENCE_CONTENT.stats[2].suffix || "" : "";

              setCounts([`${c1}`, `${c2}`, `${c3}${suf3}`]);

              if (k < 1) {
                rafId = requestAnimationFrame(animate);
              }
            };

            rafId = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(statsEl);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const titleWords = EVIDENCE_CONTENT.title.split(" ");

  return (
    <>
      <section
        ref={sectionRef}
        id="evidence"
        className={`proof ${isIn ? "in" : ""}`}
      >
        <div className="wrap">
          <p className="eyebrow fade">{EVIDENCE_CONTENT.eyebrow}</p>

          <h2>
            {titleWords.map((word: string, k: number) => (
              <span key={k} className="w">
                <i style={{ "--i": k } as React.CSSProperties}>{word}</i>
              </span>
            ))}
          </h2>

          <div ref={statsRef} className="stats">
            {EVIDENCE_CONTENT.stats.map((stat: { to: number; label: string; suffix?: string }, i: number) => {
              const delays = ["0.25s", "0.45s", "0.6s"];
              const finalVal = `${stat.to}${stat.suffix || ""}`;
              return (
                <div
                  key={stat.label}
                  className="stat fade"
                  style={{ transitionDelay: delays[i] } as React.CSSProperties}
                >
                  <div className="num" aria-label={finalVal}>
                    {counts[i]}
                  </div>
                  <span className="lbl">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div role="contentinfo" className="closing-strip">
        {EVIDENCE_CONTENT.closing}
      </div>

      <style jsx>{`
        .proof {
          background: #ede9da;
          padding: 120px 0 100px;
          position: relative;
        }

        @media (max-width: 767px) {
          .proof {
            padding: 80px 0 72px;
          }
        }

        .wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (min-width: 1024px) {
          .wrap {
            padding: 0 40px;
          }
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
          font-size: clamp(28px, 4vw, 54px);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.018em;
          max-width: 22ch;
          color: #143324;
          margin: 14px 0 20px;
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

        :global(.proof.in) .w > i {
          transform: translateY(0);
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 40px;
          margin-top: 56px;
        }

        .stat {
          position: relative;
          padding-top: 18px;
        }

        .stat::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          height: 2px;
          background: #1f7a4d;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
        }

        :global(.proof.in) .stat::before {
          transform: scaleX(1);
        }

        .num {
          font-size: clamp(64px, 9vw, 128px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.03em;
          color: #143324;
        }

        .lbl {
          display: block;
          margin-top: 12px;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.7;
          max-width: 26ch;
          line-height: 1.5;
          color: #143324;
        }

        .fade {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        :global(.proof.in) .fade {
          opacity: 1;
          transform: none;
        }

        .closing-strip {
          background: #ede9da;
          text-align: center;
          padding: 34px 24px 48px;
          border-top: 1px solid rgba(31, 122, 77, 0.2);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: #1f7a4d;
          text-transform: uppercase;
          max-width: 100%;
          overflow-wrap: break-word;
        }

        @media (prefers-reduced-motion: reduce) {
          .fade,
          .stat::before {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .w > i {
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
