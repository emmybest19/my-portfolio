import Link from "next/link";
import { ArrowRight, Clock, PenLine } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { posts } from "@/data/blog";

export function Blog() {
  return (
    <section id="blog" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Blog"
          title="Notes from the trenches"
          description="Field notes on the things I have actually shipped, broken and fixed."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/60"
            >
              <PenLine className="mb-4 h-6 w-6 text-accent" />
              <h3 className="mb-2 text-lg font-bold leading-snug transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {post.readTime}
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-accent">
                  Read
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
