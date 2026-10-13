"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation, LanguageCode } from "../i18n";

const NAV_ITEMS = [
  { key: "nav_home", defaultName: "HOME", href: "/" },
  { key: "nav_about", defaultName: "ABOUT", href: "/about/" },
  { key: "nav_one_health", defaultName: "ONE HEALTH", href: "/one-health/" },
  { key: "nav_science_tech", defaultName: "SCIENCE & TECHNOLOGY", href: "/science-technology/" },
  { key: "nav_resources", defaultName: "RESOURCES", href: "/resources/" },
  { key: "nav_careers", defaultName: "CAREERS", href: "/careers/" },
  { key: "nav_contact", defaultName: "CONTACT", href: "/contact/" },
];

const PRODUCT_ITEMS = [
  { key: "prod_agriculture", defaultName: "Agriculture", href: "/nutrients/" },
  { key: "prod_aquaculture", defaultName: "Aquaculture", href: "/aquaculture/" },
  { key: "prod_bioremediation", defaultName: "Bioremediation", href: "/bioremediation/" },
  { key: "prod_poultry", defaultName: "Poultry", href: "/poultry/" },
  { key: "prod_ruminants", defaultName: "Ruminants", href: "/ruminants/" },
];

export default function BiofactorHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { language, setLanguage, supportedLanguages, t } = useTranslation();

  // Normalize path helper for comparing routes (handles trailing slashes cleanly)
  const isPathActive = (href: string) => {
    const current = pathname ? pathname.replace(/\/+$/, "") || "/" : "/";
    const target = href.replace(/\/+$/, "") || "/";
    return current === target;
  };

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductDropdownOpen(false);
    setMobileProductOpen(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, [pathname]);

  // Check if PRODUCTS dropdown should be active
  const isProductActive =
    PRODUCT_ITEMS.some((prod) => isPathActive(prod.href)) ||
    (pathname ? pathname.startsWith("/products") : false);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setProductDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setProductDropdownOpen(false);
    }, 150);
  };

  return (
    <div className="fixed top-2 sm:top-3.5 left-0 right-0 z-[9999] px-3 sm:px-6 pointer-events-none w-full max-w-[1440px] mx-auto">
      <header
        className="pointer-events-auto w-full bg-[#d9ead3]/90 backdrop-blur-md backdrop-saturate-150 border border-[#167A4A]/20 rounded-full shadow-[0_8px_32px_0_rgba(22,122,74,0.12)] transition-all duration-300 relative"
      >
        <div className="w-full px-3 sm:px-5 md:px-6 lg:px-7 h-[56px] md:h-[64px] flex items-center justify-between gap-2">
          {/* Left Side: Official Biofactor Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0 transition-transform hover:scale-[1.02]">
            <img
              src="/images/biofactor-official-logo.png"
              alt="BIOFACTOR BIOLOGICALS"
              className="h-[32px] sm:h-[36px] md:h-[44px] w-auto object-contain block select-none drop-shadow-sm"
            />
          </Link>

          {/* Desktop Navigation moved towards left to provide ample space on the right */}
          <div className="hidden md:flex items-center justify-end gap-1.5 lg:gap-2.5 ml-auto">
            <nav className="flex items-center gap-1 lg:gap-1.5 xl:gap-2">
              {NAV_ITEMS.map((item, index) => {
                const isActive = isPathActive(item.href);
                const translatedName = t(item.key, item.defaultName);

                // Insert PRODUCTS dropdown after ABOUT (index 1)
                if (index === 1) {
                  return (
                    <React.Fragment key={item.key}>
                      <Link
                        href={item.href}
                        className={`text-xs xl:text-[13px] font-semibold tracking-wider uppercase transition-all px-2.5 lg:px-3 py-1.5 rounded-full whitespace-nowrap ${
                          isActive
                            ? "bg-[#167A4A] text-white shadow-sm font-bold"
                            : "text-[#143324] hover:text-[#167A4A] hover:bg-[#167A4A]/10"
                        }`}
                      >
                        {translatedName}
                      </Link>

                      {/* PRODUCTS Dropdown trigger & horizontal sub-bar container */}
                      <div
                        className="relative"
                        ref={dropdownRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                            setProductDropdownOpen((prev) => !prev);
                          }}
                          className={`text-xs xl:text-[13px] font-semibold tracking-wider uppercase transition-all px-2.5 lg:px-3.5 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                            isProductActive || productDropdownOpen
                              ? "bg-[#167A4A] text-white shadow-sm font-bold"
                              : "text-[#143324] hover:text-[#167A4A] hover:bg-[#167A4A]/10"
                          }`}
                        >
                          {t("nav_products", "PRODUCTS")}
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-200 ${productDropdownOpen ? "rotate-180" : ""}`}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>

                        {/* HORIZONTAL Dropdown Menu (Capsule Sub-bar Style) */}
                        {productDropdownOpen && (
                          <div
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="bg-[#d9ead3]/95 backdrop-blur-lg border border-[#167A4A]/20 shadow-[0_12px_36px_0_rgba(22,122,74,0.18)] rounded-full px-4 py-2 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                              {PRODUCT_ITEMS.map((prod, idx) => {
                                const isProdActive = isPathActive(prod.href);
                                return (
                                  <React.Fragment key={prod.key}>
                                    {idx > 0 && (
                                      <span className="text-[#167A4A]/30 text-xs font-light select-none">|</span>
                                    )}
                                    <Link
                                      href={prod.href}
                                      onClick={() => {
                                        setTimeout(() => setProductDropdownOpen(false), 80);
                                      }}
                                      className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                                        isProdActive
                                          ? "bg-[#167A4A] text-white shadow-sm"
                                          : "text-[#143324] hover:text-[#167A4A] hover:bg-[#167A4A]/15"
                                      }`}
                                    >
                                      {t(prod.key, prod.defaultName)}
                                    </Link>
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  );
                }

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`text-xs xl:text-[13px] font-semibold tracking-wider uppercase transition-all px-2.5 lg:px-3 py-1.5 rounded-full whitespace-nowrap ${
                      isActive
                        ? "bg-[#167A4A] text-white shadow-sm font-bold"
                        : "text-[#143324] hover:text-[#167A4A] hover:bg-[#167A4A]/10"
                    }`}
                  >
                    {translatedName}
                  </Link>
                );
              })}
            </nav>

            {/* Language Selector Dropdown Pill at End of Header */}
            <div className="relative flex items-center ml-1 lg:ml-2">
              <label htmlFor="header-language-select" className="sr-only">
                {t("nav_language", "Language")}
              </label>
              <div className="relative">
                <select
                  id="header-language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                  aria-label={t("nav_language", "Language")}
                  className="appearance-none bg-white/75 hover:bg-white text-[#143324] font-semibold text-xs xl:text-[13px] pl-3 pr-7 py-1.5 rounded-full border border-[#167A4A]/30 hover:border-[#167A4A] shadow-[0_2px_8px_rgba(22,122,74,0.08)] transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#167A4A]/25 backdrop-blur-md"
                >
                  {supportedLanguages.map((opt) => (
                    <option key={opt.code} value={opt.code} className="text-[#143324] bg-[#edf4ed] py-1 font-medium">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#167A4A]"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Right Controls: Language Selector Pill + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                aria-label={t("nav_language", "Language")}
                className="appearance-none bg-white/70 text-[#143324] font-semibold text-xs pl-2.5 pr-6 py-1 rounded-full border border-[#167A4A]/30 outline-none"
              >
                {supportedLanguages.map((opt) => (
                  <option key={opt.code} value={opt.code} className="text-[#143324] bg-[#edf4ed]">
                    {opt.label}
                  </option>
                ))}
              </select>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#167A4A]"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              className="p-1.5 text-[#143324] hover:text-[#167A4A] focus:outline-none cursor-pointer rounded-full hover:bg-[#167A4A]/10 transition-colors"
            >
              {mobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown Card */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-[#d9ead3]/95 backdrop-blur-xl border border-[#167A4A]/20 rounded-3xl shadow-[0_16px_40px_rgba(22,122,74,0.2)] p-5 flex flex-col gap-2.5 z-[9999] max-h-[calc(100vh-100px)] overflow-y-auto">
            {/* Mobile Language Switcher Strip */}
            <div className="flex items-center justify-between pb-3 mb-1 border-b border-[#167A4A]/15 px-1">
              <span className="text-xs font-bold text-[#143324]/80 uppercase tracking-wider">
                {t("nav_language", "Language")}
              </span>
              <div className="flex items-center gap-1.5">
                {supportedLanguages.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setLanguage(opt.code)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                      language === opt.code
                        ? "bg-[#167A4A] text-white shadow-sm font-bold"
                        : "bg-white/60 text-[#143324] hover:bg-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {NAV_ITEMS.map((item, index) => {
              const isActive = isPathActive(item.href);
              const translatedName = t(item.key, item.defaultName);

              // Insert PRODUCT dropdown after ABOUT (index 1)
              if (index === 1) {
                return (
                  <React.Fragment key={item.key}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        setTimeout(() => {
                          setMobileMenuOpen(false);
                          setMobileProductOpen(false);
                        }, 80);
                      }}
                      className={`text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? "bg-[#167A4A] text-white"
                          : "text-[#143324] hover:bg-[#167A4A]/10"
                      }`}
                    >
                      {translatedName}
                    </Link>

                    {/* Mobile PRODUCTS Dropdown with Horizontal Chips */}
                    <div className="bg-[#167A4A]/5 rounded-2xl p-3 border border-[#167A4A]/10">
                      <button
                        type="button"
                        onClick={() => setMobileProductOpen((prev) => !prev)}
                        className={`w-full text-left text-xs font-bold tracking-wider uppercase flex items-center justify-between text-[#143324] cursor-pointer`}
                      >
                        <span className="flex items-center gap-2">
                          {t("nav_products", "PRODUCTS")}
                          <span className="text-[10px] bg-[#167A4A]/15 text-[#167A4A] px-2 py-0.5 rounded-full font-semibold">5 ITEMS</span>
                        </span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-transform duration-200 ${mobileProductOpen ? "rotate-180" : ""}`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      {mobileProductOpen && (
                        <div className="flex flex-wrap gap-2 pt-3">
                          {PRODUCT_ITEMS.map((product) => {
                            const isProdActive = isPathActive(product.href);
                            return (
                              <Link
                                key={product.key}
                                href={product.href}
                                onClick={() => {
                                  setTimeout(() => {
                                    setMobileMenuOpen(false);
                                    setMobileProductOpen(false);
                                  }, 80);
                                }}
                                className={`px-3 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full transition-all ${
                                  isProdActive
                                    ? "bg-[#167A4A] text-white shadow-sm"
                                    : "bg-white/70 text-[#143324] hover:bg-[#167A4A] hover:text-white"
                                }`}
                              >
                                {t(product.key, product.defaultName)}
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
                  key={item.key}
                  href={item.href}
                  onClick={() => {
                    setTimeout(() => {
                      setMobileMenuOpen(false);
                      setMobileProductOpen(false);
                    }, 80);
                  }}
                  className={`text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#167A4A] text-white"
                      : "text-[#143324] hover:bg-[#167A4A]/10"
                  }`}
                >
                  {translatedName}
                </Link>
              );
            })}
          </div>
        )}
      </header>
    </div>
  );
}
