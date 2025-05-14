import type React from "react"
import { cn } from "@/lib/utils"

interface FormSectionProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div>
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  )
}

interface FormRowProps {
  children: React.ReactNode
  className?: string
}

export function FormRow({ children, className }: FormRowProps) {
  return <div className={cn("grid gap-4 sm:grid-cols-2", className)}>{children}</div>
}

interface FormFieldProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

export function FormField({ children, className, fullWidth = false }: FormFieldProps) {
  return <div className={cn("space-y-2", fullWidth && "sm:col-span-2", className)}>{children}</div>
}
