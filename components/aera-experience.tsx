"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { ArrowIcon } from "./arrow-icon";

function WordReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`word-reveal ${className}`} data-reveal>
      <span>{children}</span>
    </span>
  );
}

function Media({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`media-image ${className}`}
    />
  );
}

export function AeraExperience() {
  const { hero, mission, practice, philosophy, contact, footer } = siteConfig;
  const projects = siteConfig.projects.items;
  const [ready, setReady] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const projectsRef = useRef<HTMLElement>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        left: `${(index * 37) % 100}%`,
        top: `${(index * 61) % 100}%`,
        delay: `${(index % 7) * -1.7}s`,
        duration: `${10 + (index % 6) * 2}s`,
      })),
    [],
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setReady(true), reduced ? 0 : 1000);

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.18 },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      revealObserver.observe(el);
    });

    const updateMotion = () => {
      const y = window.scrollY;
      document.documentElement.style.setProperty("--scroll-y", `${y}px`);
      document.documentElement.style.setProperty(
        "--page-progress",
        `${Math.min(1, y / (document.body.scrollHeight - window.innerHeight))}`,
      );

      const section = projectsRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const progress = Math.max(0, Math.min(0.999, -rect.top / travel));
        setActiveProject(Math.min(projects.length - 1, Math.floor(progress * projects.length)));
      }
    };

    const updateLight = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    updateMotion();
    window.addEventListener("scroll", updateMotion, { passive: true });
    window.addEventListener("pointermove", updateLight, { passive: true });

    return () => {
      window.clearTimeout(timer);
      revealObserver.disconnect();
      window.removeEventListener("scroll", updateMotion);
      window.removeEventListener("pointermove", updateLight);
    };
  }, []);

  const jumpToProject = (index: number) => {
    const section = projectsRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: section.offsetTop + travel * ((index + 0.08) / projects.length),
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={`loader ${ready ? "loader--hidden" : ""}`} aria-hidden="true">
        <span>AERA</span>
        <i />
      </div>

      <div className="grain" aria-hidden="true" />
      <div className="cursor-light" aria-hidden="true" />
      <div className="progress-rail" aria-hidden="true">
        <i />
      </div>
      <div className="dust" aria-hidden="true">
        {particles.map((particle, index) => (
          <i
            key={index}
            style={
              {
                "--left": particle.left,
                "--top": particle.top,
                "--delay": particle.delay,
                "--duration": particle.duration,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <header className="site-header">
        <a
          className="wordmark"
          href="#top"
          aria-label={`${siteConfig.name} home`}
        >
          {siteConfig.name}
        </a>
        <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => (
            <a
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__media parallax-media">
            <Media
              src={hero.image}
              alt={hero.imageAlt}
              priority
            />
          </div>
          <div className="hero__shade" aria-hidden="true" />
          <div className="hero__content">
            <h1 id="hero-title">
              {hero.title.map((line) => (
                <WordReveal key={line}>{line}</WordReveal>
              ))}
            </h1>
            <a className="scroll-cue" href="#mission">
              {hero.scrollLabel} <span />
            </a>
          </div>
        </section>

        <section className="mission" id="mission" aria-labelledby="mission-title">
          <div className="mission__sticky">
            <div className="mission__copy">
              <p className="section-index" data-reveal>
                {mission.index}
              </p>
              <h2 id="mission-title">
                {mission.title.map((line) => (
                  <WordReveal key={line}>{line}</WordReveal>
                ))}
              </h2>
              <p className="mission__body" data-reveal>
                {mission.body}
              </p>
            </div>
            <div className="mission__image" data-reveal>
              <Media
                src={mission.image}
                alt={mission.imageAlt}
                sizes="(max-width: 900px) 100vw, 55vw"
              />
              <span className="image-caption">{mission.imageCaption}</span>
            </div>
          </div>
        </section>

        <section className="capabilities" aria-labelledby="capabilities-title">
          <div className="section-heading">
            <p className="section-index" data-reveal>
              {practice.index}
            </p>
            <h2 id="capabilities-title">
              {practice.title.map((line) => (
                <WordReveal key={line}>{line}</WordReveal>
              ))}
            </h2>
          </div>
          <div className="capability-grid">
            {practice.capabilities.map((item) => (
              <article className="capability-card" key={item.number} data-reveal>
                <div className="capability-card__media">
                  <Media
                    src={item.image}
                    alt={`${item.title} architectural study`}
                    sizes="(max-width: 900px) 79vw, 34vw"
                  />
                </div>
                <div className="capability-card__meta">
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <ArrowIcon diagonal />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="projects"
          id="works"
          ref={projectsRef}
          aria-labelledby="projects-title"
        >
          <div className="projects__sticky">
            <h2 className="sr-only" id="projects-title">
              Selected works
            </h2>
            <div className="project-scenes" aria-live="polite">
              {projects.map((project, index) => (
                <div
                  className={`project-scene ${
                    index === activeProject ? "project-scene--active" : ""
                  }`}
                  key={project.number}
                >
                  <Media src={project.image} alt={`${project.title} architectural project`} />
                </div>
              ))}
            </div>
            <div className="projects__veil" aria-hidden="true" />
            <div className="projects__topline">
              <span>{siteConfig.projects.index}</span>
              <span>
                {String(activeProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>
            <div className="project-copy">
              <p>{projects[activeProject].location}</p>
              <h3 key={projects[activeProject].title}>{projects[activeProject].title}</h3>
            </div>
            <div className="project-selector" aria-label="Choose a project">
              {projects.map((project, index) => (
                <button
                  className={index === activeProject ? "is-active" : ""}
                  type="button"
                  key={project.number}
                  onClick={() => jumpToProject(index)}
                  aria-label={`Show ${project.title}`}
                  aria-current={index === activeProject ? "true" : undefined}
                >
                  <span>{project.number}</span>
                  <i />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="philosophy" aria-labelledby="philosophy-title">
          <div className="philosophy__media">
            <Media
              src={philosophy.image}
              alt={philosophy.imageAlt}
            />
          </div>
          <div className="philosophy__veil" aria-hidden="true" />
          <p className="section-index" data-reveal>
            {philosophy.index}
          </p>
          <h2 id="philosophy-title">
            {philosophy.title.map((line) => (
              <WordReveal key={line}>{line}</WordReveal>
            ))}
          </h2>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact__orb" aria-hidden="true" />
          <p className="section-index" data-reveal>
            {contact.index}
          </p>
          <h2 id="contact-title">
            {contact.title.map((line) => (
              <WordReveal key={line}>{line}</WordReveal>
            ))}
          </h2>
          <a className="contact__cta" href={`mailto:${siteConfig.email}`}>
            {contact.cta} <ArrowIcon />
          </a>
          <footer>
            <span>{footer.copyright}</span>
            <span>{footer.location}</span>
            <a href="#top">{footer.backToTop}</a>
          </footer>
        </section>
      </main>
    </>
  );
}
