import React from "react";
import MicrobeField from "../MicrobeField";
import styles from "./BioremidationMatrix.module.css";

export default function BioremidationMatrix() {
  return (
    <section className="relative w-full bg-[#EAF3EA] text-[#173522] pt-4 md:pt-6 lg:pt-8 pb-16 md:pb-24 lg:pb-32 overflow-hidden">
      {/* Floating MicrobeField Layer - Light Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80 overflow-hidden">
        <MicrobeField
          position="absolute"
          densityMultiplier={2.5}
          motionMultiplier={0.7}
          opacityMultiplier={0.9}
          rotationMultiplier={0.5}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        {/* Subtle Boundary Divider */}
        <div className="w-full border-t border-[#167A4A]/14 mb-8 md:mb-10" aria-hidden="true" />

        {/* Eyebrow & Main Title - Matched to Screenshot 1 & 2 */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1.5px] bg-[#2D6A4F]" />
          <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
            ALONG THE TREATMENT CHAIN
          </span>
        </div>

        <h2 className="font-display font-extrabold text-[clamp(2.25rem,4vw,4.25rem)] text-[#173522] tracking-tight leading-[1.02] uppercase mb-12 md:mb-16 max-w-[1100px]">
          Where biology does the work.
        </h2>

        {/* Matrix Table Container - Light #EAF3EA Aesthetic */}
        <div className={styles.matrixScroll} role="region" tabIndex={0} aria-label="Treatment chain comparison">
          <div className={styles.matrix}>

            {/* MATRIX HEADER: 5 STAGES ALONG TREATMENT CHAIN */}
            <div className={styles.matrixHeader}>
              {/* Row Header Label */}
              <div className="font-mono text-xs font-bold tracking-widest text-[#2D6A4F] uppercase pb-1">

              </div>

              {/* Col 1 */}
              <div>
                <span className="font-mono text-xs font-bold tracking-wider text-[#173522] uppercase block">
                  01 SOURCE
                </span>
                <span className="font-mono text-[11px] text-[#26382D]/60 uppercase tracking-widest block mt-0.5">
                  GENERATION
                </span>
              </div>

              {/* Col 2 */}
              <div>
                <span className="font-mono text-xs font-bold tracking-wider text-[#173522] uppercase block">
                  02 COLLECTION
                </span>
                <span className="font-mono text-[11px] text-[#26382D]/60 uppercase tracking-widest block mt-0.5">
                  TANK · DRAIN · SUMP
                </span>
              </div>

              {/* Col 3 */}
              <div>
                <span className="font-mono text-xs font-bold tracking-wider text-[#173522] uppercase block">
                  03 BIOLOGICAL TREATMENT
                </span>
                <span className="font-mono text-[11px] text-[#2D6A4F] font-semibold uppercase tracking-widest block mt-0.5">
                  CORE PROCESS
                </span>
              </div>

              {/* Col 4 */}
              <div>
                <span className="font-mono text-xs font-bold tracking-wider text-[#173522] uppercase block">
                  04 POLISHING
                </span>
                <span className="font-mono text-[11px] text-[#26382D]/60 uppercase tracking-widest block mt-0.5">
                  FINAL QUALITY
                </span>
              </div>

              {/* Col 5 */}
              <div>
                <span className="font-mono text-xs font-bold tracking-wider text-[#173522] uppercase block">
                  05 RECEIVING WATER
                </span>
                <span className="font-mono text-[11px] text-[#26382D]/60 uppercase tracking-widest block mt-0.5">
                  LAKE · RIVER · REUSE
                </span>
              </div>
            </div>


            {/* ROW 1: INDUSTRIAL EFFLUENT (AMBER/GOLD ACCENTS) */}
            <div className={styles.matrixRow} data-row="0">
              {/* Row Label */}
              <div>
                <h3 className="font-display font-bold text-lg text-[#173522]">
                  Industrial
                </h3>
                <span className="font-mono text-[11px] text-[#26382D]/60 uppercase tracking-wider block">
                  EFFLUENT
                </span>
              </div>

              {/* Col 1 */}
              <div>
                <div className="h-1 bg-[#D69E2E] rounded-full mb-3 w-full" />
                <p className="text-xs sm:text-sm text-[#173522]/85 font-serif leading-relaxed">
                  Segregate difficult streams
                </p>
              </div>

              {/* Col 2 */}
              <div data-empty="true">
                <div className="h-[1.5px] bg-[#D69E2E]/25 rounded-full my-3 w-full" />
                <p className="text-xs sm:text-sm text-[#26382D]/40 font-mono">
                  —
                </p>
              </div>

              {/* Col 3 */}
              <div>
                <div className="h-1 bg-[#D69E2E] rounded-full mb-3 w-full" />
                <p className="text-xs sm:text-sm text-[#173522]/85 font-serif leading-relaxed">
                  Dye cleavage, Cr(VI) reduction<sup className="text-[9px]">4 5</sup>
                </p>
              </div>

              {/* Col 4 */}
              <div>
                <div className="h-1 bg-[#D69E2E] rounded-full mb-3 w-full" />
                <p className="text-xs sm:text-sm text-[#173522]/85 font-serif leading-relaxed">
                  Aerobic clean-up of by-products
                </p>
              </div>

              {/* Col 5 */}
              <div>
                <div className="h-1 bg-[#D69E2E] rounded-full mb-3 w-full" />
                <p className="text-xs sm:text-sm text-[#173522]/85 font-serif leading-relaxed">
                  Lower toxic load discharged
                </p>
              </div>
            </div>


            {/* ROW 2: SEWAGE STP (CYAN/BLUE ACCENTS) */}
            <div className={styles.matrixRow} data-row="1">
              {/* Row Label */}
              <div>
                <h3 className="font-display font-bold text-lg text-[#173522]">
                  Sewage
                </h3>
                <span className="font-mono text-[11px] text-[#26382D]/60 uppercase tracking-wider block">
                  STP
                </span>
              </div>

              {/* Col 1 */}
              <div data-empty="true">
                <div className="h-[1.5px] bg-[#3182CE]/25 rounded-full my-3 w-full" />
                <p className="text-xs sm:text-sm text-[#26382D]/40 font-mono">
                  —
                </p>
              </div>

              {/* Col 2 */}
              <div>
                <div className="h-1 bg-[#3182CE] rounded-full mb-3 w-full" />
                <p className="text-xs sm:text-sm text-[#173522]/85 font-serif leading-relaxed">
                  Odour control in sumps
                </p>
              </div>

              {/* Col 3 */}
              <div>
                <div className="h-1 bg-[#3182CE] rounded-full mb-3 w-full" />
                <p className="text-xs sm:text-sm text-[#173522]/85 font-serif leading-relaxed">
                  Start-up, shock recovery, N removal<sup className="text-[9px]">6</sup>
                </p>
              </div>

              {/* Col 4 */}
              <div>
                <div className="h-1 bg-[#3182CE] rounded-full mb-3 w-full" />
                <p className="text-xs sm:text-sm text-[#173522]/85 font-serif leading-relaxed">
                  Settling and clarity
                </p>
              </div>

              {/* Col 5 */}
              <div>
                <div className="h-1 bg-[#3182CE] rounded-full mb-3 w-full" />
                <p className="text-xs sm:text-sm text-[#173522]/85 font-serif leading-relaxed">
                  Treated water for reuse
                </p>
              </div>
            </div>


            {/* ROW 3: SEPTIC ON-SITE (PURPLE/VIOLET ACCENTS) */}
            <div className={styles.matrixRow} data-row="2">
              {/* Row Label */}
              <div>
                <h3 className="font-display font-bold text-lg text-[#173522]">
                  Septic
                </h3>
                <span className="font-mono text-[11px] text-[#26382D]/60 uppercase tracking-wider block">
                  ON-SITE
                </span>
              </div>

              {/* Col 1 */}
              <div>
                <div className="h-1 bg-[#805AD5] rounded-full mb-3 w-full" />
                <p className="text-xs sm:text-sm text-[#173522]/85 font-serif leading-relaxed">
                  Correct tank design and use
                </p>
              </div>

              {/* Col 2 */}
              <div>
                <div className="h-1 bg-[#805AD5] rounded-full mb-3 w-full" />
                <p className="text-xs sm:text-sm text-[#173522]/85 font-serif leading-relaxed">
                  Regular emptying
                </p>
              </div>

              {/* Col 3 */}
              <div>
                <div className="h-1 bg-[#805AD5] rounded-full mb-3 w-full" />
                <p className="text-xs sm:text-sm text-[#173522]/85 font-serif leading-relaxed">
                  Septage treatment at FSTP
                </p>
              </div>

              {/* Col 4 */}
              <div>
                <div className="h-1 bg-[#805AD5] rounded-full mb-3 w-full" />
                <p className="text-xs sm:text-sm text-[#173522]/85 font-serif leading-relaxed">
                  Stabilised, safer sludge
                </p>
              </div>

              {/* Col 5 */}
              <div>
                <div className="h-1 bg-[#805AD5] rounded-full mb-3 w-full" />
                <p className="text-xs sm:text-sm text-[#173522]/85 font-serif leading-relaxed">
                  Less dumping into water bodies
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
