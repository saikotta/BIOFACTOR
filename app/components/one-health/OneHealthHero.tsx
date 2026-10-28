"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./OneHealthHero.module.css";
import { useTranslation } from "../../i18n";
import { useIframeSrc } from "../useIframeSrc";

/* ─── Model cards data ────────────────────────────────────────────────────── */
const VALUE_CARDS = [
  {
    number: "01",
    titleKey: "ohc_model_card1_title",
    defaultTitle: "For farmers",
    descKey: "ohc_model_card1_desc",
    defaultDesc:
      "Science-backed diagnosis and trusted biological solutions close to home.",
  },
  {
    number: "02",
    titleKey: "ohc_model_card2_title",
    defaultTitle: "For entrepreneurs",
    descKey: "ohc_model_card2_desc",
    defaultDesc:
      "A proven franchise model with training, branding, supply and tech support.",
  },
  {
    number: "03",
    titleKey: "ohc_model_card3_title",
    defaultTitle: "For the planet",
    descKey: "ohc_model_card3_desc",
    defaultDesc:
      "Healthier soil, safer food and lower chemical load across the food web.",
  },
];

/* ─── Individual Card with 3D Tilt, Specular Lighting & Slide-Down Animation ─ */
function AnimatedValueCard({
  number,
  title,
  desc,
  delay,
}: {
  number: string;
  title: string;
  desc: string;
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
          // Staggered downwards entrance delay
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

    // 3D Tilt: +- 7 degrees
    const rx = -((y - centerY) / centerY) * 7;
    const ry = ((x - centerX) / centerX) * 7;

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
            ? `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-6px) scale(1.02)`
            : "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)"
          : "perspective(800px) translateY(-30px) scale(0.96)",
        boxShadow: tilt.active
          ? "0 22px 48px -10px rgba(22, 122, 74, 0.20), 0 8px 18px -6px rgba(0, 0, 0, 0.06)"
          : undefined,
        borderColor: tilt.active ? "rgba(22, 122, 74, 0.32)" : undefined,
        transition: tilt.active
          ? "transform 0.12s ease-out, box-shadow 0.25s ease, border-color 0.25s ease"
          : "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.65s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Specular ambient light sheen following the cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: tilt.active
            ? `radial-gradient(circle 220px at ${tilt.x}px ${tilt.y}px, rgba(22, 122, 74, 0.14), transparent 70%)`
            : "none",
        }}
        aria-hidden="true"
      />

      {/* Number Badge with parallax depth */}
      <span
        className={`relative z-10 ${styles.badge}`}
        style={{
          transform: tilt.active ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.2s ease-out, background-color 0.3s ease",
          backgroundColor: tilt.active ? "#d4ebdc" : undefined,
        }}
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Card Content with subtle depth */}
      <div className={`relative z-10 ${styles.cardContent}`}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{desc}</p>
      </div>
    </div>
  );
}

/* ─── Refactored Orbit Hero Component ─────────────────────────────────────── */
export default function OneHealthHero() {
  const { t } = useTranslation();
  const frameSrc = useIframeSrc("/planet-b-orbit.html");
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.section} id="ohc-model-section" aria-labelledby="ohc-section-heading">
      <div className={styles.inner}>

        {/* Section Header */}
        <div className={styles.eyebrowWrapper}>
          <div className={styles.eyebrowPill}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span className={styles.eyebrowText}>
              {t("ohc_model_eyebrow", "The OHC Model")}
            </span>
          </div>
        </div>

        <h2 className={styles.heading} id="ohc-section-heading">
          {t("ohc_model_heading", "One place for healthy farms")}
        </h2>

        <p className={styles.subtitle}>
          {t(
            "ohc_model_subtitle",
            "Each OHC is a local hub where science meets the field \u2014 testing, advice, inputs and training under one roof."
          )}
        </p>

        {/* 2-Column Split: Orbit on Left, 3 Value Cards on Right */}
        <div className={styles.splitGrid}>

          {/* Left Column: Interactive 3D Orbit with THERE IS NO PLANet B close below */}
          <div className={styles.orbitCol}>
            <div
              className={styles.orbitFrameWrapper}
              style={{
                opacity: hasEntered ? 1 : 0,
                transform: hasEntered ? "scale(1)" : "scale(0.96)",
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              }}
            >
              <iframe
                src={frameSrc}
                title="There is no Planet B: soil, plants, animals, food and people share one planet"
                className={styles.orbitFrame}
                loading="eager"
              />
            </div>
          </div>

          {/* Right Column: 3 Value Cards with staggered downwards entrance + pop-up hover */}
          <div className={styles.cardsCol} role="list" aria-label="One Health Centre Pillars">
            {VALUE_CARDS.map((card, idx) => (
              <div key={card.number} role="listitem">
                <AnimatedValueCard
                  number={card.number}
                  title={t(card.titleKey, card.defaultTitle)}
                  desc={t(card.descKey, card.defaultDesc)}
                  delay={idx * 140}
                />
              </div>
            ))}
          </div>

        </div>

        {/* Subtle scroll hint pointing to the 6 chapters below */}
        <div className={styles.scrollHint} aria-hidden="true">
          <span className={styles.scrollHintText}>
            {t("ohc_scroll_follow", "Scroll to follow the chain")}
          </span>
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-none stroke-[#167a4a] animate-bounce"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDuration: "2.4s" }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>

      </div>
    </section>
  );
}
