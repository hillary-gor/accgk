import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Load font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Metadata for SEO, social sharing, and browser behavior
export const metadata: Metadata = {
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
  authors: [{ name: "ACCGK", url: "https://accgk.co.ke" }],
  creator: "ACCGK",
  generator: "v0.dev",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0F766E" },
    { media: "(prefers-color-scheme: dark)", color: "#134E4A" },
  ],
};

// Separate viewport config (as required by Next.js 13.4+ and 15+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <Toaster />
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
