import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/data/testimonials";

function initials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="Testimonials & Endorsements"
          description="What colleagues and collaborators have to say about working together."
        />

        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="animate-marquee flex w-max gap-6 [animation-direction:reverse] hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <figure
                key={`${t.id}-${i}`}
                aria-hidden={i >= testimonials.length}
                className="flex w-80 flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/60 sm:w-[28rem]"
              >
                <figcaption className="flex items-center gap-3">
                  {t.image ? (
                    <Image
                      src={t.image}
                      alt={`${t.name} portrait`}
                      width={44}
                      height={44}
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent"
                    >
                      {initials(t.name)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{t.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {t.role} &middot; {t.company}
                    </p>
                  </div>
                </figcaption>
                <blockquote className="mt-4 flex-1 border-l-2 border-accent pl-4 text-sm italic leading-relaxed text-card-foreground">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                {t.linkedin && (
                  <a
                    href={t.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
                  >
                    <FaLinkedin className="h-4 w-4" /> View Profile
                  </a>
                )}
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
