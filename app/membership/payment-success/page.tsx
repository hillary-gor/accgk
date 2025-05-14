import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  return (
    <PageLayout
      title="Registration Complete"
      description="Your ACCK membership registration has been successfully processed."
    >
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful</CardTitle>
            <CardDescription>Your membership registration is now complete.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Transaction ID:</span>
                <span className="text-sm font-medium">
                  ACCK-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Payment Date:</span>
                <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Payment Method:</span>
                <span className="text-sm font-medium">M-Pesa</span>
              </div>
            </div>

            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                We've sent a confirmation email with your membership details and receipt to your registered email
                address.
              </p>
              <p className="text-sm text-muted-foreground">
                Your membership is now active, and you can access all member benefits.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Return to Homepage</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  )
}
