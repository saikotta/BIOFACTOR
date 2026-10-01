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

      {/* Restrained Readability Overlay */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Hero Content — parallax + fade target */}
      <div className={styles.container}>
        <div className={styles.contentBlock} data-hero-content>

          {/* Eyebrow Label — fades in at 0.5 s */}
          <div className={styles.eyebrowWrapper} data-hero-eyebrow>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrowText}>— RUMINANTS</span>
          </div>

          {/* Main Display Headline — 3 lines, each masked */}
          <h1 className={styles.headline} aria-label="BIOLOGY THAT FEEDS THE RUMEN.">
            {/* Line 1 */}
            <span className={styles.motionLine} data-hero-line>
              <span data-hero-line-inner>BIOLOGY THAT</span>
            </span>
            <br />
            {/* Line 2 */}
            <span className={styles.motionLine} data-hero-line>
              <span data-hero-line-inner data-hero-shimmer>
                <span className={styles.accentFeeds}>FEEDS</span> THE
              </span>
            </span>
            <br />
            {/* Line 3 */}
            <span className={styles.motionLine} data-hero-line>
              <span data-hero-line-inner>RUMEN.</span>
            </span>
          </h1>

          {/* Italic subtitle — fades in at 1.7 s */}
          <p className={styles.quotation} data-hero-quote>
            A cow does not digest grass. The microbes in her rumen do. She lives on what they make.
          </p>
        </div>
      </div>

      {/* Scroll cue — vertical line with travelling lime segment */}
      <div data-scroll-cue aria-hidden="true" />
    </section>
  );
}
