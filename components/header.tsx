"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinkStyles =
    "text-gray-700 font-medium px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200";

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Membership", href: "/membership" },
    { label: "Accreditation", href: "/accreditation" },
    { label: "Impact", href: "#impact" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ];

  const moreLinks = [
    { label: "Partnerships", href: "/partnerships" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Licensing", href: "/licensing-certification" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies Policy", href: "/cookies-policy" },
  ];

  const accgkLogo = {
    url: "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/institution-logos//accgk%20official%20logo.png?height=40&width=40",
    alt: "Association of certified caregivers kenya",
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-1 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={accgkLogo.url}
            alt={accgkLogo.alt}
            width={50}
            height={50}
            className="object-cover w-auto h-15"
            unoptimized
          />
          <span className="font-bold text-xl text-[color:var(--accgk-blue)] hidden sm:inline-block">
            ACCGK
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className={navLinkStyles}>
              {label}
            </Link>
          ))}

          {/* More Dropdown */}
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

          {/* Sign In & Register */}
          <Link
            href="/auth/signin"
            className="text-blue-500 font-medium px-2 py-1 rounded-md hover:text-[color:var(--accgk-blue)] transition-colors"
          >
            Sign In
          </Link>

          <Button className="bg-[color:var(--accgk-blue)] hover:bg-[color:var(--accgk-blue)]/90">
            <Link href="/membership" className="text-white">
              Register
            </Link>
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
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 p-6 md:hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              className="self-end mb-4 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Links */}
            <div className="space-y-4">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-lg text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              <div className="border-t pt-4">
                {moreLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block text-lg text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div className="pt-4 space-y-2">
                <Link
                  href="/auth/signin"
                  className="block text-lg text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Button
                  className="w-full bg-[color:var(--accgk-blue)] hover:bg-[color:var(--accgk-blue)]/90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link
                    href="/membership"
                    className="text-white w-full text-center"
                  >
                    Register
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
