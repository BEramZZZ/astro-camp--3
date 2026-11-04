import { event } from "@/data/event";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-display text-4xl text-periwinkle">{event.name}</h1>
      <p>{event.tagline}</p>
    </main>
  );
}