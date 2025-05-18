"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-[color:var(--accgk-pink)] text-white py-2 px-4 text-center relative">
      <div className="container mx-auto">
        <p className="text-sm md:text-base font-medium">
          <span className="font-bold mr-2">IMPORTANT:</span> Registration for the 2023 Caregivers Conference is now
          open!{" "}
          <Link href="#" className="underline font-bold hover:text-white/90">
            Register today
          </Link>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-white/80"
          aria-label="Close announcement"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}
