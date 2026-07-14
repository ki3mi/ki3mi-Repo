"use client";

import { motion, useReducedMotion } from "motion/react";

const skills = [
  { name: "React", level: 5, category: "frontend" },
  { name: "Spring Boot", level: 4, category: "backend" },
  { name: "JavaScript", level: 5, category: "language" },
  { name: "Java", level: 4, category: "language" },
  { name: "Python", level: 4, category: "language" },
  { name: "CSS", level: 5, category: "frontend" },
  { name: "TailwindCSS", level: 5, category: "frontend" },
  { name: "Git", level: 4, category: "tools" },
  { name: "MySQL", level: 4, category: "backend" },
];

const skillImages: Record<string, string> = {
  React: "/react.png",
  "Spring Boot": "/springboot.png",
  JavaScript: "/javascript.png",
  Java: "/java.png",
  Python: "/python.png",
  CSS: "/css.png",
  TailwindCSS: "/tailwindcss.png",
  Git: "/git.png",
  MySQL: "/mysql.png",
};

function SkillIcon({ name }: { name: string }) {
  return (
    <span
      className="inline-block shrink-0 w-6 h-6 sm:w-7 sm:h-7"
      style={{
        mask: `url(${skillImages[name]}) no-repeat center / contain`,
        WebkitMask: `url(${skillImages[name]}) no-repeat center / contain`,
        backgroundColor: "currentColor",
      }}
    />
  );
}

function SkillBadge({ name, level, index }: { name: string; level: number; index: number }) {
  const reduce = useReducedMotion();
  const img = skillImages[name];

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative"
    >
      <div
        className="border border-surface bg-dark-bg p-3 sm:p-4 flex flex-col items-center gap-2
          hover:border-yellow-accent/60 transition-all duration-300 cursor-default min-w-[80px] sm:min-w-[100px]
          text-terminal-gray group-hover:text-yellow-accent"
      >
        {img && <SkillIcon name={name} />}
        <span className="text-[10px] sm:text-xs font-mono text-dim-gray group-hover:text-terminal-gray transition-colors duration-300 text-center">
          {name}
        </span>
        <div className="w-full flex gap-[2px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 transition-all duration-500 ${
                i < level
                  ? "bg-matrix-green group-hover:bg-yellow-accent"
                  : "bg-surface"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
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
          <span className="text-yellow-accent">cat</span>
          <span>~/tech_stack.json</span>
        </div>

        <h2 className="font-pixel text-yellow-accent text-xs sm:text-sm uppercase tracking-wider">
          Tech_Stack
        </h2>

        <p className="text-xs sm:text-sm text-dim-gray max-w-xl leading-relaxed">
          <span className="text-matrix-green">//</span> Tools and technologies
          I use daily to bring ideas to life.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {skills.map((skill, i) => (
          <SkillBadge key={skill.name} name={skill.name} level={skill.level} index={i} />
        ))}
      </div>
    </div>
  );
}
