"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, ChevronDown, Facebook, Twitter, Linkedin } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation items
  const navItems = [
    { label: "About", href: "/about" },
    { label: "Accreditation", href: "/accreditation" },
    { label: "Licensing & Certification", href: "/certification" },
    {
      label: "Community",
      href: "#",
      children: [
        { label: "Membership", href: "/membership" },
        { label: "Partnerships", href: "/partnerships" },
        { label: "News", href: "/news" },
        { label: "Success Stories", href: "/success-stories" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg?height=40&width=40&text=ACCGK"
              alt="ACCGK Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <span
              className={cn(
                "font-bold text-xl transition-colors",
                isScrolled ? "text-primary dark:text-white" : "text-primary dark:text-white",
              )}
            >
              ACCGK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => {
              // If the item has children, render a dropdown
              if (item.children) {
                return (
                  <DropdownMenu key={index}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "flex items-center text-sm font-medium transition-colors hover:text-primary",
                          isScrolled ? "text-gray-700 dark:text-gray-300" : "text-gray-700 dark:text-gray-300",
                        )}
                      >
                        {item.label} <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {item.children.map((child, childIndex) => (
                        <DropdownMenuItem key={childIndex} asChild>
                          <Link
                            href={child.href}
                            className={cn("w-full", pathname === child.href && "font-medium text-primary")}
                          >
                            {child.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }

              // Otherwise render a regular link
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-primary"
                      : isScrolled
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-700 dark:text-gray-300",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Section - CTA and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Button asChild className="hidden md:inline-flex bg-teal-600 hover:bg-teal-700 text-white">
              <Link href="/get-involved">Get Involved</Link>
            </Button>

            <ModeToggle />

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item, index) => {
                    // If the item has children, render the children as links
                    if (item.children) {
                      return (
                        <div key={index} className="space-y-3">
                          <h4 className="font-medium text-primary">{item.label}</h4>
                          <div className="pl-4 border-l border-gray-200 dark:border-gray-800 space-y-2">
                            {item.children.map((child, childIndex) => (
                              <Link
                                key={childIndex}
                                href={child.href}
                                className={cn(
                                  "block text-sm transition-colors hover:text-primary",
                                  pathname === child.href
                                    ? "text-primary font-medium"
                                    : "text-gray-700 dark:text-gray-300",
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    }

                    // Otherwise render a regular link
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-primary",
                          pathname === item.href ? "text-primary" : "text-gray-700 dark:text-gray-300",
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  })}

                  <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700 text-white">
                    <Link href="/get-involved" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Involved
                    </Link>
                  </Button>

                  {/* Social Links in Mobile Menu */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-3">Connect with us</h4>
                    <div className="flex space-x-4">
                      <Link
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary"
                      >
                        <Facebook className="h-5 w-5" />
                        <span className="sr-only">Facebook</span>
                      </Link>
                      <Link
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary"
                      >
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </Link>
                      <Link
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
