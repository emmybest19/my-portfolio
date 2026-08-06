export const site = {
  name: "Emmanuel Ebri",
  firstName: "Emmanuel",
  title: "Full Stack Developer",
  roles: ["Fullstack Engineer", "Frontend Engineer", "Backend Engineer", "Mobile Development"],
  // The two paragraphs under the hero heading, rendered in order.
  tagline:
    "I build web and mobile products end to end — the database schema, the secure API, and the interface people actually touch. Telehealth, school portals and payment systems, where a bug is somebody's appointment or somebody's money.",
  intro:
    "Two years of that has meant React, Next.js and React Native on the front, Node.js and Express over PostgreSQL or MongoDB behind, and JWT auth, role-based dashboards and Paystack instalment payments in between. I work remote, in code review, and I write about the parts that are easy to get wrong.",
  location: "Lagos, Nigeria",
  email: "hello@emmanuelebri.dev",
  whatsappNumber: "2348143782067",
  whatsappMessage: "Hi Emmanuel! I'm interested in working with you.",
  githubUsername: "emmybest19",
  calendlyUrl: "https://calendly.com/emmanuelonen50/30min",
  resumeFile: "/files/Emmanuel_Ebri_Resume.pdf", // TODO: drop your CV PDF at public/files/Emmanuel_Ebri_Resume.pdf
  socials: {
    github: "https://github.com/emmybest19",
    linkedin: "https://www.linkedin.com/in/emmanuel-ebri-9183a6243/",
  },
} as const;

/** True once calendlyUrl has been replaced with a real scheduling link. */
export const calendlyReady = !site.calendlyUrl.includes("your-username");

export const metrics = [
  { value: "2+", label: "Years shipping production software" },
  { value: "10+", label: "Web & mobile apps delivered" },
  { value: "4", label: "Industries: health, education, fintech, commerce" },
] as const;

export const emailjsConfig = {
  serviceId: "service_bjy0nmf",
  templateId: "template_3ord8qv",
  publicKey: "eV02hiApt2CmVncXJ",
} as const;
