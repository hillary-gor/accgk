"use client";
import { useState, useEffect } from "react";
import { handleAppeal } from "@/app/registration/process/handleAppeal";
import { getSupabaseServer } from "@/lib/supabase";
import { Button, Textarea } from "@/components/ui";

export default function AppealPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [appealReason, setAppealReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch authenticated user's email
  useEffect(() => {
    async function fetchUserEmail() {
      const supabase = await getSupabaseServer();
      const { data, error } = await supabase.auth.getUser();

      if (error) console.error("Error fetching user:", error);
      else setEmail(data?.user?.email || null);
    }

    fetchUserEmail();
  }, []);

  async function submitAppeal() {
    if (!email) return alert("Error: You must be logged in to submit an appeal.");
    if (!appealReason.trim()) return alert("Please provide a reason for your appeal.");

    setLoading(true);

    try {
      const res = await handleAppeal({ email, reason: appealReason });

      if (!res.success) throw new Error(res.message);

      alert("Appeal submitted! Our team will review your request.");
      setSubmitted(true);
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Appeal Rejection</h1>

      {email ? (
        !submitted ? (
          <>
            <p className="text-gray-700">You have reached the maximum resubmission limit.</p>
            <p className="text-gray-600">If you believe your rejection was incorrect, you can appeal below.</p>

            <Textarea
              placeholder="Enter your appeal reason..."
              value={appealReason}
              onChange={(e) => setAppealReason(e.target.value)}
              className="w-full mt-2"
            />

            <Button onClick={submitAppeal} disabled={loading} className="w-full mt-4">
              {loading ? "Submitting Appeal..." : "Submit Appeal"}
            </Button>
          </>
        ) : (
          <p className="text-green-600">Your appeal has been submitted. Please wait for a response.</p>
        )
      ) : (
        <p className="text-red-600">You must be logged in to submit an appeal.</p>
      )}
    </div>
  );
}
