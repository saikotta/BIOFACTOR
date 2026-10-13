"use client";

import React from "react";
import styles from "./RuminantsHero.module.css";
import { useTranslation } from "../../i18n";

export default function RuminantsHero() {
  const { t, language } = useTranslation();

  return (
    <section
      className={styles.heroSection}
      data-ruminants-section="hero"
      data-motion
    >
      {/* Background Image Container */}
      <div className={styles.bgWrapper}>
        <img
          src="/images/ruminants-hero-unsplash.png"
          alt="Ruminants grazing in open pasture"
          className={styles.bgImage}
        />
      </div>

      {/* 22 Atmospheric Motes Layer */}
      <div className="motes" aria-hidden="true" />

      {/* Restrained Readability Overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Hero Content */}
      <div className={styles.container}>
        <div className={styles.contentBlock} data-hero-content>

          {/* Eyebrow Label */}
          <div className={styles.eyebrowWrapper} data-hero-eyebrow>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrowText}>— {t("prod_ruminants", "RUMINANTS")}</span>
          </div>

          {/* Main Display Headline — 3 lines, each masked with reference .ln class */}
          <h1 className={styles.headline} aria-label="BIOLOGY THAT FEEDS THE RUMEN.">
            {language === "en" ? (
              <>
                {/* Line 1 */}
                <span className="ln">
                  <span>BIOLOGY THAT</span>
                </span>
                {/* Line 2 */}
                <span className="ln">
                  <span>
                    <span className={styles.accentFeeds}>FEEDS</span> THE
                  </span>
                </span>
                {/* Line 3 */}
                <span className="ln">
                  <span>RUMEN.</span>
                </span>
              </>
            ) : (
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight">
                {t("ruminants_hero_title", "BIOLOGY THAT FEEDS THE RUMEN.")}
              </span>
            )}
          </h1>

          {/* Italic subtitle — reference .quote fade class */}
          <p className={`quote ${styles.quotation}`} data-hero-quote>
            {t("ruminants_hero_subtitle", "A cow does not digest grass. The microbes in her rumen do. She lives on what they make.")}
          </p>
        </div>
      </div>
    </section>
  );
}
