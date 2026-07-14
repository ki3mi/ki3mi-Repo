"use client";

import { motion, useReducedMotion } from "motion/react";
import { User, Code, TerminalWindow, MapPin } from "@phosphor-icons/react";

const stats = [
  { label: "especialidad", value: "Full Stack", icon: Code },
  { label: "stack", value: "React + SpringBoot", icon: TerminalWindow },
  { label: "location", value: "Huancayo Junin", icon: MapPin },
  { label: "nivel", value: "Jr. Dev", icon: User },
];

export function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-16">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-xs text-dim-gray mb-2">
          <span className="text-matrix-green">$</span>
          <span className="text-yellow-accent">cat</span>
          <span>~/about.md</span>
        </div>

        <h2 className="font-pixel text-yellow-accent text-xs sm:text-sm uppercase tracking-wider">
          About_Me
        </h2>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs sm:text-sm text-terminal-gray leading-relaxed">
              <span className="text-matrix-green">Hello world!</span> Soy estudiante de Ingeniería
              de Sistemas y desarrollador Full Stack en formación. Me apasiona
              construir aplicaciones web utilizando React, TypeScript, Node.js,
              Express y MySQL, aplicando buenas prácticas de desarrollo,
              arquitectura de software y diseño de bases de datos.
            </p>
            <p className="text-xs sm:text-sm text-dim-gray leading-relaxed">
              Siempre busco aprender nuevas tecnologías y crear soluciones
              funcionales, escalables y de calidad.
            </p>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 flex justify-center"
          >
            <div className="relative">
              <img
                src="/foto.png"
                alt="Jose Ccente Mejia"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-matrix-green/60"
              />
              <div className="absolute -bottom-2 -right-2 bg-dark-navy border border-matrix-green/40 px-2 py-0.5 text-[8px] text-matrix-green font-mono">
                $ whoami
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="border border-surface bg-dark-bg p-4 flex flex-col items-center text-center gap-2
              hover:border-matrix-green/40 transition-colors duration-300 group"
          >
            <stat.icon
              size={20}
              className="text-dim-gray group-hover:text-matrix-green transition-colors duration-200"
              weight="duotone"
            />
            <div>
              <p className="text-matrix-green text-base sm:text-lg font-bold font-mono">{stat.value}</p>
              <p className="text-dim-gray text-[10px] uppercase tracking-wider mt-0.5">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
