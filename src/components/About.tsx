import Image from "next/image";

export default function About() {
  return (
    <section className="relative overflow-x-clip px-6 py-20">
      <h2 className="text-center font-display text-3xl font-bold text-periwinkle">
        About the event
      </h2>

      <div className="relative mx-auto mt-10 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 text-lg leading-relaxed backdrop-blur-sm">
        <p>
          Knowledge is a treasure meant to be shared. Join Astro Camp 3 in a
          series of workshops designed to help you get started in tech fields,
          and meet students who have more experience in those areas.
        </p>

        <Image
          src="/images/ship-1.png"
          alt=""
          width={800}
          height={600}
          className="pointer-events-none absolute -right-24 -top-16 hidden h-auto w-56 md:block"
        />
      </div>
    </section>
  );
}