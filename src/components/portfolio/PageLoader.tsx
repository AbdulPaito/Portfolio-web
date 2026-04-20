import { useEffect, useState } from "react";
import gsap from "gsap";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Complete loading after animations
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        gsap.to(".loader-container", {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => setIsLoading(false),
        });
      }, 300);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loader-container fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center">
      {/* Counter */}
      <div className="font-display text-8xl md:text-[12rem] font-bold text-foreground tabular-nums">
        {Math.min(100, Math.floor(progress)).toString().padStart(3, "0")}
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-48 md:w-64 h-px bg-border overflow-hidden">
        <div
          className="h-full bg-foreground transition-all duration-100 ease-out"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>

      {/* Label */}
      <div className="mt-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">
        Loading
      </div>
    </div>
  );
}
