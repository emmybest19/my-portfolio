import { Clock, PenLine } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

// TODO: replace with real articles (or wire up a CMS / MDX later)
const posts = [
  {
    title: "Server Components in Plain English",
    excerpt:
      "What actually runs on the server, what still needs the client and how this portfolio uses both to stay fast.",
    date: "Coming soon",
    readTime: "5 min read",
    tags: ["Next.js", "React"],
  },
  {
    title: "Taming State in Real-Time React Apps",
    excerpt:
      "Lessons from building a telemedicine platform: when Context is enough, when you need Zustand, and how to avoid prop-drilling pain.",
    date: "Coming soon",
    readTime: "7 min read",
    tags: ["React", "State Management"],
  },
  {
    title: "Role-Based Access Control Without the Headache",
    excerpt:
      "A practical pattern for JWT auth and protected routes across students, teachers and admins, straight from my school portal project.",
    date: "Coming soon",
    readTime: "6 min read",
    tags: ["Node.js", "Security"],
  },
];

export function Blog() {
  return (
    <section id="blog" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Blog"
          title="Notes from the trenches"
          description="Articles are on the way. Here's what I'm writing about."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/60"
            >
              <PenLine className="mb-4 h-6 w-6 text-accent" />
              <h3 className="mb-2 text-lg font-bold leading-snug">{post.title}</h3>
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
              <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {post.date} · {post.readTime}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
