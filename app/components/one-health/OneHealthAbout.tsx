"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./OneHealthAbout.module.css";
import { useTranslation } from "../../i18n";

/* ─── Card data ──────────────────────────────────────────────────────────── */
const CARDS = [
  {
    number: "01",
    textKey: "ohc_about_card1",
    defaultText:
      "One Health Centres aim to serve as local agricultural support points where farmers can access information, guidance and suitable Biofactor solutions.",
  },
  {
    number: "02",
    textKey: "ohc_about_card2",
    defaultText:
      "The OHC model connects Biofactor's research-driven biological products with farmers' practical needs.",
  },
  {
    number: "03",
    textKey: "ohc_about_card3",
    defaultText:
      "Our goal is to build long-term relationships with farmers by supporting crop health, soil health, sustainable productivity and responsible agricultural practices.",
  },
];

/* ─── Individual animated card with 3D tilt & specular lighting ─────────── */
function AboutCard({
  number,
  text,
  delay,
}: {
  number: string;
  text: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, rx: 0, ry: 0, active: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduce);
    if (reduce) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Staggered elastic entrance delay
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !visible) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Fluid 3D tilt: max 8.5 degrees
    const rx = -((y - centerY) / centerY) * 8.5;
    const ry = ((x - centerX) / centerX) * 8.5;

    setTilt({ x, y, rx, ry, active: true });
  };

  const handleMouseLeave = () => {
    setTilt((prev) => ({ ...prev, rx: 0, ry: 0, active: false }));
  };

  return (
    <div
      ref={ref}
      suppressHydrationWarning
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden ${styles.card} ${
        visible ? styles.visible : ""
      }`}
      style={{
        transform: visible
          ? tilt.active
            ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-8px) scale(1.025)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)"
          : "perspective(1000px) translateY(36px) scale(0.96)",
        boxShadow: tilt.active
          ? "0 26px 52px -12px rgba(22, 122, 74, 0.22), 0 10px 24px -8px rgba(0, 0, 0, 0.08)"
          : undefined,
        borderColor: tilt.active ? "rgba(22, 122, 74, 0.35)" : undefined,
        transition: tilt.active
          ? "transform 0.12s ease-out, box-shadow 0.25s ease, border-color 0.25s ease"
          : "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.65s ease-out, box-shadow 0.4s ease, border-color 0.4s ease",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Specular glassmorphic light sheen following the cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[18px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: tilt.active
            ? `radial-gradient(circle 260px at ${tilt.x}px ${tilt.y}px, rgba(22, 122, 74, 0.16), transparent 70%)`
            : "none",
        }}
        aria-hidden="true"
      />

      {/* Number Badge with parallax depth */}
      <span
        className={`relative z-10 ${styles.badge}`}
        style={{
          transform: tilt.active ? "translateZ(24px) scale(1.04)" : "translateZ(0) scale(1)",
          transition: "transform 0.2s ease-out, background-color 0.3s ease",
          backgroundColor: tilt.active ? "#d6ebd8" : undefined,
        }}
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Card Text with parallax depth */}
      <p
        className={`relative z-10 ${styles.cardText}`}
        style={{
          transform: tilt.active ? "translateZ(14px)" : "translateZ(0)",
          transition: "transform 0.2s ease-out",
        }}
      >
        {text}
      </p>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function OneHealthAbout() {
  const { t } = useTranslation();

  return (
    <section className={styles.section} aria-labelledby="ohc-about-heading">
      <div className={styles.inner}>

        {/* Eyebrow */}
        <div className={styles.eyebrowWrapper}>
          <div className={styles.eyebrowPill}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span className={styles.eyebrowText}>
              {t("ohc_about_eyebrow", "About One Health Centres")}
            </span>
          </div>
        </div>

        {/* Heading */}
        <h2 className={styles.heading} id="ohc-about-heading">
          {t("ohc_about_heading_pre", "Bringing Agricultural Science ")}{" "}
          <span className={styles.headingAccent}>
            {t("ohc_about_heading_accent", "Closer to Farmers")}
          </span>
        </h2>

        {/* 3 Cards */}
        <div className={styles.cardsGrid} role="list">
          {CARDS.map((card, idx) => (
            <div key={card.number} role="listitem" className={styles.cardWrapper}>
              <AboutCard
                number={card.number}
                text={t(card.textKey, card.defaultText)}
                delay={idx * 120}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
