"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
  }, [isMenuOpen])

  const navLinkStyles =
    "text-gray-700 font-medium px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Membership", href: "/membership" },
    { label: "Accreditation", href: "/accreditation" },
    { label: "Impact", href: "#impact" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    // removed: { label: "Get Involved", href: "/get-involved" },
  ]

  const moreLinks = [
    { label: "Partnerships", href: "/partnerships" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Licensing", href: "/licensing-certification" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies Policy", href: "/cookies-policy" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/institution-logos//accgk%20official%20logo.png?height=40&width=40"
            alt="ACCGK Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="font-bold text-xl text-[color:var(--accgk-blue)] hidden sm:inline-block">ACCGK</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className={navLinkStyles}>
              {label}
            </Link>
          ))}

          <div className="relative group">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              onBlur={() => setTimeout(() => setIsMoreOpen(false), 100)}
              className="text-gray-700 hover:text-[color:var(--accgk-blue)] font-medium flex items-center gap-1 px-2 py-1 rounded-md transition-colors duration-200"
            >
              More <ChevronDown className="w-4 h-4" />
            </button>
            {isMoreOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
                <div className="flex flex-col py-2">
                  {moreLinks.map(({ label, href }) => (
                    <Link key={href} href={href} className={navLinkStyles}>
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sign In */}
          <Link
            href="/auth/signin"
            className="text-gray-700 font-medium px-2 py-1 rounded-md hover:text-[color:var(--accgk-blue)] transition-colors"
          >
            Sign In
          </Link>

          {/* Register Button */}
          <Button className="bg-[color:var(--accgk-blue)] hover:bg-[color:var(--accgk-blue)]/90">
            <Link href="/membership" className="text-white">Register</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed top-0 right-0 bottom-0 z-50 w-4/5 max-w-sm bg-white shadow-lg p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className={navLinkStyles}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}

                {/* More section (collapsible) */}
                <div>
                  <button
                    onClick={() => setIsMoreOpen((prev) => !prev)}
                    className="flex items-center justify-between w-full font-medium text-gray-700 hover:text-[color:var(--accgk-blue)] px-2 py-1 rounded-md transition-colors duration-200"
                  >
                    More
                    <ChevronDown
                      className={`w-4 h-4 transform transition-transform ${
                        isMoreOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isMoreOpen && (
                    <div className="ml-2 mt-2 flex flex-col space-y-2">
                      {moreLinks.map(({ label, href }) => (
                        <Link
                          key={href}
                          href={href}
                          className={`${navLinkStyles} text-sm`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sign In and Register */}
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-gray-700 hover:text-[color:var(--accgk-blue)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>

                <Button
                  className="bg-[color:var(--accgk-blue)] hover:bg-[color:var(--accgk-blue)]/90 text-white"
                  onClick={() => setIsMenuOpen(false)}
                  asChild
                >
                  <Link href="/membership">Register</Link>
                </Button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
