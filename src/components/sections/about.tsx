import { SectionHeading } from "@/components/section-heading";
import { metrics } from "@/data/site";

function Gold({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-accent">{children}</span>;
}

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="About Me" title="Who I am" />

        <div className="space-y-6 leading-relaxed text-muted-foreground">
          <p>
            Hello, I&apos;m <Gold>Emmanuel Ebri</Gold>, a{" "}
            <strong className="text-foreground">software engineer</strong>{" "}
            based in Port Harcourt, Nigeria with <Gold>2+ years</Gold>{" "}
            of experience building web applications end to end. I work across the whole stack, from the
            database to the last pixel, and I&apos;m just as comfortable
            designing an API as I am figuring out why a button feels wrong.
          </p>
          <p>
            My work cuts across{" "}
            <strong className="text-foreground">
              healthcare, education, fintech and e-commerce
            </strong>
            . I&apos;ve built a telemedicine platform, school management
            portals, online stores and dashboards that deal with real money.
            Different industries, same standard:{" "}
            <Gold>secure, fast and easy to use</Gold>.
          </p>
          <p>
            I&apos;m picky about the things users never see. Readable code,
            sensible architecture, APIs that hold up under pressure. Software
            has a way of rewarding whoever respects the details, so I&apos;d
            rather spend an extra hour today than hand you a problem next
            month.
          </p>
          <p>
            When I&apos;m not on client work I&apos;m usually deep in something
            new: tightening up an old project, testing a tool I haven&apos;t
            used before or building <Gold>mobile apps</Gold> to stretch what I
            can do. The web moves fast. I enjoy keeping pace with it.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-border bg-card p-4"
            >
              <p className="text-2xl font-bold text-accent">{metric.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
