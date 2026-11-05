import type { Metadata } from "next";
import { Exo_2, Inter } from "next/font/google";
import "./globals.css";

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
      <body>
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-[url('/images/stars.png')] bg-size-[900px] bg-repeat opacity-40"
        />
        {children}
      </body>
    </html>
  );
}