"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { motion, useInView } from 'framer-motion';
import styles from '../contact.module.css';
import Spores from './Spores';

const contactPhoto = '/images/contactus.png';

export default function HeroFrame() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.45 });

  // Mouse parallax state
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = ((e.clientX - centerX) / (rect.width / 2)) * 16;
    const offsetY = ((e.clientY - centerY) / (rect.height / 2)) * 16;
    setParallax({ x: offsetX, y: offsetY });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  return (
    <section
      id="frame-1"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${styles.frameSection} bg-[#EAF3EA]`}
    >
      {/* Top-Left Label */}
      <div className={`${styles.frameLabel} text-[#2d6e4e]`}>
        <motion.span
          className={styles.frameLabelLine}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <span>01 / 05 · GET IN TOUCH</span>
      </div>

      {/* Giant faint number bottom-right */}
      <motion.div
        className={`${styles.giantNumber} ${styles.giantNumberLight}`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.07 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        01
      </motion.div>

      {/* Hero Grid */}
      <div className={styles.heroGrid}>
        {/* Left Column Content */}
        <div className="text-left">
          {/* Mask Wipe Headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className={styles.maskWipeHeadline}
              initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
              animate={isInView ? { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' } : { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
              transition={{ duration: 2, ease: [0.65, 0, 0.2, 1] }}
            >
              Grow With <span className={styles.headlineAccent}>Expert</span> Agricultural Support
            </motion.h1>
          </div>

          {/* Subtitle Paragraph */}
          <motion.p
            className="text-base sm:text-lg text-[#1c2b24]/85 mb-8 max-w-xl leading-relaxed font-sans"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Get personalized solutions for your farming needs. Our team of agricultural experts is ready to help you increase yield and maximize profits.
          </motion.p>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/science-technology"
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#2d6e4e] text-white font-bold rounded-xl hover:bg-[#0c3322] transition-all duration-300 shadow-md hover:shadow-xl text-sm tracking-wide"
            >
              Explore Science &amp; Tech
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Right Column Image with Parallax & Scopes */}
        <div className="relative flex justify-center items-center">
          <motion.div
            className={styles.heroImageContainer}
            animate={isInView ? { x: parallax.x, y: parallax.y } : { x: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          >
            {/* Top-to-Bottom Clip Path Reveal */}
            <motion.div
              className={styles.heroImageInner}
              initial={{ clipPath: 'inset(0 0 100% 0 round 26px)' }}
              animate={isInView ? { clipPath: 'inset(0 0 0% 0 round 26px)' } : { clipPath: 'inset(0 0 100% 0 round 26px)' }}
              transition={{ duration: 2, ease: [0.65, 0, 0.2, 1] }}
            >
              {/* Inner Scale Image 1.3 to 1 */}
              <motion.img
                src={contactPhoto}
                alt="Agricultural Expert Consultation"
                className="w-full h-full object-cover"
                initial={{ scale: 1.3 }}
                animate={isInView ? { scale: 1 } : { scale: 1.3 }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Spores canvas over image */}
              <Spores />
            </motion.div>

            {/* Glowing Mint Scan Line */}
            <motion.div
              className={styles.scanLine}
              initial={{ top: '0%', opacity: 1 }}
              animate={isInView ? { top: ['0%', '100%'], opacity: [1, 1, 0] } : { top: '0%', opacity: 0 }}
              transition={{ duration: 2, ease: [0.65, 0, 0.2, 1] }}
            />

            {/* CONNECT US overlay tag */}
            <motion.div
              className={styles.overlayTag}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              CONNECT US
            </motion.div>

            {/* FIELD SCAN ACTIVE tag */}
            <motion.div
              className={styles.scanTag}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 2.1 }}
            >
              <span className={styles.scanDot} />
              <span>FIELD SCAN · ACTIVE</span>
            </motion.div>

            {/* 4 Corner Brackets sliding inward */}
            <motion.span
              className={`${styles.cornerBracket} ${styles.topLeftBracket}`}
              initial={{ top: 34, left: 34 }}
              animate={isInView ? { top: 18, left: 18 } : { top: 34, left: 34 }}
              transition={{ duration: 0.6, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className={`${styles.cornerBracket} ${styles.topRightBracket}`}
              initial={{ top: 34, right: 34 }}
              animate={isInView ? { top: 18, right: 18 } : { top: 34, right: 34 }}
              transition={{ duration: 0.6, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className={`${styles.cornerBracket} ${styles.bottomLeftBracket}`}
              initial={{ bottom: 34, left: 34 }}
              animate={isInView ? { bottom: 18, left: 18 } : { bottom: 34, left: 34 }}
              transition={{ duration: 0.6, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className={`${styles.cornerBracket} ${styles.bottomRightBracket}`}
              initial={{ bottom: 34, right: 34 }}
              animate={isInView ? { bottom: 18, right: 18 } : { bottom: 34, right: 34 }}
              transition={{ duration: 0.6, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
