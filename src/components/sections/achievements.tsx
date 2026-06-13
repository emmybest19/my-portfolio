import { Award, HeartPulse, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

// TODO: replace with real achievements (hackathons, awards, milestones)
const achievements = [
  {
    icon: HeartPulse,
    title: "Health Tech Impact",
    description:
      "Built a production telemedicine platform connecting patients with licensed practitioners through video, chat, and digital prescriptions.",
  },
  {
    icon: Rocket,
    title: "Career Switch Done Right",
    description:
      "Transitioned from public health science into software engineering and shipped production full-stack apps within my first two years.",
  },
  {
    icon: Award,
    title: "Certified Builder",
    description:
      "Earned certifications in full-stack development, Next.js, API development, and AI-driven development while delivering client work.",
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Achievements" title="Milestones I'm proud of" />

        <div className="grid gap-6 md:grid-cols-3">
          {achievements.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/60"
            >
              <item.icon className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
