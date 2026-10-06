import React from "react";
import styles from "./AquacultureHero.module.css";

export default function AquacultureHero() {
  return (
    <section className={styles.heroSection} data-aq-section="hero" data-n="Aquaculture" data-motion>
      {/* Background Image */}
      <div className={styles.bgWrapper} data-aq-hero-bg>
        <img
          src="/images/aquaculture-hero.jpg"
          alt="Aquaculture pond environment"
          className={styles.bgImage}
          data-aq-hero-img
        />
      </div>

      {/* Dark readability overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Hero Content */}
      <div className={styles.container} data-aq-hero-text>
        <div className={styles.contentBlock}>

          {/* Eyebrow */}
          <div className={`${styles.eyebrowWrapper} rv`} data-aq-hero-eyebrow>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrowText}>AQUACULTURE</span>
          </div>

          {/* Headline */}
          <h1 className={styles.headline} aria-label="BIOLOGY THAT BALANCES THE POND.">
            <span className="ln">
              <span>BIOLOGY THAT</span>
            </span>
            <span className="ln">
              <span>
                <span className={styles.accentBalances}>BALANCES</span> THE
              </span>
            </span>
            <span className="ln">
              <span>POND.</span>
            </span>
          </h1>

          {/* Subline */}
          <p className={`quote ${styles.quotation}`} data-aq-hero-subline>
            Most pond problems start at the bottom.
          </p>

        </div>

      </div>
    </section>
  );
}
