import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSkewProps {
  children: React.ReactNode;
  className?: string;
  maxSkew?: number;
}

export function ScrollSkew({ children, className = "", maxSkew = 2 }: ScrollSkewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const skewRef = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTop = window.scrollY;
    let rafId: number;

    const updateSkew = () => {
      const scrollTop = window.scrollY;
      const velocity = scrollTop - lastScrollTop;
      lastScrollTop = scrollTop;

      // Calculate target skew based on velocity
      skewRef.current.target = Math.max(-maxSkew, Math.min(maxSkew, velocity * 0.05));

      // Smooth interpolation
      skewRef.current.current += (skewRef.current.target - skewRef.current.current) * 0.1;

      // Reset skew when not scrolling
      if (Math.abs(velocity) < 0.5) {
        skewRef.current.target = 0;
      }

      gsap.set(container, {
        skewY: skewRef.current.current,
      });

      rafId = requestAnimationFrame(updateSkew);
    };

    rafId = requestAnimationFrame(updateSkew);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [maxSkew]);

  return (
    <div ref={containerRef} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
