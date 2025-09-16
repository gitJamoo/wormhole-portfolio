import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContactButton from "./components/contact/ContactButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "James Smith Portfolio",
  description: "James Smith Wormhole Portfolio",
  openGraph: {
    title: "James M. Smith - Wormhole Portfolio",
    description: "Machine Learning Engineer & Software Developer",
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
        <ContactButton />
      </body>
    </html>
  );
}
