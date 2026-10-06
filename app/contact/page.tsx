"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ShieldCheck,
  Droplet,
  Sprout,
  FlaskConical,
  Beef,
  Egg,
  Leaf,
  Recycle,
  Fish,
} from "lucide-react";
import styles from "./contact.module.css";
import ContactSendMessage from "./_components/ContactSendMessage";
import BiofactorFooter from "../components/BiofactorFooter";

// ---------------------------------------------------------------------------
// Animation helpers
// ---------------------------------------------------------------------------

const EASE: [number, number, number, number] = [0.22, 0.8, 0.3, 1];

/** Shared fade-up variants used for every reveal in F03 and F04 */
function fadeUpVariants(stagger = 0.07): Variants {
  return {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: EASE,
        staggerChildren: stagger,
      },
    },
  };
}

const ITEM_VARIANT: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const VIEWPORT = { once: true, amount: 0.25 as const };

// ---------------------------------------------------------------------------
// Frame 03 — expertise data
// ---------------------------------------------------------------------------

const EXPERTISE = [
  { label: "Crop Protection", Icon: ShieldCheck },
  { label: "Irrigation", Icon: Droplet },
  { label: "Seeds", Icon: Sprout },
  { label: "Fertilizers", Icon: FlaskConical },
  { label: "Ruminants", Icon: Beef },
  { label: "Poultry", Icon: Egg },
  { label: "Agriculture", Icon: Leaf },
  { label: "Bioremediation", Icon: Recycle },
  { label: "Aquaculture", Icon: Fish },
] as const;

// ---------------------------------------------------------------------------
// Frame 03 — ContactForm component (client, controlled)
// ---------------------------------------------------------------------------

interface FormState {
  name: string;
  email: string;
  phone: string;
  area: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  area: "",
  subject: "",
  message: "",
};

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/** Animated SVG check drawn on mount with pathLength. */
function SuccessCheck() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", margin: "0 auto 20px" }}
    >
      <motion.circle
        cx="36"
        cy="36"
        r="32"
        stroke="#7fd4a2"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      />
      <motion.path
        d="M22 36.5l9.5 9.5 18-18"
        stroke="#7fd4a2"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: EASE, delay: 0.7 }}
      />
    </svg>
  );
}

/** The success card shown after a successful send. */
function SuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      role="status"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
      style={{
        padding: "48px 28px",
        borderRadius: 18,
        background: "rgba(255,255,255,.07)",
        border: "1px solid rgba(127,212,162,.4)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}
    >
      <SuccessCheck />
      <h3
        style={{
          color: "#fff",
          fontSize: 24,
          fontWeight: 700,
          margin: "0 0 12px",
          fontFamily: "Poppins, system-ui, sans-serif",
        }}
      >
        Message sent successfully
      </h3>
      <p
        style={{
          color: "#b9d9c6",
          fontSize: 14,
          lineHeight: 1.7,
          maxWidth: 320,
          margin: "0 0 28px",
          fontFamily: "Poppins, system-ui, sans-serif",
        }}
      >
        Thank you! Our agricultural experts have received your message and will
        contact you within one working day.
      </p>
      <motion.button
        type="button"
        onClick={onReset}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          background: "transparent",
          border: "1.5px solid #7fd4a2",
          color: "#7fd4a2",
          borderRadius: 10,
          padding: "12px 26px",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "Poppins, system-ui, sans-serif",
          transition: "background 0.3s, color 0.3s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#7fd4a2";
          (e.currentTarget as HTMLButtonElement).style.color = "#0f3b28";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = "#7fd4a2";
        }}
      >
        Send another message
      </motion.button>
    </motion.div>
  );
}

