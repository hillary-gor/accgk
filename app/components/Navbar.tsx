"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/accgk_navbar_logo.svg";
import UserIcon from "@/public/assets/User.svg";
import Menu from "@/public/assets/Menu.svg";
import CloseIcon from "@/public/assets/arrow.png";

// Define user type
interface User {
  profileImage?: string;
  name?: string;
  email?: string;
}

const navLinks = [
  { name: "Membership", href: "/membership" },
  { name: "Courses & Certification", href: "../university/courses" },
  { name: "Community", href: "/community" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about_us" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage (client-side only)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser) as User);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setUser(null);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

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
            <Link
              key={index}
              href={item.href}
              className="text-[#0049AB] font-medium hover:text-blue-700"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Right Side: User Profile & Menu */}
      <div className="flex items-center gap-x-5">
        <Link
          href="../registration"
          className="hidden lg:block text-[#240449] font-medium pr-10 hover:text-gray-700"
        >
          Become a Member
        </Link>

        <div className="flex items-center gap-x-2">
          {user ? (
            <>
              <Image
                src={user.profileImage || UserIcon} // Use user's profile image if available
                alt="User Profile"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
              <button
                onClick={handleLogout}
                className="hidden font-medium text-red-600 lg:block hover:text-red-700"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Image src={UserIcon} alt="Default User" />
              <Link
                href="/login"
                className="hidden font-medium text-red-600 lg:block hover:text-red-700"
              >
                Sign in
              </Link>
            </>
          )}
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
            <Link
              key={index}
              href={item.href}
              className="text-2xl font-medium text-[#0049AB] hover:text-blue-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Conditional Authentication Links */}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="text-xl font-medium text-red-600 hover:text-red-700"
            >
              Sign out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xl font-medium text-red-600 hover:text-red-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="../registration"
                className="text-xl font-medium text-[#240449] hover:text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Become a Member
              </Link>
            </>
          )}

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
