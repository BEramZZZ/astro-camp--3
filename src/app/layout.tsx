import type { Metadata } from "next";
import { Orbitron, Gentium_Plus } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const gentium = Gentium_Plus({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gentium",
});

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
    <html lang="en" className={`${orbitron.variable} ${gentium.variable}`}>
      <body>{children}</body>
    </html>
  );
}