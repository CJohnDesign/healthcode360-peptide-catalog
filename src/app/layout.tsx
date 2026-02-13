import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InterestListProvider } from "@/context/InterestListContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HealthCode360 | Peptide Catalog",
    template: "%s | HealthCode360",
  },
  description:
    "HealthCode360 peptide catalog. Clinical-grade compounds for weight management, recovery, longevity, and hormonal health. Browse, compare, submit inquiries. Provider-guided, precision formulated.",
  keywords: [
    "peptides",
    "peptide catalog",
    "HealthCode360",
    "semaglutide",
    "tirzepatide",
    "BPC-157",
    "TB-500",
    "weight management",
    "longevity",
    "growth hormone",
    "clinical grade",
  ],
  authors: [{ name: "HealthCode360" }],
  creator: "HealthCode360",
  publisher: "HealthCode360",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "HealthCode360 Peptide Catalog",
    title: "HealthCode360 | Peptide Catalog",
    description:
      "HealthCode360 peptide catalog. Clinical-grade compounds for weight management, recovery, longevity, and hormonal health. Browse, compare, submit inquiries. Precision peptides. Elevated outcomes.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "HealthCode360 Peptide Catalog — Precision peptides. Elevated outcomes.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HealthCode360 | Peptide Catalog",
    description:
      "HealthCode360 peptide catalog. Clinical-grade compounds for weight management, recovery, longevity, and hormonal health. Browse, compare, submit inquiries. Precision peptides. Elevated outcomes.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-body">
        <InterestListProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </InterestListProvider>
      </body>
    </html>
  );
}
