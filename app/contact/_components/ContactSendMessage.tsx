"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import styles from "./ContactSendMessage.module.css";

const TOPICS = [
  {
    name: "Crop Protection",
    description: "Explore biological support for healthier crops and resilient protection.",
    icon: "shield",
  },
  {
    name: "Irrigation",
    description: "Find biological solutions that help make every drop work harder.",
    icon: "water",
  },
  {
    name: "Seeds",
    description: "Give seeds and young plants a stronger biological foundation.",
    icon: "seed",
  },
  {
    name: "Fertilizers",
    description: "Build soil vitality with biology that works alongside nutrition.",
    icon: "flask",
  },
  {
    name: "Ruminants",
    description: "Support animal wellbeing and productivity through biological innovation.",
    icon: "cow",
  },
  {
    name: "Poultry",
    description: "Discover science-led biological solutions for poultry production.",
    icon: "bird",
  },
  {
    name: "Agriculture",
    description: "Talk with us about practical solutions for your farming needs.",
    icon: "leaf",
  },
  {
    name: "Bioremediation",
    description: "Use beneficial biology to help restore soil and environmental balance.",
    icon: "recycle",
  },
  {
    name: "Aquaculture",
    description: "Support healthier aquatic environments with biological tools.",
    icon: "fish",
  },
] as const;

type Topic = (typeof TOPICS)[number];
type FormValues = {
  name: string;
  email: string;
  phone: string;
  area: string;
  subject: string;
  message: string;
};

const INITIAL_FORM: FormValues = {
  name: "",
  email: "",
  phone: "",
  area: "",
  subject: "",
  message: "",
};

function TopicIcon({ icon, className }: { icon: string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "shield":
      return <svg {...common}><path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></svg>;
    case "water":
      return <svg {...common}><path d="M12 3s6 6.7 6 11a6 6 0 0 1-12 0c0-4.3 6-11 6-11Z" /><path d="M9 15a3 3 0 0 0 3 3" /></svg>;
    case "seed":
      return <svg {...common}><path d="M12 21v-9" /><path d="M12 13C6 13 4 9 4 5c4 0 8 2 8 8Z" /><path d="M12 10c0-4 3-6 8-6 0 4-2 8-8 8" /><path d="M8 21h8" /></svg>;
    case "flask":
      return <svg {...common}><path d="M9 3h6M10 3v6l-5.5 9.2A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.8L14 9V3" /><path d="M8 15h8" /></svg>;
    case "cow":
      return <svg {...common}><path d="M5 9 3 5l5 2M19 9l2-4-5 2" /><path d="M5 9a7 7 0 0 1 14 0v5a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4V9Z" /><path d="M9 12h.01M15 12h.01M10 15h4" /></svg>;
    case "bird":
      return <svg {...common}><path d="M4 15c4-1 5-6 10-7 3-.6 5 1 6 3-2 0-3 1-4 3-2 3-6 4-10 3" /><path d="m19 11 3-1-2 3M8 18l-1 3M12 18v3M9 12c1-2 3-3 5-3" /></svg>;
    case "leaf":
      return <svg {...common}><path d="M20 4C10 3 4 7 4 14a6 6 0 0 0 6 6c7 0 11-7 10-16Z" /><path d="M4 20c3-5 7-8 13-11" /></svg>;
    case "recycle":
      return <svg {...common}><path d="m7 7 2-3 3 1M17 7l3 5-2 2M8 17l-4-1 1-4" /><path d="m9 4 2 4-4 1M20 12l-4 1 1 4M4 16l4-2 2 4" /></svg>;
    case "fish":
      return <svg {...common}><path d="M3 12s4-6 11-6c3 0 5 2 7 6-2 4-4 6-7 6-7 0-11-6-11-6Z" /><path d="m3 12-2-3v6l2-3ZM14 10h.01M10 12c1 1 2 1 3 0" /></svg>;
    default:
      return null;
  }
}

