import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content) return;

    const ctx = gsap.context(() => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as globalThis.MouseEvent;
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (mouseEvent.clientX - centerX) * strength;
        const deltaY = (mouseEvent.clientY - centerY) * strength;

        gsap.to(button, {
          x: deltaX,
          y: deltaY,
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(content, {
          x: deltaX * 0.5,
          y: deltaY * 0.5,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to([button, content], {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
        });
      };

      button.addEventListener("mousemove", handleMouseMove as EventListener);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove as EventListener);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => ctx.revert();
  }, [strength]);

  const Component = href ? "a" : "button";

  return (
    <Component
      ref={buttonRef as any}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
    >
      <span ref={contentRef} className="relative z-10">
        {children}
      </span>
    </Component>
  );
}

// Text scramble effect on hover
export function ScrambleText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const originalText = useRef(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationFrame: number;
    let iteration = 0;

    const scramble = () => {
      const target = originalText.current;
      const progress = iteration / target.length;

      element.textContent = target
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) return target[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration < target.length) {
        iteration += 0.5;
        animationFrame = requestAnimationFrame(scramble);
      } else {
        element.textContent = target;
      }
    };

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrame);
      iteration = 0;
      scramble();
    };

    element.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrame);
    };
  }, [text]);

  return (
    <span ref={elementRef} className={`inline-block font-mono ${className}`}>
      {text}
    </span>
  );
}

// Underline draw animation
export function UnderlineLink({
  children,
  href,
  className = "",
  external = false,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const line = lineRef.current;
    if (!link || !line) return;

    const ctx = gsap.context(() => {
      gsap.set(line, { scaleX: 0, transformOrigin: "right center" });

      const handleMouseEnter = () => {
        gsap.to(line, {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(line, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.4,
          ease: "power2.out",
        });
      };

      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`relative inline-block ${className}`}
    >
      {children}
      <span
        ref={lineRef}
        className="absolute bottom-0 left-0 h-px w-full bg-current"
      />
    </a>
  );
}
