import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Both cursor elements follow immediately
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "none",
      });

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-all duration-300 ${
          isHovering ? "scale-150" : isPointer ? "scale-100" : "scale-100"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className={`w-10 h-10 border border-white transition-all duration-300 ${
            isHovering ? "bg-white/20" : "bg-transparent"
          } ${isPointer ? "scale-50 bg-white/50" : ""}`}
        />
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className={`w-1 h-1 bg-white transition-all duration-200 ${isPointer ? "scale-0" : "scale-100"}`} />
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
