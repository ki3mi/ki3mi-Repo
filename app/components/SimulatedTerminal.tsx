"use client";

import { useState, useEffect, useRef } from "react";

const PROCESSES = [
  "  PID  COMMAND           STATUS  ",
  "    1  react dev         running ",
  "    2  java spring       running ",
  "    3  node express      running ",
  "    4  mysql server      running ",
  "    5  tailwind watch    running ",
  "    6  git               running ",
];

interface SkillDef {
  name: string;
  bar: string;
}

const SKILLS: SkillDef[] = [
  { name: "React", bar: "[████████░░]  80%" },
  { name: "SpringBoot", bar: "[██████░░░░]  60%" },
  { name: "JavaScript", bar: "[████████░░]  80%" },
  { name: "Python", bar: "[██████░░░░]  60%" },
  { name: "CSS", bar: "[████████░░]  80%" },
  { name: "Tailwind", bar: "[████████░░]  80%" },
  { name: "Git", bar: "[██████░░░░]  60%" },
  { name: "MySQL", bar: "[██████░░░░]  60%" },
];

const SKILL_IMG: Record<string, string> = {
  React: "/react.png",
  SpringBoot: "/springboot.png",
  JavaScript: "/javascript.png",
  Python: "/python.png",
  CSS: "/css.png",
  Tailwind: "/tailwindcss.png",
  Git: "/git.png",
  MySQL: "/mysql.png",
};

const PROJECTS = [
  "  MxFood-System",
  "  Tecnology-Store",
  "  TheMazeWarrior",
  "  LAKSHMI",
];

const README_ASCII = [
  " _   _      _ _        __        __         _     _ ",
  "| | | | ___| | | ___   \\ \\      / /__  _ __| | __| |",
  "| |_| |/ _ \\ | |/ _ \\   \\ \\ /\\ / / _ \\| '__| |/ _` |",
  "|  _  |  __/ | | (_) |   \\ V  V / (_) | |  | | (_| |",
  "|_| |_|\\___|_|_|\\___/     \\_/\\_/ \\___/|_|  |_|\\__,_|"
];

interface CommandDef {
  command: string;
  output: string[];
  type: "normal" | "readme";
}

const COMMANDS: CommandDef[] = [
  { command: "ps aux", output: PROCESSES, type: "normal" },
  { command: "cd skills", output: [], type: "normal" },
  { command: "cd projects", output: PROJECTS, type: "normal" },
  { command: "cat readme.md", output: README_ASCII, type: "readme" },
];

export function SimulatedTerminal({ started }: { started: boolean }) {
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [currentCmd, setCurrentCmd] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [completedIds, currentCmd, typingText, showMessage]);

  // Reset when started becomes false (on re-render)
  useEffect(() => {
    if (!started) {
      setCompletedIds([]);
      setCurrentCmd(0);
      setTypingText("");
      setTypingDone(false);
      setShowMessage(false);
      setAllDone(false);
    }
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (currentCmd >= COMMANDS.length) {
      setAllDone(true);
      return;
    }

    const initialDelay = currentCmd === 0 ? 2500 : 0;

    const mainTimer = setTimeout(() => {
      const cmd = COMMANDS[currentCmd];
      let charIndex = 0;
      let cancelled = false;

      const typeTimer = setInterval(() => {
        charIndex++;
        if (!cancelled) setTypingText(cmd.command.slice(0, charIndex));

        if (charIndex >= cmd.command.length) {
          clearInterval(typeTimer);
          if (!cancelled) setTypingDone(true);

          const outputTimer = setTimeout(() => {
            if (cancelled) return;
            setCompletedIds((prev) => [...prev, currentCmd]);
            setTypingText("");

            if (cmd.type === "readme") {
              setTimeout(() => { if (!cancelled) setShowMessage(true); }, 600);
            }

            const nextTimer = setTimeout(() => {
              if (!cancelled) {
                setCurrentCmd((prev) => prev + 1);
                setTypingDone(false);
              }
            }, 2200);

            timers.push(nextTimer);
          }, 500);

          timers.push(outputTimer);
        }
      }, 55);

      const timers: ReturnType<typeof setTimeout>[] = [];
    }, initialDelay);

    return () => clearTimeout(mainTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, currentCmd]);

  return (
    <div className="border border-surface bg-dark-bg overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface/50 border-b border-surface">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-accent/70" />
          <div className="w-2 h-2 rounded-full bg-matrix-green/70" />
        </div>
        <span className="text-[10px] text-dim-gray font-mono truncate">ki3mi@dev:~/portfolio — bash</span>
      </div>

      <div className="p-3 font-mono text-[10px] leading-relaxed max-h-[380px] overflow-y-auto terminal-scroll">
        {started && COMMANDS.map((cmd, idx) => {
          const isComplete = completedIds.includes(idx);
          const isCurrent = idx === currentCmd;
          if (!isComplete && !isCurrent) return null;

          return (
            <div key={idx} className="mb-1.5">
              <div className="text-terminal-gray">
                <span className="text-matrix-green">$</span>{" "}
                {isCurrent && !typingDone ? (
                  <span>
                    {typingText}
                    <span className="animate-blink text-matrix-green ml-0.5">▌</span>
                  </span>
                ) : (
                  <span>{cmd.command}</span>
                )}
              </div>

              {isComplete && (
                <div className="space-y-0.5 mt-0.5">
                  {cmd.type === "readme" ? (
                    <>
                      {cmd.output.map((line, i) => (
                        <div key={i} className="text-matrix-green whitespace-pre font-bold">
                          {line}
                        </div>
                      ))}
                      {showMessage && (
                        <div className="text-terminal-gray whitespace-pre pt-1">
                          My name is Jose Ccente, or{" "}
                          <span className="text-matrix-green font-bold">ki3mi</span>{" "}
                          to my friends
                        </div>
                      )}
                    </>
                  ) : idx === 1 ? (
                    SKILLS.map((skill) => (
                      <div key={skill.name} className="flex items-center gap-2 text-dim-gray">
                        <span
                          className="inline-block w-3 h-3 shrink-0"
                          style={{
                            mask: `url(${SKILL_IMG[skill.name]}) center/contain no-repeat`,
                            WebkitMask: `url(${SKILL_IMG[skill.name]}) center/contain no-repeat`,
                            backgroundColor: "#6b7280",
                          }}
                        />
                        <span className="w-[72px] shrink-0">{skill.name}</span>
                        <span>{skill.bar}</span>
                      </div>
                    ))
                  ) : (
                    cmd.output.map((line, i) => (
                      <div key={i} className="text-dim-gray whitespace-pre">
                        {line}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}

        {allDone ? (
          <div className="flex items-center gap-1 text-terminal-gray mt-2">
            <span className="text-matrix-green">$</span>
            <span className="animate-blink text-matrix-green text-base font-bold">▌</span>
          </div>
        ) : started && currentCmd < COMMANDS.length && typingDone && (
          <div className="flex items-center gap-1 text-terminal-gray mt-1">
            <span className="text-matrix-green">$</span>
            <span className="animate-blink text-matrix-green">▌</span>
          </div>
        )}

        {!started && (
          <div className="flex items-center gap-1 text-terminal-gray">
            <span className="text-matrix-green">$</span>
            <span className="animate-blink text-matrix-green">▌</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
