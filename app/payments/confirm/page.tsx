"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { CheckCircle, XCircle } from "lucide-react"

export default function PaymentConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "completed" | "failed">("pending")
  const [paymentDetails, setPaymentDetails] = useState<any>(null)

  const reference = searchParams.get("reference")
  const type = searchParams.get("type")

  useEffect(() => {
    if (!reference) {
      toast({
        title: "Error",
        description: "Payment reference not found",
        variant: "destructive",
      })
      router.push("/dashboard")
      return
    }

    const checkPaymentStatus = async () => {
      try {
        const { data, error } = await supabase.from("payments").select("*").eq("transaction_id", reference).single()

        if (error) throw error

        setPaymentDetails(data)
        setPaymentStatus(data.status)
      } catch (error) {
        console.error("Error checking payment status:", error)
        toast({
          title: "Error",
          description: "Failed to check payment status",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    // Check payment status immediately
    checkPaymentStatus()

    // Then check every 5 seconds
    const interval = setInterval(() => {
      checkPaymentStatus()
    }, 5000)

    return () => clearInterval(interval)
  }, [reference, router, toast])

  const handleRetry = async () => {
    router.push(`/${type}/apply`)
  }

  const handleContinue = () => {
    router.push("/dashboard")
  }

  return (
    <DashboardShell>
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Payment {paymentStatus === "pending" ? "Processing" : paymentStatus}</CardTitle>
            <CardDescription>
              {paymentStatus === "pending"
                ? "We are processing your payment. This may take a few moments."
                : paymentStatus === "completed"
                  ? "Your payment has been successfully processed."
                  : "There was an issue with your payment."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <p>Checking payment status...</p>
              </div>
            ) : paymentStatus === "pending" ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <p>Waiting for M-Pesa payment confirmation</p>
                <p className="text-sm text-muted-foreground">
                  Please check your phone and enter your M-Pesa PIN to complete the payment
                </p>
              </div>
            ) : paymentStatus === "completed" ? (
              <div className="flex flex-col items-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <div className="text-center">
                  <p className="font-medium">Payment Successful</p>
                  <p className="text-sm text-muted-foreground">
                    Your payment of KES {paymentDetails?.amount.toFixed(2)} has been received
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <XCircle className="h-16 w-16 text-red-500" />
                <div className="text-center">
                  <p className="font-medium">Payment Failed</p>
                  <p className="text-sm text-muted-foreground">
                    There was an issue processing your payment. Please try again.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            {paymentStatus === "pending" ? (
              <p className="text-sm text-center text-muted-foreground">
                This page will automatically update when your payment is confirmed
              </p>
            ) : paymentStatus === "completed" ? (
              <Button onClick={handleContinue} className="w-full">
                Continue to Dashboard
              </Button>
            ) : (
              <Button onClick={handleRetry} className="w-full">
                Try Again
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
