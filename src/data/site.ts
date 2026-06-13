export const site = {
  name: "Emmanuel Ebri",
  firstName: "Emmanuel",
  // Neutral title shown in the hero — covers frontend, backend, and fullstack roles
  title: "Software Engineer",
  roles: ["Fullstack Engineer", "Frontend Engineer", "Backend Engineer", "Mobile Development"],
  tagline:
    "Good software is invisible. People just notice that the page loads fast, the checkout works and nothing gets in their way. That's what I build.",
  location: "Lagos, Nigeria",
  email: "emmanuelonen50@gmail.com",
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
  { value: "2+", label: "Years building production web apps" },
  { value: "3", label: "Projects delivered end to end" },
  { value: "4+", label: "Industries served: health, edu, fintech" },
] as const;

export const emailjsConfig = {
  serviceId: "service_bjy0nmf",
  templateId: "template_3ord8qv",
  publicKey: "eV02hiApt2CmVncXJ",
} as const;
