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

  // Check if PRODUCTS should be active (when on /ruminants, /poultry, /bioremediation, /aquaculture, /nutrients, or /products)
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
    <header className="fixed top-0 left-0 right-0 z-[9999] w-full bg-[#d9ead3] border-t-2 border-[#93c47d] border-b border-[#167A4A]/12">
      <div className="w-full max-w-[1700px] mx-auto h-[64px] md:h-[72px] px-4 sm:px-6 md:px-8 lg:px-10 flex items-center justify-between">
        {/* Left Side: Official Biofactor Logo */}
        <Link href="/" className="flex items-center group flex-shrink-0">
          <img
            src="/images/biofactor-official-logo.png"
            alt="BIOFACTOR BIOLOGICALS"
            className="h-[40px] md:h-[56px] w-auto object-contain block select-none"
          />
        </Link>

        {/* Right Side Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3 md:gap-4 lg:gap-6 xl:gap-7 ml-auto">
          {NAV_ITEMS.map((item, index) => {
            const isActive = pathname === item.href;
            // Insert PRODUCTS dropdown after ABOUT (index 1)
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

                  {/* PRODUCTS Dropdown */}
                  <div
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={() => setProductDropdownOpen(true)}
                    onMouseLeave={() => setProductDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                      className={`text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors whitespace-nowrap py-1 relative flex items-center gap-1 cursor-pointer ${
                        isProductActive || productDropdownOpen
                          ? "text-[#167A4A] font-bold"
                          : "text-[#26382D] hover:text-[#167A4A]"
                      }`}
                    >
                      PRODUCTS
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
                      {(isProductActive || productDropdownOpen) && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#167A4A] rounded-full" />
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {productDropdownOpen && (
                      <div className="absolute top-full left-0 pt-2 min-w-[160px] z-50">
                        <div className="bg-[#d9ead3] border border-[#167A4A]/12 shadow-lg rounded-sm py-2">
                          {PRODUCT_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                prefetch={true}
                                onClick={() => setProductDropdownOpen(false)}
                                className={`block px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors hover:bg-[#167A4A]/10 ${
                                  isActive
                                    ? "bg-[#167A4A]/20 text-[#167A4A] font-bold"
                                    : "text-[#26382D] hover:text-[#167A4A]"
                                }`}
                              >
                                {item.name}
                              </Link>
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#d9ead3] border-b border-[#167A4A]/12 shadow-lg px-8 py-5 flex flex-col gap-3.5 z-[9999] max-h-[calc(100vh-72px)] overflow-y-auto">
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
                    className={`text-sm font-semibold tracking-wider uppercase py-2 border-b border-[#167A4A]/12 ${
                      isActive
                        ? "text-[#167A4A] font-bold"
                        : "text-[#26382D] hover:text-[#167A4A]"
                    }`}
                  >
                    {item.name}
                  </Link>

                  {/* Mobile PRODUCTS Dropdown */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setMobileProductOpen((prev) => !prev)}
                      className={`w-full text-left text-sm font-semibold tracking-wider uppercase py-2 flex items-center justify-between relative border-b border-[#167A4A]/12 cursor-pointer ${
                        isProductActive || mobileProductOpen
                          ? "text-[#167A4A] font-bold"
                          : "text-[#26382D] hover:text-[#167A4A]"
                      }`}
                    >
                      PRODUCTS
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform ${mobileProductOpen ? "rotate-180" : ""}`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                      {(isProductActive || mobileProductOpen) && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#167A4A] rounded-full" />
                      )}
                    </button>

                    {mobileProductOpen && (
                      <div className="pl-4 flex flex-col pt-1">
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
                              className={`w-full text-left py-2 px-2 text-sm font-semibold tracking-wider uppercase block rounded transition-colors ${
                                isProdActive
                                  ? "bg-[#167A4A]/20 text-[#167A4A] font-bold"
                                  : "text-[#26382D] hover:text-[#167A4A] hover:bg-[#167A4A]/10"
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
