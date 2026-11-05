"use client";

import { useEffect, useState } from "react";

// Dec 26, 09:00 in Algiers (UTC+1, no daylight saving)
const TARGET = new Date("2026-12-26T09:00:00+01:00").getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

function computeTimeLeft(): TimeLeft {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    finished: diff === 0,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  // null on the server and on first render, so the server HTML and the
  // browser HTML match (no hydration warning)
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(computeTimeLeft());
    const id = setInterval(() => setTime(computeTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time?.finished) {
    return (
      <p className="font-display text-xl font-bold text-periwinkle sm:text-2xl">
        The mission has launched
      </p>
    );
  }

  const units = [
    { label: "Days", value: time ? String(time.days) : "--" },
    { label: "Hours", value: time ? pad(time.hours) : "--" },
    { label: "Minutes", value: time ? pad(time.minutes) : "--" },
    { label: "Seconds", value: time ? pad(time.seconds) : "--" },
  ];

  return (
    <div
      role="timer"
      aria-label="Time left until Astro Camp 3 starts"
      className="flex items-center justify-center gap-2 sm:gap-4"
    >
      {units.map((u) => (
        <div
          key={u.label}
          className="liquid-glass flex w-[4.25rem] flex-col items-center rounded-2xl px-1 py-3 sm:w-24 sm:py-4 md:w-28"
        >
          <span className="relative z-10 font-display text-2xl font-bold tabular-nums text-white sm:text-4xl md:text-5xl">
            {u.value}
          </span>
          <span className="relative z-10 mt-1 text-[10px] uppercase tracking-widest text-periwinkle sm:text-xs">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}