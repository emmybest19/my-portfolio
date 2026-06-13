import Image from "next/image";
import { Calendar, GraduationCap, Users } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { certificates, education, leadership } from "@/data/experience";

export function Education() {
  return (
    <section id="education" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Education & Certifications"
          title="Where I learned my craft"
        />

        <div className="mb-14 grid gap-6 md:grid-cols-2">
          {education.map((item) => (
            <div
              key={item.org}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <GraduationCap className="mb-4 h-8 w-8 text-accent" />
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {item.period}
              </p>
              <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
              <p className="text-sm font-medium text-accent">{item.org}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <h3 className="mb-6 text-center text-xl font-bold">Leadership</h3>
        <div className="mb-14 grid gap-6 md:grid-cols-2">
          {leadership.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <Users className="mb-4 h-8 w-8 text-accent" />
              <h4 className="text-lg font-bold">{item.title}</h4>
              <p className="text-sm font-medium text-accent">{item.org}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> {item.period}
              </p>
              <ul className="mt-3 space-y-2">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span aria-hidden className="mt-0.5 text-accent">
                      &#9656;
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="mb-6 text-center text-xl font-bold">Certifications</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {certificates.map((cert) => (
            <a
              key={cert.id}
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent/60"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={cert.file}
                  alt={`${cert.title} certificate`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="p-4 text-center text-sm font-medium text-muted-foreground">
                {cert.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
