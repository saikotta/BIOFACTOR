"use client";

import React from 'react';
import styles from '../contact.module.css';

interface FrameDotsProps {
  activeFrame: number;
}

export default function FrameDots({ activeFrame }: FrameDotsProps) {
  const scrollToFrame = (frameNum: number) => {
    const el = document.getElementById(`frame-${frameNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDarkFrame = activeFrame === 3;

  return (
    <nav className={styles.frameDotsNav} aria-label="Frame navigation">
      {[1, 2, 3, 4, 5].map((num) => {
        const isActive = activeFrame === num;
        let btnClasses = styles.dotBtn;
        if (isDarkFrame) {
          if (isActive) btnClasses += ` ${styles.dotBtnDarkActive}`;
          else btnClasses += ` ${styles.dotBtnDark}`;
        } else {
          if (isActive) btnClasses += ` ${styles.dotBtnActive}`;
        }

        return (
          <button
            key={num}
            onClick={() => scrollToFrame(num)}
            className={btnClasses}
            aria-label={`Scroll to Frame ${num}`}
            title={`Frame ${num}`}
          />
        );
      })}
    </nav>
  );
}
