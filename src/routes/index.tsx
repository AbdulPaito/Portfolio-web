import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Code2,
  Database,
  Wrench,
  Server,
  ExternalLink,
  ArrowDown,
} from "lucide-react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Counter } from "@/components/portfolio/Counter";
import {
  TextReveal,
  WordReveal,
  FadeUp,
  LineDraw,
  ScaleReveal,
  StaggerContainer,
} from "@/components/portfolio/TextReveal";
import { MagneticButton, UnderlineLink } from "@/components/portfolio/MagneticButton";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { NoiseOverlay } from "@/components/portfolio/NoiseOverlay";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { PageLoader } from "@/components/portfolio/PageLoader";
import { ScrollSkew } from "@/components/portfolio/ScrollSkew";
import { TextScramble } from "@/components/portfolio/TextScramble";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdul David Paito — Fullstack Developer" },
      {
        name: "description",
        content:
          "Fullstack Developer from the Philippines building scalable React, Next.js and Node.js applications.",
      },
      {
        name: "keywords",
        content:
          "Abdul David Paito, Fullstack Developer, React, Next.js, Node.js, MongoDB, Philippines",
      },
      { property: "og:title", content: "Abdul David Paito — Fullstack Developer" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const stats = [
  { label: "Years Coding", value: 3, suffix: "+" },
  { label: "Projects Built", value: 5, suffix: "+" },
  { label: "Live Systems", value: 2, suffix: "" },
  { label: "Technologies", value: 10, suffix: "+" },
];

const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML / CSS"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "REST APIs", "PHP", "Java"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MongoDB Atlas", "MySQL"],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git / GitHub", "Vercel", "Render", "Cloudinary"],
  },
];

const projects = [
  {
    number: "01",
    title: "Poultry Management System",
    description:
      "End-to-end SaaS platform powering real poultry farm operations — secure auth, role-based dashboards, and live production tracking.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    link: "https://poultrysystem.vercel.app/login",
  },
  {
    number: "02",
    title: "Notes Web App",
    description:
      "A fast, distraction-free notes platform with secure login, real-time persistence, and a polished writing experience.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    link: "https://noteswebs.vercel.app/login",
  },
  {
    number: "03",
    title: "Student Grade Portal",
    description:
      "Fullstack academic management system with separate admin and student portals — grades, records, and subject management.",
    tech: ["React", "Next.js", "Node.js", "MongoDB"],
    link: "https://exact-gradeportal.vercel.app/",
  },
  {
    number: "04",
    title: "Nursing Student Portal",
    description:
      "Production portal serving real students — admin/student roles, announcements, event scheduling, and Cloudinary-powered uploads.",
    tech: ["React", "Node.js", "MongoDB", "Cloudinary"],
    link: "https://cahseventsdocs.netlify.app/",
  },
];

const timeline = [
  {
    year: "2026",
    title: "Fullstack Developer",
    desc: "Architected and shipped multiple production systems used by real organizations.",
  },
  {
    year: "2025",
    title: "BSIS Graduate",
    desc: "Completed Information Systems degree.",
  },
  {
    year: "2024",
    title: "Advanced Web Development",
    desc: "Focused on fullstack technologies and modern frameworks.",
  },
  {
    year: "2021",
    title: "Started Coding",
    desc: "Began learning programming fundamentals and web development.",
  },
];

