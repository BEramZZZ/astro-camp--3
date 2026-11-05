import Image from "next/image";

// small seeded generator: same "random" numbers on server and browser
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COUNT = 45;

export default function Sprinkles() {
  const rand = rng(2026);
  const items = Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    left: rand() * 100, // %
    top: rand() * 100, // % of the full page height
    size: 10 + rand() * 26, // px
    rotate: Math.round(rand() * 360),
    opacity: 0.25 + rand() * 0.6,
    delay: rand() * 6,
    duration: 3 + rand() * 4,
  }));

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-x-clip"
    >
      {items.map((s) => (
        <Image
          key={s.id}
          src="/images/sparkle.png"
          alt=""
          width={64}
          height={64}
          className="twinkle absolute h-auto select-none"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            rotate: `${s.rotate}deg`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}