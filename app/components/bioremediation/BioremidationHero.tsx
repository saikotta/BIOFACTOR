import React from "react";
import styles from "./BioremidationHero.module.css";

export default function BioremidationHero() {
  return (
    <section className={styles.heroSection}>
      {/* Background Image Container with Shadow */}
      <div className={styles.bgWrapper}>
        <img
          src="/images/bioremidation/remidation-hero.jpg"
          alt="Bio-Remediation Hero"
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
            <span className={styles.eyebrowText}>BIO-REMEDIATION</span>
          </div>

          {/* Main Display Headline (3-Line Editorial Structure) */}
          <h1 className={styles.headline}>
            BIOLOGY THAT
            <br />
            <span className={styles.accentGreen}>CLEANS</span> WATER &amp;
            <br />
            RESTORES ECOSYSTEMS.
          </h1>

          {/* Subtitle Copy */}
          <p className={styles.subtitle}>
            Targeted microbial consortia that degrade complex organic contaminants, eliminate toxic sludge, and restore natural water quality without synthetic chemicals.
          </p>
        </div>
      </div>
    </section>
  );
}
