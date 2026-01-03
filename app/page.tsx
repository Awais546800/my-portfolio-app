import Hero from "@/components/sections/Hero";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import NetworkingHub from "@/components/sections/NetworkingHub";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="w-full max-w-5xl px-6 md:px-12 space-y-24 pb-24">
        <Hero />
        <div className="space-y-24">
          <Skills />
          <Experience />
          <Education />
          <Projects />
          <NetworkingHub />
          <Contact />
        </div>
      </div>
      <Footer />
    </>
  );
}
