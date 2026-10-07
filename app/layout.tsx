import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import BiofactorHeader from "./components/BiofactorHeader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://biofactor.in"),
  title: {
    default: "Biofactor Biologicals | Sustainable Biological Solutions",
    template: "%s | Biofactor Biologicals",
  },
  description: "Biofactor Biologicals delivers advanced biological solutions for agriculture, aquaculture, poultry, ruminants, and bioremediation.",
  manifest: "/manifest.json",
  keywords: [
    "Biofactor",
    "Biologicals",
    "Agriculture",
    "Aquaculture",
    "Poultry",
    "Ruminants",
    "Bioremediation",
    "Microbiology",
    "Probiotics",
    "Sustainable Farming"
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Biofactor Biologicals | Sustainable Biological Solutions",
    description: "Biofactor Biologicals delivers advanced biological solutions for agriculture, aquaculture, poultry, ruminants, and bioremediation.",
    url: "https://biofactor.in",
    siteName: "Biofactor Biologicals",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Biofactor Biologicals",
    "alternateName": "Biofactor India",
    "url": "https://biofactor.in",
    "logo": "https://biofactor.in/icon.png",
    "description": "Biofactor Biologicals delivers advanced biological solutions for agriculture, aquaculture, poultry, ruminants, and bioremediation.",
    "sameAs": [
      "https://www.instagram.com/biofactorindia",
      "https://in.linkedin.com/company/biofactorindia",
      "https://www.facebook.com/biofactorindia",
      "https://www.youtube.com/@biofactor"
    ]
  };

  return (
    <html lang="en" className={`${poppins.variable} dark h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-black text-white font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BiofactorHeader />
        <div className="pt-[64px] md:pt-[72px]">
          {children}
        </div>
      </body>
    </html>
  );
}

