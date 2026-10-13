"use client";

import React from "react";
import styles from "./PoultryHero.module.css";
import { useTranslation } from "../../i18n";

export default function PoultryHero() {
  const { t, language } = useTranslation();

  return (
    <section className={styles.heroSection} data-ruminants-section="hero" data-n="Hero">
      {/* Background Image Container */}
      <div className={styles.bgWrapper}>
        <img
          src="/images/poultry-hero.png"
          alt="Poultry in agricultural setting"
          className={styles.bgImage}
        />
      </div>

      {/* 22 Atmospheric Motes Layer */}
      <div className="motes" aria-hidden="true" />

      {/* Restrained Readability Overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Hero Content Container with Controlled Left Inset */}
      <div className={styles.container}>
        <div className={styles.contentBlock}>
          {/* Eyebrow Label */}
          <div className={styles.eyebrowWrapper}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrowText}>{t("prod_poultry", "POULTRY")}</span>
          </div>

          {/* Main Display Headline (3-Line Editorial Structure matching Ruminants) */}
          <h1 className={styles.headline}>
            {language === "en" ? (
              <>
                <span className="ln">
                  <span>BIOLOGY THAT</span>
                </span>
                <span className="ln">
                  <span>
                    <span className={styles.accentProtects}>PROTECTS</span> THE
                  </span>
                </span>
                <span className="ln">
                  <span>FLOCK.</span>
                </span>
              </>
            ) : (
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight">
                {t("poultry_hero_title", "BIOLOGY THAT PROTECTS THE FLOCK.")}
              </span>
            )}
          </h1>

          {/* Quotation Copy matching Ruminants */}
          <p className={`quote ${styles.quotation}`}>
            {t("poultry_hero_subtitle", "Every bird carries a microbial community in its gut. Its health, growth and every egg it lays depend on that community.")}
          </p>
        </div>
      </div>
    </section>
  );
}