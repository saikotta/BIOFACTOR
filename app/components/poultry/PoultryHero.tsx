import React from "react";
import styles from "./PoultryHero.module.css";

export default function PoultryHero() {
  return (
    <section className={styles.heroSection} data-pm-section="hero">
      {/* Background Image Container */}
      <div className={styles.bgWrapper} data-pm-hero-bg>
        <img
          src="/images/poultry-hero.png"
          alt="Poultry in agricultural setting"
          className={styles.bgImage}
          data-pm-hero-img
        />
      </div>

      {/* Restrained Readability Overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Light rays layer */}
      <div data-pm-hero-rays aria-hidden="true" />

      {/* Spores layer */}
      <div data-pm-hero-spores aria-hidden="true" />

      {/* Hero Content Container with Controlled Left Inset */}
      <div className={styles.container} data-pm-hero-text>
        <div className={styles.contentBlock}>
          {/* Eyebrow Label */}
          <div className={styles.eyebrowWrapper} data-pm-hero-eyebrow>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrowText}>POULTRY</span>
          </div>

          {/* Main Display Headline (3-Line Editorial Structure) */}
          <h1 className={styles.headline} data-pm-hero-headline>
            BIOLOGY THAT
            <br />
            <span className={styles.accentProtects}>PROTECTS</span> THE
            <br />
            FLOCK.
          </h1>

          {/* Quotation Copy */}
          <p className={styles.quotation} data-pm-hero-subline>
            Every bird carries a microbial community in its gut. Its health, growth and every egg it lays depend on that community.
          </p>
        </div>
      </div>
    </section>
  );
}