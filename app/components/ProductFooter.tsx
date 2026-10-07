import React from "react";
import Link from "next/link";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "One Health", href: "/one-health" },
  { label: "Science & Technology", href: "/science-technology" },
  { label: "Resources", href: "/resources" },
  { label: "Careers", href: "/careers" },
];

const productLinks = [
  { label: "Agriculture", href: "/nutrients" },
  { label: "Aquaculture", href: "/aquaculture" },
  { label: "Bioremediation", href: "/bioremediation" },
  { label: "Poultry", href: "/poultry" },
  { label: "Ruminants", href: "/ruminants" },
];

const contactLinks = [
  { label: "Get in Touch", href: "#" },
  { label: "Press & Media", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Research", href: "#" },
];

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">
        {title}
      </span>
      <nav className="flex flex-col gap-3">
        {links.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="font-sans text-sm text-white/65 transition-colors hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function ProductFooter() {
  return (
    <footer className="w-full bg-[#0B2318] text-white" data-product-section="footer">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-14 pb-10 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-8">
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <img
                src="/images/biofactor-official-logo.png"
                alt="BIOFACTOR BIOLOGICALS"
                className="h-[64px] w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="max-w-[280px] font-serif text-sm leading-relaxed text-white/60">
              Turning microbial functions into measurable biological impact across every production stage.
            </p>
            <div className="mt-1 flex items-center gap-4">
              {/* Instagram */}
              <a href="https://www.instagram.com/biofactorindia" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/50 transition-colors hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="https://twitter.com/BiofactorIndia/status/1756149728788779379" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-white/50 transition-colors hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/biofactorindia" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/50 transition-colors hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@biofactor" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/50 transition-colors hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://in.linkedin.com/company/biofactorindia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/50 transition-colors hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <FooterLinks title="Company" links={companyLinks} />
          <FooterLinks title="Products" links={productLinks} />
          <FooterLinks title="Contact" links={contactLinks} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row md:px-10 lg:px-[clamp(48px,5vw,72px)]">
          <p className="font-mono text-[11px] tracking-wide text-white/35">
            © {new Date().getFullYear()} Biofactor Biologicals. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="font-mono text-[11px] tracking-wide text-white/35 transition-colors hover:text-white/70">
              Terms &amp; Conditions
            </Link>
            <Link href="#" className="font-mono text-[11px] tracking-wide text-white/35 transition-colors hover:text-white/70">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}