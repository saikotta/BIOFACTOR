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
            <span className={`${styles.eyebrowText} br-rv br-in`}>POULTRY</span>
          </div>

          {/* Main Display Headline (3-Line Editorial Structure matching Bio-Remediation) */}
          <h1 className={styles.headline} data-pm-hero-headline>
            <span className="br-ln br-in"><span>BIOLOGY THAT</span></span>
            <span className="br-ln br-d1 br-in"><span><span className={styles.accentProtects}>PROTECTS</span> THE</span></span>
            <span className="br-ln br-d2 br-in"><span>FLOCK.</span></span>
          </h1>

          {/* Quotation Copy matching Bio-Remediation */}
          <p className={`${styles.quotation} br-quote br-in`} data-pm-hero-subline>
            Every bird carries a microbial community in its gut. Its health, growth and every egg it lays depend on that community.
          </p>
        </div>
      </div>
    </section>
  );
}