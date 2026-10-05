"use client";

import React, { useRef, useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import styles from '../contact.module.css';

export default function StripsFrame() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.45 });

  // Active strip state: 0 = Call Us, 1 = Email Us, 2 = Visit Us. Default to 0 (Call Us).
  const [activeStrip, setActiveStrip] = useState<number>(0);

  const contactStrips = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      detail: '7013074400',
      subtitle: 'Visiting hours: 9:30 AM – 6:30 PM',
      actionText: 'Click to Call',
      href: 'tel:7013074400',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      detail: 'info@biofactor.in',
      subtitle: 'General Inquiries & Support',
      actionText: 'Send Email',
      href: 'mailto:info@biofactor.in',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      detail: 'Head Office',
      subtitle: '4 & 5 Floors, Sai Medha Infra, Arca Satya Residency, Kousalya Colony, Bachupally, Hyderabad, Telangana 500090',
      actionText: 'Get Directions',
      href: 'https://maps.google.com/?q=Bachupally+Hyderabad',
    },
  ];

  return (
    <section
      id="frame-2"
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
        <span>02 / 05 · DIRECT CONTACT</span>
      </div>

      {/* Giant faint number bottom-right */}
      <motion.div
        className={`${styles.giantNumber} ${styles.giantNumberLight}`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.07 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        02
      </motion.div>

      {/* Content Container */}
      <div className="w-full max-w-6xl mx-auto z-10 text-center">
        {/* Title */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0c3322] mb-12 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Three ways to reach our experts
        </motion.h2>

        {/* 3 Strips */}
        <div className={styles.stripsContainer}>
          {contactStrips.map((strip, idx) => {
            const isActive = activeStrip === idx;

            return (
              <motion.div
                key={idx}
                onClick={() => setActiveStrip(idx)}
                onMouseEnter={() => setActiveStrip(idx)}
                className={`${styles.stripCard} ${isActive ? styles.stripCardActive : styles.stripCardCollapsed}`}
                initial={{ opacity: 0, y: 35, clipPath: 'inset(100% 0 0 0)' }}
                animate={isInView ? { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' } : { opacity: 0, y: 35, clipPath: 'inset(100% 0 0 0)' }}
                transition={{ duration: 0.8, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Strip Header */}
                <div className="flex items-center gap-4">
                  <div className={styles.stripIconCircle}>{strip.icon}</div>
                  <div className="text-left">
                    <h3 className="font-bold text-[#0c3322] text-xl leading-tight">{strip.title}</h3>
                    <p className="font-bold text-[#2d6e4e] text-base">{strip.detail}</p>
                  </div>
                </div>

                {/* Expanded Details */}
                <motion.div
                  className="mt-6 text-left"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.6,
                    height: 'auto',
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-sm text-[#5d6b64] font-sans leading-relaxed mb-4">
                    {strip.subtitle}
                  </p>

                  <a
                    href={strip.href}
                    target={idx === 2 ? '_blank' : undefined}
                    rel={idx === 2 ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#2d6e4e] uppercase tracking-wider hover:text-[#0c3322] transition-colors"
                  >
                    <span>{strip.actionText}</span>
                    <span className="text-lg">→</span>
                  </a>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
