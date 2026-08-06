/**
 * The canonical category list. `Project.category` is typed against it, so a
 * typo ("Health tech") is a compile error rather than a project that quietly
 * gets its own filter pill and appears under nothing else.
 */
export const CATEGORIES = [
  "Health Tech",
  "E-commerce",
  "Education",
  "Fintech",
  "E-learning",
  "Personal Project",
] as const;

export type ProjectCategory = (typeof CATEGORIES)[number];

/** What the filter row renders: the categories plus the "show everything" option. */
export const projectCategories = ["All", ...CATEGORIES] as const;
export type CategoryFilter = (typeof projectCategories)[number];

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  shortDescription: string;
  /** Outcome line shown as the highlight badge on the project card. */
  highlight: string;
  image: string;
  tech: string[];
  live: string;
  code: string;
  challenge: string;
  solution: string;
  features: string[];
};

export const projects: Project[] = [
  {
    id: "telemedicine-app",
    title: "Telemedicine App",
    category: "Health Tech",
    shortDescription:
      "A secure telemedicine platform connecting patients and healthcare providers through real-time video, chat, and digital prescriptions.",
    description:
      "A secure, scalable telemedicine platform designed to bridge the gap between patients and healthcare providers through real-time digital care. The system enables patients to book consultations, communicate with licensed practitioners via video, chat, or voice, access digital prescriptions, and manage health records seamlessly. Built with modern cloud infrastructure and real-time communication technologies, the platform ensures accessibility, affordability, and continuity of care, especially in underserved and remote regions.",
    highlight: "Serving 2,000+ users",
    image: "/assets/toac.png",
    tech: [
      "React",
      "React Native",
      "TailwindCSS",
      "Framer Motion",
      "React Router",
      "Axios",
      "React Context API",
      "React Hook Form",
    ],
    live: "https://toac-main-n5bt.vercel.app/",
    code: "https://github.com/Toacintl/TOAC-_main",
    challenge:
      "Managing complex state across multiple interactive components (real-time chat, video sessions, booking flows, and authentication) led to inconsistent UI updates and prop drilling as the application scaled.",
    solution:
      "I addressed this by leveraging React Context API with custom hooks to centralize shared state and logic, reducing prop drilling, improving component communication, and making the frontend more scalable and maintainable.",
    features: [
      "Secure authentication (JWT/OAuth)",
      "Profile management for both patients and doctors",
      "Real-time booking based on doctor availability",
      "Video and audio calls powered by WebRTC",
      "In-app chat for consultations and follow-ups",
      "Digital prescriptions and health record management",
    ],
  },
  {
    id: "tasteatfoods",
    title: "Tasteatfoods",
    category: "E-commerce",
    shortDescription:
      "A full-featured e-commerce platform with product catalog, cart, checkout and payment integration, carrying 50+ products across 6 categories.",
    description:
      "A complete e-commerce platform for a Nigerian food brand, covering the full buying journey from browsing to payment. Customers move through a catalog of 50+ products across 6 categories, build a cart and check out through an integrated payment flow. The build is tuned hard for speed: pages load in under 2 seconds and the site scores 95 on Lighthouse performance. A reusable component library underneath cut new-page build time by 40% and keeps the whole storefront consistent.",
    highlight: "98% checkout success rate",
    image: "/assets/tasteatfoods.png",
    tech: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    live: "https://tasteatfoods.com/",
    code: "https://github.com/emmybest19",
    challenge:
      "An online store earns trust in seconds. The catalog, cart and checkout had to feel fast and dependable, because every glitch at the payment step is a lost sale.",
    solution:
      "Built the storefront on Next.js and TypeScript with a reusable component library, then optimized relentlessly until pages loaded in under 2 seconds with a 95 Lighthouse performance score and the checkout held a 98% success rate across 200+ test orders.",
    features: [
      "Product catalog with 50+ products across 6 categories",
      "Cart and secure checkout with payment integration",
      "Order management handling 200+ test orders at a 98% success rate",
      "Sub-2 second page loads and a 95 Lighthouse performance score",
      "Reusable component library that cut new-page build time by 40%",
    ],
  },
  {
    id: "school-portal",
    title: "School Portal",
    category: "Education",
    shortDescription:
      "A full-stack student portal digitizing academic and administrative processes with role-based dashboards for students, teachers, and admins.",
    description:
      "A full-stack student school portal designed to digitize and streamline academic and administrative processes within educational institutions. The platform enables students and teachers to interact seamlessly through features such as course management, result tracking, and assignment submission. Built with a scalable architecture and secure access controls, the system ensures efficient data management and accessibility across devices, with real-time updates, automation, and role-based workflows.",
    highlight: "Secure role-based access for 3 user types", // TODO: replace with a measured outcome
    image: "/assets/portal.png",
    tech: [
      "React",
      "TailwindCSS",
      "Framer Motion",
      "Express.js",
      "Mongoose",
      "Axios",
      "JSON Web Token",
      "Cloudinary",
      "bcryptjs",
    ],
    live: "https://school-portal-taupe.vercel.app/",
    code: "https://github.com/emmybest19/student-portal-frontend",
    challenge:
      "Managing strict role-based access across students, teachers, and admins without exposing sensitive academic data or breaking user experience.",
    solution:
      "Implemented a secure role-based access control system using JWT authentication and protected routes, ensuring each user only accesses permitted resources while maintaining smooth navigation.",
    features: [
      "Role-based dashboards (Student, Admin)",
      "Secure authentication and authorization",
      "Student profile and academic record management",
      "Assignment upload and submission portal",
      "Responsive UI with smooth animations (Framer Motion)",
      "API-driven architecture for scalable data handling",
    ],
  },
  {
    id: "blingg-app",
    title: "Blingg App",
    category: "Fintech",
    shortDescription:
      "A high-conversion product website for a multi-functional app combining messaging, digital finance, crypto conversion, and group savings.",
    description:
      "A modern, high-conversion product website built to present a multi-functional application that brings together real-time messaging, digital financial services, cryptocurrency conversion, and group contribution systems into one cohesive platform. The website communicates the value of each feature through structured sections, interactive elements, and smooth user flows, with a strong focus on usability, performance, and visual storytelling.",
    highlight: "Cut bounce rate by 25%",
    image: "/assets/blingg.png",
    tech: [
      "React",
      "TailwindCSS",
      "Node.js",
      "Express",
      "AOS",
      "Framer Motion",
      "React Router",
    ],
    live: "https://blinggapp.com/",
    code: "https://github.com/emmybest19/telemedicine-app",
    challenge:
      "Balancing the presentation of multiple complex features (messaging, payments, crypto, and contributions) without overwhelming users or compromising clarity.",
    solution:
      "Designed a modular, intuitive UI with clear feature segmentation and smooth interactive flows, ensuring users can easily understand and navigate each core function.",
    features: [
      "Clean product showcase sections for each feature",
      "Interactive UI with smooth animations (Framer Motion)",
      "Responsive design for mobile and desktop",
      "Call-to-action sections optimized for user onboarding",
      "FAQ and support sections for user guidance",
    ],
  },
  {
    id: "e-briggs-app",
    title: "E-bringgs App",
    category: "E-learning",
    shortDescription:
      "A digital platform combining e-learning, real-time video/voice communication, and service booking with dashboards for every role.",
    description:
      "A full-featured digital platform designed to combine e-learning, real-time communication, and service booking into a single seamless experience. Users can enroll in courses, join live video and voice sessions, and track learning progress through a student dashboard, while clients book consultations and manage projects through a personalized client dashboard, and administrators oversee the entire system via a centralized admin panel.",
    highlight: "Live classes, booking & admin in one app", // TODO: replace with a measured outcome
    image: "/assets/ebrings.png",
    tech: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Express.js",
      "MongoDB",
      "WebRTC",
      "Zustand",
      "Socket.IO",
    ],
    live: "https://blinggapp.com/",
    code: "https://github.com/emmybest19/telemedicine-app",
    challenge:
      "Coordinating real-time video/voice communication, course management, and service booking within a single platform without performance issues or user confusion.",
    solution:
      "Adopted a modular architecture with optimized API handling and real-time technologies, ensuring smooth communication, efficient data flow, and a clear separation of user roles and functionalities.",
    features: [
      "User authentication and secure access control",
      "Live video and voice call integration for classes and consultations",
      "Booking system for web and mobile development services",
      "Admin panel for managing users, courses, and bookings",
      "Scalable backend architecture for handling multiple user activities simultaneously",
      "Responsive and interactive UI for seamless user experience",
    ],
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    category: "Personal Project",
    shortDescription:
      "The site you are reading right now. A server-rendered Next.js portfolio with a case study page for every project, two carefully built themes and a world map quietly behind it all.",
    description:
      "The site you are looking at right now. Built on Next.js 16 with React Server Components, it renders almost everything on the server, so pages arrive fast and search engines read every word. Every project gets its own case study page generated from typed data files, which means adding new work never touches layout code. The design runs on a navy and bronze palette with a warm ivory light mode, and an accent-tinted world map sits behind every section as the site's signature texture.",
    highlight: "Server-rendered, client JS only where it counts",
    image: "/assets/portfolio-v2.png",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "TailwindCSS v4",
      "next-themes",
      "EmailJS",
    ],
    live: "https://ebri-emmanuel-portfolio.vercel.app/",
    code: "https://github.com/emmybest19/portfolio",
    challenge:
      "A portfolio has one job, selling the developer, and most fail because they look like every other template. This one had to look distinct, load fast and stay honest about what I can actually do.",
    solution:
      "I rebuilt it from scratch on Next.js 16 with server components, moved all content into typed data files and designed a navy and bronze identity instead of the usual template blue. What you see is the result, and the code behind it is part of the pitch.",
    features: [
      "Server components by default, client JavaScript only where it earns its place",
      "A full case study page for every project, generated from typed data",
      "Navy and bronze theme with light and dark modes built as equals",
      "Scroll-aware navigation that highlights the section you are reading",
      "Long-form engineering articles, each with its own generated article page",
      "Contact form wired to EmailJS, no backend required",
    ],
  },
];

