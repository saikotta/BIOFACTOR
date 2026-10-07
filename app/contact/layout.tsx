import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Biofactor Biologicals",
  description: "Get in touch with Biofactor Biologicals for product inquiries, partnership opportunities, agronomic advice, and customer support.",
  keywords: [
    "Contact Biofactor Biologicals",
    "Agricultural Biotechnology Enquiries",
    "Biotech Customer Support",
    "Biofactor Hyderabad Office"
  ],
  openGraph: {
    title: "Contact Biofactor Biologicals",
    description: "Get in touch with Biofactor Biologicals for product inquiries, partnership opportunities, agronomic advice, and customer support.",
    url: "https://biofactor.in/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
