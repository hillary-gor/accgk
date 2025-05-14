"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const membershipType = searchParams.get("type") || "caregiver"
  const router = useRouter()
  const { toast } = useToast()

  const [paymentMethod, setPaymentMethod] = useState("mpesa")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const amount = membershipType === "caregiver" ? "5,000" : "100,000"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    toast({
      title: "Payment initiated",
      description: "Please check your phone for the M-Pesa payment prompt.",
    })

    // Simulate successful payment after a delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Payment successful",
      description: "Your membership registration is now complete.",
    })

    // Redirect to success page
    router.push("/membership/payment-success")
  }

  return (
    <PageLayout
      title="Complete Your Registration"
      description="Make a payment to finalize your ACCK membership registration."
    >
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Complete your {membershipType === "caregiver" ? "caregiver" : "institution"} membership registration by
              making a payment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Membership Summary</h3>
                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex justify-between mb-2">
                      <span>Membership Type:</span>
                      <span className="font-medium">
                        {membershipType === "caregiver" ? "Individual Caregiver" : "Institution"}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Duration:</span>
                      <span className="font-medium">1 Year</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Amount:</span>
                      <span>KES {amount}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <Label htmlFor="mpesa" className="flex-1 cursor-pointer">
                        M-Pesa
                      </Label>
                      <div className="h-6 w-10 rounded bg-green-600"></div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 opacity-50">
                      <RadioGroupItem value="card" id="card" disabled />
                      <Label htmlFor="card" className="flex-1 cursor-not-allowed">
                        Credit/Debit Card (Coming Soon)
                      </Label>
                      <div className="h-6 w-10 rounded bg-blue-600"></div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 opacity-50">
                      <RadioGroupItem value="bank" id="bank" disabled />
                      <Label htmlFor="bank" className="flex-1 cursor-not-allowed">
                        Bank Transfer (Coming Soon)
                      </Label>
                      <div className="h-6 w-10 rounded bg-gray-600"></div>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === "mpesa" && (
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">M-Pesa Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      placeholder="e.g., 07XX XXX XXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the phone number registered with M-Pesa. You will receive a payment prompt on this number.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  disabled={isProcessing || !phoneNumber}
                >
                  {isProcessing ? "Processing Payment..." : `Pay KES ${amount}`}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start border-t pt-6">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium">Note:</span> Your membership will be activated once payment is confirmed.
              </p>
              <p>Need assistance? Contact our support team at payments@acck.org or call +254 700 000000.</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  )
}
