"use client";

import { useState } from "react";
import { Briefcase, Calendar, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/data/experience";

const chapters = [
  { label: "The Challenge", key: "challenge" },
  { label: "The Process", key: "process" },
  { label: "The Victory", key: "victory" },
] as const;

export function Experience() {
  const [openId, setOpenId] = useState<number | null>(
    experience[0]?.id ?? null
  );

  return (
    <section id="experience" className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="My professional journey"
          description="Every role has been a chapter: new problems, new tools, new wins. Click on each experience to read the full story."
        />

        <div className="space-y-4">
          {experience.map((item) => {
            const open = openId === item.id;
            return (
              <article
                key={item.id}
                className={`rounded-2xl border bg-card transition-colors ${
                  open ? "border-accent/60" : "border-border hover:border-accent/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  aria-expanded={open}
                  className="flex w-full items-start justify-between gap-4 p-6 text-left"
                >
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold">
                      <Briefcase className="h-4 w-4 shrink-0 text-accent" />
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent">
                      {item.org}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {item.period}
                      </span>
                      <span className="rounded-full border border-border px-2.5 py-0.5 font-medium">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div className="space-y-5 border-t border-border px-6 pt-5 pb-6">
                    {chapters.map((chapter) => (
                      <div
                        key={chapter.key}
                        className="border-l-2 border-accent/40 pl-4"
                      >
                        <h4 className="font-semibold">{chapter.label}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {item[chapter.key]}
                        </p>
                      </div>
                    ))}

                    <div>
                      <p className="text-sm font-semibold">Technologies Used</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
