"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="ACCGK Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="font-bold text-xl text-accgk-blue hidden sm:inline-block">
            ACCGK
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="./about"
            className="text-gray-700 hover:text-accgk-blue font-medium"
          >
            About
          </Link>
          <Link
            href="./membership"
            className="text-gray-700 hover:text-accgk-blue font-medium"
          >
            Membership
          </Link>
          <Link
            href="#impact"
            className="text-gray-700 hover:text-accgk-blue font-medium"
          >
            Impact
          </Link>
          <Link
            href="#contact"
            className="text-gray-700 hover:text-accgk-blue font-medium"
          >
            Contact
          </Link>
          <Link
            href="/faq"
            className="text-gray-700 hover:text-accgk-blue font-medium"
          >
            FAQ
          </Link>
          <Link
            href="/get-involved"
            className="text-gray-700 hover:text-accgk-blue font-medium"
          >
            Get Involved
          </Link>
          {/* Dropdown for More */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-accgk-blue font-medium">
              More
            </button>
            <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-md rounded-md z-50">
              <div className="flex flex-col py-2">
                <Link
                  href="/partnerships"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Partnerships
                </Link>
                <Link
                  href="/success-stories"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Success Stories
                </Link>
                <Link
                  href="/licensing-certification"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Licensing
                </Link>
                <Link
                  href="/privacy-policy"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Privacy Policy
                </Link>
                <Link href="/terms" className="px-4 py-2 hover:bg-gray-100">
                  Terms
                </Link>
                <Link
                  href="/cookies-policy"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Cookies Policy
                </Link>
              </div>
            </div>
          </div>
          <Button className="bg-accgk-blue hover:bg-accgk-blue/90">
            Join ACCGK
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="#about"
              className="text-gray-700 hover:text-accgk-blue font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#focus-areas"
              className="text-gray-700 hover:text-accgk-blue font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Work
            </Link>
            <Link
              href="#impact"
              className="text-gray-700 hover:text-accgk-blue font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Impact
            </Link>
            <Link
              href="#contact"
              className="text-gray-700 hover:text-accgk-blue font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button
              className="bg-accgk-blue hover:bg-accgk-blue/90 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Join ACCGK
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
