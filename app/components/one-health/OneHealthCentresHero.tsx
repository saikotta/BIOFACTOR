"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./OneHealthCentresHero.module.css";
import { useTranslation } from "../../i18n";

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

      {/* ── Main content (exactly 1 screen, content anchored at bottom-left) ── */}
      <div className={styles.container}>

        {/* Flexible spacer — lets the photo, agronomist and OHC signage breathe */}
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

          {/* Headline — single slide-up reveal */}
          <h1 className={styles.headline} aria-label={`${t("ohc_headline_pre", "Plant to Planet")} – ${t("ohc_headline_accent", "1 Health")}`}>
            <span className={styles.wordWrap}>
              <span
                className={`${styles.word} ${entered ? styles.entered : ""}`}
                style={{ transitionDelay: "60ms" }}
              >
                {t("ohc_headline_pre", "Plant to Planet")}&nbsp;&ndash;{" "}
                <span className={styles.headlineAccent}>{t("ohc_headline_accent", "1 Health")}</span>
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
              "Connecting farmers with science, solutions and sustainable agriculture — right in your village."
            )}
          </p>

          {/* CTA Buttons */}
          <div
            className={`${styles.ctaRow} ${styles.fadeUp} ${entered ? styles.entered : ""}`}
            style={{ transitionDelay: "360ms" }}
          >
            <Link href="#find-centre" className={styles.btnPrimary}>
              {t("ohc_cta_find", "Find a centre")}
            </Link>
            <Link href="/booking/" className={styles.btnSecondary}>
              {t("ohc_cta_request", "Request a service")}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
