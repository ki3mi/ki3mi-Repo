"use client";

import { Heart } from "@phosphor-icons/react";
import { ASCII_FRAME_TOP, ASCII_FRAME_BOT } from "~/lib/ascii-art";

export function Footer() {
  return (
    <div className="border-t border-surface mt-8 sm:mt-12 pt-6 sm:pt-8 pb-2">
      <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
        <pre className="text-dim-gray text-[0.35rem] sm:text-[0.4rem] leading-tight select-none">
          <code>{ASCII_FRAME_TOP}</code>
          <br />
          <code>{"│  "}</code>
          <span className="text-matrix-green">
            &lt;/&gt; built with
          </span>
          <code>{"  "}</code>
          <Heart size={7} className="inline text-yellow-accent" weight="fill" />
          <code>{"  "}</code>
          <span className="text-matrix-green">from scratch</span>
          <code>{"  │"}</code>
          <br />
          <code>{ASCII_FRAME_BOT}</code>
        </pre>

        <p className="text-[9px] sm:text-[10px] text-dim-gray font-mono">
          <span className="text-matrix-green">© {new Date().getFullYear()}</span> Jose Ccente Mejia
          <span className="text-surface mx-1.5 sm:mx-2">|</span>
          <span className="hover:text-matrix-green transition-colors duration-200 cursor-pointer">source</span>
          <span className="text-surface mx-1.5 sm:mx-2">|</span>
          <span className="hover:text-matrix-green transition-colors duration-200 cursor-pointer">rss</span>
        </p>
      </div>
    </div>
  );
}
