export type TimelineItem = {
  id: number;
  title: string;
  org: string;
  period: string;
  description: string;
};

export type ExperienceItem = {
  id: number;
  title: string;
  org: string;
  period: string;
  /** Short pill shown on the card, e.g. "Remote", "Fintech", "Health Tech" */
  type: string;
  challenge: string;
  process: string;
  victory: string;
  tech: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: 1,
    title: "Frontend Developer",
    org: "Toac Inc",
    period: "Nov 2025 - Apr 2026",
    type: "Contract",
    challenge:
      "A distributed Agile team, 8+ feature modules in flight and 30+ Figma designs that had to land pixel-accurate on every browser and screen size.",
    process:
      "Built production-ready components with React, TypeScript and TailwindCSS, kept design fidelity across desktop and mobile, and worked structured GitHub workflows inside two-week sprints.",
    victory:
      "Review-to-merge time dropped by 20% and the interfaces went out responsive, consistent and faithful to the designs.",
    tech: ["React", "TypeScript", "TailwindCSS", "GitHub Workflows", "Agile"],
  },
  {
    id: 2,
    title: "Backend Engineer",
    org: "Zeta Technologies",
    period: "Jun 2025 - Sep 2025",
    type: "Contract",
    challenge:
      "Fintech backends have no room for error. Authentication, transaction processing and real-time data all had to hold up under pressure and scrutiny.",
    process:
      "Built backend services with Node.js and PostgreSQL, implemented JWT authentication, role-based authorization and payment gateway integrations, and designed REST endpoints the frontend could rely on.",
    victory:
      "Delivered secure, reliable transaction flows and optimized backend logic and database interactions for faster responses and easier maintenance.",
    tech: ["Node.js", "Express", "PostgreSQL", "JWT", "REST APIs", "Payment Gateways"],
  },
  {
    id: 3,
    title: "Fullstack Engineer",
    org: "Upsywave Tech Company Ltd",
    period: "Mar 2024 - Apr 2025",
    type: "Remote",
    challenge:
      "Six web applications, one small team and real deadlines on both the frontend and the backend.",
    process:
      "Delivered production-grade interfaces with React, Next.js and TailwindCSS, built features end to end against backend APIs and contributed to a shared component library adopted across 4 projects.",
    victory:
      "Cut redundant API requests for a 30% drop in network overhead, and the reusable components sped up every project that came after.",
    tech: ["React", "Next.js", "TailwindCSS", "Node.js", "REST APIs"],
  },
];

export const education: TimelineItem[] = [
  {
    id: 1,
    title: "Advanced Diploma in Software Engineering",
    org: "Aptech Computer Education",
    period: "2024 - 2026",
    description:
      "Graduated with Distinction from an intensive program built around real-world applications, with hands-on work across modern frontend and backend technologies.",
  },
  {
    id: 2,
    title: "B.Sc. Public Health Science",
    org: "University of Calabar",
    period: "2018 - 2023",
    description:
      "Graduated with Second Class Upper honours (2:1), building the research discipline and people focus I bring to product work.",
  },
];

export type LeadershipItem = {
  id: number;
  title: string;
  org: string;
  period: string;
  bullets: string[];
};

export const leadership: LeadershipItem[] = [
  {
    id: 1,
    title: "Tech Lead",
    org: "Student Union Government (SUG), Aptech Computer Education",
    period: "Feb 2025 - Jan 2026",
    bullets: [
      "Directed technology initiatives for the student union, managing digital tools and communications platforms.",
      "Mentored fellow students in software development, supporting technical skill growth across the student body.",
    ],
  },
  {
    id: 2,
    title: "President",
    org: "National Association of Public Health Students (NAPHS)",
    period: "Mar 2021 - Dec 2023",
    bullets: [
      "Led the national executive body, representing students across member institutions nationwide.",
      "Coordinated academic conferences, professional development events and community health initiatives.",
    ],
  },
];

export type Certificate = {
  id: number;
  title: string;
  file: string;
};

export const certificates: Certificate[] = [
  { id: 1, title: "Full-Stack Development", file: "/certificates/full-stack.jpg" },
  { id: 2, title: "Next.js", file: "/certificates/nextjs.jpg" },
  { id: 3, title: "API Development", file: "/certificates/APIs.jpg" },
  { id: 4, title: "AI-Driven Development", file: "/certificates/AI-driven.jpg" },
  { id: 5, title: "Ultimate Web Development", file: "/certificates/ultimate.jpg" },
];
