import Image from "next/image";

type Props = {
  src: string;
  className?: string; // position + size, e.g. "left-[5%] top-20 w-40"
  rotate?: number;
  delay?: number; // animation delay in seconds
};

export default function Formula({
  src,
  className = "",
  rotate = 0,
  delay = 0,
}: Props) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={600}
      height={300}
      style={{ rotate: `${rotate}deg`, animationDelay: `${delay}s` }}
      className={`float pointer-events-none absolute z-0 h-auto select-none opacity-90 ${className}`}
    />
  );
}