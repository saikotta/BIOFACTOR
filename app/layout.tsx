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
  title: "Biofactor Biologicals — Completing Chemical Systems with Biological Intelligence",
  description: "Chemistry built modern agriculture. It can't finish the job alone.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} dark h-full antialiased`}>
      <body className="min-h-full bg-black text-white font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden">
        <BiofactorHeader />
        <div className="pt-[64px] md:pt-[72px]">
          {children}
        </div>
      </body>
    </html>
  );
}

