import React from "react";
import styles from "./PoultryGutFrontline.module.css";

export default function PoultryGutFrontline() {
  return (
    <section className={styles.section} data-poultry-static>
      <div className={styles.container}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} aria-hidden="true" />
          <span>THE GUT IS THE FRONT LINE</span>
        </div>

        <h2 className={styles.headline}>
          <span className={styles.headlineLine}>Whoever colonises</span>
          <span className={styles.headlineLine}>the gut first sets</span>
          <span className={styles.headlineLine}>the course.</span>
        </h2>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.body}>
              A chick hatches with an almost empty gut. The first bacteria to settle there shape how the gut lining develops, how the immune system matures and which pathogens can find a place to attach.
            </p>

            <div className={styles.quote}>
              <span className={styles.quoteLead}>The idea is 50 years old.</span>{" "}
              In 1973, Nurmi and Rantala showed that day-old chicks given gut bacteria from healthy adult hens resisted <em>Salmonella</em> colonisation. This became known as competitive exclusion.<sup>4</sup>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.legend}>
              <span className={styles.legendGreen}>BENEFICIAL BACTERIA · ON THE VILLI</span>
              <span className={styles.legendRose}>SALMONELLA · CLOSTRIDIUM · KEPT OUT</span>
            </div>

            <div className={styles.imageSlot} aria-label="Empty image slot for small intestine schematic" />

            <div className={styles.cardFooter}>SMALL INTESTINE · SCHEMATIC</div>
          </div>
        </div>
      </div>
    </section>
  );
}
