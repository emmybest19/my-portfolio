
const clients = [
  "Zeta Technologies",
  "Upsywave Tech Company Ltd",
  "Toac International",
  // "Blingg",
  "Ebringgs Technologies",
  // "Tasteatfoods",
];

export function TrustedBy() {
  const marqueeItems = [...clients, ...clients];

  return (
    <section id="trusted" className="border-y border-border py-10">
      <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Trusted by teams I&apos;ve built with
      </p>
      <div className="relative overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-16 px-8">
          {marqueeItems.map((client, i) => (
            <span
              key={`${client}-${i}`}
              className="whitespace-nowrap text-lg font-semibold text-muted-foreground/70 transition-colors hover:text-accent"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
