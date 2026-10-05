"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from '../contact.module.css';

export default function HoursFrame() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.45 });

  const weekDays = [
    { name: 'Mon', hours: '9:30 – 6:30', heightPercent: '85%', closed: false },
    { name: 'Tue', hours: '9:30 – 6:30', heightPercent: '85%', closed: false },
    { name: 'Wed', hours: '9:30 – 6:30', heightPercent: '85%', closed: false },
    { name: 'Thu', hours: '9:30 – 6:30', heightPercent: '85%', closed: false },
    { name: 'Fri', hours: '9:30 – 6:30', heightPercent: '85%', closed: false },
    { name: 'Sat', hours: '9:30 – 6:30', heightPercent: '85%', closed: false },
    { name: 'Sun', hours: 'Closed', heightPercent: '28%', closed: true },
  ];

  return (
    <section
      id="frame-4"
      ref={containerRef}
      className={`${styles.frameSection} bg-white`}
    >
      {/* Top-Left Label */}
      <div className={`${styles.frameLabel} text-[#2d6e4e]`}>
        <motion.span
          className={styles.frameLabelLine}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <span>04 / 05 · VISITING HOURS</span>
      </div>

      {/* Giant faint number bottom-right */}
      <motion.div
        className={`${styles.giantNumber} ${styles.giantNumberLight}`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.07 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        04
      </motion.div>

      {/* Hours Grid */}
      <div className={styles.hoursGrid}>
        {/* Left Column: SVG Clock Dial */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
              {/* 24 Ticks Ring */}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * (360 / 24)) * (Math.PI / 180);
                const x1 = 100 + Math.cos(angle) * 82;
                const y1 = 100 + Math.sin(angle) * 82;
                const x2 = 100 + Math.cos(angle) * 92;
                const y2 = 100 + Math.sin(angle) * 92;

                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={i % 6 === 0 ? '#2d6e4e' : 'rgba(45, 110, 78, 0.25)'}
                    strokeWidth={i % 6 === 0 ? '2.5' : '1.5'}
                  />
                );
              })}

              {/* Background Arc */}
              <circle
                cx="100"
                cy="100"
                r="72"
                fill="none"
                stroke="#e8f1e9"
                strokeWidth="6"
              />

              {/* Animated Drawing Arc (over 2.2s) */}
              <motion.circle
                cx="100"
                cy="100"
                r="72"
                fill="none"
                stroke="#2d6e4e"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="452"
                initial={{ strokeDashoffset: 452 }}
                animate={isInView ? { strokeDashoffset: 110 } : { strokeDashoffset: 452 }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>

            {/* Center Hours Info */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <span className="font-jetbrains text-[10px] uppercase tracking-widest text-[#3f9b6a] font-semibold mb-1">
                Visiting Hours
              </span>
              <span className="font-bricolage text-xl sm:text-2xl font-extrabold text-[#0c3322]">
                9:30 – 6:30
              </span>
              <span className="font-sans text-xs text-[#5d6b64] font-medium mt-1">
                Monday – Saturday
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Heading + 7 Weekday Bars */}
        <div className="text-left">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0c3322] mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            We&apos;re open six days a week
          </motion.h2>

          <motion.p
            className="text-base text-[#5d6b64] font-sans mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Visit our regional head office in Hyderabad for direct agricultural consultations, product demos, and technical support.
          </motion.p>

          {/* 7 Vertical Weekday Bars */}
          <div className={styles.weekdayBarsContainer}>
            {weekDays.map((day, idx) => (
              <div key={idx} className={styles.barCol}>
                <div className={styles.barTrack}>
                  <motion.div
                    className={`${styles.barFill} ${day.closed ? styles.barFillClosed : ''}`}
                    initial={{ height: '0%' }}
                    animate={isInView ? { height: day.heightPercent } : { height: '0%' }}
                    transition={{ duration: 1.2, delay: idx * 0.11, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>

                <span className="font-jetbrains text-xs font-bold text-[#0c3322]">
                  {day.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
