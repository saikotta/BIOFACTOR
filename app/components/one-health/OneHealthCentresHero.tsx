"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./OneHealthCentresHero.module.css";
import { useTranslation } from "../../i18n";

/* ─── Stat definitions ─────────────────────────────────────────────────────── */
const STATS = [
  { target: 120, suffix: "+",  label: "Centres" },
  { target: 50,  suffix: "K+", label: "Farmers served" },
  { target: 9,   suffix: "",   label: "States" },
];

/* ─── Animated count-up hook ──────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        if (reduce) {
          setCount(target);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
          setCount(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ─── Individual stat item ────────────────────────────────────────────────── */
function StatItem({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(target);
  return (
    <div className={styles.statItem}>
      <span className={styles.statNumber} ref={ref}>
        {count}
        {suffix}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────────── */
export default function OneHealthCentresHero() {
  const { t } = useTranslation();
  const [entered, setEntered] = useState(false);

  // Trigger entrance animations after first paint
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className={styles.heroSection} id="ohc-hero">

      {/* ── Full-bleed background photo ── */}
      <div className={styles.bgWrapper} aria-hidden="true">
        <img
          src="/images/one-health/one health hero.jpg"
          alt="Biofactor One Health Centre — agronomist consulting a farmer in the field"
          className={styles.bgImage}
          fetchPriority="high"
        />
      </div>

      {/* ── Gradient overlay ── */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* ── Main content ── */}
      <div className={styles.container}>

        {/* Flexible spacer — pushes text down so sky + sign at top is fully visible */}
        <div className={styles.spacer} aria-hidden="true" />

        {/* Text block (bottom-left) */}
        <div className={styles.contentBlock}>

          {/* Eyebrow pill */}
          <div
            className={`${styles.eyebrowWrapper} ${styles.fadeUp} ${entered ? styles.entered : ""}`}
            style={{ transitionDelay: "0ms" }}
          >
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span className={styles.eyebrowText}>
              {t("ohc_eyebrow", "One Health Centres")}
            </span>
          </div>

          {/* Headline — single slide-up reveal so it NEVER breaks mid-line */}
          <h1 className={styles.headline} aria-label="Plant to Planet – 1 Health">
            <span className={styles.wordWrap}>
              <span
                className={`${styles.word} ${entered ? styles.entered : ""}`}
                style={{ transitionDelay: "60ms" }}
              >
                Plant to Planet&nbsp;&ndash;{" "}
                <span className={styles.headlineAccent}>1&nbsp;Health</span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`${styles.subtitle} ${styles.fadeUp} ${entered ? styles.entered : ""}`}
            style={{ transitionDelay: "240ms" }}
          >
            {t(
              "ohc_subtitle",
              "Connecting farmers with science, solutions and sustainable agriculture\u00a0\u2014 right in your village."
            )}
          </p>

          {/* CTA Buttons */}
          <div
            className={`${styles.ctaRow} ${styles.fadeUp} ${entered ? styles.entered : ""}`}
            style={{ transitionDelay: "360ms" }}
          >
            <Link href="/booking/" className={styles.btnPrimary}>
              {t("ohc_cta_find", "Find a centre")}
            </Link>
            <Link href="/booking/" className={styles.btnSecondary}>
              {t("ohc_cta_request", "Request a service")}
            </Link>
          </div>

          {/* Stats — divider + animated count-up numbers
              These sit ~30–40vh below the CTA, scrolling into view just like the PDF */}
          <div className={styles.statsSection}>
            <div className={styles.statsDivider} />
            <div
              className={styles.statsBar}
              role="list"
              aria-label="One Health Centres key figures"
            >
              {STATS.map((stat) => (
                <div key={stat.label} role="listitem">
                  <StatItem
                    target={stat.target}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
