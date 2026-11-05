import type { Metadata } from "next";
import { Exo_2, Inter } from "next/font/google";
import "./globals.css";
import Sprinkles from "@/components/Sprinkles";

const display = Exo_2({ subsets: ["latin"], variable: "--font-display-src" });
const body = Inter({ subsets: ["latin"], variable: "--font-body-src" });

export const metadata: Metadata = {
  metadataBase: new URL("https://astro-camp-3.vercel.app"),
  title: "Astro Camp 3",
  description: "Look at the stars among like minded people.",
  openGraph: {
    title: "Astro Camp 3",
    description: "Look at the stars among like minded people.",
    url: "/",
    siteName: "Astro Camp 3",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Astro Camp 3, organized by Astrotech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Astro Camp 3",
    description: "Look at the stars among like minded people.",
    images: ["/images/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="relative">
        <Sprinkles />
        {children}
      </body>
    </html>
  );
}