/** The contact form. */
function ContactForm({ reduced }: { reduced: boolean }) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // refs for focusing first invalid field
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const change = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const fields: Array<{
      key: keyof FormState;
      ref: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>;
      label: string;
    }> = [
      { key: "name", ref: nameRef, label: "Full Name" },
      { key: "email", ref: emailRef, label: "Email" },
      { key: "phone", ref: phoneRef, label: "Phone" },
      { key: "area", ref: areaRef, label: "Area" },
      { key: "subject", ref: subjectRef, label: "Subject" },
      { key: "message", ref: messageRef, label: "Message" },
    ];

    for (const f of fields) {
      if (!form[f.key].trim()) {
        setError("Please fill in all required fields.");
        (f.ref.current as HTMLElement | null)?.focus();
        return;
      }
    }
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
      emailRef.current?.focus();
      return;
    }

    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccess(true);
      } else {
        setError(
          "Something went wrong. Please try again or call 7013074400."
        );
        setSending(false);
      }
    } catch {
      setError(
        "Something went wrong. Please try again or call 7013074400."
      );
      setSending(false);
    }
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setSuccess(false);
    setError("");
    setSending(false);
  };

  // Shared input style
  const inputStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: "Poppins, system-ui, sans-serif",
    fontSize: 14,
    padding: "12px 14px",
    background: "rgba(255,255,255,.07)",
    border: "1px solid rgba(255,255,255,.18)",
    borderRadius: 10,
    color: "#fff",
    outline: "none",
    transition: "border-color 0.25s, background 0.25s",
    boxSizing: "border-box" as const,
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#cfe8d9",
    marginBottom: 6,
    fontFamily: "Poppins, system-ui, sans-serif",
  };
  const fieldWrap: React.CSSProperties = { display: "flex", flexDirection: "column" };

  const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#7fd4a2";
    e.currentTarget.style.background = "rgba(255,255,255,.11)";
  };
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,.18)";
    e.currentTarget.style.background = "rgba(255,255,255,.07)";
  };

  const formVariants = fadeUpVariants(0.07);

  return (
    <AnimatePresence mode="wait">
      {success ? (
        <SuccessCard key="success" onReset={reset} />
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          initial={reduced ? false : "hidden"}
          animate="visible"
          exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
          variants={formVariants}
          style={{ display: "flex", flexDirection: "column", gap: 0 }}
        >
          {/* Row 1: Name + Email */}
          <motion.div
            variants={ITEM_VARIANT}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
            className={styles.formRow}
          >
            <div style={fieldWrap}>
              <label htmlFor="cf-name" style={labelStyle}>
                Full Name *
              </label>
              <input
                id="cf-name"
                ref={nameRef}
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={change}
                placeholder="Enter your name"
                style={inputStyle}
                onFocus={focusIn}
                onBlur={focusOut}
                aria-required="true"
              />
            </div>
            <div style={fieldWrap}>
              <label htmlFor="cf-email" style={labelStyle}>
                Email Address *
              </label>
              <input
                id="cf-email"
                ref={emailRef}
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={change}
                placeholder="Enter your email"
                style={inputStyle}
                onFocus={focusIn}
                onBlur={focusOut}
                aria-required="true"
              />
            </div>
          </motion.div>

          {/* Row 2: Phone + Area */}
          <motion.div
            variants={ITEM_VARIANT}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}
            className={styles.formRow}
          >
            <div style={fieldWrap}>
              <label htmlFor="cf-phone" style={labelStyle}>
                Phone Number *
              </label>
              <input
                id="cf-phone"
                ref={phoneRef}
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={change}
                placeholder="Enter phone number"
                style={inputStyle}
                onFocus={focusIn}
                onBlur={focusOut}
                aria-required="true"
              />
            </div>
            <div style={fieldWrap}>
              <label htmlFor="cf-area" style={labelStyle}>
                Area (State &amp; District) *
              </label>
              <input
                id="cf-area"
                ref={areaRef}
                name="area"
                type="text"
                value={form.area}
                onChange={change}
                placeholder="e.g., Telangana, Hyderabad"
                style={inputStyle}
                onFocus={focusIn}
                onBlur={focusOut}
                aria-required="true"
              />
            </div>
          </motion.div>

          {/* Subject */}
          <motion.div variants={ITEM_VARIANT} style={{ ...fieldWrap, marginTop: 14 }}>
            <label htmlFor="cf-subject" style={labelStyle}>
              Subject *
            </label>
            <select
              id="cf-subject"
              ref={subjectRef}
              name="subject"
              value={form.subject}
              onChange={change}
              style={{
                ...inputStyle,
                appearance: "none",
                WebkitAppearance: "none",
              }}
              onFocus={focusIn}
              onBlur={focusOut}
              aria-required="true"
            >
              <option value="">Select a topic</option>
              {EXPERTISE.map((e) => (
                <option key={e.label} value={e.label} style={{ color: "#1c2b24", background: "#fff" }}>
                  {e.label}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Message */}
          <motion.div variants={ITEM_VARIANT} style={{ ...fieldWrap, marginTop: 14 }}>
            <label htmlFor="cf-message" style={labelStyle}>
              Your Message *
            </label>
            <textarea
              id="cf-message"
              ref={messageRef}
              name="message"
              rows={4}
              value={form.message}
              onChange={change}
              placeholder="Tell us about your agricultural needs, farm size, crops grown…"
              style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
              onFocus={focusIn}
              onBlur={focusOut}
              aria-required="true"
            />
          </motion.div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              style={{
                color: "#ffb4a8",
                fontSize: 13,
                marginTop: 10,
                fontFamily: "Poppins, system-ui, sans-serif",
              }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <motion.div variants={ITEM_VARIANT} style={{ marginTop: 18 }}>
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={sending ? undefined : { y: -1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                width: "100%",
                padding: "14px 24px",
                background: sending ? "#2e7a55" : "#3d9a6a",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                cursor: sending ? "not-allowed" : "pointer",
                fontFamily: "Poppins, system-ui, sans-serif",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => {
                if (!sending)
                  (e.currentTarget as HTMLButtonElement).style.background = "#49ad7a";
              }}
              onMouseLeave={(e) => {
                if (!sending)
                  (e.currentTarget as HTMLButtonElement).style.background = "#3d9a6a";
              }}
            >
              {sending ? "Sending…" : "Send Message"}
            </motion.button>
          </motion.div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const [activeDot, setActiveDot] = useState(0);
  const [openStrip, setOpenStrip] = useState(0);

  // Frame 04 live state
  const [todayIndex, setTodayIndex] = useState<number | null>(null);

  // Frame 04 today tile — computed after mount to avoid hydration mismatch
  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // 0 Sun … 6 Sat
    // Tile index: Mon=0 … Sat=5, Sun=6
    setTodayIndex(day === 0 ? 6 : day - 1);
  }, []);

  // IntersectionObserver for frames 01/02/05 (classic CSS-class system)
  // Frames 03/04 are handled by Framer Motion whileInView
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const container = containerRef.current;
    if (!container) return;

    const frames = Array.from(container.querySelectorAll<HTMLElement>(".fr"));

    function count(el: HTMLElement) {
      const to = +(el.dataset.c || 0);
      const s = el.dataset.s || "";
      let t0: number | null = null;
      function f(t: number) {
        t0 = t0 || t;
        const p = Math.min((t - t0) / 1800, 1);
        el.textContent =
          Math.round(to * (1 - Math.pow(1 - p, 4))).toLocaleString("en-IN") + s;
        if (p < 1) requestAnimationFrame(f);
      }
      requestAnimationFrame(f);
    }

    if (frames[0]) frames[0].classList.add("act");

    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          const f = e.target as HTMLElement;
          const i = frames.indexOf(f);
          if (e.isIntersecting || e.intersectionRatio > 0.15) {
            f.classList.add("act");
            if (i !== -1) setActiveDot(i);
            f.querySelectorAll<HTMLElement>("[data-c]").forEach((el) => {
              setTimeout(() => count(el), 300);
            });
          } else if (e.intersectionRatio === 0) {
            f.classList.remove("act");
            f.querySelectorAll<HTMLElement>("[data-c]").forEach((el) => {
              el.textContent = "0";
            });
          }
        });
      },
      { threshold: [0, 0.15, 0.45], rootMargin: "0px 0px -5% 0px" }
    );

    frames.forEach((f) => io.observe(f));

    const handleScroll = () => {
      const vine = document.getElementById("vine");
      if (vine) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const pct = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
        vine.style.width = pct + "%";
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const hi = hiRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      if (!hi || reduce) return;
      const b = hi.getBoundingClientRect();
      hi.style.setProperty("--px", ((e.clientX - b.left) / b.width - 0.5).toFixed(3));
      hi.style.setProperty("--py", ((e.clientY - b.top) / b.height - 0.5).toFixed(3));
    };
    const handleMouseLeave = () => {
      if (!hi) return;
      hi.style.setProperty("--px", "0");
      hi.style.setProperty("--py", "0");
    };

    if (hi && !reduce) {
      hi.addEventListener("mousemove", handleMouseMove);
      hi.addEventListener("mouseleave", handleMouseLeave);
    }

    const cv = canvasRef.current;
    let animId: number;
    if (cv) {
      const cx = cv.getContext("2d");
      let W = (cv.width = cv.offsetWidth || 400);
      let H = (cv.height = cv.offsetHeight || 300);
      const size = () => {
        if (!cv) return;
        W = cv.width = cv.offsetWidth;
        H = cv.height = cv.offsetHeight;
      };
      window.addEventListener("resize", size);

      const P: Array<{ x: number; y: number; r: number; v: number; s: number }> = [];
      for (let i = 0; i < 40; i++) {
        P.push({ x: Math.random() * (W || 700), y: Math.random() * (H || 460), r: Math.random() * 2 + 0.6, v: Math.random() * 0.4 + 0.15, s: Math.random() * 6 });
      }

      const loop = (t: number) => {
        if (!cx) return;
        cx.clearRect(0, 0, W, H);
        P.forEach((p) => {
          if (!reduce) {
            p.y -= p.v;
            p.x += Math.sin(t / 900 + p.s) * 0.3;
          }
          if (p.y < -8) { p.y = H + 8; p.x = Math.random() * W; }
          const a = 0.3 + 0.3 * Math.sin(t / 500 + p.s);
          const g = cx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
          g.addColorStop(0, "rgba(150,255,200," + a + ")");
          g.addColorStop(1, "rgba(150,255,200,0)");
          cx.fillStyle = g;
          cx.beginPath();
          cx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
          cx.fill();
        });
        animId = requestAnimationFrame(loop);
      };
      animId = requestAnimationFrame(loop);

      return () => {
        io.disconnect();
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", size);
        if (hi) { hi.removeEventListener("mousemove", handleMouseMove); hi.removeEventListener("mouseleave", handleMouseLeave); }
        cancelAnimationFrame(animId);
      };
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (hi) { hi.removeEventListener("mousemove", handleMouseMove); hi.removeEventListener("mouseleave", handleMouseLeave); }
    };
  }, []);

  const scrollToFrame = (index: number) => {
    if (!containerRef.current) return;
    const frames = Array.from(containerRef.current.querySelectorAll<HTMLElement>(".fr"));
    if (frames[index]) frames[index].scrollIntoView({ behavior: "smooth" });
  };

  // Shared stagger parent variants
  const sectionVariants = fadeUpVariants(0.07);

  // Day tiles for Frame 04
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <div className={`contactContainer ${styles.contactContainer}`} ref={containerRef}>
        {/* Top Vine Progress Bar */}
        <div id="vine" />

        {/* Frame Navigation Dots */}
        <div className="dots" id="dots">
          {["Intro", "Contact", "Message", "Hours", "Results"].map((name, i) => (
            <b key={i} title={name} className={activeDot === i ? "on" : ""} onClick={() => scrollToFrame(i)} />
          ))}
        </div>

        {/* ================================================================
            FRAME 1: HERO (unchanged)
        ================================================================ */}
        <section className="fr hero act" data-n="Intro" id="frame-1">
          <div className="lab">01 / 05 · GET IN TOUCH</div>
          <div>
            <h1 className="wipe">
              Grow With <em>Expert</em> Agricultural Support
            </h1>
            <p className="lead a" style={{ "--d": 900 } as React.CSSProperties}>
              Get personalized solutions for your farming needs. Our team of agricultural
              experts is ready to help you increase yield and maximize profits.
            </p>
            <Link href="/science-technology">
              <button className="btn a" style={{ "--d": 1050, marginTop: "22px" } as React.CSSProperties}>
                Explore Science &amp; Tech →
              </button>
            </Link>
          </div>
          <div className="imgwrap" id="hi" ref={hiRef}>
            <div className="bg" />
            <canvas id="spores" ref={canvasRef} />
            <div className="scan" />
            <i className="k k1" /><i className="k k2" /><i className="k k3" /><i className="k k4" />
            <div className="hud">FIELD SCAN · ACTIVE</div>
          </div>
        </section>

        {/* ================================================================
            FRAME 2: REACH US (unchanged)
        ================================================================ */}
        <section className="fr f2" data-n="Contact" id="frame-2">
          <div className="lab">02 / 05 · REACH US</div>
          <h3 className="a">Three ways to reach our experts</h3>
          <div className="strips" id="strips">
            <div className={`strip ${openStrip === 0 ? "open" : ""}`} style={{ "--d": 0 } as React.CSSProperties} onMouseEnter={() => setOpenStrip(0)} onClick={() => setOpenStrip(0)}>
              <div className="big">
                <svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
              </div>
              <div>
                <h4>Call Us</h4>
                <div className="v">7013074400</div>
                <div className="dt">Visiting hours: 9:30 AM – 6:30 PM, Monday to Saturday.</div>
              </div>
            </div>
            <div className={`strip ${openStrip === 1 ? "open" : ""}`} style={{ "--d": 140 } as React.CSSProperties} onMouseEnter={() => setOpenStrip(1)} onClick={() => setOpenStrip(1)}>
              <div className="big">
                <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              </div>
              <div>
                <h4>Email Us</h4>
                <div className="v">info@biofactor.in</div>
                <div className="dt">General inquiries. Our specialists reply within 24 hours.</div>
              </div>
            </div>
            <div className={`strip ${openStrip === 2 ? "open" : ""}`} style={{ "--d": 280 } as React.CSSProperties} onMouseEnter={() => setOpenStrip(2)} onClick={() => setOpenStrip(2)}>
              <div className="big">
                <svg viewBox="0 0 24 24"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
              </div>
              <div>
                <h4>Visit Us</h4>
                <div className="v">Head Office</div>
                <div className="dt">4 &amp; 5 Floors, Sai Medha Infra, Arca Satya Residency, Kousalya Colony, Bachupally, Hyderabad, Telangana 500090.</div>
              </div>
            </div>
          </div>
        </section>

        <ContactSendMessage />

        {/* ================================================================
            FRAME 4: VISITING HOURS — redesigned
        ================================================================ */}
        <section
          className="fr f4"
          data-n="Hours"
          id="frame-4"
          style={{ background: "#f6f2e7", color: "#0f3b28" }}
        >
          <div className="lab" style={{ color: "#2f7d57" }}>04 / 05 · VISITING HOURS</div>

          <div className={styles.f4Wrap}>
            {/* ---- LEFT ---- */}
            <motion.div
              variants={sectionVariants}
              initial={reduced ? false : "hidden"}
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <motion.p variants={ITEM_VARIANT} className={styles.f4Eyebrow}>
                04 / 05 · VISITING HOURS
              </motion.p>
              <motion.h2 variants={ITEM_VARIANT} className={styles.f4Heading}>
                We&rsquo;re open six days a week
              </motion.h2>
              <motion.p variants={ITEM_VARIANT} className={styles.f4Sub}>
                Walk in or call us during these hours.
              </motion.p>

            </motion.div>

            {/* ---- RIGHT: hours card ---- */}
            <motion.div
              variants={ITEM_VARIANT}
              initial={reduced ? false : "hidden"}
              whileInView="visible"
              viewport={VIEWPORT}
              className={styles.hoursCard}
            >
              {/* 1. Day label */}
              <p className={styles.hoursCardLabel}>Monday – Saturday</p>

              {/* 2. Large time display */}
              <p className={styles.hoursTime}>
                9:30 AM{" "}
                <span className={styles.hoursTo}>to</span>
                {" "}6:30 PM
              </p>

              {/* 3. Day tiles */}
              <motion.div
                className={styles.dayTiles}
                variants={fadeUpVariants(0.09)}
                initial={reduced ? false : "hidden"}
                whileInView="visible"
                viewport={VIEWPORT}
              >
                {DAYS.map((d, i) => {
                  const isToday = todayIndex === i;
                  const isSun = i === 6;
                  return (
                    <motion.div
                      key={d}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.5,
                            ease: EASE,
                            delay: 0.3 + i * 0.09,
                          },
                        },
                      }}
                      className={styles.dayTile}
                      style={{
                        background: isSun ? "#f6dcd8" : "#3d9a6a",
                        color: isSun ? "#b03a2e" : "#fff",
                        border: isSun
                          ? "1px solid #f0c3bc"
                          : "1px solid transparent",
                        boxShadow: isToday
                          ? "0 0 0 3px rgba(61,154,106,.28)"
                          : "none",
                      }}
                    >
                      {d}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* 4. Timeline */}
              <div className={styles.timeline} aria-hidden="true">
                <div className={styles.timelineTrack}>
                  <motion.div
                    className={styles.timelineFill}
                    initial={reduced ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 1.1, ease: EASE, delay: 1.0 }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
                <div className={styles.timelineTicks}>
                  {["8 AM", "12 PM", "4 PM", "8 PM"].map((t) => (
                    <span key={t} className={styles.timelineTick}>{t}</span>
                  ))}
                </div>
              </div>

              {/* 5. Divider + Sunday note */}
              <hr className={styles.divider} />
              <p className={styles.sundayNote}>
                <strong style={{ color: "#b03a2e" }}>Sunday:</strong> closed.
                {" "}Call or message us and we'll get back on Monday.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            FRAME 5: WHY CHOOSE US (unchanged)
        ================================================================ */}
        <section className="fr f5" data-n="Results" id="frame-5">
          <div className="lab">05 / 05 · WHY CHOOSE US</div>
          <h3 className="a">Why Choose Our Agricultural Solutions</h3>
          <div className="deal">
            <div className="sc" style={{ "--k": 0 } as React.CSSProperties}>
              <div className="ic"><svg viewBox="0 0 24 24"><path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z" /></svg></div>
              <h4>Trusted Solutions</h4>
              <p>FCO Supported agricultural products</p>
            </div>
            <div className="sc" style={{ "--k": 1 } as React.CSSProperties}>
              <div className="ic"><svg viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" /></svg></div>
              <h4>Award Winning</h4>
              <p>Recognized for innovation in agri-tech</p>
            </div>
            <div className="sc" style={{ "--k": 2 } as React.CSSProperties}>
              <div className="ic"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
              <h4>Expert Team</h4>
              <p>100+ agricultural specialists</p>
            </div>
            <div className="sc" style={{ "--k": 3 } as React.CSSProperties}>
              <div className="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></svg></div>
              <h4>Proven Results</h4>
              <p>Increased yields for 10,000+ farmers</p>
            </div>
          </div>
          <footer>
            <span>© 2026 Biofactor Biologicals. All rights reserved.</span>
            <span>info@biofactor.in · +91 7013074400</span>
          </footer>
        </section>
      </div>
      <BiofactorFooter />
    </>
  );
}
