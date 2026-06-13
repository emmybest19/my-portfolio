"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fab-ripple fixed bottom-42 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-card text-accent shadow-lg transition-all hover:bg-accent hover:text-accent-foreground"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}
