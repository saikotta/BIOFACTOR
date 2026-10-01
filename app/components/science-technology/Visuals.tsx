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
        60+ deposited and elite strains
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
  const points = [
    [90, 90],
    [310, 90],
    [90, 300],
    [310, 300],
  ];

  const centralBubbles = [
    [200, 200, 34, "#1F7A4D", 0.35],
    [172, 224, 22, "#6B4226", 0.4],
    [230, 176, 24, "#1F7A4D", 0.3],
    [228, 228, 18, "#6B4226", 0.4],
    [172, 174, 16, "#1F7A4D", 0.4],
  ] as const;

  return (
    <svg viewBox="0 0 400 400" className="st-v-svg" aria-hidden="true">
      {points.map((p, i) => {
        const d = `M200 195L${p[0]} ${p[1] < 200 ? p[1] + 26 : p[1] - 26}`;
        return (
          <React.Fragment key={i}>
            <path className="ln" pathLength={1} d={d} />
            <circle r="4" fill="#8B5E34">
              <animateMotion
                dur="3s"
                begin={`${i * 0.6}s`}
                repeatCount="indefinite"
                path={d}
              />
            </circle>
          </React.Fragment>
        );
      })}

      {centralBubbles.map((c, i) => (
        <circle
          key={i}
          cx={c[0]}
          cy={c[1]}
          r={c[2]}
          fill={c[3]}
          opacity={c[4]}
          stroke={c[3]}
          className="bb"
        />
      ))}

      {/* Minerals */}
      <polygon
        points="90,66 111,78 111,102 90,114 69,102 69,78"
        fill="#C9A77C"
        stroke="#6B4226"
        strokeWidth="2"
      />

      {/* Nutrients */}
      <circle cx="298" cy="92" r="7" fill="#1F7A4D" />
      <circle cx="320" cy="82" r="5" fill="#8B5E34" />
      <circle cx="318" cy="104" r="6" fill="#3F7D4B" />

      {/* Plants */}
      <path d="M72 312Q74 282 106 284Q104 314 72 312Z" fill="#1F7A4D" />
      <path d="M72 312L106 284" stroke="#EDF4ED" strokeWidth="1.5" />

      {/* Animals */}
      <ellipse cx="310" cy="306" rx="16" ry="13" fill="#6B4226" />
      <circle cx="292" cy="288" r="5" fill="#6B4226" />
      <circle cx="306" cy="282" r="5" fill="#6B4226" />
      <circle cx="322" cy="282" r="5" fill="#6B4226" />
      <circle cx="334" cy="290" r="5" fill="#6B4226" />

      <text x="90" y="140" textAnchor="middle" fill="#143324">
        minerals
      </text>
      <text x="310" y="140" textAnchor="middle" fill="#143324">
        nutrients
      </text>
      <text x="90" y="346" textAnchor="middle" fill="#143324">
        plants
      </text>
      <text x="310" y="346" textAnchor="middle" fill="#143324">
        animals
      </text>
      <text x="200" y="268" textAnchor="middle" fill="#143324">
        one another
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
      <path
        className="ln"
        pathLength={1}
        d="M60 246L340 246"
        style={{ strokeDasharray: "5 7", strokeDashoffset: 0 }}
      />

      {[0, 1, 2].map((i) => (
        <path
          key={i}
          className="hw"
          style={{ "--i": i } as React.CSSProperties}
          d={`M150 ${168 + i * 12}q10-12 20 0t20 0 20 0 20 0 20 0`}
        />
      ))}

      {/* Storage box */}
      <rect
        x="52"
        y="226"
        width="36"
        height="30"
        rx="3"
        fill="#C9A77C"
        stroke="#6B4226"
        strokeWidth="2"
      />
      <path d="M52 238H88" stroke="#6B4226" />

      {/* Transport Truck */}
      <rect
        x="178"
        y="226"
        width="30"
        height="20"
        rx="2"
        fill="#C9A77C"
        stroke="#6B4226"
        strokeWidth="2"
      />
      <rect
        x="208"
        y="232"
        width="14"
        height="14"
        rx="2"
        fill="#C9A77C"
        stroke="#6B4226"
        strokeWidth="2"
      />
      <circle cx="190" cy="250" r="5" fill="#143324" />
      <circle cx="214" cy="250" r="5" fill="#143324" />

      {/* Field Application Sprout */}
      <path
        d="M300 258Q330 236 360 258"
        fill="none"
        stroke="#6B4226"
        strokeWidth="2"
      />
      <path
        d="M318 258V240M332 258V234M346 258V242"
        stroke="#1F7A4D"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Moving Bead */}
      <g>
        <animateMotion
          dur="7s"
          repeatCount="indefinite"
          path="M70 196L330 196"
        />
        <circle r="22" fill="none" stroke="#1F7A4D" strokeDasharray="3 5" />
        <circle r="14" fill="#9BD0AE" stroke="#1F7A4D" strokeWidth="3" />
        <circle r="6" fill="#6B4226" />
      </g>

      {/* Text Labels */}
      <text
        x="200"
        y="118"
        textAnchor="middle"
        style={{ fontSize: "18px", fontWeight: 700, fill: "#6B4226" }}
      >
        45°C heat
      </text>
      <text x="70" y="292" textAnchor="middle" fill="#143324">
        storage
      </text>
      <text x="200" y="292" textAnchor="middle" fill="#143324">
        transport
      </text>
      <text x="330" y="292" textAnchor="middle" fill="#143324">
        field application
      </text>

      <style jsx>{`
        :global(.hw) {
          fill: none;
          stroke: #6b4226;
          stroke-width: 2;
          stroke-linecap: round;
          opacity: 0;
          animation: hw 3.4s ease-in infinite;
          animation-delay: calc(var(--i) * -0.7s);
        }

        @keyframes hw {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          30% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        @media (max-width: 640px) {
          text:not([style*="font-size: 18px"]):not([style*="font-size:18px"]) {
            font-size: 12.5px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.hw) {
            animation: none !important;
            opacity: 0.8;
          }
        }
      `}</style>
    </svg>
  );
}
