import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources & Research Papers | Biofactor Biologicals",
  description: "Access technical guides, scientific publications, research papers, and case studies on biological agriculture and biotechnology.",
  keywords: [
    "Biofactor Research Papers",
    "Aquaculture Technical Guides",
    "Biological Farming Case Studies",
    "Soil Microbiology Publications"
  ],
  openGraph: {
    title: "Resources & Research | Biofactor Biologicals",
    description: "Access technical guides, scientific publications, research papers, and case studies on biological agriculture and biotechnology.",
    url: "https://biofactor.in/resources",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
