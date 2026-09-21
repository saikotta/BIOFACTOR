"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "ONE HEALTH", href: "/one-health" },
  { name: "SCIENCE & TECHNOLOGY", href: "/science-technology" },
];

export default function BiofactorHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#D9E8D2] border-b border-[#167A4A]/12">
      <div className="w-full max-w-[1700px] mx-auto h-[64px] md:h-[72px] px-6 sm:px-10 md:px-14 lg:px-20 flex items-center justify-between">
        {/* Left Side: Official Biofactor Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/images/biofactor-official-logo.png"
            alt="BIOFACTOR BIOLOGICALS"
            className="h-[40px] md:h-[56px] w-auto object-contain block select-none"
          />
        </Link>

        {/* Right Side Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-10">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? "text-[#167A4A] font-bold"
                    : "text-[#26382D] hover:text-[#167A4A]"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#167A4A] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            className="p-2 text-[#26382D] hover:text-[#167A4A] focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#D9E8D2] border-b border-[#167A4A]/12 shadow-lg px-8 py-5 flex flex-col gap-3.5 z-50">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold tracking-wider uppercase py-2 border-b border-[#167A4A]/12 last:border-none ${
                  isActive
                    ? "text-[#167A4A] font-bold"
                    : "text-[#26382D] hover:text-[#167A4A]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
