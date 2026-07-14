"use client";

import { type ReactNode, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTerminalTabs, TABS, type TabId } from "~/hooks/useTerminalTabs";

interface TerminalLayoutProps {
  home: ReactNode;
  about: ReactNode;
  skills: ReactNode;
  projects: ReactNode;
  contact: ReactNode;
  footer?: ReactNode;
}

const TAB_IMAGES: Record<TabId, string> = {
  home: "/home.png",
  about: "/about.png",
  skills: "/skills.png",
  projects: "/projects.png",
  contact: "/contact.png",
};

function TabIcon({ tabId, isActive }: { tabId: TabId; isActive: boolean }) {
  return (
    <span
      className="inline-block shrink-0"
      style={{
        mask: `url(${TAB_IMAGES[tabId]}) no-repeat center / contain`,
        WebkitMask: `url(${TAB_IMAGES[tabId]}) no-repeat center / contain`,
        backgroundColor: isActive ? "#00ff41" : "#6b7280",
        width: 14,
        height: 14,
      }}
    />
  );
}

function TabButton({
  tab,
  isActive,
  onClick,
}: {
  tab: (typeof TABS)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono
        transition-colors duration-150 border-r border-surface
        ${isActive
          ? "bg-dark-navy text-matrix-green border-t-2 border-t-matrix-green"
          : "bg-dark-bg text-dim-gray hover:text-terminal-gray hover:bg-surface/50"
        }
      `}
    >
      <TabIcon tabId={tab.id} isActive={isActive} />
      <span>{tab.label}</span>
      {isActive && (
        <span className="w-1.5 h-3 bg-matrix-green/80 animate-blink ml-1" />
      )}
    </button>
  );
}

export function TerminalLayout({
  home,
  about,
  skills,
  projects,
  contact,
  footer,
}: TerminalLayoutProps) {
  const { activeTab, setActiveTab } = useTerminalTabs();
  const [time, setTime] = useState("");
  const [history, setHistory] = useState<TabId[]>(["home"]);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setHistory((prev) => {
      if (prev[prev.length - 1] === activeTab) return prev;
      return [...prev, activeTab];
    });
  }, [activeTab]);

  const contentMap: Record<TabId, ReactNode> = {
    home,
    about,
    skills,
    projects,
    contact,
  };

  const tabIndex = TABS.findIndex((t) => t.id === activeTab);

  return (
    <div className="h-[100dvh] flex flex-col bg-dark-navy font-mono overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2 bg-surface/80 border-b border-surface select-none shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-accent/80" />
          <div className="w-3 h-3 rounded-full bg-matrix-green/80" />
        </div>
        <span className="text-xs text-dim-gray truncate">
          developer@portfolio:{" "}
          <span className="text-terminal-gray">~</span>
          <span className="text-matrix-green"> — bash</span>
          <span className="text-dim-gray ml-2 hidden sm:inline">80×24</span>
        </span>
      </div>

      <div className="flex shrink-0 overflow-x-auto bg-dark-bg border-b border-surface scrollbar-none">
        {TABS.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ zoom: 1.25 }}>
        <div className="min-h-full p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs text-dim-gray mb-4 shrink-0">
            <span className="text-matrix-green">$</span>
            <span className="text-yellow-accent">cd</span>
            <span>{TABS.find((t) => t.id === activeTab)?.label}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {contentMap[activeTab]}
            </motion.div>
          </AnimatePresence>

          {activeTab === "contact" && footer}
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-1.5 bg-surface/60 border-t border-surface text-[10px] text-dim-gray shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="text-matrix-green font-bold">NORMAL</span>
          <span className="hidden sm:inline">
            developer@portfolio:
            <span className="text-yellow-accent">
              ~/{activeTab}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">
            {history.length > 1 ? `#${history.length - 1}` : "#0"}
          </span>
          <span>{time}</span>
          <span className="w-2 h-4 bg-matrix-green/80 animate-blink" />
        </div>
      </div>
    </div>
  );
}
