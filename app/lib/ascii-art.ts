export const ASCII_LOGO = `
╔══════════════════════════════════════════════════╗
║   ██╗  ██╗  ██╗  ██████╗  ███╗   ███╗  ██╗       ║
║   ██║ ██╔╝  ██║  ╚═══██║  ████╗ ████║  ██║       ║
║   █████╔╝   ██║   █████║  ██╔████╔██║  ██║       ║
║   ██╔═██╗   ██║   ╚══██║  ██║╚██╔╝██║  ██║       ║
║   ██║  ██╗  ██║  ██████║  ██║ ╚═╝ ██║  ██║       ║
║   ╚═╝  ╚═╝  ╚═╝  ╚═════╝  ╚═╝     ╚═╝  ╚═╝       ║
╚══════════════════════════════════════════════════╝
`;

export const ASCII_TERMINAL = `
  ┌─────────────────────────────────────────────┐
  │  ██████  ███████  ██    ██  ██████          │
  │  ██   ██ ██       ██    ██ ██    ██         │
  │  ██   ██ █████    ██    ██ ██    ██         │
  │  ██   ██ ██        ██  ██  ██    ██         │
  │  ██████  ███████    ████    ██████          │
  └─────────────────────────────────────────────┘
`;

export const SEPARATOR = `══════════════════════════════════════════════`;

export const BOOT_LINES = [
  "[  OK  ] Loading kernel modules...",
  "[  OK  ] Initializing dev environment v2.0.4",
  "[  OK  ] Mounting /workspace",
  "[  OK  ] Starting web services...",
  "[  OK  ] Full-stack developer system ready.",
];

export const PIXEL_HEART = `
  ██    ██
████████████
████████████
  █████████
    █████
      ██
`;

export const PIXEL_STAR = `
    ██
  ██████
██████████
  ██████
    ██
`;

export const PROCESS_INFO = `
  ██████  ██████   ██████   ██████
 ██      ██  ██ ██    ██ ██    ██
 ██      ██████  ██    ██ ██    ██
 ██      ██  ██ ██    ██ ██    ██
  ██████ ██   ██  ██████   ██████
`;

export const ASCII_FRAME_TOP = "┌" + "─".repeat(62) + "┐";
export const ASCII_FRAME_BOT = "└" + "─".repeat(62) + "┘";

export function asciiFrame(content: string): string {
  const lines = content.split("\n");
  const framed = lines.map((line) => `│ ${line.padEnd(60)} │`);
  return [ASCII_FRAME_TOP, ...framed, ASCII_FRAME_BOT].join("\n");
}
