"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HomeIcon,
  UserIcon,
  CalendarIcon,
  AcademicCapIcon,
  QuestionMarkCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Define Caregiver Navigation Links
const navLinks = [
  { name: "Dashboard", href: "/dashboard/caregiver", icon: HomeIcon },
  { name: "Profile", href: "/dashboard/caregiver/profile", icon: UserIcon },
  { name: "Appointments", href: "/dashboard/caregiver/appointments", icon: CalendarIcon },
  { name: "Training & Certifications", href: "/dashboard/caregiver/training", icon: AcademicCapIcon },
  { name: "Support", href: "/dashboard/caregiver/support", icon: QuestionMarkCircleIcon },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen w-64 bg-blue-900 text-white fixed md:relative shadow-lg">
      {/* Mobile Toggle Button */}
      <button className="md:hidden p-4" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`space-y-2 p-4 md:block ${isOpen ? "block" : "hidden"}`}>
        {navLinks.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition"
          >
            <Icon className="w-6 h-6 mr-3" />
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
