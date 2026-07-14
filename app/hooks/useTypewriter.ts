import { useState, useEffect, useCallback } from "react";

interface TypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useTypewriter({ text, speed = 30, delay = 0, onComplete }: TypewriterOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;
    let cancelled = false;

    const startTyping = () => {
      setDisplayedText("");
      setIsComplete(false);
      currentIndex = 0;

      const type = () => {
        if (cancelled) return;
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeout = setTimeout(type, speed);
        } else {
          setIsComplete(true);
          onComplete?.();
        }
      };

      timeout = setTimeout(type, speed);
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, speed, delay, onComplete]);

  return { displayedText, isComplete };
}

export function useTypewriterSequence(
  lines: string[],
  baseSpeed = 30,
  lineDelay = 600
) {
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  const onLineComplete = useCallback(() => {
    const nextIndex = currentLineIndex + 1;
    if (nextIndex < lines.length) {
      setCurrentLineIndex(nextIndex);
    }
  }, [currentLineIndex, lines.length]);

  useEffect(() => {
    setCurrentLineIndex(0);
    setVisibleLines([]);
  }, []);

  useEffect(() => {
    if (currentLineIndex >= 0 && currentLineIndex < lines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => [...prev, lines[currentLineIndex]]);
      }, baseSpeed * lines[currentLineIndex].length + lineDelay);

      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, lines, baseSpeed, lineDelay]);

  return { visibleLines, isComplete: visibleLines.length >= lines.length };
}
