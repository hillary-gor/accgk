"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ResponsiveContainer } from "@/components/responsive-container"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ResponsiveContainer>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="block md:hidden">
              <SidebarTrigger />
            </div>
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">AC</span>
              </div>
              <span className="hidden text-lg font-semibold sm:inline-block">ACCGK</span>
            </Link>
            <div className="hidden md:block">
              <MainNav />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                  <div className="mt-6">
                    <MainNav className="flex flex-col space-y-3" />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <ModeToggle />
            {user ? (
              <UserNav />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/signin">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </ResponsiveContainer>
    </header>
  )
}