export default function ContactSendMessage() {
  const [form, setForm] = useState<FormValues>(INITIAL_FORM);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [subjectInvalid, setSubjectInvalid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || hoveredTopic || selectedTopic || submitted) return;
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % TOPICS.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, [hoveredTopic, reducedMotion, selectedTopic, submitted]);

  useEffect(() => {
    if (!submitted) return;
    const closeTimer = window.setTimeout(() => setClosing(true), 3000);
    const resetTimer = window.setTimeout(() => {
      setForm(INITIAL_FORM);
      setSelectedTopic(null);
      setHoveredTopic(null);
      setActiveIndex(0);
      setSubjectInvalid(false);
      setSubmitted(false);
      setClosing(false);
    }, 3350);
    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(resetTimer);
    };
  }, [submitted]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [dropdownOpen]);

  const activeTopicName = hoveredTopic ?? selectedTopic ?? TOPICS[activeIndex].name;
  const activeTopic: Topic =
    TOPICS.find((topic) => topic.name === activeTopicName) ?? TOPICS[0];
  const selectedSubject = form.subject;

  const setSubject = (subject: string) => {
    setForm((current) => ({ ...current, subject }));
    const topic = TOPICS.find((item) => item.name === subject);
    setSelectedTopic(topic?.name ?? null);
    if (topic) setActiveIndex(TOPICS.indexOf(topic));
    setSubjectInvalid(false);
  };

  const selectTopic = (topic: Topic) => {
    setSubject(topic.name);
    setDropdownOpen(false);
  };

  const handleDropdownKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!dropdownOpen) {
        setDropdownOpen(true);
        const index = TOPICS.findIndex((topic) => topic.name === selectedSubject);
        setHighlightedIndex(index >= 0 ? index : 0);
      } else {
        setHighlightedIndex((index) =>
          event.key === "ArrowDown"
            ? (index + 1) % (TOPICS.length + 1)
            : (index - 1 + TOPICS.length + 1) % (TOPICS.length + 1)
        );
      }
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && dropdownOpen) {
      event.preventDefault();
      if (highlightedIndex === TOPICS.length) setSubject("Other");
      else selectTopic(TOPICS[highlightedIndex]);
      setDropdownOpen(false);
      return;
    }
    if (event.key === "Escape" && dropdownOpen) {
      event.preventDefault();
      setDropdownOpen(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubjectInvalid(false);
    if (!form.subject) {
      setSubjectInvalid(true);
      dropdownButtonRef.current?.focus();
      setDropdownOpen(false);
      return;
    }
    if (!formRef.current?.reportValidity()) return;

    // TODO: Send the validated form data to the contact API/email service here.
    setSubmitted(true);
  };

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <section className={`fr f3 dark ${styles.section}`} data-n="Message" id="frame-3">
      <div className={styles.frameLabel}>03 / 05 · SEND MESSAGE</div>
      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <h2 className={styles.heading}>Tell us what your farm needs</h2>
          <p className={styles.areaLabel}>OUR AREAS OF EXPERTISE</p>
          <div
            className={`${styles.honeycomb} ${reducedMotion ? styles.reduced : ""}`}
            aria-label="Areas of expertise"
          >
            {[0, 1, 2].map((row) => (
              <div
                className={`${styles.hexRow} ${row === 1 ? styles.middleRow : ""}`}
                key={row}
              >
                {TOPICS.slice(row * 3, row * 3 + 3).map((topic, column) => {
                  const index = row * 3 + column;
                  const isSelected = selectedTopic === topic.name;
                  const isActive = activeTopic.name === topic.name;
                  return (
                    <button
                      type="button"
                      key={topic.name}
                      className={`${styles.hexButton} ${isActive ? styles.hexActive : ""} ${
                        isSelected ? styles.hexSelected : ""
                      }`}
                      aria-label={`${topic.name}: ${topic.description}`}
                      aria-pressed={isSelected}
                      style={{
                        animationDelay: reducedMotion ? "0ms" : `${index * 60}ms`,
                      }}
                      onMouseEnter={() => setHoveredTopic(topic.name)}
                      onMouseLeave={() => setHoveredTopic(null)}
                      onFocus={() => setHoveredTopic(topic.name)}
                      onBlur={() => setHoveredTopic(null)}
                      onClick={() => selectTopic(topic)}
                    >
                      <span className={styles.hexInner}>
                        <TopicIcon icon={topic.icon} className={styles.hexIcon} />
                        <span className={styles.hexName}>{topic.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className={styles.infoPanel} key={activeTopic.name}>
            <TopicIcon icon={activeTopic.icon} className={styles.infoIcon} />
            <div>
              <h3>{activeTopic.name}</h3>
              <p>{activeTopic.description}</p>
            </div>
          </div>
          <p className={styles.hint}>
            Hover a topic to explore it. Click to use it as your subject.
          </p>
        </div>

        <div className={styles.formStage}>
          <form
            ref={formRef}
            className={`${styles.form} ${submitted ? styles.formHidden : ""}`}
            onSubmit={handleSubmit}
            noValidate={false}
          >
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="contact-full-name">Full Name *</label>
                <input id="contact-full-name" name="name" value={form.name} onChange={updateField} placeholder="Enter your name" autoComplete="name" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-email">Email Address *</label>
                <input id="contact-email" name="email" type="email" value={form.email} onChange={updateField} placeholder="Enter your email" autoComplete="email" required />
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="contact-phone">Phone Number *</label>
                <input id="contact-phone" name="phone" type="tel" value={form.phone} onChange={updateField} placeholder="Enter phone number" autoComplete="tel" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-area">Area (State &amp; District) *</label>
                <input id="contact-area" name="area" value={form.area} onChange={updateField} placeholder="e.g., Telangana, Hyderabad" required />
              </div>
            </div>
            <div className={styles.field} ref={dropdownRef}>
              <label id="contact-subject-label">Subject *</label>
              <div className={styles.dropdownWrap}>
                <button
                  ref={dropdownButtonRef}
                  type="button"
                  className={`${styles.dropdownButton} ${dropdownOpen ? styles.dropdownOpen : ""} ${
                    subjectInvalid ? styles.dropdownInvalid : ""
                  }`}
                  aria-labelledby="contact-subject-label"
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                  aria-controls="contact-subject-options"
                  aria-invalid={subjectInvalid}
                  aria-activedescendant={dropdownOpen ? `subject-option-${highlightedIndex}` : undefined}
                  onClick={() => {
                    if (!dropdownOpen) {
                      const selectedIndex = TOPICS.findIndex(
                        (topic) => topic.name === selectedSubject
                      );
                      setHighlightedIndex(
                        selectedSubject === "Other"
                          ? TOPICS.length
                          : Math.max(0, selectedIndex)
                      );
                    }
                    setDropdownOpen(!dropdownOpen);
                    setSubjectInvalid(false);
                  }}
                  onKeyDown={handleDropdownKeyDown}
                >
                  <span className={selectedSubject ? "" : styles.placeholder}>
                    {selectedSubject || "Select a subject"}
                  </span>
                  <svg className={styles.chevron} viewBox="0 0 20 20" aria-hidden="true">
                    <path d="m5 7.5 5 5 5-5" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div
                    id="contact-subject-options"
                    className={styles.options}
                    role="listbox"
                    aria-labelledby="contact-subject-label"
                  >
                    {[...TOPICS.map((topic) => topic.name), "Other"].map((option, index) => (
                      <div
                        id={`subject-option-${index}`}
                        key={option}
                        role="option"
                        aria-selected={selectedSubject === option}
                        className={`${styles.option} ${
                          selectedSubject === option ? styles.optionSelected : ""
                        } ${highlightedIndex === index ? styles.optionHighlighted : ""}`}
                        style={{ "--option-index": index } as React.CSSProperties}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        onClick={() => {
                          if (option === "Other") setSubject(option);
                          else selectTopic(TOPICS[index]);
                          setDropdownOpen(false);
                          dropdownButtonRef.current?.focus();
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {subjectInvalid && (
                <span className={styles.validationMessage} role="alert">
                  Please choose a subject.
                </span>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-message">Your Message *</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={updateField}
                placeholder="Tell us about your agricultural needs, farm size, crops grown..."
                rows={4}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>Send Message</button>
          </form>

          {submitted && (
            <div
              className={`${styles.thankYou} ${closing ? styles.thankYouClosing : ""}`}
              aria-live="polite"
              role="status"
            >
              <svg className={styles.successMark} viewBox="0 0 72 72" aria-hidden="true">
                <circle cx="36" cy="36" r="32" />
                <path d="m21 37 10 10 20-22" />
              </svg>
              <h3>Thank you for sending!</h3>
              <p>We received your message and will get back to you soon.</p>
              <div className={styles.progressTrack}><span /></div>
              <small>Returning to the form...</small>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
