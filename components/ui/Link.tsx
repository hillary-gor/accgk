"use client"

import Link from "next/link"
import type { LinkProps } from "next/link"
import type { ReactNode } from "react"

interface StyledLinkProps extends LinkProps {
  children: ReactNode
  className?: string
}

export default function StyledLink({ children, className = "", ...props }: StyledLinkProps) {
  return (
    <Link
      {...props}
      className={`bg-[color:var(--accgk-blue)]/20 rounded-lg px-6 py-3 text-[color:var(--accgk-blue)] font-semibold hover:bg-[color:var(--accgk-blue)]/20 transition ${className}`}
    >
      {children}
    </Link>
  )
}
