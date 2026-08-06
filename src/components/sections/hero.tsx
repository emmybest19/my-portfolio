import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Mail, Star } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20">
      {/* Accent glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-200 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
        <div className="animate-slide-in-left">
          <p className="mb-3 font-mono text-sm text-accent">Hi, my name is</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {site.firstName}{" "}
            <span className="text-accent">
              {site.name.replace(`${site.firstName} `, "")}
            </span>
          </h1>
          <h2 className="mt-3 text-xl font-semibold text-muted-foreground sm:text-2xl">
            {site.title}
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground">{site.tagline}</p>
          <p className="mt-4 max-w-xl text-muted-foreground">{site.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              View My Work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-accent px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Let&apos;s Build Something
            </Link>
            <a
              href={site.resumeFile}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-8">
            {/* <p className="flex items-center gap-2 text-sm font-medium">
              <span className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </span>
              Trusted by 5+ growing companies & startups
            </p> */}
            <p className="mt-2 text-sm text-muted-foreground">
              Available for freelance, collaborations & startup projects.
            </p>
          </div>
        </div>

        <div className="animate-slide-in-right">
          <div className="relative mx-auto max-w-sm">
            <div className="animate-breathing overflow-hidden rounded-2xl border border-border">
              <Image
                src="/assets/hero-portrait.jpg"
                alt={`${site.name} portrait`}
                width={480}
                height={560}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
