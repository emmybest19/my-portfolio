"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { calendlyReady, site } from "@/data/site";

const bookCallProps = calendlyReady
  ? { href: site.calendlyUrl, target: "_blank", rel: "noopener noreferrer" }
  : { href: "/#contact" };

const navLinks = [
  { label: "About", href: "/#about", section: "about" },
  { label: "Projects", href: "/#projects", section: "projects" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "Resume", href: "/#resume", section: "resume" },
  { label: "Education", href: "/#education", section: "education" },
  // { label: "Blog", href: "/#blog", section: "blog" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = navLinks
      .map((link) => document.getElementById(link.section))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (section: string) =>
    pathname === "/"
      ? activeSection === section
      : section === "projects" && pathname.startsWith("/projects");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/assets/avatar.png"
            alt="Emmanuel Ebri"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover ring-1 ring-border"
          />
          <span className="font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm transition-colors hover:text-accent ${
                isActive(link.section)
                  ? "text-accent after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-accent"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            {...bookCallProps}
            className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <Phone className="h-4 w-4" /> Book a Call
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-card hover:text-accent ${
                    isActive(link.section)
                      ? "bg-card font-medium text-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                {...bookCallProps}
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                <Phone className="h-4 w-4" /> Book a Call
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
