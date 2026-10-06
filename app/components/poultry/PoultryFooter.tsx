import React from "react";
import Link from "next/link";

export default function PoultryFooter() {
  return (
    <footer className="w-full bg-[#0B2318] text-white" data-pm-section="footer">
      {/* Main footer content */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)] pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 lg:gap-8">

          {/* Left — Brand block */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <img
                src="/images/biofactor-official-logo.png"
                alt="BIOFACTOR BIOLOGICALS"
                className="h-[44px] w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="font-serif text-sm leading-relaxed text-white/60 max-w-[280px]">
              Turning microbial functions into measurable biological impact across every production stage.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4 mt-1">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-white/50 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" aria-label="X" className="text-white/50 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="text-white/50 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="text-white/50 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Company */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">Company</span>
            <nav className="flex flex-col gap-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Story", href: "/about" },
                { label: "Science & Technology", href: "/science-technology" },
                { label: "One Health", href: "/one-health" },
                { label: "Careers", href: "#" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-sans text-sm text-white/65 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Products */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">Products</span>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Poultry", href: "/poultry" },
                { label: "Ruminants", href: "/ruminants" },
                { label: "Aquaculture", href: "/aquaculture" },
                { label: "Bioremediation", href: "/bioremediation" },
                { label: "Overview", href: "/" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-sans text-sm text-white/65 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4 — Contact */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">Contact</span>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Get in Touch", href: "#" },
                { label: "Press & Media", href: "#" },
                { label: "Partners", href: "#" },
                { label: "Research", href: "#" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-sans text-sm text-white/65 hover:text-white transition-colors"
                >
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
          <p className="font-mono text-[11px] text-white/35 tracking-wide">
            © {new Date().getFullYear()} Biofactor Biologicals. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="font-mono text-[11px] text-white/35 hover:text-white/70 tracking-wide transition-colors">
              Terms & Conditions
            </Link>
            <Link href="#" className="font-mono text-[11px] text-white/35 hover:text-white/70 tracking-wide transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
