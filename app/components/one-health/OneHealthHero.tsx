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

/* ─── Individual Card with Slide-Down Animation + Hover Pop-Up ────────────── */
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.visible : ""}`}
    >
      <span className={styles.badge} aria-hidden="true">
        {number}
      </span>
      <div className={styles.cardContent}>
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
