"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "ONE HEALTH", href: "/one-health" },
  { name: "SCIENCE & TECHNOLOGY", href: "/science-technology" },
  { name: "RESOURCES", href: "/resources" },
  { name: "CAREERS", href: "/careers" },
  { name: "CONTACT", href: "/contact" },
];

const PRODUCT_ITEMS = [
  { name: "Agriculture", href: "/nutrients" },
  { name: "Aquaculture", href: "/aquaculture" },
  { name: "Bioremediation", href: "/bioremediation" },
  { name: "Poultry", href: "/poultry" },
  { name: "Ruminants", href: "/ruminants" },
];

export default function BiofactorHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductDropdownOpen(false);
    setMobileProductOpen(false);
  }, [pathname]);

  // Warm up and prefetch all product routes for instant transitions
  useEffect(() => {
    PRODUCT_ITEMS.forEach((product) => {
      router.prefetch(product.href);
    });
    NAV_ITEMS.forEach((item) => {
      router.prefetch(item.href);
    });
  }, [router]);

  // Check if PRODUCTS should be active
  const isProductActive =
    pathname === "/ruminants" ||
    pathname === "/poultry" ||
    pathname === "/bioremediation" ||
    pathname === "/aquaculture" ||
    pathname === "/nutrients" ||
    pathname.startsWith("/products");

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
    <div className="fixed top-2 sm:top-3.5 left-0 right-0 z-[9999] px-3 sm:px-6 pointer-events-none w-full max-w-[1440px] mx-auto">
      <header
        className="pointer-events-auto w-full bg-[#d9ead3]/90 backdrop-blur-md backdrop-saturate-150 border border-[#167A4A]/20 rounded-full shadow-[0_8px_32px_0_rgba(22,122,74,0.12)] transition-all duration-300 relative"
      >
        <div className="w-full px-4 sm:px-6 md:px-8 h-[56px] md:h-[64px] flex items-center justify-between">
          {/* Left Side: Official Biofactor Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0 transition-transform hover:scale-[1.02]">
            <img
              src="/images/biofactor-official-logo.png"
              alt="BIOFACTOR BIOLOGICALS"
              className="h-[34px] md:h-[46px] w-auto object-contain block select-none drop-shadow-sm"
            />
          </Link>

          {/* Right Side Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5 xl:gap-3.5 ml-auto">
            {NAV_ITEMS.map((item, index) => {
              const isActive = pathname === item.href;
              // Insert PRODUCTS dropdown after ABOUT (index 1)
              if (index === 1) {
                return (
                  <React.Fragment key={item.name}>
                    <Link
                      href={item.href}
                      className={`text-xs xl:text-[13px] font-semibold tracking-wider uppercase transition-all px-3 py-1.5 rounded-full whitespace-nowrap ${
                        isActive
                          ? "bg-[#167A4A] text-white shadow-sm font-bold"
                          : "text-[#143324] hover:text-[#167A4A] hover:bg-[#167A4A]/10"
                      }`}
                    >
                      {item.name}
                    </Link>

                    {/* PRODUCTS Dropdown trigger & horizontal sub-bar container */}
                    <div
                      className="relative"
                      ref={dropdownRef}
                    >
                      <button
                        type="button"
                        onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                        onMouseEnter={() => setProductDropdownOpen(true)}
                        className={`text-xs xl:text-[13px] font-semibold tracking-wider uppercase transition-all px-3.5 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                          isProductActive || productDropdownOpen
                            ? "bg-[#167A4A] text-white shadow-sm font-bold"
                            : "text-[#143324] hover:text-[#167A4A] hover:bg-[#167A4A]/10"
                        }`}
                      >
                        PRODUCTS
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

                      {/* HORIZONTAL Dropdown Menu (FoundingLegals Capsule Sub-bar Style) */}
                      {productDropdownOpen && (
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                          onMouseEnter={() => setProductDropdownOpen(true)}
                          onMouseLeave={() => setProductDropdownOpen(false)}
                        >
                          <div className="bg-[#d9ead3]/95 backdrop-blur-lg border border-[#167A4A]/20 shadow-[0_12px_36px_0_rgba(22,122,74,0.18)] rounded-full px-4 py-2 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                            {PRODUCT_ITEMS.map((prod, idx) => {
                              const isProdActive = pathname === prod.href;
                              return (
                                <React.Fragment key={prod.name}>
                                  {idx > 0 && (
                                    <span className="text-[#167A4A]/30 text-xs font-light select-none">|</span>
                                  )}
                                  <Link
                                    href={prod.href}
                                    prefetch={true}
                                    onClick={() => setProductDropdownOpen(false)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                                      isProdActive
                                        ? "bg-[#167A4A] text-white shadow-sm"
                                        : "text-[#143324] hover:text-[#167A4A] hover:bg-[#167A4A]/15"
                                    }`}
                                  >
                                    {prod.name}
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
                  key={item.name}
                  href={item.href}
                  className={`text-xs xl:text-[13px] font-semibold tracking-wider uppercase transition-all px-3 py-1.5 rounded-full whitespace-nowrap ${
                    isActive
                      ? "bg-[#167A4A] text-white shadow-sm font-bold"
                      : "text-[#143324] hover:text-[#167A4A] hover:bg-[#167A4A]/10"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              className="p-2 text-[#143324] hover:text-[#167A4A] focus:outline-none cursor-pointer rounded-full hover:bg-[#167A4A]/10 transition-colors"
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
            {NAV_ITEMS.map((item, index) => {
              const isActive = pathname === item.href;
              // Insert PRODUCT dropdown after ABOUT (index 1)
              if (index === 1) {
                return (
                  <React.Fragment key={item.name}>
                    <Link
                      href={item.href}
                      prefetch={true}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileProductOpen(false);
                      }}
                      className={`text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? "bg-[#167A4A] text-white"
                          : "text-[#143324] hover:bg-[#167A4A]/10"
                      }`}
                    >
                      {item.name}
                    </Link>

                    {/* Mobile PRODUCTS Dropdown with Horizontal Chips */}
                    <div className="bg-[#167A4A]/5 rounded-2xl p-3 border border-[#167A4A]/10">
                      <button
                        type="button"
                        onClick={() => setMobileProductOpen((prev) => !prev)}
                        className={`w-full text-left text-xs font-bold tracking-wider uppercase flex items-center justify-between text-[#143324] cursor-pointer`}
                      >
                        <span className="flex items-center gap-2">
                          PRODUCTS
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
                            const isProdActive = pathname === product.href;
                            return (
                              <Link
                                key={product.name}
                                href={product.href}
                                prefetch={true}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileProductOpen(false);
                                }}
                                className={`px-3 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full transition-all ${
                                  isProdActive
                                    ? "bg-[#167A4A] text-white shadow-sm"
                                    : "bg-white/70 text-[#143324] hover:bg-[#167A4A] hover:text-white"
                                }`}
                              >
                                {product.name}
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
                  prefetch={true}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileProductOpen(false);
                  }}
                  className={`text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#167A4A] text-white"
                      : "text-[#143324] hover:bg-[#167A4A]/10"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </header>
    </div>
  );
}
