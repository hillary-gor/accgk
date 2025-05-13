"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  // Get user role from metadata
  const userRole = user?.user_metadata?.role || "guest"

  // Define navigation items based on user role
  const navItems = {
    caregiver: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/licenses", label: "Licenses" },
      { href: "/certifications", label: "Certifications" },
      { href: "/training", label: "Training" },
      { href: "/payments", label: "Payments" },
    ],
    institution: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/caregivers", label: "Caregivers" },
      { href: "/compliance", label: "Compliance" },
      { href: "/payments", label: "Payments" },
    ],
    admin: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/users", label: "Users" },
      { href: "/licenses", label: "Licenses" },
      { href: "/certifications", label: "Certifications" },
      { href: "/payments", label: "Payments" },
      { href: "/reports", label: "Reports" },
    ],
    assessor: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/assessments", label: "Assessments" },
      { href: "/schedule", label: "Schedule" },
      { href: "/reports", label: "Reports" },
    ],
    trainer: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/programs", label: "Programs" },
      { href: "/participants", label: "Participants" },
      { href: "/reports", label: "Reports" },
    ],
    guest: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
  }

  // Get navigation items for the current user role
  const items = navItems[userRole as keyof typeof navItems] || navItems.guest

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary" : "text-muted-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
