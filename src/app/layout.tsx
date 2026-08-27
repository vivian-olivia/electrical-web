import type { Metadata } from "next";
import type { ReactNode } from "react";
import { inter, plusJakartaSans, ibmPlexMono } from "./fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { pageMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  ...pageMetadata(
    "Solusi Kelistrikan Tegangan Menengah",
    "Engineering, EPC, Testing & Commissioning, dan Maintenance untuk sistem kelistrikan tegangan menengah.",
  ),
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen flex flex-col w-full">
        <Providers>
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
