import React from "react";
import styles from "./RuminantsHero.module.css";

export default function RuminantsHero() {
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
            <span className={styles.eyebrowText}>— RUMINANTS</span>
          </div>

          {/* Main Display Headline — 3 lines, each masked with reference .ln class */}
          <h1 className={styles.headline} aria-label="BIOLOGY THAT FEEDS THE RUMEN.">
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
          </h1>

          {/* Italic subtitle — reference .quote fade class */}
          <p className={`quote ${styles.quotation}`} data-hero-quote>
            A cow does not digest grass. The microbes in her rumen do. She lives on what they make.
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <div data-scroll-cue aria-hidden="true" />
    </section>
  );
}
