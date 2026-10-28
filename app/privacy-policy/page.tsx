import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import BiofactorFooter from "../components/BiofactorFooter";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Safety | Soul of Soil & Biofactor",
  description:
    "Privacy policy, data collection disclosure, and data deletion guidelines for Biofactor Biologicals and the Soul of Soil mobile application (com.biofactor.fieldapp).",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full bg-[#EDF4ED] text-[#173522] min-h-screen pt-28 sm:pt-32 pb-16 font-sans">
      <div className="max-w-[860px] mx-auto px-6 sm:px-8">
        
        {/* Header Breadcrumb & Eyebrow */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#173522]/15 text-[#147A46] text-xs font-mono font-semibold tracking-wider uppercase mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#147A46]" />
            LEGAL & DATA SAFETY
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0d2b1a] tracking-tight leading-tight">
            Privacy Policy & Data Safety
          </h1>
          <p className="text-sm font-mono text-[#173522]/60 mt-2">
            Applicable to: Biofactor Biologicals Website &amp; Soul of Soil Mobile App (<code>com.biofactor.fieldapp</code>)
          </p>
          <p className="text-xs font-mono text-[#173522]/50 mt-1">
            Last Updated: October 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white/90 border border-[#147A46]/15 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8 text-[15px] sm:text-[16px] leading-relaxed text-[#26382D]">

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#0d2b1a]">
              1. Overview &amp; Scope
            </h2>
            <p>
              Biofactor Biologicals (&ldquo;Biofactor&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy outlines how we collect, handle, store, and protect information collected through our official websites (<code>biofactor.in</code> and <code>biofactorglobal.com</code>) and our mobile applications, including <strong>SOUL OF SOIL</strong> (Package ID: <code>com.biofactor.fieldapp</code>) available on Google Play.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#0d2b1a]">
              2. Data We Collect
            </h2>
            <p>
              Depending on whether you use our field advisory services or the <strong>Soul of Soil</strong> mobile app, we may collect the following categories of data:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#26382D]/90">
              <li>
                <strong>Personal Information:</strong> Name, phone number, and email address provided during advisory consultations, farmer onboarding, or contact requests.
              </li>
              <li>
                <strong>Location Data (Approximate and Precise):</strong> The Soul of Soil app collects field geographic coordinates (latitude and longitude) with your explicit consent to map farm boundaries, tag soil sampling locations, and provide accurate agronomic recommendations based on regional weather and soil zones.
              </li>
              <li>
                <strong>Device &amp; App Diagnostics:</strong> Device identifiers and application performance logs collected to ensure compatibility, troubleshoot crashes, and verify app security.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#0d2b1a]">
              3. How We Use Your Information
            </h2>
            <p>We use the collected information strictly for:</p>
            <ul className="list-disc pl-5 space-y-2 text-[#26382D]/90">
              <li>Generating soil health cards and biological product dosage advisories.</li>
              <li>Connecting farmers with nearby One Health Centres and agronomists.</li>
              <li>Responding to farmer queries, test booking requests, and franchise inquiries.</li>
              <li>Maintaining app performance, security, and technical reliability.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#0d2b1a]">
              4. Data Sharing &amp; Third Parties
            </h2>
            <div className="p-4 rounded-xl bg-[#EDF4ED] border border-[#147A46]/20">
              <p className="font-semibold text-[#0d2b1a]">
                No Data Sold or Shared for Marketing:
              </p>
              <p className="text-sm text-[#173522]/85 mt-1">
                We do not sell, rent, or trade your personal or field data with any third-party advertisers or data brokers. Data is accessible solely to authorized Biofactor technical personnel and certified agronomists providing services to you.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#0d2b1a]">
              5. Security Practices
            </h2>
            <p>
              All data transmitted between your device and our servers is encrypted in transit using industry-standard Transport Layer Security (TLS/HTTPS). We employ strict server access controls to ensure your records are safeguarded against unauthorized access.
            </p>
          </section>

          {/* Section 6 - DATA DELETION (Google Play requirement) */}
          <section id="data-deletion" className="space-y-3 scroll-mt-32">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#0d2b1a] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#147A46]" />
              6. Data Deletion &amp; Retention Policy
            </h2>
            <p>
              In compliance with Google Play Data Safety standards, you have the right to request the permanent deletion of any personal information or field records collected through the <strong>Soul of Soil</strong> application or our services.
            </p>
            <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[#4a3518]">
              <h3 className="font-bold text-base text-[#3d270c] mb-1">
                How to Submit a Data Deletion Request:
              </h3>
              <p className="text-sm leading-relaxed mb-3">
                Because the Soul of Soil mobile application does not require users to create or manage permanent public account credentials, deletion requests can be initiated directly by contacting our data protection team:
              </p>
              <div className="space-y-1.5 text-sm font-mono">
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@biofactor.in?subject=Data%20Deletion%20Request%20-%20Soul%20of%20Soil" className="text-[#147A46] underline font-semibold">
                    info@biofactor.in
                  </a>
                </p>
                <p>
                  <strong>Subject Line:</strong> Data Deletion Request - Soul of Soil
                </p>
                <p>
                  <strong>Phone / WhatsApp:</strong> +91 7013074400
                </p>
              </div>
              <p className="text-xs text-[#5c4627] mt-3">
                Upon receiving your request with the registered phone number or field identifier, all associated personal records and diagnostic data will be permanently purged from our active databases within <strong>30 days</strong>.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#0d2b1a]">
              7. Contact Information
            </h2>
            <p>
              If you have any questions or feedback regarding this Privacy Policy or our data handling practices, please contact us at:
            </p>
            <div className="p-4 rounded-xl bg-[#EDF4ED]/60 border border-[#147A46]/15 text-sm space-y-1">
              <p className="font-bold text-[#0d2b1a]">Biofactor Biologicals</p>
              <p className="text-[#173522]/85">4 &amp; 5 Floors, Sai Medha Infra, Arca Satya Residency</p>
              <p className="text-[#173522]/85">Kousalya Colony, Bachupally, Hyderabad, Telangana 500090, India</p>
              <p className="text-[#173522]/85">Email: <a href="mailto:info@biofactor.in" className="text-[#147A46] underline">info@biofactor.in</a> | Phone: +91 7013074400</p>
            </div>
          </section>

        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-[#147A46] hover:underline"
          >
            ← Return to Biofactor Home
          </Link>
        </div>

      </div>

      <div className="mt-16">
        <BiofactorFooter />
      </div>
    </main>
  );
}
