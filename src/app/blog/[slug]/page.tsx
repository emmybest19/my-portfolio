import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { getPost, posts, type BlogPost } from "@/data/blog";
import { assertNever } from "@/lib/assert-never";
import { ProjectImage } from "@/components/project-image";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}

/**
 * Renders the parsed body. Every block was validated at build by
 * `parseBlogBody`, so this only maps a known shape onto markup — and the
 * `assertNever` default means adding a block kind without handling it here
 * fails to compile.
 */
function BlogBody({ post }: { post: BlogPost }) {
  return post.body.map((block, index) => {
    switch (block.kind) {
      case "figure":
        return (
          <figure key={index} className="my-10">
            <ProjectImage
              src={post.figure.src}
              alt={post.figure.alt}
              width={post.figure.width}
              height={post.figure.height}
            />
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {post.figure.caption}
            </figcaption>
          </figure>
        );

      case "heading":
        return (
          <h2
            key={index}
            className="mt-12 mb-4 text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {block.text}
          </h2>
        );

      case "quote":
        return (
          <blockquote
            key={index}
            className="my-8 border-l-4 border-accent pl-5 text-lg font-medium italic leading-relaxed text-foreground"
          >
            {block.text}
          </blockquote>
        );

      case "paragraph":
        return (
          <p key={index} className="mb-5 leading-relaxed text-muted-foreground">
            {block.text}
          </p>
        );

      default:
        return assertNever(block, `blog body block in "${post.slug}"`);
    }
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6">
      <Link
        href="/#blog"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      <article className="animate-fade-in">
        <header>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.subtitle}</p>

          <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" /> {post.readTime}
          </p>

          {post.externalUrl && (
            <div className="mt-6">
              <a
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Read on the live blog <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}

          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <Image
              src={post.cover}
              alt={`${post.title} cover`}
              width={1920}
              height={1080}
              priority
              className="h-auto w-full"
            />
          </div>
        </header>

        <div className="mt-12">
          <BlogBody post={post} />
        </div>

        <footer className="mt-12 border-t border-border pt-6">
          <p className="text-sm italic text-muted-foreground">{post.signoff}</p>
        </footer>
      </article>
    </div>
  );
}
