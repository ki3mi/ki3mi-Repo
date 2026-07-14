import type { Route } from "./+types/home";
import { TerminalLayout } from "~/components/TerminalLayout";
import { Hero } from "~/components/Hero";
import { AboutSection } from "~/components/AboutSection";
import { SkillsSection } from "~/components/SkillsSection";
import { ProjectsSection } from "~/components/ProjectsSection";
import { ContactSection } from "~/components/ContactSection";
import { Footer } from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jose Ccente Mejia | Full Stack Web Developer" },
    {
      name: "description",
      content:
        "Estudiante de Ingeniería de Sistemas y desarrollador Full Stack. Apasionado por React, TypeScript, Node.js, Express y MySQL.",
    },
  ];
}

export default function Home() {
  return (
    <TerminalLayout
      home={<Hero />}
      about={<AboutSection />}
      skills={<SkillsSection />}
      projects={<ProjectsSection />}
      contact={<ContactSection />}
      footer={<Footer />}
    />
  );
}
