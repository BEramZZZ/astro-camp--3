import Image from "next/image";

type Props = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

export default function ActivityCard({
  title,
  text,
  image,
  imageAlt,
  reverse = false,
}: Props) {
  return (
    <article
      className={`mx-auto flex max-w-4xl flex-col overflow-hidden rounded-xl border border-white/10 bg-card shadow-xl md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="relative h-52 md:h-auto md:w-2/5">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex-1 p-6 md:p-8">
        <h3 className="font-display text-2xl font-bold">{title}</h3>
        <p className="mt-3 text-base leading-relaxed text-white/90">{text}</p>
      </div>
    </article>
  );
}