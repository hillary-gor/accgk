import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "ACCGK - Association of Certified Caregivers Kenya",
    template: "%s | ACCGK",
  },
  description: "Licensing, certification, and training management platform for caregivers in Kenya",
  keywords: ["caregivers", "certification", "licensing", "training", "Kenya", "healthcare"],
  authors: [{ name: "ACCGK", url: "https://accgk.co.ke" }],
  creator: "ACCGK",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0F766E" },
    { media: "(prefers-color-scheme: dark)", color: "#134E4A" },
  ],
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {/* Navbar Component */}
            <Navbar />
            
            {/* Main Content */}
            <main>{children}</main>

            {/* Toaster for Notifications */}
            <Toaster />

            {/* Footer Component */}
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
