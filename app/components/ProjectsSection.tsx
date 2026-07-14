"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FolderOpen, ArrowSquareOut, GitBranch } from "@phosphor-icons/react";
import { ASCII_FRAME_TOP, ASCII_FRAME_BOT } from "~/lib/ascii-art";

const projects = [
  {
    title: "MxFood-System",
    description: "A web application developed with Spring Boot 3 and Java 17 for managing a Mexican restaurant. It provides a comprehensive POS (Point of Sale) system featuring menu management, sales, delivery orders, user management, and metrics.",
    tech: ["Java", "Spring Boot", "MySql"],
    year: "2025",
    repo: "https://github.com/ki3mi/MxFood-SpringBoot",
    link: "",
  },
  {
    title: "Tecnology-Store",
    description: "Landing page and product catalog for Tecnology store with Next Js and Tailwind Css.",
    tech: ["Javascript", "Next Js", "Tailwind Css"],
    year: "2024",
    repo: "https://github.com/ki3mi/Tecnology-store",
    link: "https://conti-project.vercel.app/",
  },
  {
    title: "TheMazeWarrior",
    description: "A platformer game featuring jumping, dashing, double-jumping, lives, and coin collection mechanics. Developed using C# and Unity.",
    tech: ["C#", "Unity 2D"],
    year: "2024",
    repo: "https://github.com/ki3mi/TheMazeWarrior",
    link: "https://the-maze-warrior.vercel.app/",
  },
  {
    title: "LAKSHMI",
    description: "A landing page for a music producer built with Next.js and Supabase. The page leverages a Retro Synthwave aesthetic and Parallax animations. (Under construction)",
    tech: ["Next Js", "Javascript", "TailwindCss"],
    year: "2026",
    repo: "https://github.com/ki3mi/LAKSHMI-landing-page",
    link: "https://lakshmi-landing-page.vercel.app/",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group h-full"
    >
      <div
        className="border border-surface bg-dark-bg overflow-hidden flex flex-col h-full
          hover:border-matrix-green/50 transition-all duration-300"
      >
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-surface/50 border-b border-surface">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-accent/60" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-matrix-green/60" />
          </div>
          <span className="text-[10px] sm:text-xs text-dim-gray ml-2 font-mono truncate">
            {project.title.toLowerCase().replace(/\s+/g, "-")} — bash
          </span>
        </div>

        <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FolderOpen
                  size={16}
                  className="text-matrix-green shrink-0"
                  weight="duotone"
                />
                <h3 className="text-xs sm:text-sm font-bold text-terminal-gray group-hover:text-matrix-green transition-colors duration-200">
                  {project.title}
                </h3>
              </div>
              <p className="text-[10px] sm:text-xs text-dim-gray font-mono">
                <span className="text-yellow-accent">cat</span> ./README.md
              </p>
            </div>
            <span className="text-[10px] sm:text-xs text-dim-gray font-mono shrink-0">{project.year}</span>
          </div>

          <p className="text-[10px] sm:text-xs text-dim-gray leading-relaxed flex-1">
            {project.description}
          </p>

          <div className="space-y-2 sm:space-y-3">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 border border-surface text-dim-gray font-mono"
                >
                  {t}
                </span>
              ))}
            </div>

            <motion.div
              initial={false}
              animate={{
                height: isHovered ? "auto" : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 pt-1 text-[10px] sm:text-xs text-matrix-green">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-yellow-accent transition-colors"
                  >
                    <GitBranch size={12} />
                    $ repo
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-yellow-accent transition-colors"
                  >
                    <ArrowSquareOut size={12} />
                    $ link
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-12">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-xs text-dim-gray mb-2">
          <span className="text-matrix-green">$</span>
          <span className="text-yellow-accent">ls</span>
          <span>-la ~/projects/</span>
        </div>

        <h2 className="font-pixel text-yellow-accent text-xs sm:text-sm uppercase tracking-wider">
          Projects
        </h2>

        <p className="text-xs sm:text-sm text-dim-gray max-w-xl leading-relaxed">
          <span className="text-matrix-green">//</span> A selection of projects
          I&apos;ve built. Each one taught me something new.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center"
      >
        <pre className="text-dim-gray text-[0.4rem] sm:text-[0.45rem] leading-tight inline-block select-none">
          <code>{ASCII_FRAME_TOP}</code>
          <br />
          <code>{"│  "}  More projects available on request  {"  │"}</code>
          <br />
          <code>{ASCII_FRAME_BOT}</code>
        </pre>
      </motion.div>
    </div>
  );
}
