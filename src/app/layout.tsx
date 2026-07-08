import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Anna Recommends",
    template: "%s | Anna Recommends",
  },
  description:
    "Curated city guides with my favourite restaurants, cafés, wellness spots, museums, design stores and hidden gems.",
  keywords: [
    "Barcelona guide",
    "Barcelona restaurants",
    "Barcelona coffee",
    "Travel guide",
    "Anna Recommends",
  ],
  authors: [{ name: "Anna Piątek" }],
  creator: "Anna Piątek",
  metadataBase: new URL("https://anaviernes.com"),
  openGraph: {
    title: "Anna Recommends",
    description:
      "Curated city guides with my favourite places around the world.",
    url: "https://anaviernes.com",
    siteName: "Anna Recommends",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anna Recommends",
    description:
      "Curated city guides with restaurants, cafés and hidden gems.",
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
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}