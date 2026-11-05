import Image from "next/image";

type Props = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  position?: string; // crop focus, e.g. "30% 50%"
};

export default function ActivityCard({
  title,
  text,
  image,
  imageAlt,
  reverse = false,
  position = "50% 50%",
}: Props) {
  return (
    <article
      className={`mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-white/10 bg-card shadow-xl md:min-h-72 md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="relative h-52 md:h-auto md:w-1/2">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
        <h3 className="font-display text-2xl font-bold">{title}</h3>
        <p className="mt-3 text-base leading-relaxed text-white/90">{text}</p>
      </div>
    </article>
  );
}