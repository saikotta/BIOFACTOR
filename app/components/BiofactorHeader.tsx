"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "ONE HEALTH", href: "/one-health" },
  { name: "SCIENCE & TECHNOLOGY", href: "/science-technology" },
];

const PRODUCT_ITEMS = [
  { name: "Ruminants", href: "/ruminants" },
  { name: "Poultry", href: "/poultry" },
];

export default function BiofactorHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if PRODUCT should be active (when on /ruminants or /poultry)
  const isProductActive = pathname === "/ruminants" || pathname === "/poultry";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          {NAV_ITEMS.map((item, index) => {
            const isActive = pathname === item.href;
            // Insert PRODUCT dropdown after ABOUT (index 1)
            if (index === 1) {
              return (
                <React.Fragment key={item.name}>
                  <Link
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

                  {/* PRODUCT Dropdown */}
                  <div
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={() => setProductDropdownOpen(true)}
                    onMouseLeave={() => setProductDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                      className={`text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors whitespace-nowrap py-1 relative flex items-center gap-1 cursor-pointer ${
                        isProductActive
                          ? "text-[#167A4A] font-bold"
                          : "text-[#26382D] hover:text-[#167A4A]"
                      }`}
                    >
                      PRODUCT
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform ${productDropdownOpen ? "rotate-180" : ""}`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                      {isProductActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#167A4A] rounded-full" />
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {productDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 bg-[#D9E8D2] border border-[#167A4A]/12 shadow-lg rounded-sm py-2 min-w-[160px] z-50">
                        {PRODUCT_ITEMS.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setProductDropdownOpen(false)}
                              className={`block px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors hover:bg-[#167A4A]/10 relative ${
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
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            }

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
          {NAV_ITEMS.map((item, index) => {
            const isActive = pathname === item.href;
            // Insert PRODUCT dropdown after ABOUT (index 1)
            if (index === 1) {
              return (
                <React.Fragment key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-semibold tracking-wider uppercase py-2 border-b border-[#167A4A]/12 ${
                      isActive
                        ? "text-[#167A4A] font-bold"
                        : "text-[#26382D] hover:text-[#167A4A]"
                    }`}
                  >
                    {item.name}
                  </Link>

                  {/* Mobile PRODUCT Dropdown */}
                  <div>
                    <button
                      onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                      className={`w-full text-left text-sm font-semibold tracking-wider uppercase py-2 flex items-center justify-between relative ${
                        isProductActive
                          ? "text-[#167A4A] font-bold"
                          : "text-[#26382D]"
                      }`}
                    >
                      PRODUCT
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform ${productDropdownOpen ? "rotate-180" : ""}`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                      {isProductActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#167A4A] rounded-full" />
                      )}
                    </button>

                    {productDropdownOpen && (
                      <div className="pl-4">
                        {PRODUCT_ITEMS.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setProductDropdownOpen(false);
                              }}
                              className={`block py-2 text-sm font-semibold tracking-wider uppercase relative ${
                                isActive
                                  ? "text-[#167A4A] font-bold"
                                  : "text-[#26382D]"
                              }`}
                            >
                              {item.name}
                              {isActive && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#167A4A] rounded-full" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            }

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
