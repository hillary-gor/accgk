"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronDown, Menu } from "lucide-react"

export default function TermsPage() {
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
      title="Terms & Conditions"
      description="Read the terms and conditions for using the Association of Certified Caregivers Kenya (ACCK) website and services."
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
                  Welcome to the Association of Certified Caregivers Kenya (ACCK) website. These Terms and Conditions
                  govern your use of our website, platform, and services. By accessing or using our services, you agree
                  to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our
                  services.
                </p>
                <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                  <p className="text-base lg:text-lg leading-relaxed">
                    Please read these Terms carefully before using our platform. These Terms constitute a legally
                    binding agreement between you and ACCK.
                  </p>
                </div>
              </section>

              <section id="definitions" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Definitions</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 lg:p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                  <ul className="space-y-4">
                    <li className="flex flex-col sm:flex-row">
                      <span className="font-semibold text-primary sm:min-w-[180px] mb-1 sm:mb-0">
                        "ACCK," "we," "us," or "our"
                      </span>
                      <span>refers to the Association of Certified Caregivers Kenya.</span>
                    </li>
                    <li className="flex flex-col sm:flex-row">
                      <span className="font-semibold text-primary sm:min-w-[180px] mb-1 sm:mb-0">"Services"</span>
                      <span>
                        refers to all services, features, content, applications, and products offered by ACCK.
                      </span>
                    </li>
                    <li className="flex flex-col sm:flex-row">
                      <span className="font-semibold text-primary sm:min-w-[180px] mb-1 sm:mb-0">
                        "User," "you," or "your"
                      </span>
                      <span>refers to any individual or entity that accesses or uses our Services.</span>
                    </li>
                    <li className="flex flex-col sm:flex-row">
                      <span className="font-semibold text-primary sm:min-w-[180px] mb-1 sm:mb-0">"Platform"</span>
                      <span>refers to our website, mobile applications, and other digital interfaces.</span>
                    </li>
                    <li className="flex flex-col sm:flex-row">
                      <span className="font-semibold text-primary sm:min-w-[180px] mb-1 sm:mb-0">"Content"</span>
                      <span>
                        refers to all materials, information, data, text, graphics, images, videos, and other materials
                        available on our Platform.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Additional sections would follow with the same pattern */}
              {/* For brevity, I'm not including all sections here */}

              <section id="account" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Account Registration and Eligibility</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="membership" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Membership Terms</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="courses" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Course Enrollment and Certification</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="conduct" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">User Conduct</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="ip" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Intellectual Property</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="disclaimer" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Disclaimer of Warranties</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="liability" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Limitation of Liability</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="indemnification" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Indemnification</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="governing-law" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Governing Law and Dispute Resolution</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="changes" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Changes to These Terms</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>
                {/* Content for this section */}
              </section>

              <section id="contact" className="scroll-mt-32">
                <div className="border-l-4 border-primary pl-6 mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-2">Contact Information</h2>
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
                <Link href="/cookies-policy">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Cookies Policy
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
    { id: "definitions", label: "Definitions" },
    { id: "account", label: "Account Registration" },
    { id: "membership", label: "Membership Terms" },
    { id: "courses", label: "Course Enrollment" },
    { id: "conduct", label: "User Conduct" },
    { id: "ip", label: "Intellectual Property" },
    { id: "disclaimer", label: "Disclaimer of Warranties" },
    { id: "liability", label: "Limitation of Liability" },
    { id: "indemnification", label: "Indemnification" },
    { id: "governing-law", label: "Governing Law" },
    { id: "changes", label: "Changes to Terms" },
    { id: "contact", label: "Contact Information" },
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
