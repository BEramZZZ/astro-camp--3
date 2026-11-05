import Image from "next/image";
import { event } from "@/data/event";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center justify-center overflow-hidden md:justify-end"
    >
      <Image
        src="/images/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-left [mask-image:linear-gradient(to_bottom,black_65%,transparent)]"
      />
      {/* fades the photo into the page background */}
      <div className="absolute inset-0 bg-linear-to-b from-space/30 to-transparent" />

      <div className="relative z-10 flex max-w-xl flex-col items-center gap-6 px-6 pt-20 text-center md:mr-[8%]">
        <Image
          src="/images/logo-2x.png"
          alt=""
          width={1334}
          height={534}
          className="w-64 sm:w-80"
          priority
        />
        <h1 className="font-display text-xl font-bold uppercase tracking-widest text-lavender sm:text-3xl">
          {event.name} Event
        </h1>
        <p className="font-body text-base uppercase tracking-wide sm:text-lg">
          {event.tagline}
        </p>
        <a
          href="#register"
          className="rounded-xl bg-linear-to-b from-periwinkle to-[#5b5fc7] px-8 py-3 font-display text-sm font-medium shadow-lg shadow-periwinkle/30 transition hover:scale-105"
        >
          Register Now
        </a>
      </div>
    </section>
  );
}