"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, FileText } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/data/site";

// To add a new CV variant (e.g. Backend, Mobile): drop the PDF in public/files,
// regenerate its page images into public/assets/resume, then add an entry here.
const resumes = [
  {
    key: "fullstack",
    label: "Fullstack",
    title: "Fullstack Software Developer",
    file: "/files/Emmanuel_Ebri_Resume.pdf",
    pages: [
      "/assets/resume/full_1.jpg",
      "/assets/resume/full_2.jpg",
      "/assets/resume/full_3.jpg",
    ],
  },
  {
    key: "frontend",
    label: "Frontend",
    title: "Frontend Developer",
    file: "/files/Emmanuel_Ebri_Frontend_Resume.pdf",
    pages: [
      "/assets/resume/frontend-page-1.png",
      "/assets/resume/frontend-page-2.png",
    ],
  },
  {
    key: "mobile",
    label: "Mobile",
    title: "Mobile Developer",
    // TODO: drop the mobile CV PDF in public/files and add its page images here
    file: "",
    pages: [],
  },
];

export function Resume() {
  const [activeKey, setActiveKey] = useState(resumes[0].key);
  const active = resumes.find((r) => r.key === activeKey) ?? resumes[0];

  return (
    <section id="resume" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Resume"
          title="Read my CV right here"
          description="Pick the version that fits the role you are hiring for, read it on the spot and take a copy with you."
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {resumes.map((resume) => (
            <button
              key={resume.key}
              type="button"
              onClick={() => setActiveKey(resume.key)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                activeKey === resume.key
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {resume.label}
            </button>
          ))}
        </div>

        {active.pages.length > 0 ? (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                  <FileText className="h-5 w-5 text-accent" />
                </span>
                <div>
                  <h3 className="font-bold">
                    {site.name} - {active.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    PDF format, updated regularly.
                  </p>
                </div>
              </div>
              <a
                href={active.file}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" /> Download
              </a>
            </div>

            <div className="space-y-6">
              {active.pages.map((src, i) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-xl border border-border bg-white shadow-lg"
                >
                  <Image
                    src={src}
                    alt={`${site.name} ${active.label} resume, page ${i + 1}`}
                    width={1190}
                    height={1683}
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Prefer the file itself?{" "}
              <a
                href={active.file}
                download
                className="text-accent hover:underline"
              >
                Download the {active.label} PDF.
              </a>
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
              <FileText className="h-7 w-7 text-accent" />
            </span>
            <div>
              <h3 className="font-bold">The {active.label} CV is in the works</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                It will live here soon. In the meantime the Fullstack version
                covers my {active.label.toLowerCase()} experience too.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveKey(resumes[0].key)}
              className="inline-flex items-center gap-2 rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View the Fullstack CV
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
