import Image from "next/image";
import { site } from "@/data/site";

export function WhatsAppButton() {
  const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    site.whatsappMessage
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{ "--ripple-color": "#25d366" } as React.CSSProperties}
      className="fab-ripple fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg transition-transform hover:scale-110"
    >
      <Image
        src="/assets/icons/whatsapp.svg"
        alt=""
        width={48}
        height={48}
        className="h-12 w-12"
      />
    </a>
  );
}
