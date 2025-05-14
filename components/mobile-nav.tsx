"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"

interface MobileNavProps {
  className?: string
}

export function MobileNav({ className }: MobileNavProps) {
  const [open, setOpen] = useState(false)
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
      { href: "/profile", label: "Profile" },
      { href: "/settings", label: "Settings" },
      { href: "/help", label: "Help & Support" },
    ],
    institution: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/caregivers", label: "Caregivers" },
      { href: "/compliance", label: "Compliance" },
      { href: "/certifications", label: "Certifications" },
      { href: "/payments", label: "Payments" },
      { href: "/profile", label: "Profile" },
      { href: "/settings", label: "Settings" },
      { href: "/help", label: "Help & Support" },
    ],
    admin: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/users", label: "Users" },
      { href: "/licenses", label: "Licenses" },
      { href: "/certifications", label: "Certifications" },
      { href: "/training", label: "Training" },
      { href: "/payments", label: "Payments" },
      { href: "/reports", label: "Reports" },
      { href: "/settings", label: "Settings" },
    ],
    assessor: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/assessments", label: "Assessments" },
      { href: "/schedule", label: "Schedule" },
      { href: "/reports", label: "Reports" },
      { href: "/profile", label: "Profile" },
      { href: "/settings", label: "Settings" },
    ],
    trainer: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/programs", label: "Programs" },
      { href: "/participants", label: "Participants" },
      { href: "/schedule", label: "Schedule" },
      { href: "/reports", label: "Reports" },
      { href: "/profile", label: "Profile" },
      { href: "/settings", label: "Settings" },
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
    <div className={cn("md:hidden", className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] sm:w-[350px] pr-0">
          <SheetHeader className="px-4">
            <SheetTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">AC</span>
                </div>
                <span className="text-lg font-semibold">ACCGK</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 px-4">
            <nav className="flex flex-col space-y-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
