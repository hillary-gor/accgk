import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await getSupabaseServer();
    const body = await req.json();

    console.log("Received M-PESA Callback:", JSON.stringify(body, null, 2));

    const callback = body?.Body?.stkCallback;
    if (!callback) {
      console.warn("Invalid M-PESA callback payload:", body);
      return NextResponse.json(
        { ok: false, error: "Invalid callback body" },
        { status: 400 }
      );
    }

    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } =
      callback;

    // Lookup the payment record
    const { data: payment, error: findError } = await supabase
      .from("payments")
      .select("id")
      .eq("checkout_request_id", CheckoutRequestID)
      .single();

    if (findError || !payment) {
      console.warn(
        "Payment not found for CheckoutRequestID:",
        CheckoutRequestID
      );
      return NextResponse.json({ ok: true });
    }

    // Extract MpesaReceiptNumber safely
    const receipt =
      CallbackMetadata?.Item?.find(
        (i: { Name: string; Value?: string | number }) =>
          i.Name === "MpesaReceiptNumber"
      )?.Value ?? null;

    // Update payment status in Supabase
    const { error: updateError } = await supabase
      .from("payments")
      .update({
        status: ResultCode === 0 ? "success" : "failed",
        result_code: ResultCode,
        result_desc: ResultDesc,
        mpesa_receipt_number: receipt,
        callback_metadata: CallbackMetadata ?? null,
      })
      .eq("id", payment.id);

    if (updateError) console.error("Supabase update failed:", updateError);

    // Log callback event
    await supabase.from("payment_events").insert({
      payment_id: payment.id,
      type: "callback",
      payload: body,
    });

    console.log("Callback processed successfully:", CheckoutRequestID);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error processing callback:", error);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 }
    );
  }
}
