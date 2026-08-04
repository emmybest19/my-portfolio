import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Testimonials } from "@/components/sections/testimonials";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Resume } from "@/components/sections/resume";
import { Education } from "@/components/sections/education";
import { Achievements } from "@/components/sections/achievements";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      {/* <Testimonials /> */}
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Resume />
      <Education />
      <Achievements />
      <Blog />
      <Contact />
    </>
  );
}
