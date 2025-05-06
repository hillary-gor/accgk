import * as React from "react"
import { cn } from "@/lib/utils"

type Orientation = "horizontal" | "vertical"

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: Orientation
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      data-orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  )
)

Separator.displayName = "Separator"

export { Separator }
