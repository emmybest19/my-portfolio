import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Lightbulb, Target } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data/projects";
import { ProjectImage } from "@/components/project-image";
import { ProjectCta } from "@/components/project-cta";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6">
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>

      <div className="animate-fade-in">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {project.category}
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Live Preview <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            <FaGithub className="h-4 w-4" /> Source Code
          </a>
        </div>

        <div className="mt-10">
          <ProjectImage src={project.image} alt={`${project.title} screenshot`} />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-3 inline-flex items-center gap-2 text-xl font-bold">
              <Target className="h-5 w-5 text-destructive" /> The Challenge
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {project.challenge}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-3 inline-flex items-center gap-2 text-xl font-bold">
              <Lightbulb className="h-5 w-5 text-accent" /> The Solution
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {project.solution}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Key Features</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                <span className="text-card-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <ProjectCta projectTitle={project.title} />
      </div>
    </div>
  );
}
