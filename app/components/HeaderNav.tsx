"use client";

import React, { useState } from "react";

export default function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Minimal Floating Pill Nav Bar (Top Left) */}
      <nav className="relative z-40">
        <div className="inline-flex items-center gap-3.5 px-4 py-2.5 rounded-full bg-black/90 backdrop-blur-md border border-white/15 shadow-none transition-colors hover:border-white/30">
          {/* Logo Badge Icon */}
          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-black">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v8" />
            </svg>
          </div>

          {/* Brand Name - Refined Medium Weight */}
          <span className="text-xs font-medium tracking-widest uppercase text-white/90 font-sans">
            DreamFrame
          </span>

          {/* Vertical Divider Line */}
          <div className="w-[1px] h-3.5 bg-white/20 my-auto mx-0.5" />

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="p-1 rounded-full text-white/70 hover:text-white transition-colors focus:outline-none cursor-pointer"
          >
            {isOpen ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Slide-out Navigation Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-black border-r border-white/15 p-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <span className="text-black font-bold text-[10px]">DF</span>
                  </div>
                  <span className="font-semibold text-base tracking-widest text-white uppercase">
                    DREAMFRAME
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Menu Links */}
              <div className="mt-8 flex flex-col gap-5">
                {[
                  { label: "AI Engine", href: "#engine" },
                  { label: "Models & Styles", href: "#models" },
                  { label: "Community Showcase", href: "#showcase" },
                  { label: "API & Developers", href: "#api" },
                  { label: "Pricing Plans", href: "#pricing" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-light tracking-wide text-gray-300 hover:text-white hover:translate-x-1 transition-all py-1.5 border-b border-white/5"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-[11px] font-light text-gray-500 mb-4">
                DREAMFRAME Neural Core v4.2
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-full bg-orange-500 text-black font-medium text-xs tracking-wider uppercase hover:bg-orange-400 transition-colors cursor-pointer"
              >
                Launch Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
