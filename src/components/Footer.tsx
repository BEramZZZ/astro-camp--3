import Image from "next/image";
import type { IconType } from "react-icons";
import {
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaDiscord,
  FaLocationDot,
} from "react-icons/fa6";
import { event } from "@/data/event";

const icons: Record<string, IconType> = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  linkedin: FaLinkedinIn,
  discord: FaDiscord,
};

export default function Footer() {
  return (
    <footer className="bg-space px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-sm space-y-4">
          <Image
            src="/images/logo.png"
            alt="Astro Camp 3"
            width={667}
            height={267}
            className="h-auto w-40"
          />
          <p className="italic text-white/80">
            “Aim towards the end and you might land on a star or Jupiter”
          </p>
          <p className="flex items-start gap-2 text-sm text-white/80">
            <FaLocationDot className="mt-1 shrink-0" aria-hidden />
            {event.location}
          </p>
        </div>

        <div className="md:text-right">
          <h2 className="text-xl">About us</h2>
          <ul className="mt-4 flex gap-5 md:justify-end">
            {event.socials.map((s) => {
              const Icon = icons[s.id];
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl transition hover:text-cyan"
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-white/50">
        © 2026 Astro Camp 3. All rights reserved.
      </p>
    </footer>
  );
}