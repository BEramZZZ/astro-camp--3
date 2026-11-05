import Image from "next/image";
import Formula from "@/components/Formula";

export default function CtaBanner() {
  return (
    <section
      id="cta"
      className="relative isolate flex min-h-[34rem] flex-col items-center justify-start overflow-hidden px-6 pt-16 text-center"
    >
      <div
      aria-hidden
      className="star-cluster pointer-events-none absolute left-1/2 top-0 -z-10 h-[24rem] w-[min(100%,52rem)] -translate-x-1/2"
    />
      <h2 className="font-display text-2xl font-bold text-white sm:text-4xl">
        Haven’t registered yet?
      </h2>
      <p className="mt-2 font-display text-xl font-bold text-lavender sm:text-3xl">
        Reserve your seat
      </p>
      <a
        href="#register"
           className="glass-btn mt-8 rounded-xl px-8 py-3 font-display text-sm font-medium uppercase hover:scale-105"
      >
        Register Now
      </a>
      <Formula src="/images/formula-kepler.png" rotate={-6} delay={1.5} className="left-[6%] top-20 hidden w-44 lg:block" />
      {/* keeps only the top (lit) half of the round planet */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto aspect-2/1 w-[min(95%,56rem)] overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
        <Image
          src="/images/planet-purple.png"
          alt=""
          fill
          sizes="(min-width: 768px) 56rem, 95vw"
          className="object-cover object-top"
        />
      </div>
    </section>
  );
}