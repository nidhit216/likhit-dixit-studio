import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const SITE = "https://likhitdixit.com"; // update to your real domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Likhit Dixit — Product & Food Photography",
    template: "%s — Likhit Dixit",
  },
  description:
    "Likhit Dixit is a product and food photographer based in Mumbai, working with brands and restaurants worldwide. Clean, considered, premium imagery.",
  keywords: [
    "product photographer Mumbai",
    "food photographer Mumbai",
    "jewellery photography",
    "still life photographer",
    "Likhit Dixit",
  ],
  openGraph: {
    title: "Likhit Dixit — Product & Food Photography",
    description:
      "Product and food photography built on precision — for brands that sell on how things look.",
    url: SITE,
    siteName: "Likhit Dixit Studio",
    images: [{ url: "/work/tanishq/01-bangles.jpg", width: 2000, height: 1333 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Likhit Dixit — Product & Food Photography",
    description: "Product and food photography built on precision.",
    images: ["/work/tanishq/01-bangles.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
