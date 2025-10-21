import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "ACCGK - Association of Certified Caregivers Kenya",
    template: "%s | ACCGK",
  },
  description:
    "Licensing, certification, and training management platform for caregivers in Kenya",
  keywords: [
    "caregivers",
    "certification",
    "licensing",
    "training",
    "Kenya",
    "healthcare",
  ],
  authors: [{ name: "Hillary Gor", url: "https://github.com/hillary-gor" }],
  creator: "ACCGK",
  generator: "Hillary",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/accgk-logo-favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "ACCGK",
    description:
      "Licensing, certification, and training management platform for caregivers in Kenya",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    siteName: "ACCGK",
    images: [
      {
        url: "/accgk-full-logo.png",
        width: 1200,
        height: 630,
        alt: "ACCGK - Association of Certified Caregivers Kenya",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACCGK",
    description:
      "Licensing, certification, and training management platform for caregivers in Kenya",
    images: ["/accgk-full-logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0F766E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${firaCode.variable}`}
    >
      <head />
      <body className="min-h-screen flex flex-col antialiased bg-white text-gray-900">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
