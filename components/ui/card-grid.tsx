import type React from "react"
import { cn } from "@/lib/utils"

interface CardGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: string
}

export function CardGrid({ children, className, cols = { default: 1, sm: 2, lg: 3 }, gap = "gap-6" }: CardGridProps) {
  const getGridCols = () => {
    const colClasses = []

    colClasses.push(`grid-cols-${cols.default}`)
    if (cols.sm) colClasses.push(`sm:grid-cols-${cols.sm}`)
    if (cols.md) colClasses.push(`md:grid-cols-${cols.md}`)
    if (cols.lg) colClasses.push(`lg:grid-cols-${cols.lg}`)
    if (cols.xl) colClasses.push(`xl:grid-cols-${cols.xl}`)

    return colClasses.join(" ")
  }

  return <div className={cn("grid", getGridCols(), gap, className)}>{children}</div>
}
