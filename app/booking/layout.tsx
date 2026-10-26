import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Conference Room | Biofactor",
  description: "Reserve and manage conference room bookings for Biofactor team meetings and presentations.",
  openGraph: {
    title: "Book Conference Room | Biofactor",
    description: "Reserve and manage conference room bookings for Biofactor team meetings and presentations.",
    url: "https://biofactorglobal.com/booking",
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
