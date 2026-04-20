import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Counter({
  to,
  suffix = "",
  duration = 2,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const valueRef = useRef({ value: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(valueRef.current, {
            value: to,
            duration: duration,
            ease: "power2.out",
            onUpdate: () => {
              element.textContent = Math.round(valueRef.current.value) + suffix;
            },
          });
        },
      });
    });

    return () => ctx.revert();
  }, [to, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
