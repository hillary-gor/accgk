import type React from "react";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata, Viewport } from "next"; 

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

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

// Separate viewport config
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h1>
                  {description && (
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
