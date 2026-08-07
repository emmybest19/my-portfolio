import { FaWhatsapp } from "react-icons/fa";
import { site } from "@/data/site";

type ProjectCtaProps = {
  /** Used to prefill the WhatsApp message, so the enquiry arrives with context. */
  projectTitle: string;
};

export function ProjectCta({ projectTitle }: ProjectCtaProps) {
  const message = `Hi Emmanuel! I just read your ${projectTitle} case study and I'd like to talk about building something similar.`;
  const href = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section className="mt-16 rounded-2xl border border-accent/30 bg-card p-8 text-center">
      <h2 className="text-2xl font-bold tracking-tight">
        Want something like this built?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
        Message me on WhatsApp and tell me what you have in mind. Your chat opens
        with the {projectTitle} case study already referenced, so we can skip
        straight to the details.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <FaWhatsapp className="h-5 w-5" /> Chat about this project
      </a>
      <p className="mt-3 text-xs text-muted-foreground">
        Usually replies same day · {site.location}
      </p>
    </section>
  );
}
