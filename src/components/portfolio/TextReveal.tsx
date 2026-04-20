import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.02,
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll(".char");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: stagger,
          delay: delay,
          ease: "power4.out",
          scrollTrigger: once
            ? {
                trigger: container,
                start: "top 85%",
                once: true,
              }
            : undefined,
        }
      );
    });

    return () => ctx.revert();
  }, [delay, stagger, once]);

  const splitText = children.split("").map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ display: char === " " ? "inline" : "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <span ref={containerRef} className={`inline-block overflow-hidden ${className}`}>
      <span className="inline-block">{splitText}</span>
    </span>
  );
}

// Line reveal from left to right
export function LineReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        {
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          delay: delay,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// Word by word reveal
export function WordReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.1,
}: {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll(".word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: stagger,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, stagger]);

  const words = children.split(" ").map((word, i) => (
    <span key={i} className="word inline-block mr-[0.25em]">
      {word}
    </span>
  ));

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words}
    </span>
  );
}

// Fade up reveal for blocks
export function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  y = 60,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        {
          y: y,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: duration,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, duration, y]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// Horizontal line draw
export function LineDraw({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 1.5,
          delay: delay,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={lineRef}
      className={`h-px bg-border ${className}`}
    />
  );
}

// Scale reveal
export function ScaleReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// Stagger container for children
export function StaggerContainer({
  children,
  className = "",
  stagger = 0.1,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.children;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: stagger,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [stagger, delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
