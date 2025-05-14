"use client"

import type React from "react"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbsProps {
  homeHref?: string
  className?: string
  separator?: React.ReactNode
  transformLabel?: (segment: string) => string
  customSegments?: Record<string, string>
  omitSegments?: string[]
}

export function Breadcrumbs({
  homeHref = "/",
  className,
  separator = <ChevronRight className="h-4 w-4" />,
  transformLabel = (segment) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
  customSegments = {},
  omitSegments = [],
}: BreadcrumbsProps) {
  const pathname = usePathname()

  // Skip rendering if we're on the home page
  if (pathname === "/") return null

  // Split the pathname into segments
  const segments = pathname.split("/").filter(Boolean)

  // Filter out segments to omit
  const filteredSegments = segments.filter((segment) => !omitSegments.includes(segment))

  // If no segments left after filtering, don't render
  if (filteredSegments.length === 0) return null

  return (
    <nav className={cn("flex items-center text-sm", className)} aria-label="Breadcrumbs">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href={homeHref} className="flex items-center text-muted-foreground hover:text-foreground">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {filteredSegments.map((segment, index) => {
          // Build the href for this segment
          const href = `/${segments.slice(0, segments.indexOf(segment) + 1).join("/")}`

          // Determine if this is the last segment
          const isLastSegment = index === filteredSegments.length - 1

          // Get the label for this segment (custom or transformed)
          const label = customSegments[segment] || transformLabel(segment)

          return (
            <Fragment key={segment}>
              <li className="flex items-center text-muted-foreground">{separator}</li>
              <li>
                {isLastSegment ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {label}
                  </span>
                ) : (
                  <Link href={href} className="text-muted-foreground hover:text-foreground">
                    {label}
                  </Link>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
