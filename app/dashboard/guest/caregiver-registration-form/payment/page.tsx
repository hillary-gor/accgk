"use client";

import { useState } from "react";
import { toast } from "sonner";

/**
 * Example user profile array you provided.
 * In production, load from Supabase session or `getServerSession`.
 */
const profileData = [
  {
    idx: 3,
    id: "f5f570d8-c5dc-4302-b4f6-fb04255282c1",
    first_name: "Shamita",
    last_name: "Makena",
    phone: "0703993363",
  },
];

export default function PaymentPage() {
  const user = profileData[0];
  const [method, setMethod] = useState<"mpesa">("mpesa");
  const [amount, setAmount] = useState<number>(100);
  const [phone, setPhone] = useState<string>(user.phone || "");
  const [loading, setLoading] = useState(false);

  // 🔹 Normalize phone: 07XXXXXXXX → 2547XXXXXXXX
  function normalizePhone(p: string): string {
    let s = p.replace(/\s+/g, "");
    if (s.startsWith("0")) s = "254" + s.slice(1);
    if (!s.startsWith("254")) s = "254" + s;
    return s;
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();

    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    const normalizedPhone = normalizePhone(phone);
    setLoading(true);

    try {
      const resp = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          phone: normalizedPhone,
          amount,
        }),
      });

      const json = await resp.json();

      if (!resp.ok) throw new Error(json?.error || "Payment request failed");

      toast.success(
        "STK push sent. Check your phone and enter M-PESA PIN to confirm."
      );
      console.log("STK Push response:", json);
    } catch (err) {
      console.error("Payment error:", err);
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to initiate payment. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">Payment</h1>
        <p className="text-sm text-gray-600 mb-6">
          Select a payment method and complete payment.
        </p>

        <form
          onSubmit={handlePay}
          className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
        >
          <div>
            <label className="text-sm font-medium">Payment Method</label>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setMethod("mpesa")}
                className={`px-4 py-2 rounded ${
                  method === "mpesa"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                M-PESA (STK Push)
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Amount (KES)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border rounded px-3 py-2 mt-1"
              min={1}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="07XXXXXXXX or 2547XXXXXXXX"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              We’ll send an STK push to this number.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded text-white transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending STK Push..." : "Pay with M-PESA"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
