"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HomeIcon,
  UsersIcon,
  ClipboardIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Dashboard", href: "/dashboard/admin", icon: HomeIcon },
  { name: "Users", href: "/dashboard/admin/users", icon: UsersIcon },
  {
    name: "Applications",
    href: "/dashboard/admin/applications",
    icon: ClipboardIcon,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed md:relative">
      {/* Mobile Toggle Button */}
      <button className="md:hidden p-4" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`space-y-4 p-4 md:block ${isOpen ? "block" : "hidden"}`}>
        {navLinks.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className="flex items-center p-2 rounded-lg hover:bg-gray-700"
          >
            <Icon className="w-6 h-6 mr-3" />
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
