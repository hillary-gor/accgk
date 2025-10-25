"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getPaymentDetails } from "./actions";

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  membership_title: string;
}

export default function PaymentPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPaymentDetails();
        setUser(data.user);
        setPhone(data.user.phone);
        setAmount(data.total);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(err);
        }
        toast.error("Failed to load payment details");
      }
    })();
  }, []);

  function normalizePhone(p: string): string {
    let s = p.replace(/\s+/g, "");
    if (s.startsWith("0")) s = "254" + s.slice(1);
    if (!s.startsWith("254")) s = "254" + s;
    return s;
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || !user) return toast.error("Payment info not ready.");

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
      if (!resp.ok) throw new Error(json?.error || "Payment failed");

      toast.success("STK push sent. Check your phone and enter PIN.");
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
      toast.error("Failed to send payment request");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">Membership Payment</h1>

        {!user ? (
          <p className="text-gray-500">Loading payment details...</p>
        ) : (
          <form
            onSubmit={handlePay}
            className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
          >
            <div>
              <p className="font-medium text-gray-800">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-sm text-gray-500">
                Membership Type: {user.membership_title}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">Amount (KES)</label>
              <input
                type="number"
                value={amount ?? ""}
                readOnly
                className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
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
        )}
      </div>
    </div>
  );
}
