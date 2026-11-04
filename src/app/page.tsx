import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ActivityCard from "@/components/ActivityCard";
import Agenda from "@/components/Agenda";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />

        <section
          id="activities"
          className="relative flex flex-col gap-12 overflow-x-clip px-6 pb-24 pt-8"
        >
          <Image
            src="/images/ship-1.jpg"
            alt=""
            width={800}
            height={600}
            className="pointer-events-none absolute -left-6 top-0 hidden h-auto w-28 md:block"
          />

          <ActivityCard
            title="Conferences"
            text="Ideas are meant to spark curiosity and inspire discovery. Join our conferences to explore the fascinating connections between astronomy, science and technology, exchange ideas with passionate minds, and gain new perspectives from inspiring speakers."
            image="/images/conferences.jpg"
            imageAlt="A speaker presenting during a conference"
          />

          <ActivityCard
            title="Workshops"
            text="Knowledge is a journey best experienced together. Take part in our hands-on workshops, designed to help you develop new skills, explore tech and astronomy fields, and learn alongside students and enthusiasts who are eager to share their experience."
            image="/images/workshops.jpg"
            imageAlt="Students working on laptops and electronics"
            reverse
          />
        </section>
        <Agenda />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}