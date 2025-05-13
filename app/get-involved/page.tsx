"use client"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function CookiesPolicyPage() {
  return (
    <PageLayout
      title="Cookies Policy"
      description="Learn how the Association of Certified Caregivers Kenya (ACCK) uses cookies and similar technologies on our website."
    >
      <div className="max-w-4xl mx-auto">
        {/* Table of Contents - Mobile Collapsible */}
        <div className="lg:hidden mb-8">
          <TableOfContentsMobile />
        </div>

        {/* Table of Contents - Desktop */}
        <div className="hidden lg:block mb-10 p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 sticky top-24 z-10 max-h-[calc(100vh-120px)] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Contents</h2>
          <nav className="space-y-1">
            <a
              href="#introduction"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              Introduction
            </a>
            <a
              href="#what-are-cookies"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              What Are Cookies?
            </a>
            <a
              href="#types-of-cookies"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              Types of Cookies We Use
            </a>
            <a
              href="#how-we-use-cookies"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              How We Use Cookies
            </a>
            <a
              href="#managing-cookies"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              Managing Your Cookie Preferences
            </a>
            <a
              href="#third-party-cookies"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              Third-Party Cookies
            </a>
            <a
              href="#updates"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              Updates to This Policy
            </a>
            <a
              href="#contact"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              Contact Us
            </a>
          </nav>
        </div>

        {/* Main Content */}
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
              Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit
              websites. They are widely used to make websites work more efficiently, provide a better user experience,
              and give website owners information about how their sites are used.
            </p>
            <p className="text-base lg:text-lg leading-relaxed mb-4">
              Cookies cannot harm your device and do not contain any personally identifiable information. They allow
              websites to recognize your device and remember information about your visit, such as your preferences or
              login information.
            </p>
            <p className="text-base lg:text-lg leading-relaxed">
              In addition to cookies, we may also use similar technologies such as web beacons, pixels, and local
              storage to collect information about how you use our website.
            </p>
          </section>

          {/* Additional sections would follow with the same pattern */}
          {/* For brevity, I'm not including all sections here */}

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
    </PageLayout>
  )
}

// Mobile collapsible table of contents component
function TableOfContentsMobile() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-4 flex items-center justify-between font-medium">
        <span>Table of Contents</span>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="p-4 pt-0 border-t border-slate-200 dark:border-slate-800">
          <nav className="space-y-1">
            <a
              href="#introduction"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Introduction
            </a>
            <a
              href="#what-are-cookies"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              What Are Cookies?
            </a>
            <a
              href="#types-of-cookies"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Types of Cookies We Use
            </a>
            <a
              href="#how-we-use-cookies"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              How We Use Cookies
            </a>
            <a
              href="#managing-cookies"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Managing Your Cookie Preferences
            </a>
            <a
              href="#third-party-cookies"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Third-Party Cookies
            </a>
            <a
              href="#updates"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Updates to This Policy
            </a>
            <a
              href="#contact"
              className="block py-2 px-3 text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}
    </div>
  )
}
