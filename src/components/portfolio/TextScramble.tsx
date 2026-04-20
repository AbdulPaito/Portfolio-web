import { useEffect, useRef, useState, useCallback } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface TextScrambleProps {
  children: string;
  className?: string;
  trigger?: "hover" | "mount" | "inView";
  duration?: number;
}

export function TextScramble({
  children: text,
  className = "",
  trigger = "hover",
  duration = 1200,
}: TextScrambleProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(text || "");
  const frameRef = useRef<number | undefined>(undefined);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number }[]>([]);

  const scramble = useCallback(() => {
    const length = text.length;
    queueRef.current = [];

    for (let i = 0; i < length; i++) {
      const from = text[i] || " ";
      const to = text[i] || " ";
      const start = Math.random() * (duration * 0.5);
      const end = start + Math.random() * (duration * 0.5);
      queueRef.current.push({ from, to, start, end });
    }

    let frame = 0;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      let output = "";
      let complete = 0;

      for (let i = 0; i < length; i++) {
        const { from, to, start, end } = queueRef.current[i];

        if (elapsed >= end) {
          complete++;
          output += to;
        } else if (elapsed >= start) {
          const progress = (elapsed - start) / (end - start);
          const isChar = /[a-zA-Z0-9]/.test(from);
          if (progress < 0.5 && isChar) {
            output += chars[Math.floor(Math.random() * chars.length)];
          } else {
            output += from;
          }
        } else {
          output += from;
        }
      }

      setDisplayText(output);

      if (complete < length) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayText(text);
      }
    };

    frameRef.current = requestAnimationFrame(update);
  }, [text, duration]);

  useEffect(() => {
    if (trigger === "mount") {
      scramble();
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [trigger, scramble]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      scramble();
    }
  };

  return (
    <span
      ref={elementRef}
      className={`inline-block font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      data-cursor-hover
    >
      {displayText}
    </span>
  );
}
