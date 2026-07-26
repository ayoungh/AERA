"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { ArrowIcon } from "./arrow-icon";

const displayHeadingClass =
  "font-normal leading-[0.82] tracking-[-0.07em] uppercase";
const sectionIndexClass =
  "m-0 text-[0.7rem] font-medium tracking-[0.14em] uppercase text-paper/55";

function WordReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`word-reveal block overflow-hidden ${className}`}
      data-reveal
    >
      <span className="block translate-y-[112%] transition-transform duration-[1250ms] ease-[cubic-bezier(0.76,0,0.24,1)]">
        {children}
      </span>
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
      className={`object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${className}`}
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
      <div
        className={`fixed inset-0 z-[200] grid place-items-center bg-ink transition-[opacity,visibility] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          ready ? "pointer-events-none invisible opacity-0" : "visible opacity-100"
        }`}
        aria-hidden="true"
      >
        <span className="translate-x-[0.275em] text-base font-semibold tracking-[0.55em]">
          AERA
        </span>
        <i className="absolute right-[18vw] bottom-[15vh] left-[18vw] h-px overflow-hidden bg-paper/20 after:absolute after:inset-0 after:origin-left after:bg-paper after:content-[''] after:animate-[load-line_1s_cubic-bezier(0.76,0,0.24,1)_both]" />
      </div>

      <div
        className="grain pointer-events-none fixed -inset-1/2 z-[90] opacity-[0.045]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed top-[var(--pointer-y)] left-[var(--pointer-x)] z-40 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full [background:radial-gradient(circle,rgba(255,225,184,0.075)_0%,rgba(255,225,184,0.018)_38%,transparent_70%)] mix-blend-screen transition-[left,top] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] max-[900px]:hidden"
        aria-hidden="true"
      />
      <div
        className="fixed top-1/2 right-[1.35rem] z-[110] h-28 w-px -translate-y-1/2 bg-paper/18 max-[900px]:hidden"
        aria-hidden="true"
      >
        <i className="block h-full w-px origin-top scale-y-[var(--page-progress)] bg-paper" />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-[41] overflow-hidden"
        aria-hidden="true"
      >
        {particles.map((particle, index) => (
          <i
            className="absolute top-[var(--top)] left-[var(--left)] size-[2px] rounded-full bg-paper/35 blur-[0.5px] animate-[float-dust_var(--duration)_ease-in-out_var(--delay)_infinite]"
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

      <header className="fixed top-5 right-5 left-5 z-[120] flex h-[3.6rem] items-center justify-between rounded-sm border border-paper/13 bg-ink/20 px-[1.3rem] [backdrop-filter:blur(16px)_saturate(120%)] max-[900px]:top-3 max-[900px]:right-3 max-[900px]:left-3">
        <a
          className="translate-x-[0.275em] text-[0.82rem] font-bold tracking-[0.55em]"
          href="#top"
          aria-label={`${siteConfig.name} home`}
        >
          {siteConfig.name}
        </a>
        <nav
          className={`flex gap-[2.8rem] text-[0.76rem] tracking-[0.04em] max-[900px]:absolute max-[900px]:top-[calc(100%+0.5rem)] max-[900px]:right-0 max-[900px]:left-0 max-[900px]:grid max-[900px]:max-h-0 max-[900px]:gap-0 max-[900px]:overflow-hidden max-[900px]:rounded-sm max-[900px]:border max-[900px]:border-paper/13 max-[900px]:bg-ink/90 max-[900px]:px-5 max-[900px]:py-0 max-[900px]:opacity-0 max-[900px]:backdrop-blur-[18px] max-[900px]:transition-[max-height,opacity,padding] max-[900px]:duration-500 max-[900px]:ease-[cubic-bezier(0.76,0,0.24,1)] ${
            menuOpen
              ? "max-[900px]:max-h-56 max-[900px]:py-[0.65rem] max-[900px]:opacity-100"
              : ""
          }`}
          aria-label="Primary navigation"
        >
          {siteConfig.navigation.map((item) => (
            <a
              className="relative py-[0.6rem] text-paper/78 transition-colors duration-[350ms] after:absolute after:right-0 after:bottom-1 after:left-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-[450ms] after:ease-[cubic-bezier(0.76,0,0.24,1)] after:content-[''] hover:text-paper hover:after:origin-left hover:after:scale-x-100 max-[900px]:py-[0.8rem]"
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="hidden size-8 border-0 bg-transparent p-[0.45rem] max-[900px]:block"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="my-[0.33rem] block h-px w-full bg-current" />
          <span className="my-[0.33rem] block h-px w-full bg-current" />
        </button>
      </header>

      <main>
        <section
          className="relative min-h-svh overflow-hidden bg-ink"
          id="top"
          aria-labelledby="hero-title"
        >
          <div className="absolute -inset-16 max-[520px]:inset-0">
            <Media
              src={hero.image}
              alt={hero.imageAlt}
              priority
              className="animate-[hero-breathe_18s_ease-in-out_infinite_alternate] max-[520px]:object-[62%_center]"
            />
          </div>
          <div
            className="absolute inset-0 [background:linear-gradient(180deg,rgba(8,10,11,0.42)_0%,transparent_28%),linear-gradient(0deg,rgba(8,10,11,0.8)_0%,transparent_48%)]"
            aria-hidden="true"
          />
          <div className="relative z-[2] flex min-h-svh flex-col justify-end px-[3.1vw] pt-32 pb-[3vw] max-[900px]:px-5 max-[900px]:pt-28 max-[900px]:pb-8">
            <h1
              className="m-0 max-w-[12ch] text-[clamp(4.8rem,10.7vw,12rem)] leading-[0.78] font-normal tracking-[-0.075em] uppercase max-[900px]:text-[clamp(3.7rem,16vw,7rem)] max-[900px]:leading-[0.82] max-[520px]:max-w-[9ch]"
              id="hero-title"
            >
              {hero.title.map((line) => (
                <WordReveal className="hero-word" key={line}>
                  {line}
                </WordReveal>
              ))}
            </h1>
            <a
              className="absolute right-[3.2vw] bottom-[3.6vw] flex items-center gap-[0.8rem] text-[0.62rem] tracking-[0.22em] uppercase max-[900px]:right-5 max-[900px]:bottom-[2.2rem] max-[520px]:hidden"
              href="#mission"
            >
              {hero.scrollLabel}{" "}
              <span className="inline-block h-px w-[2.8rem] origin-left bg-current animate-[cue-pulse_2.4s_ease-in-out_infinite]" />
            </a>
          </div>
        </section>

        <section
          className="relative h-[170svh] bg-ink max-[900px]:h-auto"
          id="mission"
          aria-labelledby="mission-title"
        >
          <div className="sticky top-0 grid min-h-svh grid-cols-[0.86fr_1.14fr] items-stretch overflow-hidden max-[900px]:relative max-[900px]:flex max-[900px]:min-h-0 max-[900px]:flex-col">
            <div className="flex flex-col justify-center px-[5vw] pt-[9vw] pb-[6vw] max-[900px]:min-h-[92svh] max-[900px]:px-5 max-[900px]:pt-32 max-[900px]:pb-16">
              <p className={sectionIndexClass} data-reveal>
                {mission.index}
              </p>
              <h2
                className={`${displayHeadingClass} mt-[2.3rem] text-[clamp(4rem,8vw,10rem)] max-[900px]:text-[clamp(3.5rem,15vw,7rem)]`}
                id="mission-title"
              >
                {mission.title.map((line) => (
                  <WordReveal key={line}>{line}</WordReveal>
                ))}
              </h2>
              <p
                className="mt-16 ml-auto max-w-[29rem] text-[clamp(1rem,1.3vw,1.35rem)] leading-[1.45] font-normal text-muted max-[900px]:mt-12 max-[900px]:ml-0 max-[900px]:max-w-[22rem]"
                data-reveal
              >
                {mission.body}
              </p>
            </div>
            <div
              className="relative mt-28 mr-[1.6rem] mb-[1.6rem] overflow-hidden after:pointer-events-none after:absolute after:inset-0 after:shadow-[inset_0_0_7rem_rgba(6,7,8,0.2)] after:content-[''] max-[900px]:m-[0_0.75rem_0.75rem] max-[900px]:h-[85svh]"
              data-reveal
            >
              <Media
                src={mission.image}
                alt={mission.imageAlt}
                sizes="(max-width: 900px) 100vw, 55vw"
                className="[transform:scale(1.1)_translateY(calc(var(--page-progress)*-2.5rem))]"
              />
              <span className="absolute bottom-[1.2rem] left-[1.2rem] z-[2] text-[0.62rem] tracking-[0.15em] uppercase">
                {mission.imageCaption}
              </span>
            </div>
          </div>
        </section>

        <section
          className="relative z-[2] bg-paper px-[3vw] pt-40 pb-44 text-ink max-[900px]:px-3 max-[900px]:py-28"
          aria-labelledby="capabilities-title"
        >
          <div className="mb-32 grid grid-cols-[1fr_2.2fr] items-start max-[900px]:mb-16 max-[900px]:block max-[900px]:px-2">
            <p
              className={`${sectionIndexClass} text-ink/52`}
              data-reveal
            >
              {practice.index}
            </p>
            <h2
              className={`${displayHeadingClass} m-0 text-[clamp(4rem,8vw,10rem)] max-[900px]:mt-8 max-[900px]:text-[clamp(3.5rem,15vw,7rem)]`}
              id="capabilities-title"
            >
              {practice.title.map((line) => (
                <WordReveal key={line}>{line}</WordReveal>
              ))}
            </h2>
          </div>
          <div className="hide-scrollbar grid grid-cols-[1.05fr_0.9fr_1.05fr] items-start gap-[1.1rem] max-[900px]:flex max-[900px]:snap-x max-[900px]:snap-mandatory max-[900px]:gap-3 max-[900px]:overflow-x-auto max-[900px]:[scrollbar-width:none]">
            {practice.capabilities.map((item) => (
              <article
                className="group [&:nth-child(2)]:mt-44 max-[900px]:min-w-[79vw] max-[900px]:snap-center max-[900px]:[&:nth-child(2)]:mt-0"
                key={item.number}
                data-reveal
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-soft">
                  <Media
                    src={item.image}
                    alt={`${item.title} architectural study`}
                    sizes="(max-width: 900px) 79vw, 34vw"
                    className="scale-[1.04] group-hover:scale-[1.1]"
                  />
                </div>
                <div className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-[0.6rem] border-b border-ink/20 py-[1.15rem]">
                  <span className="text-[0.68rem] text-ink/50">
                    {item.number}
                  </span>
                  <h3 className="m-0 text-[clamp(1rem,1.5vw,1.35rem)] font-medium tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <ArrowIcon diagonal />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="relative h-[360svh] bg-ink max-[900px]:h-[320svh]"
          id="works"
          ref={projectsRef}
          aria-labelledby="projects-title"
        >
          <div className="sticky top-0 min-h-svh overflow-hidden">
            <h2 className="sr-only" id="projects-title">
              Selected works
            </h2>
            <div className="absolute inset-0" aria-live="polite">
              {projects.map((project, index) => (
                <div
                  className={`absolute inset-0 scale-[1.04] opacity-0 [transition:opacity_1.3s_ease,transform_3s_cubic-bezier(0.2,0.8,0.2,1)] ${
                    index === activeProject
                      ? "z-[1] scale-100 opacity-100"
                      : ""
                  }`}
                  key={project.number}
                >
                  <Media
                    src={project.image}
                    alt={`${project.title} architectural project`}
                    className="scale-[1.04]"
                  />
                </div>
              ))}
            </div>
            <div
              className="pointer-events-none absolute inset-0 z-[2] [background:linear-gradient(180deg,rgba(8,9,10,0.55),transparent_35%),linear-gradient(0deg,rgba(8,9,10,0.76),transparent_52%)]"
              aria-hidden="true"
            />
            <div className="absolute top-[7.5rem] right-[3vw] left-[3vw] z-[3] flex justify-between border-t border-paper/35 pt-4 text-[0.65rem] tracking-[0.14em] text-paper/72 uppercase max-[900px]:top-24 max-[900px]:right-5 max-[900px]:left-5">
              <span>{siteConfig.projects.index}</span>
              <span>
                {String(activeProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>
            <div className="absolute bottom-[3.5vw] left-[3vw] z-[3] max-w-[78vw] max-[900px]:right-5 max-[900px]:bottom-28 max-[900px]:left-5 max-[900px]:max-w-none">
              <p className="mt-0 mb-[1.1rem] text-[0.66rem] tracking-[0.15em] uppercase">
                {projects[activeProject].location}
              </p>
              <h3
                className="m-0 text-[clamp(4.7rem,11vw,12rem)] leading-[0.78] font-normal tracking-[-0.075em] uppercase animate-[project-title-in_900ms_cubic-bezier(0.76,0,0.24,1)_both] max-[900px]:text-[clamp(4rem,17vw,8rem)]"
                key={projects[activeProject].title}
              >
                {projects[activeProject].title}
              </h3>
            </div>
            <div
              className="absolute right-[3vw] bottom-[4.6vw] z-[4] flex gap-[0.65rem] max-[900px]:right-5 max-[900px]:bottom-10 max-[900px]:left-5"
              aria-label="Choose a project"
            >
              {projects.map((project, index) => (
                <button
                  className="grid w-12 cursor-pointer gap-2 border-0 bg-transparent p-0 text-left max-[900px]:w-auto max-[900px]:flex-1"
                  type="button"
                  key={project.number}
                  onClick={() => jumpToProject(index)}
                  aria-label={`Show ${project.title}`}
                  aria-current={index === activeProject ? "true" : undefined}
                >
                  <span
                    className={`text-[0.62rem] transition-opacity duration-300 ${
                      index === activeProject ? "opacity-100" : "opacity-52"
                    }`}
                  >
                    {project.number}
                  </span>
                  <i
                    className={`h-px w-full overflow-hidden bg-paper/30 after:block after:h-full after:w-full after:origin-left after:bg-paper after:transition-transform after:duration-[650ms] after:ease-[cubic-bezier(0.76,0,0.24,1)] after:content-[''] ${
                      index === activeProject
                        ? "after:scale-x-100"
                        : "after:scale-x-0"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative flex min-h-[125svh] flex-col justify-center overflow-hidden px-[3vw] py-32 max-[900px]:min-h-[112svh] max-[900px]:px-5 max-[900px]:py-28"
          aria-labelledby="philosophy-title"
        >
          <div className="absolute inset-0">
            <Media
              src={philosophy.image}
              alt={philosophy.imageAlt}
              className="scale-[1.08] animate-[philosophy-breathe_22s_ease-in-out_infinite_alternate] max-[520px]:object-[58%_center]"
            />
          </div>
          <div
            className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(6,7,8,0.28),rgba(6,7,8,0.4)_45%,rgba(6,7,8,0.72))]"
            aria-hidden="true"
          />
          <p className={`${sectionIndexClass} relative z-[2]`} data-reveal>
            {philosophy.index}
          </p>
          <h2
            className={`${displayHeadingClass} relative z-[2] mt-12 w-full max-w-[10.5ch] text-[clamp(4.6rem,10vw,12rem)] max-[900px]:text-[clamp(3.8rem,16vw,7rem)]`}
            id="philosophy-title"
          >
            {philosophy.title.map((line) => (
              <WordReveal key={line}>{line}</WordReveal>
            ))}
          </h2>
        </section>

        <section
          className="relative flex min-h-svh flex-col overflow-hidden bg-paper px-[3vw] pt-32 pb-8 text-ink max-[900px]:px-5 max-[900px]:pt-28 max-[900px]:pb-5"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div
            className="absolute -top-[12vw] -right-[8vw] aspect-square w-[min(48vw,48rem)] rounded-full [background:radial-gradient(circle_at_44%_46%,#fff9ed_0%,#e1b77e_24%,#8e7158_46%,#353b44_68%,#15181d_100%)] shadow-[inset_-5rem_-4rem_9rem_rgba(0,0,0,0.28),0_4rem_8rem_rgba(78,56,35,0.18)] saturate-[0.74] after:absolute after:inset-0 after:rounded-[inherit] after:bg-[radial-gradient(circle_at_36%_32%,rgba(255,255,255,0.4),transparent_25%)] after:mix-blend-screen after:content-[''] max-[900px]:top-24 max-[900px]:-right-[25vw] max-[900px]:w-[92vw]"
            aria-hidden="true"
          />
          <p
            className={`${sectionIndexClass} text-ink/50`}
            data-reveal
          >
            {contact.index}
          </p>
          <h2
            className={`${displayHeadingClass} relative z-[1] mt-auto max-w-[9ch] text-[clamp(5rem,11.5vw,13rem)] max-[900px]:mb-36 max-[900px]:text-[clamp(3.5rem,15vw,7rem)]`}
            id="contact-title"
          >
            {contact.title.map((line) => (
              <WordReveal key={line}>{line}</WordReveal>
            ))}
          </h2>
          <a
            className="group absolute right-[3vw] bottom-32 z-[2] flex w-[min(26rem,36vw)] items-center gap-12 border-y border-ink/35 py-[1.2rem] text-[0.9rem] transition-[padding] duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:pl-4 max-[900px]:relative max-[900px]:right-auto max-[900px]:bottom-auto max-[900px]:w-full"
            href={`mailto:${siteConfig.email}`}
          >
            {contact.cta} <ArrowIcon />
          </a>
          <footer className="mt-20 grid grid-cols-[1fr_1fr_auto] gap-4 border-t border-ink/22 pt-4 text-[0.65rem] tracking-[0.09em] uppercase max-[900px]:mt-16 max-[900px]:grid-cols-[1fr_auto]">
            <span>{footer.copyright}</span>
            <span className="max-[900px]:hidden">{footer.location}</span>
            <a href="#top">{footer.backToTop}</a>
          </footer>
        </section>
      </main>
    </>
  );
}
