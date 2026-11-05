"use client";

import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#activities", label: "Activities" },
  { href: "#agenda", label: "Agenda" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-space/60 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <a href="#home" aria-label="Astro Camp 3 home">
          <Image
            src="/images/logo.png"
            alt="Astro Camp 3"
            width={667}
            height={267}
            className="h-9 w-auto"
            priority
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-white/90 transition hover:text-cyan"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-white/10 px-5 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-white/90"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}