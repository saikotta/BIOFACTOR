"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from '../contact.module.css';

interface StatItem {
  target: number;
  suffix: string;
  title: string;
  desc: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

const statsData: StatItem[] = [
  {
    target: 100,
    suffix: '+',
    title: 'Expert Team',
    desc: '100+ agricultural specialists',
    rotation: -7,
    offsetX: 60,
    offsetY: 40,
  },
  {
    target: 10000,
    suffix: '+',
    title: 'Proven Results',
    desc: 'Increased yields for 10,000+ farmers',
    rotation: 5,
    offsetX: 20,
    offsetY: 40,
  },
  {
    target: 25,
    suffix: '+',
    title: 'Award Winning',
    desc: 'Recognized for innovation in agri-tech',
    rotation: -4,
    offsetX: -20,
    offsetY: 40,
  },
  {
    target: 98,
    suffix: '%',
    title: 'Trusted Solutions',
    desc: 'FCO Supported agricultural products',
    rotation: 8,
    offsetX: -60,
    offsetY: 40,
  },
];

// Helper component for animated count-up numbers
function CountUpNumber({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    const duration = 1800; // 1.8s
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeOut * target);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    const animId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animId);
  }, [isInView, target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsFrame() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.35 });

  return (
    <section
      id="frame-5"
      ref={containerRef}
      className={`${styles.frameSection} bg-[#e8f1e9]`}
    >
      {/* Top-Left Label */}
      <div className={`${styles.frameLabel} text-[#2d6e4e]`}>
        <motion.span
          className={styles.frameLabelLine}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <span>05 / 05 · WHY CHOOSE US</span>
      </div>

      {/* Giant faint number bottom-right */}
      <motion.div
        className={`${styles.giantNumber} ${styles.giantNumberLight}`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.07 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        05
      </motion.div>

      {/* Header Container */}
      <div className="w-full max-w-5xl mx-auto z-10 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0c3322] mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Why Choose Our Agricultural Solutions
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg text-[#5d6b64] font-sans max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          We combine decades of farming expertise with cutting-edge technology to deliver results that matter.
        </motion.p>
      </div>

      {/* 4 Cards "Dealt" from center */}
      <div className={styles.statsGrid}>
        {statsData.map((stat, idx) => (
          <motion.div
            key={idx}
            className={styles.statCard}
            initial={{
              opacity: 0,
              x: stat.offsetX,
              y: stat.offsetY,
              rotate: stat.rotation,
            }}
            animate={
              isInView
                ? { opacity: 1, x: 0, y: 0, rotate: 0 }
                : { opacity: 0, x: stat.offsetX, y: stat.offsetY, rotate: stat.rotation }
            }
            transition={{
              duration: 1.5,
              delay: idx * 0.14,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className={styles.statNumber}>
              <CountUpNumber target={stat.target} suffix={stat.suffix} isInView={isInView} />
            </div>

            <h3 className="font-bold text-[#0c3322] text-lg mb-2">{stat.title}</h3>
            <p className="text-xs text-[#5d6b64] font-sans leading-relaxed">{stat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
