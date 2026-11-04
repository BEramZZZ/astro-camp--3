import Image from "next/image";

export default function CtaBanner() {
  return (
    <section
      id="cta"
      className="relative isolate flex min-h-112 flex-col items-center justify-end overflow-hidden px-6 pb-16 text-center"
    >
      <Image
        src="/images/cta-planet.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-bottom"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-space via-transparent to-space/80" />

      <h2 className="font-display text-2xl font-bold text-periwinkle sm:text-4xl">
        Haven’t registered yet?
      </h2>
      <p className="mt-2 font-display text-xl font-bold sm:text-3xl">
        Reserve your seat
      </p>
      <a
        href="#register"
        className="mt-8 rounded-xl bg-linear-to-b from-periwinkle to-[#5b5fc7] px-8 py-3 font-display text-sm font-medium uppercase shadow-lg shadow-periwinkle/30 transition hover:scale-105"
      >
        Register Now
      </a>
    </section>
  );
}