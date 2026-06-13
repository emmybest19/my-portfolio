export type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  /** Path under /public, e.g. "/assets/testimonials/david.jpg". Leave empty to show initials. */
  image?: string;
  /** Full LinkedIn profile URL. Leave empty to hide the icon. */
  linkedin?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "David Okonkwo",
    role: "Project Manager",
    company: "TechStart",
    text: "Emmanuel delivered an outstanding e-commerce platform for our business. His attention to detail and ability to translate our vision into a functional, beautiful website exceeded our expectations.",
    image: "/assets/testimonials/david.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Startup Founder",
    company: "EduLearn",
    text: "Working with Emmanuel on our edu-tech landing page was a great experience. He brought creative ideas to the table and delivered a polished product on time.",
    image: "/assets/testimonials/sarah.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    id: 3,
    name: "Dr. Amina Bello",
    role: "Healthcare Consultant",
    company: "MedBridge",
    text: "Emmanuel's work on the telemedicine app showed his deep understanding of user needs in healthcare. The app is intuitive, accessible, and has been well-received by our team.",
    image: "/assets/testimonials/amina.jpg",
    linkedin: "https://www.linkedin.com/",
  },
];