function Portfolio() {
  const heroRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Hero entrance animation
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });

      tl.fromTo(
        ".hero-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.2, stagger: 0.2, ease: "power3.inOut" }
      )
        .fromTo(
          ".hero-title .char",
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1, stagger: 0.03, ease: "power4.out" },
          "-=0.8"
        )
        .fromTo(
          ".hero-subtitle",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-status",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        );
    });

    return () => ctx.revert();
  }, []);

  // Scroll line animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      lineRefs.current.forEach((line) => {
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              duration: 1.5,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: line,
                start: "top 80%",
                once: true,
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <PageLoader />
      <CustomCursor />
      <NoiseOverlay />
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Grid Background */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0 grid-pattern" />
        </div>

        <Navbar />

      {/* HERO - BRUTALIST KINETIC TYPOGRAPHY */}
      <section
        ref={heroRef}
        id="home"
        className="relative flex min-h-screen items-center px-6 pt-32"
      >
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Top decorative line */}
          <div className="hero-line absolute -top-8 left-0 right-0 h-px bg-border" />

          {/* Status indicator */}
          <div className="hero-status flex items-center gap-3 mb-12">
            <span className="h-2 w-2 bg-foreground animate-pulse-dot" />
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Available for Work
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Philippines
            </span>
          </div>

          {/* Main title - character by character animation */}
          <div className="hero-title overflow-hidden">
            <h1 className="font-display font-bold tracking-tighter text-foreground">
              <span className="block text-[clamp(3rem,10vw,10rem)] leading-[0.85]">
                {"ABDUL".split("").map((char, i) => (
                  <span key={i} className="char inline-block">{char}</span>
                ))}
              </span>
              <span className="block text-[clamp(3rem,10vw,10rem)] leading-[0.85]">
                {"DAVID".split("").map((char, i) => (
                  <span key={i} className="char inline-block">{char}</span>
                ))}
              </span>
              <span className="block text-[clamp(3rem,10vw,10rem)] leading-[0.85] text-muted-foreground">
                {"PAITO".split("").map((char, i) => (
                  <span key={i} className="char inline-block">{char}</span>
                ))}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="hero-subtitle mt-8 max-w-2xl">
            <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
              <WordReveal>Fullstack Developer specializing in React, Next.js & Node.js. Building production-grade web applications with clean architecture and thoughtful UX.</WordReveal>
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#projects"
              className="hero-cta btn-fill px-8 py-4 font-mono text-sm uppercase tracking-wider"
            >
              <span className="flex items-center gap-2">
                View Work <ArrowUpRight className="h-4 w-4" />
              </span>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="hero-cta btn-outline px-8 py-4 font-mono text-sm uppercase tracking-wider"
            >
              Contact
            </MagneticButton>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-background p-6 md:p-8"
              >
                <div className="font-display text-3xl md:text-4xl font-bold">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="hero-scroll absolute bottom-8 left-6 flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground [writing-mode:vertical-lr]">
              Scroll
            </span>
            <ArrowDown className="h-4 w-4 text-muted-foreground animate-bounce" />
          </div>
        </div>
      </section>

      {/* ABOUT - ASYMMETRIC SPLIT LAYOUT */}
      <section id="about" className="relative px-6 py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left column - Section label */}
            <div className="lg:col-span-4">
              <FadeUp>
                <div className="lg:sticky lg:top-32">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    02 / About
                  </span>
                  <LineDraw className="mt-4 w-12" />
                </div>
              </FadeUp>
            </div>

            {/* Right column - Content */}
            <div className="lg:col-span-8">
              <FadeUp delay={0.1}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Engineering digital experiences that ship.
                </h2>
              </FadeUp>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <FadeUp delay={0.2}>
                  <p className="text-muted-foreground leading-relaxed">
                    I'm a fullstack engineer obsessed with shipping software that feels effortless and performs under load. My toolkit centers on React, Next.js, Node.js and MongoDB — the same stack powering modern SaaS products at scale.
                  </p>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <p className="text-muted-foreground leading-relaxed">
                    I turn rough ideas into production-ready products with thoughtful UX, clean architecture, and a relentless focus on detail. Every line of code is written with purpose, every component designed for reusability.
                  </p>
                </FadeUp>
              </div>

              {/* Info boxes */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
                <FadeUp delay={0.4} className="bg-background p-6">
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Location
                  </div>
                  <div className="font-display text-lg">Philippines</div>
                </FadeUp>
                <FadeUp delay={0.5} className="bg-background p-6">
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Status
                  </div>
                  <div className="font-display text-lg flex items-center gap-2">
                    <span className="h-2 w-2 bg-foreground animate-pulse-dot" />
                    Available
                  </div>
                </FadeUp>
                <FadeUp delay={0.6} className="bg-background p-6">
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Email
                  </div>
                  <UnderlineLink
                    href="mailto:abdulpaito2129@gmail.com"
                    className="font-display text-sm"
                  >
                    abdulpaito2129@gmail.com
                  </UnderlineLink>
                </FadeUp>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS - MARQUEE + GRID */}
      <section id="skills" className="relative py-32 border-t border-border overflow-hidden">
        {/* Marquee */}
        <div className="relative py-8 border-y border-border bg-secondary/30">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="mx-8 font-display text-4xl md:text-6xl font-bold text-muted-foreground/30">
                REACT • NEXT.JS • NODE.JS • TYPESCRIPT • MONGODB • TAILWIND •
              </span>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="px-6 mt-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <FadeUp>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  03 / Stack
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
                  Technical Toolkit
                </h2>
              </FadeUp>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
              {skillGroups.map((group, i) => {
                const isFirstCol = i % 2 === 0;
                const isFirstRow = i < 2;
                return (
                  <ScaleReveal key={group.title} delay={i * 0.1}>
                    <div className={`bg-background p-8 md:p-12 hover:bg-secondary/50 transition-colors duration-300 h-full ${!isFirstCol ? 'border-l border-border' : ''} ${!isFirstRow ? 'border-t border-border md:border-t-0' : ''}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <group.icon className="h-6 w-6 text-foreground" />
                        <h3 className="font-display text-xl font-semibold">
                          {group.title}
                        </h3>
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <li
                            key={skill}
                            className="font-mono text-xs px-3 py-1 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors cursor-default"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScaleReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS - ASYMMETRIC LIST */}
      <section id="projects" className="relative px-6 py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20">
            <FadeUp>
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                04 / Work
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
                Selected Projects
              </h2>
            </FadeUp>
          </div>

          <div className="space-y-px bg-border">
            {projects.map((project, i) => (
              <FadeUp key={project.title} delay={i * 0.1}>
                <div className="group bg-background hover:bg-secondary/30 transition-colors duration-300">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-8 md:p-12"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                      {/* Project number */}
                      <div className="lg:col-span-1">
                        <span className="font-mono text-sm text-muted-foreground">
                          {project.number}
                        </span>
                      </div>

                      {/* Title & description */}
                      <div className="lg:col-span-5">
                        <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2 group-hover:underline decoration-1 underline-offset-4">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech stack */}
                      <div className="lg:col-span-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-xs px-2 py-1 bg-secondary text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Link indicator */}
                      <div className="lg:col-span-2 flex lg:justify-end">
                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                    </div>
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE - VERTICAL TIMELINE */}
      <section id="experience" className="relative px-6 py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20">
            <FadeUp>
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                05 / Path
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">
                Journey
              </h2>
            </FadeUp>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              ref={(el) => { lineRefs.current[0] = el; }}
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2"
            />

            <div className="space-y-16">
              {timeline.map((item, i) => (
                <FadeUp key={item.year} delay={i * 0.1}>
                  <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 ${i % 2 === 0 ? '' : 'md:text-right'}`}>
                    {/* Year marker */}
                    <div className={`flex items-center gap-4 ${i % 2 === 0 ? 'md:justify-end' : 'md:flex-row-reverse'}`}>
                      <span className="font-display text-5xl md:text-7xl font-bold text-muted-foreground/20">
                        {item.year}
                      </span>
                      <span className="h-3 w-3 bg-foreground rounded-full md:absolute md:left-1/2 md:-translate-x-1/2" />
                    </div>

                    {/* Content */}
                    <div className={i % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}>
                      <h3 className="font-display text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT - LARGE TYPOGRAPHY */}
      <section id="contact" className="relative px-6 py-32 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <FadeUp>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  06 / Contact
                </span>
                <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mt-6 leading-[0.9]">
                  Let's build something together.
                </h2>
              </FadeUp>
            </div>

            <div className="lg:text-right">
              <FadeUp delay={0.2}>
                <p className="text-muted-foreground mb-8 max-w-md lg:ml-auto">
                  Available for freelance projects, full-time roles, and collaborations — anywhere in the world.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                  <MagneticButton
                    href="mailto:abdulpaito2129@gmail.com"
                    className="btn-fill px-8 py-4 font-mono text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2"
                  >
                    <Mail className="h-4 w-4" /> Email Me
                  </MagneticButton>
                  <MagneticButton
                    href="https://github.com/AbdulPaito"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline px-8 py-4 font-mono text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                      <path d="M12 .5C5.73.5.67 5.56.67 11.83c0 4.98 3.23 9.2 7.71 10.69.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.35-3.8-1.35-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.52-2.51-.28-5.15-1.25-5.15-5.58 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.62 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.34-2.64 5.29-5.16 5.57.41.35.78 1.05.78 2.12v3.14c0 .31.2.66.78.54 4.47-1.5 7.7-5.71 7.7-10.69C23.33 5.56 18.27.5 12 .5Z" />
                    </svg>
                    GitHub
                  </MagneticButton>
                  <MagneticButton
                    href="https://www.linkedin.com/in/paito-abdul"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline px-8 py-4 font-mono text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
                    </svg>
                    LinkedIn
                  </MagneticButton>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-6 py-12 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-muted-foreground">
              © {new Date().getFullYear()} <TextScramble trigger="hover">Abdul David Paito</TextScramble>
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              Built with React, Tailwind & GSAP
            </p>
          </div>
        </div>
      </footer>
    </div>
    </SmoothScroll>
  );
}
