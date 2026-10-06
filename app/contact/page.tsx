"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./contact.module.css";
import BiofactorFooter from "../components/BiofactorFooter";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiRef = useRef<HTMLDivElement>(null);

  const [activeDot, setActiveDot] = useState(0);
  const [openStrip, setOpenStrip] = useState(0);
  const [sendState, setSendState] = useState<"idle" | "busy" | "done">("idle");
  const [sendText, setSendText] = useState("Send Message ");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    subject: "Crop Protection",
    message: "",
  });

  // Handle Form Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle Form Submit Animation
  const handleSendClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (sendState === "busy") return;
    setSendState("busy");
    setTimeout(() => {
      setSendState("done");
      setSendText("Message Sent ✓ ");
    }, 1450);
    setTimeout(() => {
      setSendState("idle");
      setSendText("Send Message ");
    }, 4200);
  };

  // IntersectionObserver & Count-up Animation & Canvas & Mouse Parallax
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

    // Immediately activate frame 1 on initial load
    if (frames[0]) {
      frames[0].classList.add("act");
    }

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

    // Vine Progress Bar & Scroll
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

    // Hero Mouse Parallax Depth Effect
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

    // Canvas Particles Animation (Spores)
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
        P.push({
          x: Math.random() * (W || 700),
          y: Math.random() * (H || 460),
          r: Math.random() * 2 + 0.6,
          v: Math.random() * 0.4 + 0.15,
          s: Math.random() * 6,
        });
      }

      const loop = (t: number) => {
        if (!cx) return;
        cx.clearRect(0, 0, W, H);
        P.forEach((p) => {
          if (!reduce) {
            p.y -= p.v;
            p.x += Math.sin(t / 900 + p.s) * 0.3;
          }
          if (p.y < -8) {
            p.y = H + 8;
            p.x = Math.random() * W;
          }
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
        if (hi) {
          hi.removeEventListener("mousemove", handleMouseMove);
          hi.removeEventListener("mouseleave", handleMouseLeave);
        }
        cancelAnimationFrame(animId);
      };
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (hi) {
        hi.removeEventListener("mousemove", handleMouseMove);
        hi.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const scrollToFrame = (index: number) => {
    if (!containerRef.current) return;
    const frames = Array.from(containerRef.current.querySelectorAll<HTMLElement>(".fr"));
    if (frames[index]) {
      frames[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  // Generate Dial Clock Ticks SVG lines
  const renderDialTicks = () => {
    const ticks = [];
    for (let i = 0; i < 24; i++) {
      const an = (i / 24) * 2 * Math.PI;
      const r1 = 100;
      const r2 = i % 6 ? 103 : 108;
      const x1 = Number((110 + Math.sin(an) * r1).toFixed(3));
      const y1 = Number((110 - Math.cos(an) * r1).toFixed(3));
      const x2 = Number((110 + Math.sin(an) * (r2 + 5)).toFixed(3));
      const y2 = Number((110 - Math.cos(an) * (r2 + 5)).toFixed(3));
      ticks.push(<line key={i} className="tk" x1={x1} y1={y1} x2={x2} y2={y2} />);
    }
    return ticks;
  };

  return (
    <>
    <div className={`contactContainer ${styles.contactContainer}`} ref={containerRef}>
      {/* Top Vine Progress Bar */}
      <div id="vine"></div>

      {/* Frame Navigation Dots */}
      <div className="dots" id="dots">
        {["Intro", "Contact", "Message", "Hours", "Results"].map((name, i) => (
          <b
            key={i}
            title={name}
            className={activeDot === i ? "on" : ""}
            onClick={() => scrollToFrame(i)}
          />
        ))}
      </div>

      {/* FRAME 1: HERO */}
      <section className="fr hero act" data-n="Intro" id="frame-1">
        <div className="lab">01 / 05 · GET IN TOUCH</div>
        <div className="no">01</div>
        <div>
          <h1 className="wipe">
            Grow With <em>Expert</em> Agricultural Support
          </h1>
          <p className="lead a" style={{ "--d": 900 } as any}>
            Get personalized solutions for your farming needs. Our team of agricultural
            experts is ready to help you increase yield and maximize profits.
          </p>
          <Link href="/science-technology">
            <button className="btn a" style={{ "--d": 1050, marginTop: "22px" } as any}>
              Explore Science &amp; Tech →
            </button>
          </Link>
        </div>
        <div className="imgwrap" id="hi" ref={hiRef}>
          <div className="bg"></div>
          <canvas id="spores" ref={canvasRef}></canvas>
          <div className="scan"></div>
          <i className="k k1"></i>
          <i className="k k2"></i>
          <i className="k k3"></i>
          <i className="k k4"></i>
          <div className="hud">FIELD SCAN · ACTIVE</div>
        </div>
      </section>

      {/* FRAME 2: REACH US */}
      <section className="fr f2" data-n="Contact" id="frame-2">
        <div className="lab">02 / 05 · REACH US</div>
        <div className="no">02</div>
        <h3 className="a">Three ways to reach our experts</h3>
        <div className="strips" id="strips">
          {/* Strip 1 */}
          <div
            className={`strip ${openStrip === 0 ? "open" : ""}`}
            style={{ "--d": 0 } as any}
            onMouseEnter={() => setOpenStrip(0)}
            onClick={() => setOpenStrip(0)}
          >
            <div className="big">
              <svg viewBox="0 0 24 24">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
              </svg>
            </div>
            <div>
              <h4>Call Us</h4>
              <div className="v">7013074400</div>
              <div className="dt">Visiting hours: 9:30 AM – 6:30 PM, Monday to Saturday.</div>
            </div>
          </div>

          {/* Strip 2 */}
          <div
            className={`strip ${openStrip === 1 ? "open" : ""}`}
            style={{ "--d": 140 } as any}
            onMouseEnter={() => setOpenStrip(1)}
            onClick={() => setOpenStrip(1)}
          >
            <div className="big">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </div>
            <div>
              <h4>Email Us</h4>
              <div className="v">info@biofactor.in</div>
              <div className="dt">General inquiries. Our specialists reply within 24 hours.</div>
            </div>
          </div>

          {/* Strip 3 */}
          <div
            className={`strip ${openStrip === 2 ? "open" : ""}`}
            style={{ "--d": 280 } as any}
            onMouseEnter={() => setOpenStrip(2)}
            onClick={() => setOpenStrip(2)}
          >
            <div className="big">
              <svg viewBox="0 0 24 24">
                <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>
            <div>
              <h4>Visit Us</h4>
              <div className="v">Head Office</div>
              <div className="dt">
                4 &amp; 5 Floors, Sai Medha Infra, Arca Satya Residency, Kousalya Colony, Bachupally, Hyderabad, Telangana 500090.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRAME 3: SEND MESSAGE */}
      <section className="fr f3 dark" data-n="Message" id="frame-3">
        <div className="lab">03 / 05 · SEND MESSAGE</div>
        <div className="no">03</div>
        <div className="wrap">
          <div>
            <h3 className="a" style={{ marginBottom: "10px" }}>
              Tell us what your farm needs
            </h3>
            <div className="orbit" id="orbit">
              <div className="core">
                Our Areas of<br />Expertise
              </div>
              <div className="spin" id="spin">
                {[
                  "Crop Protection",
                  "Irrigation",
                  "Seeds",
                  "Fertilizers",
                  "Processing",
                  "Consulting",
                ].map((t, i) => (
                  <div key={t} className="it" style={{ "--a": `${i * 60}deg` } as any}>
                    <div className="ctr">
                      <span>{t}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form className="form" onSubmit={handleSendClick}>
            <div className="row">
              <div className="ar" style={{ "--d": 100 } as any}>
                <label>Full Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="ar" style={{ "--d": 180 } as any}>
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="ar" style={{ "--d": 260 } as any}>
                <label>Phone Number *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="ar" style={{ "--d": 340 } as any}>
                <label>Area (State &amp; District) *</label>
                <input
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g., Telangana, Hyderabad"
                  required
                />
              </div>
            </div>

            <div className="ar" style={{ "--d": 420 } as any}>
              <label>Subject *</label>
              <select name="subject" value={formData.subject} onChange={handleChange}>
                <option value="Select a topic">Select a topic</option>
                <option value="Crop Protection">Crop Protection</option>
                <option value="Irrigation">Irrigation</option>
                <option value="Seeds">Seeds</option>
                <option value="Fertilizers">Fertilizers</option>
                <option value="Processing">Processing</option>
                <option value="Consulting">Consulting</option>
              </select>
            </div>

            <div className="ar" style={{ "--d": 500 } as any}>
              <label>Your Message *</label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your agricultural needs, farm size, crops grown..."
                required
              />
            </div>

            <div className="ar" style={{ "--d": 580 } as any}>
              <button
                type="submit"
                className={`btn send ${sendState === "busy" ? "busy" : ""} ${sendState === "done" ? "done" : ""}`}
              >
                {sendText}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FRAME 4: VISITING HOURS */}
      <section className="fr f4" data-n="Hours" id="frame-4">
        <div className="lab">04 / 05 · VISITING HOURS</div>
        <div className="no">04</div>
        <div className="wrap">
          <div className="dial a">
            <svg viewBox="0 0 220 220">
              <g id="ticks">{renderDialTicks()}</g>
              <circle className="ring" cx="110" cy="110" r="90" />
              <circle className="arc" cx="110" cy="110" r="90" />
            </svg>
            <div className="mid">
              <b>9:30 – 6:30</b>
              <span>Monday – Saturday</span>
            </div>
          </div>
          <div>
            <h3 className="a" style={{ "--d": 100 } as any}>
              We're open six days a week
            </h3>
            <div className="week" id="week">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, k) => (
                <div
                  key={d}
                  className={`day ${k === 6 ? "off" : ""}`}
                  style={{ "--k": k } as any}
                >
                  <em></em>
                  <i></i>
                  <span>{d}</span>
                  <small>{k === 6 ? "Closed" : "9:30–6:30"}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FRAME 5: WHY CHOOSE US */}
      <section className="fr f5" data-n="Results" id="frame-5">
        <div className="lab">05 / 05 · WHY CHOOSE US</div>
        <div className="no">05</div>
        <h3 className="a">Why Choose Our Agricultural Solutions</h3>
        <div className="deal">
          <div className="sc" style={{ "--k": 0 } as any}>
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z" />
              </svg>
            </div>
            <div className="n" data-c="100" data-s="+">
              0
            </div>
            <p>Agricultural specialists</p>
          </div>

          <div className="sc" style={{ "--k": 1 } as any}>
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <div className="n" data-c="10000" data-s="+">
              0
            </div>
            <p>Farmers with higher yields</p>
          </div>

          <div className="sc" style={{ "--k": 2 } as any}>
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" />
              </svg>
            </div>
            <div className="n" data-c="25" data-s="+">
              0
            </div>
            <p>Awards &amp; recognitions</p>
          </div>

          <div className="sc" style={{ "--k": 3 } as any}>
            <div className="ic">
              <svg viewBox="0 0 24 24">
                <path d="m5 12 5 5 9-10" />
              </svg>
            </div>
            <div className="n" data-c="98" data-s="%">
              0
            </div>
            <p>Client satisfaction</p>
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
