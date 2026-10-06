import React from "react";
import Link from "next/link";

export default function AquacultureFooter() {
  return (
    <footer className="w-full" data-pm-section="footer" data-n="Closing" data-motion>

      {/* ── Top quote band ── */}
      <div className="w-full bg-[#173F2B] px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)] pt-9 pb-9 text-[#BFD9B4] md:pt-10 md:pb-10 lg:pt-[42px] lg:pb-[44px]">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-7 md:mb-9 rv">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50">
              BIOFACTOR · AQUACULTURE
            </span>
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50">
              FOCUS · <span className="text-white font-bold">POND HEALTH</span>
            </span>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="call rv d1 flex max-w-[780px] lg:col-span-7 xl:col-span-8">
              <div className="mr-5 w-[2px] flex-shrink-0 self-stretch rounded-full bg-[#B8E986]/60 sm:mr-6 lg:mr-8" aria-hidden="true" />
              <h2 className="font-inter-tight text-[30px] leading-[1.02] font-extrabold text-[#F8FAFC] sm:text-[38px] md:text-[44px] lg:text-[48px] xl:text-[50px]">
                Manage the bottom, <br className="hidden sm:block" />
                <span className="font-newsreader font-normal text-[#B8E986] italic">and the water follows.</span>
              </h2>
            </div>

            <div className="rv d2 flex flex-col justify-center gap-3.5 lg:col-span-5 xl:col-span-4">
              <p className="font-inter-tight text-lg font-extrabold tracking-[0.15em] text-white sm:text-[21px] lg:text-[22px]">
                BIOFACTOR <span className="text-[#B8E986]">BIOLOGICALS</span>
              </p>
              <p className="font-newsreader max-w-sm text-sm leading-relaxed text-white/70 italic sm:text-[16px] lg:text-[17px]">
                Turning microbial functions into measurable biological impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="w-full bg-[#0e2619] text-[#cfe6bd]" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)] pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 lg:gap-8">

            {/* Brand */}
            <div className="flex flex-col gap-5">
              <Link href="/" className="inline-block">
                <img src="/images/biofactor-official-logo.png" alt="BIOFACTOR BIOLOGICALS"
                  className="h-[64px] w-auto object-contain brightness-0 invert" />
              </Link>
              <p className="font-newsreader text-sm leading-relaxed text-white/60 max-w-[280px]">
                Turning microbial functions into measurable biological impact across every production stage.
              </p>
              <div className="flex items-center gap-4 mt-1">
                {/* Instagram */}
                <a href="https://www.instagram.com/biofactorindia" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/50 hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/biofactorindia" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/50 hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/50 hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="https://in.linkedin.com/company/biofactorindia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/50 hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#cfe6bd]/40 uppercase">Company</span>
              <nav className="flex flex-col gap-3">
                {[
                  { label: "About Us",             href: "/about" },
                  { label: "Our Story",            href: "/about" },
                  { label: "Science & Technology", href: "/science-technology" },
                  { label: "One Health",           href: "/one-health" },
                  { label: "Careers",              href: "#" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="font-sans text-sm text-[#cfe6bd]/75 hover:text-[#cfe6bd] transition-colors">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Products */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#cfe6bd]/40 uppercase">Products</span>
              <nav className="flex flex-col gap-3">
                {[
                  { label: "Poultry",        href: "/poultry" },
                  { label: "Ruminants",      href: "/ruminants" },
                  { label: "Aquaculture",    href: "/aquaculture" },
                  { label: "Bioremediation", href: "/bioremediation" },
                  { label: "Overview",       href: "/" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="font-sans text-sm text-[#cfe6bd]/75 hover:text-[#cfe6bd] transition-colors">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#cfe6bd]/40 uppercase">Contact</span>
              <nav className="flex flex-col gap-3">
                {[
                  { label: "Get in Touch",  href: "#" },
                  { label: "Press & Media", href: "#" },
                  { label: "Partners",      href: "#" },
                  { label: "Research",      href: "#" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="font-sans text-sm text-[#cfe6bd]/75 hover:text-[#cfe6bd] transition-colors">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono text-[11px] text-[#8fb39a] tracking-wide">
              © {new Date().getFullYear()} Biofactor Biologicals. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="font-mono text-[11px] text-[#8fb39a]/70 hover:text-[#cfe6bd] tracking-wide transition-colors">
                Terms & Conditions
              </Link>
              <Link href="#" className="font-mono text-[11px] text-[#8fb39a]/70 hover:text-[#cfe6bd] tracking-wide transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
