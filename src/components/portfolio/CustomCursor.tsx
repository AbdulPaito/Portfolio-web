import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Dot follows immediately for precision
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "none",
      });

      // Ring follows with slight lag for smooth feel
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        ease: "power2.out",
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a, button, [role='button'], input, textarea, select");
      const hasHover = target.closest("[data-cursor-hover]");

      if (isClickable) {
        setIsPointer(true);
        setIsHovering(false);
      } else if (hasHover) {
        setIsHovering(true);
        setIsPointer(false);
      } else {
        setIsHovering(false);
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* PC-style mouse arrow pointer */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translate(2px, 2px)" }}
      >
        <svg
          width="22"
          height="28"
          viewBox="0 0 22 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[1px_1px_2px_rgba(0,0,0,0.4)]"
        >
          <path
            d="M1.5 1.5L1.5 20.5L6.5 15.5L10.5 24.5L14 23L10 14.5L17 14.5L1.5 1.5Z"
            fill="white"
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* Click dot indicator (subtle) */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translate(2px, 2px)" }}
      >
        <div
          className={`bg-white/0 transition-all duration-100 ${
            isPointer ? "w-[6px] h-[6px] bg-white/60 rounded-full -ml-[3px] -mt-[3px]" : "w-0 h-0"
          }`}
        />
      </div>

      {/* Hide default cursor */}
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
