import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/utils/supabase/server";
import { stkPushRequest } from "@/lib/mpesa/client";

export async function POST(req: Request) {
  try {
    const { user_id, phone, amount } = await req.json();
    const supabase = await getSupabaseServer();

    // Get M-PESA payment method
    const { data: method, error: methodError } = await supabase
      .from("payment_methods")
      .select("id")
      .eq("code", "mpesa")
      .single();

    if (methodError || !method) {
      console.error("Payment method not found:", methodError);
      return NextResponse.json(
        { error: "M-PESA payment method not configured" },
        { status: 400 }
      );
    }

    // Create new payment record
    const { data: payment, error: insertError } = await supabase
      .from("payments")
      .insert({
        user_id,
        payment_method_id: method.id,
        amount,
        phone,
        status: "pending",
      })
      .select()
      .single();

    if (insertError || !payment) throw insertError;

    // Call M-PESA Daraja STK Push API
    const stkResponse = await stkPushRequest({
      phone,
      amount,
      accountReference: `PAY-${payment.id}`,
      transactionDesc: "Caregiver Registration",
    });

    // Update payment record with M-PESA request IDs
    const { error: updateError } = await supabase
      .from("payments")
      .update({
        merchant_request_id: stkResponse.MerchantRequestID,
        checkout_request_id: stkResponse.CheckoutRequestID,
      })
      .eq("id", payment.id);

    if (updateError) console.error("Error updating payment:", updateError);

    // Log STK push event
    await supabase.from("payment_events").insert({
      payment_id: payment.id,
      type: "stk_push",
      payload: stkResponse,
    });

    return NextResponse.json({
      message: "STK Push initiated successfully",
      checkout_request_id: stkResponse.CheckoutRequestID,
      merchant_request_id: stkResponse.MerchantRequestID,
    });
  } catch (error) {
    console.error("STK Push Error:", error);
    return NextResponse.json(
      { error: "Failed to initiate STK push" },
      { status: 500 }
    );
  }
}
