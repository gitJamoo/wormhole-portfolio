import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContactButton from "./components/contact/ContactButton";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "James M. Smith — AI/Product Engineer",
  description:
    "James M. Smith is an AI/Product Engineer in San Francisco building production AI systems, agentic automation, and full-stack products. Home of the Wormhole — an AI-regenerated portfolio.",
  openGraph: {
    title: "James M. Smith — AI/Product Engineer",
    description:
      "James M. Smith is an AI/Product Engineer in San Francisco building production AI systems, agentic automation, and full-stack products. Home of the Wormhole — an AI-regenerated portfolio.",
    url: "https://j-m-s.dev",
    siteName: "James M. Smith",
    images: [
      {
        url: "/image-assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "James M. Smith Portfolio OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "James M. Smith — AI/Product Engineer",
    description:
      "James M. Smith is an AI/Product Engineer in San Francisco building production AI systems, agentic automation, and full-stack products. Home of the Wormhole — an AI-regenerated portfolio.",
    images: ["/image-assets/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <ContactButton />
      </body>
    </html>
  );
}
