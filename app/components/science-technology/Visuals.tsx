"use client";

import React from "react";

export function Visual01() {
  const stages = ["strain", "isolated", "characterized", "tested", "formulation"];
  const dots = Array.from({ length: 60 });

  return (
    <div className="st-v1">
      <div className="st-st">
        {stages.map((w, i) => (
          <div key={w} className="st-stg" style={{ "--i": i } as React.CSSProperties}>
            <i />
            <span>{w}</span>
          </div>
        ))}
      </div>

      <div className="st-gr">
        {dots.map((_, i) => (
          <i
            key={i}
            className={i % 9 === 4 ? "e" : ""}
            style={{ "--d": i } as React.CSSProperties}
          />
        ))}
      </div>

      <span
        className="st-tg"
        style={{ "--i": 5, position: "static", alignSelf: "flex-start" } as React.CSSProperties}
      >
        350+ MICROBIAL STRAIN BANK
      </span>

      <style jsx>{`
        .st-v1 {
          position: absolute;
          inset: 0;
          padding: 9% 7%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .st-st {
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        .st-st::before {
          content: "";
          position: absolute;
          left: 5%;
          right: 5%;
          top: 20px;
          height: 2px;
          background: linear-gradient(90deg, #1f7a4d, #6b4226);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1.8s ease 0.5s;
        }

        :global(.s.in) .st-st::before {
          transform: none;
        }

        .st-stg {
          position: relative;
          display: grid;
          justify-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #143324;
        }

        .st-stg span {
          color: #143324 !important;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .st-stg i {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #1f7a4d;
          background: #fff;
          transform: scale(0);
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          transition-delay: calc(var(--i) * 0.3s + 0.3s);
        }

        :global(.s.in) .st-stg i {
          transform: none;
        }

        .st-stg:last-child i {
          background: #1f7a4d;
        }

        .st-gr {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 12px;
          justify-items: center;
        }

        .st-gr i {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: #1f7a4d;
          opacity: 0;
          transform: scale(0);
          transition: opacity 0.4s, transform 0.4s;
          transition-delay: calc(var(--d) * 28ms + 1.2s);
        }

        .st-gr i.e {
          background: #6b4226;
        }

        :global(.s.in) .st-gr i {
          opacity: 0.85;
          transform: none;
        }

        .st-tg {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid rgba(31, 122, 77, 0.3);
          white-space: nowrap;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.6s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: calc(var(--i) * 0.15s + 0.6s);
          color: #143324 !important;
        }

        :global(.s.in) .st-tg {
          opacity: 1;
          transform: none;
        }

        @media (max-width: 640px) {
          .st-stg span {
            font-size: 8px !important;
            letter-spacing: 0.03em !important;
          }
          .st-tg {
            font-size: 10px !important;
            letter-spacing: 0.06em !important;
            white-space: normal !important;
            max-width: 100% !important;
            text-align: left !important;
            box-sizing: border-box !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .st-st::before {
            transform: none !important;
            transition: none !important;
          }
          .st-stg i,
          .st-gr i,
          .st-tg {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export function Visual02() {
  const paths = [
    "M200 200Q150 130 95 95",
    "M200 200Q270 150 320 120",
    "M200 200Q214 270 200 322",
  ];

  return (
    <svg viewBox="0 0 400 400" className="st-v-svg" aria-hidden="true">
      {paths.map((p, i) => (
        <React.Fragment key={p}>
          <path className="ln" pathLength={1} d={p} />
          <circle r="4.5" fill="#8B5E34">
            <animateMotion
              dur="2.8s"
              begin={`${i * 0.7}s`}
              repeatCount="indefinite"
              path={p}
            />
          </circle>
        </React.Fragment>
      ))}

      <rect x="168" y="184" width="64" height="32" rx="16" fill="#6B4226">
        <animate
          attributeName="opacity"
          values=".8;1;.8"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="178" y="190" width="30" height="8" rx="4" fill="#fff" opacity="0.35" />

      {/* Node 1: Enzyme */}
      <circle cx="95" cy="95" r="24" fill="#1F7A4D" opacity="0.85" />
      <circle cx="105" cy="87" r="8" fill="#EDF4ED" />

      {/* Node 2: Acid */}
      <polygon
        points="320,96 341,108 341,132 320,144 299,132 299,108"
        fill="none"
        stroke="#1F7A4D"
        strokeWidth="3"
      />
      <circle cx="320" cy="120" r="6" fill="#8B5E34" />

      {/* Node 3: Signal Molecule */}
      <circle cx="200" cy="322" r="7" fill="#1F7A4D" />
      <circle className="rp" cx="200" cy="322" r="17" fill="none" stroke="#1F7A4D" />
      <circle
        className="rp"
        style={{ animationDelay: "1s" }}
        cx="200"
        cy="322"
        r="17"
        fill="none"
        stroke="#1F7A4D"
      />

      <text x="95" y="146" textAnchor="middle" fill="#143324">
        an enzyme
      </text>
      <text x="320" y="172" textAnchor="middle" fill="#143324">
        an acid
      </text>
      <text x="200" y="372" textAnchor="middle" fill="#143324">
        a signal molecule
      </text>

      <style jsx>{`
        @media (max-width: 640px) {
          text {
            font-size: 12.5px !important;
          }
        }
      `}</style>
    </svg>
  );
}

export function Visual03() {
  return (
    <svg viewBox="0 0 400 400" className="st-v-svg" aria-hidden="true">
      {/* --- INTEGRATED SCIENTIFIC DIAGRAM ANNOTATIONS --- */}
      {/* 01: Left Microbial Community Annotation */}
      <text x="60" y="110" textAnchor="middle" fill="#143324" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.6px" }}>
        <tspan x="60" dy="0" fill="#1F7A4D" style={{ fontSize: "12px", fontWeight: 800 }}>01</tspan>
        <tspan x="60" dy="14">MICROBIAL COMMUNITY</tspan>
      </text>

      {/* 02: Center Metabolites + Synergy Annotation */}
      <text x="205" y="110" textAnchor="middle" fill="#143324" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.6px" }}>
        <tspan x="205" dy="0" fill="#1F7A4D" style={{ fontSize: "12px", fontWeight: 800 }}>02</tspan>
        <tspan x="205" dy="14">METABOLITES + SYNERGY</tspan>
      </text>

      {/* 03: Right Biological Performance Annotation */}
      <text x="340" y="110" textAnchor="middle" fill="#143324" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.6px" }}>
        <tspan x="340" dy="0" fill="#1F7A4D" style={{ fontSize: "12px", fontWeight: 800 }}>03</tspan>
        <tspan x="340" dy="14">BIOLOGICAL</tspan>
        <tspan x="340" dy="12">PERFORMANCE</tspan>
      </text>

      {/* --- 1. LEFT SIDE / SOURCE: MICROBIAL COMMUNITY (6 abstract microbes) --- */}
      <g className="microbial-community">
        {/* Bacillus / Rod */}
        <rect x="35" y="165" width="22" height="10" rx="5" fill="#1F7A4D" opacity="0.9">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 2,-3; 0,0"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
        <circle cx="42" cy="170" r="2" fill="#9BD0AE" />

        {/* Cocci Cluster */}
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -2,3; 0,0"
            dur="5s"
            repeatCount="indefinite"
          />
          <circle cx="72" cy="160" r="5" fill="#3F7D4B" />
          <circle cx="80" cy="162" r="4" fill="#1F7A4D" />
          <circle cx="75" cy="168" r="4.5" fill="#6B4226" opacity="0.85" />
          <circle cx="83" cy="169" r="3.5" fill="#8B5E34" />
        </g>

        {/* Curved Microbe */}
        <path
          d="M 38 205 C 48 195, 58 215, 68 205"
          stroke="#1F7A4D"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 3,2; 0,0"
            dur="4.5s"
            repeatCount="indefinite"
          />
        </path>

        {/* Small Oval Organisms */}
        <ellipse cx="78" cy="200" rx="7" ry="4.5" fill="#6B4226" opacity="0.8">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -3,-2; 0,0"
            dur="3.8s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="45" cy="235" rx="6" ry="4" fill="#1F7A4D" opacity="0.8">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 2,-2; 0,0"
            dur="4.2s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Subtle Filament-like Organism */}
        <path
          d="M 62 230 Q 72 220 82 240 T 92 230"
          stroke="#8B5E34"
          strokeWidth="2"
          fill="none"
          opacity="0.75"
          strokeDasharray="2 1"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -1,3; 0,0"
            dur="5.2s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* --- 2. METABOLITE RELEASE PARTICLES --- */}
      <g>
        <animateMotion path="M 80 165 C 110 160, 140 180, 175 200" dur="3.5s" repeatCount="indefinite" begin="0s" />
        <circle r="3" fill="#1F7A4D" />
      </g>
      <g>
        <animateMotion path="M 80 165 C 110 160, 140 180, 175 200" dur="3.5s" repeatCount="indefinite" begin="1.75s" />
        <circle cx="-3" cy="0" r="2.5" fill="#3F7D4B" />
        <circle cx="3" cy="0" r="2.5" fill="#8B5E34" />
      </g>
      <g>
        <animateMotion path="M 75 205 L 175 210" dur="3s" repeatCount="indefinite" begin="0.6s" />
        <circle r="3.5" fill="#8B5E34" />
      </g>
      <g>
        <animateMotion path="M 75 205 L 175 210" dur="3s" repeatCount="indefinite" begin="2.1s" />
        <line x1="-4" y1="0" x2="4" y2="0" stroke="#1F7A4D" strokeWidth="1.5" />
        <circle cx="-4" cy="0" r="2" fill="#1F7A4D" />
        <circle cx="4" cy="0" r="2" fill="#1F7A4D" />
      </g>
      <g>
        <animateMotion path="M 80 235 C 110 240, 140 230, 175 220" dur="3.8s" repeatCount="indefinite" begin="1.2s" />
        <circle r="3" fill="#1F7A4D" />
      </g>

      {/* --- 3. CENTER SYNERGY ZONE --- */}
      <circle cx="205" cy="210" r="32" fill="#EDF4ED" opacity="0.6" stroke="#1F7A4D" strokeWidth="1.5" strokeDasharray="4 3" className="synergy-ring" />
      <circle cx="205" cy="210" r="22" fill="#1F7A4D" opacity="0.08" />

      {/* Interconnected synergy network nodes */}
      <g className="synergy-network">
        <line x1="192" y1="200" x2="218" y2="205" stroke="#1F7A4D" strokeWidth="1.2" opacity="0.7" />
        <line x1="218" y1="205" x2="205" y2="225" stroke="#6B4226" strokeWidth="1.2" opacity="0.7" />
        <line x1="205" y1="225" x2="192" y2="200" stroke="#1F7A4D" strokeWidth="1.2" opacity="0.7" />
        <line x1="192" y1="200" x2="208" y2="193" stroke="#3F7D4B" strokeWidth="1.2" opacity="0.7" />

        <circle cx="192" cy="200" r="4" fill="#1F7A4D" className="syn-node" />
        <circle cx="218" cy="205" r="4.5" fill="#6B4226" className="syn-node" />
        <circle cx="205" cy="225" r="3.5" fill="#3F7D4B" className="syn-node" />
        <circle cx="208" cy="193" r="3" fill="#8B5E34" className="syn-node" />
      </g>

      {/* --- 4. OUTPUT / BIOLOGICAL PERFORMANCE --- */}
      <path className="ln" pathLength={1} d="M 237 210 L 322 210" />
      <circle r="4" fill="#1F7A4D">
        <animateMotion path="M 237 210 L 322 210" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle r="7" fill="none" stroke="#9BD0AE" strokeWidth="1.5">
        <animateMotion path="M 237 210 L 322 210" dur="2.2s" repeatCount="indefinite" />
      </circle>

      {/* Biological Performance Output node */}
      <g transform="translate(340, 210)">
        <circle r="18" fill="#EDF4ED" stroke="#1F7A4D" strokeWidth="1.5" />
        <circle r="12" fill="none" stroke="#1F7A4D" strokeWidth="1" strokeDasharray="3 2" className="perf-pulse" />
        <circle r="6" fill="#1F7A4D" />
      </g>

      <style jsx>{`
        .synergy-ring {
          animation: synPulse 3s ease-in-out infinite;
          transform-origin: 205px 210px;
        }
        .syn-node {
          animation: nodePulse 2s ease-in-out infinite alternate;
        }
        .perf-pulse {
          animation: perfRotate 6s linear infinite;
          transform-origin: 340px 210px;
        }
        @keyframes synPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 0.9; }
        }
        @keyframes nodePulse {
          0% { opacity: 0.7; }
          100% { opacity: 1; filter: drop-shadow(0 0 2px #1F7A4D); }
        }
        @keyframes perfRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          text {
            font-size: 8.5px !important;
          }
        }
      `}</style>
    </svg>
  );
}

export function Visual04() {
  return (
    <svg viewBox="0 0 400 400" className="st-v-svg" aria-hidden="true">
      <circle
        className="vc"
        style={{ "--x": "0px", "--y": "16px" } as React.CSSProperties}
        cx="200"
        cy="140"
        r="86"
        fill="#1F7A4D"
        fillOpacity="0.3"
        stroke="#1F7A4D"
        strokeWidth="2"
      />
      <circle
        className="vc"
        style={{ "--x": "14px", "--y": "-10px", animationDelay: "-2s" } as React.CSSProperties}
        cx="150"
        cy="220"
        r="86"
        fill="#6B4226"
        fillOpacity="0.3"
        stroke="#6B4226"
        strokeWidth="2"
      />
      <circle
        className="vc"
        style={{ "--x": "-14px", "--y": "-10px", animationDelay: "-4s" } as React.CSSProperties}
        cx="250"
        cy="220"
        r="86"
        fill="#C9A77C"
        fillOpacity="0.45"
        stroke="#8B5E34"
        strokeWidth="2"
      />

      <circle cx="200" cy="198" r="13" fill="#1F7A4D" />
      <circle className="rp" cx="200" cy="198" r="16" fill="none" stroke="#1F7A4D" />

      <text x="200" y="38" textAnchor="middle" fill="#143324">
        microbiology
      </text>
      <text x="8" y="318" textAnchor="start" fill="#143324">
        mineral science
      </text>
      <text x="392" y="318" textAnchor="end" fill="#143324">
        delivery technology
      </text>
      <text
        x="200"
        y="364"
        textAnchor="middle"
        style={{ fontWeight: 700, fill: "#1F7A4D" }}
      >
        Microbe &amp; Mineral™
      </text>

      <style jsx>{`
        :global(.vc) {
          animation: mg 6s ease-in-out infinite;
        }
        @keyframes mg {
          50% {
            transform: translate(var(--x), var(--y));
          }
        }
        @media (max-width: 640px) {
          text {
            font-size: 12.5px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.vc) {
            animation: none !important;
          }
        }
      `}</style>
    </svg>
  );
}

export function Visual05() {
  const environments = [
    { label: "soil", cls: "so" },
    { label: "water", cls: "wa" },
    { label: "gut systems", cls: "gu" },
  ];

  return (
    <div className="v5">
      {environments.map((e, j) => (
        <div key={e.label} className={`env ${e.cls}`}>
          {[0, 1, 2, 3].map((k) => (
            <i
              key={`cr-${k}`}
              className="cr"
              style={
                {
                  "--i": k + j,
                  left: `${((k * 37 + j * 19 + 13) % 58 + 12)}%`,
                  top: `${((k * 53 + j * 11 + 7) % 48 + 10)}%`,
                } as React.CSSProperties
              }
            />
          ))}

          {[0, 1, 2].map((k) => (
            <i
              key={`mi-${k}`}
              className="mi"
              style={
                {
                  "--i": k,
                  "--r": `${k * 55 - 30}deg`,
                  left: `${((k * 41 + j * 23 + 9) % 55 + 14)}%`,
                  top: `${((k * 29 + j * 17 + 45) % 40 + 30)}%`,
                } as React.CSSProperties
              }
            />
          ))}

          <span
            className="tg"
            style={
              {
                "--i": j,
                left: "50%",
                bottom: "14px",
              } as React.CSSProperties
            }
          >
            {e.label}
          </span>
        </div>
      ))}

      <style jsx>{`
        .v5 {
          position: absolute;
          inset: 0;
          display: flex;
          gap: 12px;
          padding: 7%;
        }

        .env {
          position: relative;
          flex: 1;
          border-radius: 22px;
          overflow: hidden;
        }

        .so {
          background: linear-gradient(#9a6b3f, #5a3820);
        }
        .wa {
          background: linear-gradient(#cfe8df, #4e9a8c);
        }
        .gu {
          background: linear-gradient(#efd8b4, #b98d63);
        }

        .wa::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -22px;
          bottom: 0;
          background: repeating-linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.2) 0 2px,
            transparent 2px 22px
          );
          animation: wv 5s linear infinite;
        }

        @keyframes wv {
          to {
            transform: translateY(22px);
          }
        }

        .cr {
          position: absolute;
          width: 28px;
          height: 32px;
          background: linear-gradient(135deg, #fff, #9bd0ae 55%, #1f7a4d);
          clip-path: polygon(
            50% 0,
            100% 25%,
            100% 75%,
            50% 100%,
            0 75%,
            0 25%
          );
          animation: fy 5s ease-in-out infinite;
          animation-delay: calc(var(--i) * -0.8s);
        }

        .mi {
          position: absolute;
          width: 28px;
          height: 11px;
          border-radius: 6px;
          background: linear-gradient(120deg, #6b4226, #1f7a4d);
          transform: rotate(var(--r));
          animation: fy 4s ease-in-out infinite;
          animation-delay: calc(var(--i) * -1.1s);
        }

        @keyframes fy {
          50% {
            transform: translateY(-10px);
          }
        }

        .tg {
          position: absolute;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid rgba(31, 122, 77, 0.3);
          white-space: nowrap;
          opacity: 0;
          transform: translate(-50%, 8px);
          transition: opacity 0.6s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: calc(var(--i) * 0.15s + 0.6s);
          color: #143324 !important;
        }

        :global(.s.in) .v5 .tg {
          opacity: 1;
          transform: translateX(-50%);
        }

        @media (max-width: 640px) {
          .tg {
            font-size: 9px !important;
            padding: 5px 9px !important;
            letter-spacing: 0.06em !important;
            max-width: 92% !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cr,
          .mi,
          .wa::after {
            animation: none !important;
          }
          .tg {
            opacity: 1 !important;
            transform: translateX(-50%) !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
export function Visual06() {
  return (
    <svg viewBox="0 0 400 400" className="st-v-svg" aria-hidden="true">
      {/* Orbital Connecting Pathway */}
      <ellipse
        cx="200"
        cy="190"
        rx="140"
        ry="115"
        fill="none"
        stroke="#C9A77C"
        strokeWidth="1.2"
        strokeDasharray="4 6"
        opacity="0.4"
      />

      {/* Active orbital tracer node */}
      <circle r="4" fill="#1F7A4D">
        <animateMotion
          path="M 70 75 A 140 115 0 0 1 330 75 A 140 115 0 0 1 330 305 A 140 115 0 0 1 70 305 A 140 115 0 0 1 70 75"
          dur="12s"
          repeatCount="indefinite"
        />
      </circle>

      {/* ===================================================
          TOP-LEFT: PHASE 1 — 45°C HEAT
          =================================================== */}
      <g transform="translate(70, 75)">
        {/* Heat wave lines entering from top-left toward central chamber */}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            className="heat-wave-line"
            style={{ "--i": i } as React.CSSProperties}
            d={`M ${-25 + i * 10} ${-15 + i * 5} Q ${-15 + i * 10} ${-25 + i * 5} ${0 + i * 10} ${-15 + i * 5} T ${25 + i * 10} ${-5 + i * 5}`}
          />
        ))}
        {/* Environmental phase node */}
        <circle r="14" fill="#EDF4ED" stroke="#6B4226" strokeWidth="1.5">
          <animate
            attributeName="stroke"
            values="#6B4226; #1F7A4D; #6B4226; #6B4226; #6B4226"
            keyTimes="0; 0.25; 0.5; 0.75; 1"
            dur="12s"
            repeatCount="indefinite"
          />
        </circle>
        <text x="0" y="4" textAnchor="middle" fill="#6B4226" style={{ fontSize: "10px", fontWeight: 700 }}>
          45°
        </text>
      </g>
      <text x="70" y="42" textAnchor="middle" fill="#6B4226" style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.5px" }}>
        45°C HEAT
      </text>

      {/* ===================================================
          TOP-RIGHT: PHASE 2 — STORAGE
          =================================================== */}
      <g transform="translate(330, 75)">
        <rect x="-14" y="-12" width="28" height="24" rx="3" fill="#C9A77C" stroke="#6B4226" strokeWidth="1.5" opacity="0.75" />
        <line x1="-14" y1="0" x2="14" y2="0" stroke="#6B4226" strokeWidth="1.2" opacity="0.75" />
        <circle r="18" fill="none" stroke="#1F7A4D" strokeWidth="1.5" strokeDasharray="3 3" opacity="0">
          <animate attributeName="opacity" values="0; 0.85; 0; 0; 0" keyTimes="0; 0.25; 0.5; 0.75; 1" dur="12s" repeatCount="indefinite" />
        </circle>
      </g>
      <text x="330" y="42" textAnchor="middle" fill="#143324" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px" }}>
        STORAGE
      </text>

      {/* ===================================================
          BOTTOM-LEFT: PHASE 3 — TRANSPORT
          =================================================== */}
      <g transform="translate(70, 305)">
        <g opacity="0.75">
          <rect x="-14" y="-9" width="20" height="15" rx="2" fill="#C9A77C" stroke="#6B4226" strokeWidth="1.5" />
          <rect x="6" y="-3" width="9" height="9" rx="1.5" fill="#C9A77C" stroke="#6B4226" strokeWidth="1.5" />
          <circle cx="-6" cy="9" r="3" fill="#143324" />
          <circle cx="8" cy="9" r="3" fill="#143324" />
        </g>
        {/* Subtle vibration ring around transport zone */}
        <circle r="20" fill="none" stroke="#8B5E34" strokeWidth="1.2" strokeDasharray="2 3" opacity="0">
          <animate attributeName="opacity" values="0; 0; 0.85; 0; 0" keyTimes="0; 0.5; 0.65; 0.75; 1" dur="12s" repeatCount="indefinite" />
        </circle>
      </g>
      <text x="70" y="338" textAnchor="middle" fill="#143324" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px" }}>
        TRANSPORT
      </text>

      {/* ===================================================
          BOTTOM-RIGHT: PHASE 4 — FIELD APPLICATION
          =================================================== */}
      <g transform="translate(330, 305)">
        <path d="M -16 10 Q 0 -5 16 10" fill="none" stroke="#6B4226" strokeWidth="1.5" opacity="0.75" />
        <path d="M -8 10 V -2 M 0 10 V -8 M 8 10 V -1" stroke="#1F7A4D" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        {/* Field Activation Pulse */}
        <circle r="22" fill="none" stroke="#1F7A4D" strokeWidth="1.8" opacity="0">
          <animate attributeName="opacity" values="0; 0; 0; 0.95; 0" keyTimes="0; 0.5; 0.75; 0.88; 1" dur="12s" repeatCount="indefinite" />
          <animate attributeName="r" values="12; 12; 12; 26; 12" keyTimes="0; 0.5; 0.75; 0.88; 1" dur="12s" repeatCount="indefinite" />
        </circle>
      </g>
      <text x="330" y="338" textAnchor="middle" fill="#143324" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px" }}>
        FIELD APPLICATION
      </text>

      {/* ===================================================
          CENTRAL HERO — BIOENCAPSULATION SURVIVAL CHAMBER
          =================================================== */}
      <g transform="translate(200, 190)">
        {/* Layer 3: Outer Asymmetric Translucent Biological Aura */}
        <path
          d="M -78 0 C -78 -52, -45 -74, 0 -74 C 45 -74, 78 -52, 78 0 C 78 52, 45 74, 0 74 C -45 74, -78 52, -78 0 Z"
          fill="none"
          stroke="#1F7A4D"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.6"
        >
          <animate attributeName="opacity" values="0.6; 0.6; 0.6; 0; 0.6" keyTimes="0; 0.5; 0.75; 0.92; 1" dur="12s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="scale" values="1; 1.02; 1; 1.35; 1" keyTimes="0; 0.5; 0.75; 0.92; 1" dur="12s" repeatCount="indefinite" />
        </path>

        {/* Layer 2: Middle Translucent Bioencapsulation Shell */}
        <path
          d="M -62 0 C -62 -42, -36 -60, 0 -60 C 36 -60, 62 -42, 62 0 C 62 42, 36 60, 0 60 C -36 60, -62 42, -62 0 Z"
          fill="rgba(201, 167, 124, 0.18)"
          stroke="#8B5E34"
          strokeWidth="1.5"
          strokeDasharray="6 3"
        >
          <animate attributeName="stroke" values="#8B5E34; #6B4226; #8B5E34; #8B5E34; #8B5E34" keyTimes="0; 0.12; 0.25; 0.75; 1" dur="12s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.85; 0.85; 0.85; 0; 0.85" keyTimes="0; 0.5; 0.75; 0.92; 1" dur="12s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="scale" values="1; 1.03; 1; 1.25; 1" keyTimes="0; 0.12; 0.75; 0.92; 1" dur="12s" repeatCount="indefinite" />
        </path>

        {/* Layer 1: Inner Bioencapsulation Layer */}
        <path
          d="M -46 0 C -46 -30, -28 -44, 0 -44 C 28 -44, 46 -30, 46 0 C 46 30, 28 44, 0 44 C -28 44, -46 30, -46 0 Z"
          fill="rgba(31, 122, 77, 0.22)"
          stroke="#1F7A4D"
          strokeWidth="1.8"
        >
          <animate attributeName="opacity" values="0.9; 0.9; 0.9; 0; 0.9" keyTimes="0; 0.5; 0.75; 0.92; 1" dur="12s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="scale" values="1; 1; 1; 1.18; 1" keyTimes="0; 0.5; 0.75; 0.92; 1" dur="12s" repeatCount="indefinite" />
        </path>

        {/* CORE LIVING MICROBE: Large central green biological organism */}
        <g className="core-microbe">
          <ellipse cx="0" cy="0" rx="30" ry="20" fill="#1F7A4D" stroke="#143324" strokeWidth="1.5" />
          <ellipse cx="-8" cy="-5" rx="14" ry="8" fill="#3F7D4B" />
          <ellipse cx="-12" cy="-7" rx="6" ry="3" fill="#9BD0AE" opacity="0.9" />
          <circle cx="10" cy="4" r="4" fill="#3F7D4B" />
          <circle cx="12" cy="3" r="2" fill="#9BD0AE" />
          <circle cx="2" cy="7" r="3" fill="#143324" opacity="0.4" />
          
          <animateTransform attributeName="transform" type="scale" values="1; 1.04; 1; 1.04; 1" dur="6s" repeatCount="indefinite" />
        </g>

        {/* Biological Activation Signal released at Phase 4 (Field Application) */}
        <path d="M 25 10 Q 75 60 120 105" fill="none" stroke="#1F7A4D" strokeWidth="2" strokeDasharray="3 3" opacity="0">
          <animate attributeName="opacity" values="0; 0; 0; 0.95; 0" keyTimes="0; 0.5; 0.75; 0.88; 1" dur="12s" repeatCount="indefinite" />
        </path>
        <circle r="0" fill="none" stroke="#9BD0AE" strokeWidth="2">
          <animate attributeName="r" values="0; 0; 0; 50; 0" keyTimes="0; 0.5; 0.75; 0.92; 1" dur="12s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0; 0; 0; 1; 0" keyTimes="0; 0.5; 0.75; 0.92; 1" dur="12s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Scoped CSS styles */}
      <style jsx>{`
        .heat-wave-line {
          fill: none;
          stroke: #6b4226;
          stroke-width: 1.8;
          stroke-linecap: round;
          opacity: 0;
          animation: heatAnim 3s ease-in-out infinite;
          animation-delay: calc(var(--i) * -0.6s);
        }
        @keyframes heatAnim {
          0% {
            opacity: 0;
            transform: translate(-10px, -10px);
          }
          35% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translate(15px, 15px);
          }
        }
        @media (max-width: 640px) {
          text {
            font-size: 9.5px !important;
          }
        }
      `}</style>
    </svg>
  );
}
