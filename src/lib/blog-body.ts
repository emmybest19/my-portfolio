/**
 * Article bodies are authored as one string per post in `src/data/blog.ts`, in a
 * small markup: blocks separated by a blank line, `## ` for a section heading,
 * `> ` for a pull quote, `[figure]` for the post's code screenshot.
 *
 * That string is parsed here, once, at build time. The point of parsing it into
 * a discriminated union rather than branching on prefixes inside the renderer is
 * that every way of getting the markup wrong becomes a build failure instead of
 * a block that quietly renders as body text. `### Heading`, `>quote` with no
 * space, or a stray second `[figure]` used to render silently. Now they throw.
 */

export type BlogBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "figure" };

const FIGURE = "[figure]";

function fail(context: string, message: string, block: string): never {
  throw new Error(
    `Invalid article markup in "${context}": ${message}\n  block: ${JSON.stringify(
      block.slice(0, 80)
    )}`
  );
}

/**
 * @param raw     the authored body string
 * @param context the post slug, so a failure names the file to fix
 */
export function parseBlogBody(raw: string, context: string): BlogBlock[] {
  const blocks = raw
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) {
    throw new Error(`Invalid article markup in "${context}": body is empty`);
  }

  const parsed = blocks.map((block): BlogBlock => {
    if (block === FIGURE) {
      return { kind: "figure" };
    }

    // A figure marker with anything around it would be swallowed into a
    // paragraph and the screenshot would never render.
    if (block.includes(FIGURE)) {
      fail(context, `"${FIGURE}" must be alone in its block`, block);
    }

    if (block.startsWith("#")) {
      if (!block.startsWith("## ")) {
        fail(context, "headings must start with exactly '## '", block);
      }
      const text = block.slice(3).trim();
      if (!text) fail(context, "heading has no text", block);
      return { kind: "heading", text };
    }

    if (block.startsWith(">")) {
      if (!block.startsWith("> ")) {
        fail(context, "pull quotes must start with exactly '> '", block);
      }
      const text = block.slice(2).trim();
      if (!text) fail(context, "pull quote has no text", block);
      return { kind: "quote", text };
    }

    return { kind: "paragraph", text: block };
  });

  // Each post carries exactly one `figure`, so two markers would render the
  // same screenshot twice and zero would drop it entirely.
  const figures = parsed.filter((block) => block.kind === "figure").length;
  if (figures !== 1) {
    throw new Error(
      `Invalid article markup in "${context}": expected exactly one "${FIGURE}", found ${figures}`
    );
  }

  return parsed;
}
