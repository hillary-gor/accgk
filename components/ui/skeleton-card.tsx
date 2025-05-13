import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface SkeletonCardProps {
  className?: string
  hasHeader?: boolean
  hasFooter?: boolean
  headerHeight?: number
  contentItems?: number
  contentHeight?: number
  footerHeight?: number
}

export function SkeletonCard({
  className,
  hasHeader = true,
  hasFooter = false,
  headerHeight = 20,
  contentItems = 3,
  contentHeight = 20,
  footerHeight = 40,
}: SkeletonCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      {hasHeader && (
        <CardHeader className="gap-2">
          <Skeleton className={`h-${headerHeight} w-[80%]`} />
          <Skeleton className="h-4 w-[60%]" />
        </CardHeader>
      )}
      <CardContent className="flex flex-col gap-3">
        {Array.from({ length: contentItems }).map((_, i) => (
          <Skeleton key={i} className={`h-${contentHeight} w-full`} />
        ))}
      </CardContent>
      {hasFooter && (
        <CardFooter>
          <Skeleton className={`h-${footerHeight} w-full`} />
        </CardFooter>
      )}
    </Card>
  )
}
