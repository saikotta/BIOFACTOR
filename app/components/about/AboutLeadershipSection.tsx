"use client";

import React, { useEffect, useRef, useState } from "react";

const TEAM = [
  { name: "Dr. L.N. Reddy", role: "Founder & CEO", initials: "LR" },
  { name: "Dr. Anil Ahire", role: "Director", initials: "AA" },
  { name: "Krishna Murali", role: "Director", initials: "KM" },
  { name: "S. Reddy", role: "Director, R&D", initials: "SR" },
];

const STYLES = `
  .bio-leadership {
    max-width: 1280px;
    margin: 0 auto;
    padding: 80px 78px 100px;
    color: #0c3319;
    font-family: var(--font-poppins), Poppins, system-ui, sans-serif;
  }
  .bio-leadership-kicker {
    display: block;
    margin-bottom: 14px;
    color: #17602d;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
  .bio-leadership-title {
    max-width: 520px;
    color: #17602d;
    font-size: clamp(32px, 4.4vw, 48px);
    font-weight: 700;
    letter-spacing: -.01em;
    line-height: 1.15;
  }
  .bio-leadership-team {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 40px;
    margin: 72px 0 0;
    padding: 0;
    list-style: none;
  }
  .bio-leadership-member {
    min-width: 0;
    text-align: center;
  }
  .bio-leadership-badge {
    position: relative;
    width: 132px;
    height: 132px;
    margin: 0 auto 28px;
  }
  .bio-leadership-ring {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  .bio-leadership-ring circle {
    fill: none;
    stroke-width: 1.5;
  }
  .bio-leadership-track {
    stroke: rgba(23, 96, 45, .15);
  }
  .bio-leadership-draw {
    stroke: #17602d;
    stroke-dasharray: 402;
    stroke-dashoffset: 402;
    transition: stroke-dashoffset 1.6s cubic-bezier(.65, 0, .25, 1);
    transition-delay: calc(var(--member-index) * .18s);
  }
  .bio-leadership-fill {
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    background: #17602d;
    transform: scale(0);
    transition: transform .6s cubic-bezier(.22, .8, .2, 1);
  }
  .bio-leadership-initials {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: #17602d;
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -.02em;
    opacity: 0;
    transform: scale(.8);
    transition:
      opacity .8s cubic-bezier(.22, .8, .2, 1),
      transform .8s cubic-bezier(.22, .8, .2, 1),
      color .4s;
    transition-delay: calc(var(--member-index) * .18s + .7s);
  }
  .bio-leadership-name {
    color: #0c3319;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -.01em;
    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity .8s cubic-bezier(.22, .8, .2, 1),
      transform .8s cubic-bezier(.22, .8, .2, 1),
      color .4s;
    transition-delay: calc(var(--member-index) * .18s + .9s);
  }
  .bio-leadership-role {
    margin-top: 6px;
    color: #5d6f62;
    font-size: 14px;
    opacity: 0;
    transform: translateY(12px);
    transition:
      opacity .8s cubic-bezier(.22, .8, .2, 1),
      transform .8s cubic-bezier(.22, .8, .2, 1);
    transition-delay: calc(var(--member-index) * .18s + 1.05s);
  }
  .bio-leadership-team.is-visible .bio-leadership-draw {
    stroke-dashoffset: 0;
  }
  .bio-leadership-team.is-visible .bio-leadership-initials,
  .bio-leadership-team.is-visible .bio-leadership-name,
  .bio-leadership-team.is-visible .bio-leadership-role {
    opacity: 1;
    transform: none;
  }
  .bio-leadership-member:hover .bio-leadership-fill {
    transform: scale(1);
  }
  .bio-leadership-member:hover .bio-leadership-initials {
    color: #fff;
    transform: scale(1.06);
    transition-delay: 0s;
  }
  .bio-leadership-team.is-visible .bio-leadership-member:hover .bio-leadership-name {
    color: #17602d;
    transition-delay: 0s;
  }
  @media (max-width: 900px) {
    .bio-leadership {
      padding: 56px 24px 72px;
    }
    .bio-leadership-team {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 56px 24px;
      margin-top: 48px;
    }
  }
  @media (max-width: 520px) {
    .bio-leadership-name {
      font-size: 18px;
    }
    .bio-leadership-team {
      column-gap: 12px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .bio-leadership *,
    .bio-leadership *::before,
    .bio-leadership *::after {
      transition: none !important;
    }
    .bio-leadership-draw {
      stroke-dashoffset: 0;
    }
    .bio-leadership-initials,
    .bio-leadership-name,
    .bio-leadership-role {
      opacity: 1;
      transform: none;
    }
  }
`;

export default function AboutLeadershipSection() {
  const teamRef = useRef<HTMLUListElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const team = teamRef.current;
    if (!team) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const handleVisibilityChange = () => {
      if (document.hidden) return;
      const rect = team.getBoundingClientRect();
      const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
      const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
      const visibleRatio = (visibleWidth * visibleHeight) / (rect.width * rect.height);
      if (visibleRatio >= 0.3) {
        setIsVisible(true);
        observer.disconnect();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    observer.observe(team);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section className="w-full bg-[#edf3ec]">
      <style>{STYLES}</style>
      <div className="bio-leadership">
        <span className="bio-leadership-kicker">Leadership</span>
        <h2 className="bio-leadership-title">The People Behind the Platform</h2>

        <ul
          ref={teamRef}
          className={`bio-leadership-team${isVisible ? " is-visible" : ""}`}
        >
          {TEAM.map((member, index) => (
            <li
              key={member.initials}
              className="bio-leadership-member"
              style={{ "--member-index": index } as React.CSSProperties}
            >
              <div className="bio-leadership-badge" aria-hidden="true">
                <svg className="bio-leadership-ring" viewBox="0 0 132 132">
                  <circle className="bio-leadership-track" cx="66" cy="66" r="64" />
                  <circle className="bio-leadership-draw" cx="66" cy="66" r="64" />
                </svg>
                <span className="bio-leadership-fill" />
                <span className="bio-leadership-initials">{member.initials}</span>
              </div>
              <h3 className="bio-leadership-name">{member.name}</h3>
              <p className="bio-leadership-role">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
