import { NextResponse } from "next/server"
import { processSTKPushCallback } from "@/lib/mpesa-service"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const callbackData = await request.json()

    // Process the callback data
    const result = processSTKPushCallback(callbackData)

    if (result.success) {
      // Payment was successful, update the payment record
      const { data: payments, error: paymentsError } = await supabase
        .from("payments")
        .select("*")
        .eq("transaction_id", result.checkoutRequestID)
        .single()

      if (paymentsError) {
        console.error("Error fetching payment:", paymentsError)
        return NextResponse.json({ success: false, error: "Payment record not found" }, { status: 404 })
      }

      // Update payment status
      const { error: updateError } = await supabase
        .from("payments")
        .update({
          status: "completed",
          transaction_id: result.mpesaReceiptNumber,
          updated_at: new Date().toISOString(),
        })
        .eq("id", payments.id)

      if (updateError) {
        console.error("Error updating payment:", updateError)
        return NextResponse.json({ success: false, error: "Failed to update payment" }, { status: 500 })
      }

      // If this is a license payment, update the license status
      if (payments.payment_type === "license") {
        const { error: licenseError } = await supabase
          .from("licenses")
          .update({
            status: "pending", // Still pending admin approval
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", payments.user_id)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(1)

        if (licenseError) {
          console.error("Error updating license:", licenseError)
        }
      }

      // If this is a certification payment, update the certification status
      if (payments.payment_type === "certification") {
        const { error: certError } = await supabase
          .from("certifications")
          .update({
            status: "pending", // Still pending admin approval
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", payments.user_id)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(1)

        if (certError) {
          console.error("Error updating certification:", certError)
        }
      }

      return NextResponse.json({ success: true })
    } else {
      // Payment failed, update the payment record
      const { data: payments, error: paymentsError } = await supabase
        .from("payments")
        .select("*")
        .eq("transaction_id", result.checkoutRequestID)
        .single()

      if (!paymentsError) {
        await supabase
          .from("payments")
          .update({
            status: "failed",
            updated_at: new Date().toISOString(),
          })
          .eq("id", payments.id)
      }

      return NextResponse.json({ success: false, error: result.resultDesc })
    }
  } catch (error) {
    console.error("Error processing MPesa callback:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
