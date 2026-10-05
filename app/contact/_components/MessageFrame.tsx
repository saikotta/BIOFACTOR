"use client";

import React, { useRef, useState } from 'react';
import { Send, CheckCircle, MapPin as MapPinIcon } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import styles from '../contact.module.css';

interface MessageFrameProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    area: string;
    subject: string;
    message: string;
  };
  formStatus: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function MessageFrame({ formData, formStatus, handleChange, handleSubmit }: MessageFrameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.45 });

  const expertiseAreas = [
    { icon: '🌱', title: 'Crop Protection' },
    { icon: '💧', title: 'Irrigation' },
    { icon: '🌾', title: 'Seeds' },
    { icon: '🧪', title: 'Fertilizers' },
    { icon: '🏭', title: 'Processing' },
    { icon: '📊', title: 'Consulting' },
  ];

  return (
    <section
      id="frame-3"
      ref={containerRef}
      className={`${styles.frameSection} ${styles.darkSection}`}
    >
      {/* Top-Left Label */}
      <div className={`${styles.frameLabel} text-[#8ee6b3]`}>
        <motion.span
          className={styles.frameLabelLine}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <span>03 / 05 · SEND MESSAGE</span>
      </div>

      {/* Giant faint number bottom-right */}
      <motion.div
        className={`${styles.giantNumber} ${styles.giantNumberDark}`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        03
      </motion.div>

      {/* Grid */}
      <div className={styles.messageGrid}>
        {/* Left Column: Heading + Interactive Orbit */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Tell us what your farm needs
          </motion.h2>

          <motion.p
            className="text-base text-gray-300 font-sans max-w-md mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Our agricultural specialists review every submission and connect you with tailored regional solutions.
          </motion.p>

          {/* Orbit Wrapper */}
          <motion.div
            className={styles.orbitWrapper}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Core */}
            <div className={styles.orbitCore}>
              Our Areas of Expertise
            </div>

            {/* Orbit Track & Pills */}
            <div className={styles.orbitTrack}>
              {expertiseAreas.map((area, i) => {
                const angle = (i * (360 / expertiseAreas.length)) * (Math.PI / 180);
                const radius = 175; // 175px radius
                const x = (Math.cos(angle) * radius).toFixed(3);
                const y = (Math.sin(angle) * radius).toFixed(3);

                return (
                  <div
                    key={i}
                    className={styles.orbitPill}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    <div className={styles.counterRotate}>
                      <span>{area.icon}</span>
                      <span>{area.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Real Contact Form */}
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Row 1: Name & Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <label className="block text-gray-200 text-xs font-semibold uppercase tracking-wider mb-1.5" htmlFor="name">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.darkInput}
                  placeholder="Enter your name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <label className="block text-gray-200 text-xs font-semibold uppercase tracking-wider mb-1.5" htmlFor="email">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.darkInput}
                  placeholder="Enter your email"
                />
              </motion.div>
            </div>

            {/* Row 2: Phone & Area */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <label className="block text-gray-200 text-xs font-semibold uppercase tracking-wider mb-1.5" htmlFor="phone">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={styles.darkInput}
                  placeholder="Enter phone number"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              >
                <label className="block text-gray-200 text-xs font-semibold uppercase tracking-wider mb-1.5" htmlFor="area">
                  Area (State &amp; District) *
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className={styles.darkInput}
                  placeholder="e.g., Telangana, Hyderabad"
                />
              </motion.div>
            </div>

            {/* Row 3: Subject Dropdown */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <label className="block text-gray-200 text-xs font-semibold uppercase tracking-wider mb-1.5" htmlFor="subject">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={`${styles.darkInput} ${styles.darkSelect}`}
              >
                <option value="">Select a topic</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Product Information">Product Information</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Partnership">Partnership Opportunity</option>
                <option value="Distributor">Become a Distributor</option>
                <option value="Dealer Inquiry">Dealer Inquiry</option>
                <option value="Farmer Support">Farmer Support</option>
                <option value="Training Program">Training Program</option>
              </select>
            </motion.div>

            {/* Row 4: Message Textarea */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <label className="block text-gray-200 text-xs font-semibold uppercase tracking-wider mb-1.5" htmlFor="message">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={3}
                className={styles.darkInput}
                placeholder="Tell us about your agricultural needs, farm size, crops grown, etc..."
              />
            </motion.div>

            {/* Info note */}
            <motion.div
              className="flex items-center gap-2 text-xs text-gray-400 font-sans pt-1"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.58 }}
            >
              <MapPinIcon className="w-3.5 h-3.5 text-[#8ee6b3] flex-shrink-0" />
              <span>We use your area information to connect you with our nearest distributor or support team.</span>
            </motion.div>

            {/* Submit Button with Progress Sweep */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className={`${styles.submitBtn} ${formStatus === 'sending' ? styles.submitBtnSending : ''}`}
              >
                {formStatus === 'sending' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white z-10" />
                    <span className="z-10">Sending...</span>
                  </>
                ) : formStatus === 'success' ? (
                  <span className="text-[#8ee6b3] flex items-center gap-2 font-bold z-10">
                    <CheckCircle className="w-5 h-5 text-[#8ee6b3]" />
                    Message Sent ✓
                  </span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {formStatus === 'success' && (
                <div className="mt-3 p-3 bg-[#13482f] border border-[#8ee6b3]/40 rounded-xl">
                  <p className="text-[#8ee6b3] font-bold text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Thank you! Your message has been sent successfully. Our regional team will contact you soon.
                  </p>
                </div>
              )}
            </motion.div>
          </form>
        </div>
      </div>
    </section>
  );
}
