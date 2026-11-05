import type { Metadata } from "next";
import { Exo_2, Inter } from "next/font/google";
import "./globals.css";
import Sprinkles from "@/components/Sprinkles";

const display = Exo_2({ subsets: ["latin"], variable: "--font-display-src" });
const body = Inter({ subsets: ["latin"], variable: "--font-body-src" });

export const metadata: Metadata = {
  title: "Astro Camp 3",
  description: "Look at the stars among like minded people.",
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