"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  CalendarDays,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { calendlyReady, emailjsConfig, site } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [calendlySrc, setCalendlySrc] = useState<string | null>(null);

  // Calendly only renders inside an iframe when its embed params are present,
  // and embed_domain must match the page actually hosting it.
  useEffect(() => {
    setCalendlySrc(
      `${site.calendlyUrl}?embed_domain=${window.location.host}&embed_type=Inline`
    );
  }, []);

  const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    site.whatsappMessage
  )}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        { publicKey: emailjsConfig.publicKey }
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Want to build something extraordinary together?"
          description="Whether it's a health platform, an e-learning product or your next big idea, let's talk."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form + contact info */}
          <div className="space-y-6">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-border bg-card p-6"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1 block text-sm font-medium"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1 block text-sm font-medium"
                >
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1 block text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-y rounded-lg border border-border bg-input px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </button>
              {status === "sent" && (
                <p className="text-sm font-medium text-accent">
                  Message sent. I&apos;ll get back to you soon!
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-destructive">
                  Something went wrong. Please try again or reach me on WhatsApp.
                </p>
              )}
            </form>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/60"
              >
                <Mail className="h-5 w-5 text-accent" />
                <span className="truncate text-sm">{site.email}</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/60"
              >
                <MessageCircle className="h-5 w-5 text-accent" />
                <span className="text-sm">WhatsApp me</span>
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 sm:col-span-2">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-sm">{site.location}</span>
              </div>
            </div>
          </div>

          {/* Calendly */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-1 inline-flex items-center gap-2 text-lg font-bold">
              <CalendarDays className="h-5 w-5 text-accent" /> Book a free call
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Prefer to talk it through? Pick a time that works for you.
            </p>
            {calendlyReady && calendlySrc ? (
              <iframe
                src={calendlySrc}
                title="Schedule a call"
                className="min-h-130 w-full flex-1 rounded-xl border border-border bg-background"
              />
            ) : calendlyReady ? (
              <div className="min-h-130 w-full flex-1 rounded-xl border border-border bg-background" />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border p-10 text-center">
                <CalendarDays className="h-10 w-10 text-accent" />
                <p className="max-w-sm text-sm text-muted-foreground">
                  Online booking is on its way. For now, send a message with
                  the form or reach me on WhatsApp and we&apos;ll find a time
                  that suits you.
                </p>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Quick call with Emmanuel")}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Mail className="h-4 w-4" /> Suggest a time by email
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
