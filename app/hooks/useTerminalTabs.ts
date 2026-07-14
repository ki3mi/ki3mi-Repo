import { useState, useEffect, useCallback } from "react";

export type TabId = "home" | "about" | "skills" | "projects" | "contact";

export const TABS: { id: TabId; label: string }[] = [
  { id: "home", label: "~/home" },
  { id: "about", label: "~/about" },
  { id: "skills", label: "~/skills" },
  { id: "projects", label: "~/projects" },
  { id: "contact", label: "~/contact" },
];

const TAB_KEYS: Record<string, TabId> = {
  "1": "home",
  "2": "about",
  "3": "skills",
  "4": "projects",
  "5": "contact",
};

export function useTerminalTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const next = useCallback(() => {
    setActiveTab((prev) => {
      const idx = TABS.findIndex((t) => t.id === prev);
      return TABS[Math.min(idx + 1, TABS.length - 1)].id;
    });
  }, []);

  const prev = useCallback(() => {
    setActiveTab((prev) => {
      const idx = TABS.findIndex((t) => t.id === prev);
      return TABS[Math.max(idx - 1, 0)].id;
    });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const tabKey = TAB_KEYS[e.key];
      if (tabKey) {
        e.preventDefault();
        setActiveTab(tabKey);
        return;
      }

      if (e.key === "ArrowRight" || e.key === "l") {
        e.preventDefault();
        next();
        return;
      }

      if (e.key === "ArrowLeft" || e.key === "h") {
        e.preventDefault();
        prev();
        return;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  return { activeTab, setActiveTab };
}
