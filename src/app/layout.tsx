import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AiAssistant } from "@/components/ai-assistant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ebri-emmanuel-portfolio.vercel.app"),
  title: {
    default: "Emmanuel Ebri | Software Engineer",
    template: "%s | Emmanuel Ebri",
  },
  description:
    "Emmanuel Ebri is a software engineer who builds web applications for healthcare, education, fintech and e-commerce businesses.",
  openGraph: {
    title: "Emmanuel Ebri | Software Engineer",
    description:
      "Fullstack engineer building high-performance, scalable web applications.",
    images: ["/assets/hero-portrait.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* World map backdrop, visible through every section */}
        <div aria-hidden className="world-map-bg pointer-events-none fixed inset-0 -z-10" />
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
          <AiAssistant />
        </ThemeProvider>
      </body>
    </html>
  );
}
