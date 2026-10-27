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

/* ─── Individual animated card ──────────────────────────────────────────── */
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
          // Staggered delay before marking visible
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
      <p className={styles.cardText}>{text}</p>
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
