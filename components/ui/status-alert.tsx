import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

interface StatusAlertProps {
  title?: string
  description: string
  variant?: "default" | "success" | "error" | "warning" | "info"
  className?: string
}

export function StatusAlert({ title, description, variant = "default", className }: StatusAlertProps) {
  const getIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "error":
        return <XCircle className="h-4 w-4" />
      case "warning":
        return <AlertCircle className="h-4 w-4" />
      case "info":
        return <Info className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "border-green-500/50 text-green-500 [&>svg]:text-green-500"
      case "error":
        return "border-red-500/50 text-red-500 [&>svg]:text-red-500"
      case "warning":
        return "border-yellow-500/50 text-yellow-500 [&>svg]:text-yellow-500"
      case "info":
        return "border-blue-500/50 text-blue-500 [&>svg]:text-blue-500"
      default:
        return ""
    }
  }

  return (
    <Alert className={cn(getVariantClasses(), className)}>
      {getIcon()}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
