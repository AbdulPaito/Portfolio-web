import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

const links = [
  { id: "home", label: "01 / Home" },
  { id: "about", label: "02 / About" },
  { id: "skills", label: "03 / Skills" },
  { id: "projects", label: "04 / Work" },
  { id: "experience", label: "05 / Path" },
  { id: "contact", label: "06 / Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        nav,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Move indicator to active link
  useEffect(() => {
    const activeIndex = links.findIndex((l) => l.id === active);
    const activeLink = linksRef.current[activeIndex];
    const indicator = indicatorRef.current;

    if (activeLink && indicator) {
      const rect = activeLink.getBoundingClientRect();
      const navRect = activeLink.parentElement?.parentElement?.getBoundingClientRect();
      if (navRect) {
        gsap.to(indicator, {
          x: rect.left - navRect.left,
          width: rect.width,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }
  }, [active]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, offsetY: 80 },
        duration: 1.2,
        ease: "power3.inOut",
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="relative group">
            <span className="font-mono text-sm tracking-wider text-muted-foreground">
              AP
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center relative">
            {/* Active indicator */}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-px bg-foreground opacity-0"
              style={{ width: 0 }}
            />

            <ul className="flex items-center gap-8">
              {links.map((link, i) => (
                <li key={link.id}>
                  <a
                    ref={(el) => { linksRef.current[i] = el; }}
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={`font-mono text-xs tracking-wider transition-colors duration-300 ${
                      active === link.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 border border-border hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-transform duration-500 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-center h-full px-8">
          <ul className="space-y-6">
            {links.map((link, i) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`block font-mono text-2xl tracking-wider transition-colors ${
                    active === link.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-8 left-8">
            <p className="font-mono text-xs text-muted-foreground">
              © 2026 Abdul David Paito
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
