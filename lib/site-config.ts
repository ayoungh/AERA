export const siteConfig = {
  name: "AERA",
  title: "AERA — Future, Made Human",
  description:
    "A cinematic architectural journey into spaces built for human potential.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "studio@aera.example",
  navigation: [
    { label: "Mission", href: "#mission" },
    { label: "Works", href: "#works" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    title: ["Future,", "made human."],
    image: "/images/aera-hero.png",
    imageAlt: "A monumental curved concrete structure framing the sunrise",
    scrollLabel: "Scroll to enter",
  },
  mission: {
    index: "01 — Mission",
    title: ["Space can", "move us", "forward."],
    body: "We imagine places where ambition feels natural—and the future feels close enough to touch.",
    image: "/images/aera-mission.png",
    imageAlt:
      "A lone figure ascending a monumental stair beneath shafts of light",
    imageCaption: "A study in ascent",
  },
  practice: {
    index: "02 — Practice",
    title: ["Designing the", "uncommon."],
    capabilities: [
      {
        number: "01",
        title: "Civic Realms",
        image: "/images/aera-pavilion.png",
      },
      {
        number: "02",
        title: "Cultural Forms",
        image: "/images/aera-monoliths.png",
      },
      {
        number: "03",
        title: "Living Systems",
        image: "/images/aera-terraces.png",
      },
    ],
  },
  projects: {
    index: "03 — Selected works",
    items: [
      {
        number: "01",
        title: "House of Light",
        location: "The High Desert",
        image: "/images/aera-hero.png",
      },
      {
        number: "02",
        title: "The Forum",
        location: "Northern Plateau",
        image: "/images/aera-terraces.png",
      },
      {
        number: "03",
        title: "Quiet Horizon",
        location: "Coastal Valley",
        image: "/images/aera-philosophy.png",
      },
    ],
  },
  philosophy: {
    index: "04 — Philosophy",
    title: ["Built for the", "centuries ahead."],
    image: "/images/aera-philosophy.png",
    imageAlt:
      "A person crossing a narrow bridge between monumental stone and concrete walls",
  },
  contact: {
    index: "05 — Contact",
    title: ["Begin the", "impossible."],
    cta: "Start a conversation",
  },
  footer: {
    copyright: "AERA © 2026",
    location: "London · Everywhere",
    backToTop: "Back to light",
  },
} as const;

export type SiteConfig = typeof siteConfig;
