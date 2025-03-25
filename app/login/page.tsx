"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const supabase = getSupabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);

  // Handle cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  async function handleMagicLinkLogin(e: React.FormEvent) {
    e.preventDefault();
    if (cooldown > 0 || loading) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Check if user exists and fetch role
      const { data: user, error: fetchError } = await supabase
        .from("users")
        .select("email, role")
        .eq("email", email)
        .single();

      if (fetchError || !user) {
        setError("No account found. Please register.");
        setTimeout(() => router.push("/registration"), 2000);
        setLoading(false);
        return;
      }

      // Prevent multiple login attempts
      if (attempts >= 3) {
        setError("Too many login attempts. Try again later.");
        setCooldown(30); // Set 30-second cooldown
        setLoading(false);
        return;
      }

      // Send the magic link
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/auth-callback?role=${user.role}`,
        },
      });

      if (authError) throw authError;

      setMessage("Check your email for a magic link.");
      setAttempts((prev) => prev + 1);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Login with Magic Link
        </h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}

        <form onSubmit={handleMagicLinkLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            disabled={loading || cooldown > 0}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {cooldown > 0
              ? `Try again in ${cooldown}s`
              : loading
              ? "Sending Magic Link..."
              : "Send Magic Link"}
          </button>
        </form>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Joined ACCGk?{" "}
          <button
            onClick={() => router.push("/registration")}
            className="text-blue-500 hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}
