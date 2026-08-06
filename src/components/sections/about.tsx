import { SectionHeading } from "@/components/section-heading";
import { metrics, site } from "@/data/site";

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
            <strong className="text-foreground">full stack developer</strong>{" "}
            based in {site.location} with <Gold>2+ years</Gold> building web and
            mobile products end to end. I design the database schema, build and
            secure the API, then write the interface that sits on top of it.
            React, Next.js and React Native on the front, Node.js and Express
            over PostgreSQL or MongoDB behind.
          </p>
          <p>
            I came to engineering from <Gold>public health</Gold>. I finished a
            B.Sc. at the University of Calabar and led the National Association
            of Public Health Students before I wrote code for a living, and the
            platform I work on now is a telehealth product connecting patients
            to counsellors. Knowing what a missed appointment actually costs
            someone changes how carefully you build a booking flow.
          </p>
          <p>
            Since then the work has spread across{" "}
            <strong className="text-foreground">
              healthcare, education, fintech and e-commerce
            </strong>
            . Role-based dashboards behind JWT and email OTP. A three-app
            monorepo sharing six internal packages across three portals, which
            cut duplicated code by 60%. Paystack instalment payments with
            idempotent webhooks, because a confirmation that arrives twice
            should still only charge once. Different domains, same standard:{" "}
            <Gold>secure, fast and obvious the first time you use it</Gold>.
          </p>
          <p>
            I work remote and Agile, in code review and pairing, and I put tests
            on the things that cost money or trust when they break. I also{" "}
            <Gold>write</Gold> about the parts that are easy to get wrong:
            reviewing code you did not write, idempotency, error messages that
            tell users the truth about their money. Most of that was learned by
            shipping something that broke first.
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
