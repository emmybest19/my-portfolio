"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SectionHeading } from "@/components/section-heading";
import { projectCategories, projects, type Project } from "@/data/projects";

const tabs = ["Challenge", "Process", "Victory"] as const;
type Tab = (typeof tabs)[number];

function ProjectCard({ project }: { project: Project }) {
  const [tab, setTab] = useState<Tab>("Challenge");

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-accent/40">
      <Link
        href={`/projects/${project.id}`}
        className="group relative block aspect-[16/8] overflow-hidden border-b border-border"
      >
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl font-bold sm:text-2xl">
            <Link
              href={`/projects/${project.id}`}
              className="transition-colors hover:text-accent"
            >
              {project.title}
            </Link>
          </h3>
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
            {project.category}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.shortDescription}
        </p>

        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="h-3.5 w-3.5" /> {project.highlight}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2 rounded-lg border border-border p-1">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-accent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-4 min-h-28">
          {tab === "Challenge" && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.challenge}
            </p>
          )}
          {tab === "Process" && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.solution}
            </p>
          )}
          {tab === "Victory" && (
            <ul className="space-y-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <span aria-hidden className="mt-0.5 text-accent">
                    &#9656;
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-6 text-sm font-semibold">Tech Stack</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ArrowUpRight className="h-4 w-4" /> View Project
          </a>
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Full Case Study
          </Link>
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code`}
            className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2.5 transition-colors hover:border-accent hover:text-accent"
          >
            <FaGithub className="h-5 w-5" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [category, setCategory] = useState("All");

  const visible =
    category === "All"
      ? projects
      : projects.filter((p) => p.category === category);

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Work that solves real problems"
          description="Each project tells a story: the challenge, the process and the victory. Click through to explore each build."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                category === cat
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-10">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Want to build something great together?
          </h3>
          <p className="mt-3 text-muted-foreground">
            Tell me what you have in mind and let&apos;s make it real.
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Let&apos;s Build Something
          </Link>
        </div>
      </div>
    </section>
  );
}
