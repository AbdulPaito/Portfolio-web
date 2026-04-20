import { useRef, useState } from "react";
import gsap from "gsap";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageReveal({ src, alt, className = "" }: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseEnter = () => {
    if (!imageRef.current || !overlayRef.current) return;

    gsap.to(imageRef.current, {
      scale: 1.05,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current || !overlayRef.current) return;

    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(overlayRef.current, {
      opacity: 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLoad = () => {
    setIsLoaded(true);
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 0.8,
          ease: "power4.inOut",
          transformOrigin: "right center",
        }
      );
    }
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1,
          ease: "power2.out",
        }
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      {/* Loading overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-secondary z-10 origin-right"
      />

      {/* Image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Scanlines overlay on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
        }}
      />
    </div>
  );
}
