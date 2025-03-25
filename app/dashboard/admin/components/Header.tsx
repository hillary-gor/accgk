"use client";

import { useState, useRef, useEffect } from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>

      {/* Right Section: Notifications & Profile */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <BellIcon className="w-6 h-6 text-gray-700" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* Admin Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <UserCircleIcon className="w-8 h-8 text-gray-700" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 border border-gray-200">
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                Profile
              </button>
              <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
