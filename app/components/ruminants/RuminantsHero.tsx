import React from "react";
import styles from "./RuminantsHero.module.css";

export default function RuminantsHero() {
  return (
    <section className={styles.heroSection}>
      {/* Background Image Container */}
      <div className={styles.bgWrapper}>
        <img
          src="/images/ruminants-hero-unsplash.png"
          alt="Ruminants grazing in open pasture"
          className={styles.bgImage}
        />
      </div>

      {/* Restrained Readability Overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Hero Content Container with Controlled Left Inset */}
      <div className={styles.container}>
        <div className={styles.contentBlock}>
          {/* Eyebrow Label */}
          <div className={styles.eyebrowWrapper}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrowText}>RUMINANTS</span>
          </div>

          {/* Main Display Headline (3-Line Editorial Structure) */}
          <h1 className={styles.headline}>
            BIOLOGY THAT
            <br />
            <span className={styles.accentFeeds}>FEEDS</span> THE
            <br />
            RUMEN.
          </h1>

          {/* Quotation Copy */}
          <p className={styles.quotation}>
            A cow does not digest grass. The microbes in her rumen do. She lives on what they make.
          </p>
        </div>
      </div>
    </section>
  );
}
