import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Job Openings | Join Biofactor Biologicals",
  description: "Explore career opportunities in agricultural biotechnology, research, agronomy, and quality control at Biofactor Biologicals.",
  keywords: [
    "Biotechnology Careers",
    "Agronomy Jobs India",
    "Biological Research Careers",
    "Biofactor Careers",
    "Microbiology Job Openings"
  ],
  openGraph: {
    title: "Careers at Biofactor Biologicals",
    description: "Explore career opportunities in agricultural biotechnology, research, agronomy, and quality control at Biofactor Biologicals.",
    url: "https://biofactor.in/careers",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
