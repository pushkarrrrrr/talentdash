import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/features/navigation";
import Footer from "@/components/features/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://talentdash.com'),
  title: {
    default: "TalentDash — Verified Tech Salaries & Compensation Table",
    template: "%s | TalentDash"
  },
  description: "Explore tech salaries, stock options, and total compensation across tech companies in India.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TalentDash — Verified Tech Salaries & Compensation Table",
    description: "Explore tech salaries, stock options, and total compensation across tech companies in India.",
    type: "website",
    locale: "en_IN",
    siteName: "TalentDash",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "TalentDash compensation explorer",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "TalentDash — Verified Tech Salaries & Compensation Table",
    description: "Explore tech salaries, stock options, and total compensation across tech companies in India.",
    images: ["/og-image.png"],
  }
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
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-sky-500/30 selection:text-sky-200">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-600 focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col w-full focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
