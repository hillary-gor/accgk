import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ACCGK - Association of Certified Caregivers Kenya",
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
}

export const viewport: Viewport = {
  themeColor: "#0F766E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head />
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
