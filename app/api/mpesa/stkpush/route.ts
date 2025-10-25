import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/utils/supabase/server";
import { stkPushRequest } from "@/lib/mpesa/client";

export async function POST(req: Request) {
  try {
    const { user_id, phone, amount } = await req.json();

    if (!user_id || !phone || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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

    if (insertError || !payment) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create payment record" },
        { status: 500 }
      );
    }

    // Call M-PESA STK Push API
    const stkResponse = await stkPushRequest({
      phone,
      amount,
      accountReference: `PAY-${payment.id}`,
      transactionDesc: "Caregiver Registration",
    });

    if (!stkResponse?.CheckoutRequestID) {
      console.error("Invalid STK response:", stkResponse);
      return NextResponse.json(
        { error: "Invalid response from M-PESA" },
        { status: 502 }
      );
    }

    // Update payment record
    const { error: updateError } = await supabase
      .from("payments")
      .update({
        merchant_request_id: stkResponse.MerchantRequestID,
        checkout_request_id: stkResponse.CheckoutRequestID,
      })
      .eq("id", payment.id);

    if (updateError) console.error("Update error:", updateError);

    // Log event
    await supabase.from("payment_events").insert({
      payment_id: payment.id,
      type: "stk_push",
      payload: stkResponse,
    });

    // Return clean JSON always
    return NextResponse.json({
      success: true,
      message: "STK Push initiated successfully",
      checkout_request_id: stkResponse.CheckoutRequestID,
      merchant_request_id: stkResponse.MerchantRequestID,
    });
  } catch (error) {
    console.error("STK Push Error:", error);

    return NextResponse.json(
      { error: "Failed to initiate STK push", details: String(error) },
      { status: 500 }
    );
  }
}
