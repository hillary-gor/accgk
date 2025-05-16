import type React from "react"

interface PageLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export default function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <main className="min-h-screen">
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">{children}</div>
      </section>
    </main>
  )
}
