"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Terminal } from "@phosphor-icons/react";
import { ASCII_LOGO, BOOT_LINES } from "~/lib/ascii-art";
import { SimulatedTerminal } from "~/components/SimulatedTerminal";

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setVisibleLines(BOOT_LINES);
      setCurrentIndex(BOOT_LINES.length);
      setTimeout(onComplete, 300);
      return;
    }

    if (currentIndex < BOOT_LINES.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => [...prev, BOOT_LINES[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 150);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(onComplete, 400);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, onComplete, reduce]);

  return (
    <div className="font-mono text-xs sm:text-sm space-y-0.5">
      {visibleLines.map((line, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className={line.startsWith("[  OK  ]") ? "text-matrix-green" : "text-terminal-gray"}
        >
          {line}
          {i === visibleLines.length - 1 && currentIndex < BOOT_LINES.length && (
            <span className="animate-blink text-matrix-green">▌</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  const [bootComplete, setBootComplete] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="lg:grid lg:grid-cols-5 lg:gap-8 space-y-8 lg:space-y-0">
      <div className="lg:col-span-3 space-y-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-matrix-green text-xs sm:text-sm">
            <Terminal size={16} weight="fill" />
            <span className="tracking-widest uppercase text-dim-gray">~/developer</span>
            <span className="text-terminal-gray">$</span>
          </div>

          <pre className="text-matrix-green text-[0.45rem] sm:text-xs leading-tight font-bold select-none overflow-x-auto">
            <code>{ASCII_LOGO}</code>
          </pre>
        </motion.div>

        {!bootComplete ? (
          <BootSequence onComplete={() => setBootComplete(true)} />
        ) : (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-terminal-gray">
                <span className="text-dim-gray">$ </span>
                <span className="text-yellow-accent">cat</span> /proc/developer
              </p>
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-1"
              >
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-terminal-gray">
                  <span className="text-matrix-green">name:</span>{" "}
                  <span className="glitch" data-text="Jose Ccente Mejia">Jose Ccente Mejia</span>
                </p>
                <p className="text-base sm:text-lg text-dim-gray">
                  <span className="text-matrix-green">role:</span>{" "}
                  <span className="text-terminal-gray">Full-Stack Web Developer</span>
                </p>
                <p className="text-sm sm:text-base text-dim-gray">
                  <span className="text-matrix-green">status:</span>{" "}
                  <span className="text-yellow-accent">Listo para construir</span>
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-xs sm:text-sm text-dim-gray max-w-2xl leading-relaxed"
            >
              Estudiante de Ingeniería de Sistemas y desarrollador Full Stack
              en formación. Apasionado por construir aplicaciones web con
              React, TypeScript, Node.js, Express y MySQL.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => {
                  const event = new KeyboardEvent("keydown", { key: "4" });
                  window.dispatchEvent(event);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-matrix-green text-dark-navy font-bold text-xs
                  hover:bg-yellow-accent transition-colors duration-200 active:scale-[0.98]"
              >
                <Terminal size={14} weight="fill" />
                $ ./view_projects
              </button>
              <button
                onClick={() => {
                  const event = new KeyboardEvent("keydown", { key: "5" });
                  window.dispatchEvent(event);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-matrix-green text-matrix-green text-xs
                  hover:bg-matrix-green hover:text-dark-navy transition-colors duration-200 active:scale-[0.98]"
              >
                $ ./contact_dev
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block lg:col-span-2"
      >
        <SimulatedTerminal started={bootComplete} />
      </motion.div>
    </div>
  );
}
