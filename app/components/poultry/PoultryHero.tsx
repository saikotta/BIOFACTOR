import React from "react";
import styles from "./PoultryHero.module.css";

export default function PoultryHero() {
  return (
    <section className={styles.heroSection}>
      {/* Background Image */}
      <div className={styles.bgWrapper}>
        <img
          src="/images/poultry-hero.png"
          alt="Poultry in agricultural setting"
          className={styles.bgImage}
        />
      </div>

      {/* Readability overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Hero content */}
      <div className={styles.container}>
        <div className={styles.contentBlock}>
          <div className={styles.eyebrowWrapper}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrowText}>POULTRY</span>
          </div>

          <h1 className={styles.headline}>
            BIOLOGY THAT
            <br />
            <span className={styles.accentProtects}>PROTECTS</span> THE
            <br />
            FLOCK.
          </h1>

          <p className={styles.quotation}>
            Every bird carries a microbial community in its gut. Its health, growth and every egg it lays depend on that community.
          </p>
        </div>
      </div>
    </section>
  );
}
