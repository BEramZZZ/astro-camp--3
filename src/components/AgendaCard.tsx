import Image from "next/image";
import { FaRegCalendar, FaLocationDot } from "react-icons/fa6";

type Props = {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  room: string;
  image: string;
  cta: string;
};

export default function AgendaCard({
  id,
  title,
  type,
  date,
  time,
  room,
  image,
  cta,
}: Props) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-card shadow-xl">
      <div className="relative aspect-4/3">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan">{type}</p>
          <h3 className="mt-1 min-h-10 font-display text-sm font-bold leading-snug">
            {title}
          </h3>
        </div>
        <p className="flex items-center gap-2 text-sm">
          <FaRegCalendar aria-hidden /> {date} - {time}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <FaLocationDot aria-hidden /> Room {room}
        </p>
        <a
          href={`#register:${id}`}
          className="mt-auto self-start rounded-lg bg-space/60 px-4 py-2 text-sm transition hover:bg-space"
        >
          {cta}
        </a>
      </div>
    </article>
  );
}