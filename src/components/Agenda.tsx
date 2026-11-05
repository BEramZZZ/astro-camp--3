import Image from "next/image";
import { event } from "@/data/event";
import AgendaCard from "./AgendaCard";

export default function Agenda() {
  return (
    <section id="agenda" className="relative overflow-x-clip px-6 py-20">
      <Image
        src="/images/rocket.png"
        alt=""
        width={400}
        height={800}
        className="pointer-events-none absolute -left-8 top-24 hidden h-auto w-24 lg:block"
      />
      <Image
        src="/images/ship-2.png"
        alt=""
        width={800}
        height={800}
        className="pointer-events-none absolute -right-10 bottom-0 hidden h-auto w-36 lg:block"
      />

      <h2 className="text-center font-display text-3xl font-bold text-periwinkle">
        Agenda
      </h2>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
        {event.agenda.map((item) => (
          <AgendaCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}