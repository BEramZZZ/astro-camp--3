import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lost in space | Astro Camp 3",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-x-clip px-6 text-center">
      {/* drifting ship */}
      <Image
        src="/images/ship-1.png"
        alt=""
        aria-hidden
        width={800}
        height={600}
        className="drift pointer-events-none absolute left-0 top-[14%] h-auto w-24 sm:w-40"
      />

      <p className="text-xs uppercase tracking-[0.35em] text-accent">
        Signal lost
      </p>

            {/* 4 [orbit] 4 */}
      <div className="mt-4 flex items-center justify-center gap-2 sm:gap-4">
        <span className="font-display text-[7rem] font-bold leading-none text-periwinkle sm:text-[11rem]">
          4
        </span>

        <div className="relative size-28 sm:size-44">
          {/* planet body */}
          <div className="float absolute inset-2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#8085f0,#2a1a5e_55%,#05050f)] shadow-[0_0_50px_rgba(128,133,240,0.45)] sm:inset-3" />
          {/* orbit ring + dot */}
          <div className="absolute -inset-3 rounded-full border border-periwinkle/30 sm:-inset-5" />
          <div className="orbit absolute -inset-3 sm:-inset-5">
            <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_var(--color-accent)]" />
          </div>
        </div>

        <span className="font-display text-[7rem] font-bold leading-none text-periwinkle sm:text-[11rem]">
          4
        </span>
      </div>

      <h1 className="mt-6 font-display text-2xl font-bold sm:text-4xl">
        Houston, we lost this page
      </h1>
      <p className="mt-3 max-w-md text-lavender">
        The page you are looking for drifted out of orbit, or never existed.
        Let&apos;s get you back to base.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-xl bg-linear-to-b from-periwinkle to-[#5b5fc7] px-8 py-3 font-display text-sm font-medium uppercase tracking-wider shadow-lg shadow-periwinkle/30 transition hover:scale-105"
      >
        Return to base
      </Link>
    </main>
  );
}