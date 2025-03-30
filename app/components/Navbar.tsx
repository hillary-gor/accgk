"use client"; // Ensure this runs on the client-side

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/accgk_navbar_logo.svg";
import User from "@/public/assets/User.svg";
import Menu from "@/public/assets/Menu.svg";
import CloseIcon from "@/public/assets/arrow.png"; // Add a close icon

const navLinks = [
  { name: "Membership", href: "/membership" },
  { name: "Courses & Certification", href: "../university/courses" },
  { name: "Community", href: "/community" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about_us" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between px-5 py-4 lg:container lg:mx-auto lg:px-20">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image src={Logo} alt="Logo" className="w-[100px] h-auto" priority />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex pl-10 gap-x-10">
          {navLinks.map((item, index) => (
            <Link key={index} href={item.href} className="text-[#0049AB] font-medium hover:text-blue-700">
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Right Side: User Profile & Menu */}
      <div className="flex items-center gap-x-5">
        <Link href="../registration" className="hidden lg:block text-[#240449] font-medium pr-10 hover:text-gray-700">
          Become a Member
        </Link>

        <div className="flex items-center gap-x-2">
          <Image src={User} alt="User Profile" />
          <Link href="/login" className="hidden font-medium text-red-600 lg:block hover:text-red-700">
            Sign in
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Image src={isMobileMenuOpen ? CloseIcon : Menu} alt="Menu Button" />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center gap-6 z-50">
          {navLinks.map((item, index) => (
            <Link key={index} href={item.href} className="text-2xl font-medium text-[#0049AB] hover:text-blue-700" onClick={() => setIsMobileMenuOpen(false)}>
              {item.name}
            </Link>
          ))}

          {/* Login & Signup Links for Mobile */}
          <Link href="/login" className="text-xl font-medium text-red-600 hover:text-red-700" onClick={() => setIsMobileMenuOpen(false)}>
            Sign in
          </Link>
          <Link href="../registration" className="text-xl font-medium text-[#240449] hover:text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
            Become a Member
          </Link>

          {/* Close Button */}
          <button 
            className="text-red-600 font-medium text-xl hover:text-red-700" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Close Menu
          </button>
        </div>
      )}
    </nav>
  );
}
