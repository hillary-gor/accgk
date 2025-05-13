"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/institution-logos//accgk%20official%20logo.png"
                alt="ACCGK Logo"
                width={40}
                height={40}
                className="object-contain hover:scale-105 transition-transform duration-300"
              />
              <span className="font-bold text-xl text-white">ACCGK</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  Programs <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-gray-800 text-white">
                <DropdownMenuItem className="hover:bg-white/10">
                  <Link href="/programs/training" className="w-full">
                    Training & Workshops
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10">
                  <Link href="/programs/certification" className="w-full">
                    Certification
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10">
                  <Link href="/programs/mentorship" className="w-full">
                    Mentorship
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                >
                  Community <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 border-gray-800 text-white">
                <DropdownMenuItem className="hover:bg-white/10">
                  <Link href="/community/resources" className="w-full">
                    Resources
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10">
                  <Link href="/community/events" className="w-full">
                    Events
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-white/10">
                  <Link href="/community/forum" className="w-full">
                    Forum
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              asChild
            >
              <Link href="/about">About Us</Link>
            </Button>

            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              asChild
            >
              <Link href="/contact">Contact</Link>
            </Button>
          </nav>

          {/* Right Section: Mode Toggle, Get Involved Button */}
          <div className="flex items-center space-x-4">
            <ModeToggle />

            <Button
              className="bg-teal-600 text-white hover:bg-teal-700"
              asChild
            >
              <Link href="/get-involved">Get Involved</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-black/95 border-gray-800 text-white"
              >
                <div className="flex flex-col space-y-6 mt-8">
                  <Link
                    href="/programs/training"
                    className="text-lg font-medium"
                  >
                    Training & Workshops
                  </Link>
                  <Link
                    href="/programs/certification"
                    className="text-lg font-medium"
                  >
                    Certification
                  </Link>
                  <Link
                    href="/programs/mentorship"
                    className="text-lg font-medium"
                  >
                    Mentorship
                  </Link>
                  <Link
                    href="/community/resources"
                    className="text-lg font-medium"
                  >
                    Resources
                  </Link>
                  <Link
                    href="/community/events"
                    className="text-lg font-medium"
                  >
                    Events
                  </Link>
                  <Link href="/community/forum" className="text-lg font-medium">
                    Forum
                  </Link>
                  <Link href="/about" className="text-lg font-medium">
                    About Us
                  </Link>
                  <Link href="/contact" className="text-lg font-medium">
                    Contact
                  </Link>
                  <Button
                    className="bg-teal-600 text-white hover:bg-teal-700 mt-4"
                    asChild
                  >
                    <Link href="/get-involved">Get Involved</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
