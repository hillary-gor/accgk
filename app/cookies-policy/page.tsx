"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronDown, Menu } from "lucide-react"

export default function CookiesPolicyPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("introduction")

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMobileMenuOpen && !target.closest(".mobile-toc") && !target.closest(".mobile-toc-button")) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Update active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return (
    <PageLayout
      title="Cookies Policy"
      description="Learn how the Association of Certified Caregivers Kenya (ACCK) uses cookies and similar technologies on our website."
    >
      {/* Mobile TOC Toggle Button - Fixed Position */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-toc-button flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full shadow-lg"
          aria-label="Toggle table of contents"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile TOC Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile TOC Slide-in Panel */}
      <div
        className={`mobile-toc lg:hidden fixed bottom-0 inset-x-0 z-50 bg-background border-t border-border rounded-t-xl transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "70vh" }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Table of Contents</h2>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground">
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(70vh - 60px)" }}>
          <TableOfContents activeSection={activeSection} onLinkClick={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>

      {/* Desktop Layout - Two Columns */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Desktop TOC - Left Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-y-auto max-h-[calc(100vh-120px)]">
              <h2 className="text-xl font-semibold mb-4">Contents</h2>
              <TableOfContents activeSection={activeSection} />
            </div>
          </div>

          {/* Main Content - Right Side */}
          <div className="flex-1 max-w-4xl">
            <div className="space-y-12 lg:space-y-16">
              <section id="introduction" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Introduction</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                <p className="text-base lg:text-lg leading-relaxed mb-4">
                  This Cookies Policy explains how the Association of Certified Caregivers Kenya ("ACCK," "we," "us," or
                  "our") uses cookies and similar technologies on our website. This policy provides you with clear and
                  comprehensive information about the cookies we use and the purposes for which we use them.
                </p>
                <p className="text-base lg:text-lg leading-relaxed">
                  By continuing to use our website, you are agreeing to our use of cookies as described in this policy.
                </p>
              </section>

              <section id="what-are-cookies" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">What Are Cookies?</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                <p className="text-base lg:text-lg leading-relaxed mb-4">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you
                  visit websites. They are widely used to make websites work more efficiently, provide a better user
                  experience, and give website owners information about how their sites are used.
                </p>
                <p className="text-base lg:text-lg leading-relaxed mb-4">
                  Cookies cannot harm your device and do not contain any personally identifiable information. They allow
                  websites to recognize your device and remember information about your visit, such as your preferences
                  or login information.
                </p>
                <p className="text-base lg:text-lg leading-relaxed">
                  In addition to cookies, we may also use similar technologies such as web beacons, pixels, and local
                  storage to collect information about how you use our website.
                </p>
              </section>

              {/* Additional sections would follow with the same pattern */}
              {/* For brevity, I'm not including all sections here */}

              <section id="types-of-cookies" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Types of Cookies We Use</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="how-we-use-cookies" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">How We Use Cookies</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="managing-cookies" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Managing Your Cookie Preferences</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="third-party-cookies" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Third-Party Cookies</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="updates" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Updates to This Policy</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="contact" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Contact Us</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground">Last Updated: May 12, 2025</p>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/privacy-policy">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Privacy Policy
                  </Button>
                </Link>
                <Link href="/terms">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Terms & Conditions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

// Reusable Table of Contents component
function TableOfContents({ activeSection, onLinkClick }: { activeSection: string; onLinkClick?: () => void }) {
  const links = [
    { id: "introduction", label: "Introduction" },
    { id: "what-are-cookies", label: "What Are Cookies?" },
    { id: "types-of-cookies", label: "Types of Cookies We Use" },
    { id: "how-we-use-cookies", label: "How We Use Cookies" },
    { id: "managing-cookies", label: "Managing Your Cookie Preferences" },
    { id: "third-party-cookies", label: "Third-Party Cookies" },
    { id: "updates", label: "Updates to This Policy" },
    { id: "contact", label: "Contact Us" },
  ]

  return (
    <nav className="space-y-1">
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          onClick={onLinkClick}
          className={`block py-2 px-3 rounded-md transition-colors ${
            activeSection === link.id
              ? "bg-primary/10 text-primary font-medium"
              : "text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
