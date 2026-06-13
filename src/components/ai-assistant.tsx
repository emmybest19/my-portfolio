"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { experience } from "@/data/experience";

type Message = { role: "user" | "bot"; text: string };

type Topic =
  | "contact"
  | "mobile"
  | "stack"
  | "experience"
  | "projects"
  | "resume"
  | "about"
  | "fallback";

const initialQuestions = [
  "What has Emmanuel built?",
  "What is his tech stack?",
  "Does he do mobile?",
  "How do I contact him?",
];

/** Follow-up suggestions that make sense after each topic. */
const followUps: Record<Topic, string[]> = {
  projects: [
    "Tell me about his experience",
    "What is his tech stack?",
    "How do I contact him?",
  ],
  stack: [
    "Does he do mobile?",
    "What has Emmanuel built?",
    "Where can I see his CV?",
  ],
  mobile: [
    "What has Emmanuel built?",
    "Tell me about his experience",
    "How do I contact him?",
  ],
  experience: [
    "What has Emmanuel built?",
    "Where can I see his CV?",
    "How do I contact him?",
  ],
  contact: [
    "What has Emmanuel built?",
    "Tell me about his experience",
    "Who is Emmanuel?",
  ],
  resume: [
    "Tell me about his experience",
    "What is his tech stack?",
    "How do I contact him?",
  ],
  about: [
    "What has Emmanuel built?",
    "What is his tech stack?",
    "How do I contact him?",
  ],
  fallback: [
    "What has Emmanuel built?",
    "Tell me about his experience",
    "How do I contact him?",
  ],
};

function getAnswer(question: string): { text: string; topic: Topic } {
  const q = question.toLowerCase();

  if (/(contact|email|reach|hire|phone|whatsapp|call|available)/.test(q)) {
    return {
      topic: "contact",
      text: `You can reach Emmanuel at ${site.email}, or on WhatsApp at +${site.whatsappNumber}. He is based in ${site.location} and is open to freelance work, collaborations and startup projects. The contact section below has a form too.`,
    };
  }

  if (/(mobile|react native|flutter|app store|android|ios)/.test(q)) {
    return {
      topic: "mobile",
      text: "Yes. Emmanuel builds mobile apps with React Native and Expo, and also works with Flutter. The Toac telemedicine platform has a React Native mobile interface serving 2,000+ users. Check the Skills section for his full mobile toolkit.",
    };
  }

  if (/(stack|skill|tech|tool|language|framework)/.test(q)) {
    const names = skillGroups.slice(0, 5).map((g) => g.title.toLowerCase());
    return {
      topic: "stack",
      text: `His toolkit covers ${names.join(", ")} and more. Day to day that means React, Next.js, TypeScript and TailwindCSS on the frontend, Node.js and Express with PostgreSQL or MongoDB on the backend, and AWS with Docker for deployment. The Skills section has the complete list.`,
    };
  }

  if (/(experience|job|work history|company|career)/.test(q)) {
    const jobs = experience
      .map((e) => `${e.title} at ${e.org} (${e.period})`)
      .join("; ");
    return {
      topic: "experience",
      text: `Emmanuel has 2+ years of professional experience: ${jobs}. Open any card in the Experience section to read the full story of each role.`,
    };
  }

  if (/(project|built|build|portfolio|case stud|made)/.test(q)) {
    const top = projects.slice(0, 3).map((p) => p.title).join(", ");
    return {
      topic: "projects",
      text: `His featured work includes ${top} and more. Highlights: a telemedicine platform serving 2,000+ users and an e-commerce store with a 98% checkout success rate. Every project in the Projects section has a full case study.`,
    };
  }

  if (/(cv|resume|download)/.test(q)) {
    return {
      topic: "resume",
      text: "His CV is right on this page. Scroll to the Resume section where you can read it in full, switch between the Fullstack and Frontend versions, and download the PDF.",
    };
  }

  if (/(who|about|emmanuel|background)/.test(q)) {
    return {
      topic: "about",
      text: `Emmanuel Ebri is a software engineer based in ${site.location} with 2+ years of experience building web and mobile applications across healthcare, education, fintech and e-commerce. He works across the whole stack, from the database to the last pixel.`,
    };
  }

  return {
    topic: "fallback",
    text: `Good question. I keep things simple here, so for anything I have not covered, the best move is to ask Emmanuel directly at ${site.email} or tap the WhatsApp button below. You can also explore the Projects and Experience sections for the full picture.`,
  };
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [asked, setAsked] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(initialQuestions);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I can answer quick questions about Emmanuel: his projects, stack, experience or how to reach him. What would you like to know?",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  const ask = (question: string) => {
    const text = question.trim();
    if (!text) return;

    const { text: answer, topic } = getAnswer(text);
    const nowAsked = [...asked, text];

    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "bot", text: answer },
    ]);
    setAsked(nowAsked);
    setSuggestions(
      followUps[topic]
        .filter((s) => !nowAsked.includes(s))
        .slice(0, 3)
    );
    setInput("");
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex max-h-[70vh] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:right-6">
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Bot className="h-4 w-4" /> Emmanuel&apos;s Assistant
            </p>
            <button
              type="button"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 transition-opacity hover:opacity-80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-input text-foreground"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-3">
              {suggestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => ask(question)}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              aria-label="Ask the assistant a question"
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
            />
            <button
              type="submit"
              aria-label="Send question"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? "Close assistant" : "Open assistant"}
        onClick={() => setOpen((v) => !v)}
        className="fab-ripple fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30 transition-transform hover:scale-110"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-7 w-7" />}
      </button>
    </>
  );
}
