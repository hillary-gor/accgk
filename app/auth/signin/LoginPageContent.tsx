// app/auth/login/page.tsx
"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import {
  loginWithEmailPassword,
  loginWithMagicLink,
  loginWithGoogle,
  loginWithGitHub,
  loginWithLinkedIn,
} from "./actions";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const logoUrl = "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/institution-logos//accgk%20official%20logo.png";
const illustrationUrl = "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//shanice-akinyi-illustration.JPG";

function Spinner({ text }: { text: string }) {
  return (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
      {text}
    </span>
  );
}

function SubmitButton({
  children,
  className,
  variant,
  loadingText = "Processing...",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "outline" | "ghost";
  loadingText?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={className}
      variant={variant}
      disabled={pending}
    >
      {pending ? <Spinner text={loadingText} /> : children}
    </Button>
  );
}

export default function LoginPageContent() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    const statusParam = searchParams.get("status");

    if (errorParam) {
      let displayMessage = "An unexpected error occurred. Please try again.";
      if (errorParam === 'auth') displayMessage = "Invalid email or password. Please try again.";
      if (errorParam === 'magic-link') displayMessage = "Failed to send magic link. Please check your email.";
      if (errorParam === 'oauth') displayMessage = "Failed to sign in with social provider. Please try again.";
      if (errorParam === 'validation') displayMessage = "Login failed due to invalid input. Please check your details.";
      if (errorParam === 'invalid-email') displayMessage = "Please enter a valid email address.";

      setErrorMessage(displayMessage);
    } else if (statusParam === "magic-link-sent") {
      setSuccessMessage("Magic link sent! Check your email to complete login.");
    }
  }, [searchParams]);

  const handleActionResponse = (
    action: (formData: FormData) => Promise<{ error?: string; success?: string; redirectTo?: string; }>
  ) => async (formData: FormData) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const result = await action(formData);

    if (result?.error) {
      setErrorMessage(result.error);
    } else if (result?.success) {
      setSuccessMessage(result.success);
    } else if (result?.redirectTo) {
      window.location.href = result.redirectTo;
    }
  };


  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-background">
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src={illustrationUrl}
          alt="Login Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 relative">
        <div className="absolute top-4 right-4 flex items-center gap-1 text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            Don’t have an account?
          </span>
          <a href="/auth/signup">
            <Button variant="link" size="sm" className="text-[#3F96E6] px-0">
              Sign up
            </Button>
          </a>
        </div>

        <div className="w-full max-w-sm space-y-6 bg-white dark:bg-zinc-900 shadow-xl p-6 rounded-2xl border border-gray-200 dark:border-zinc-800">
          <div className="flex justify-center">
            <Image
              src={logoUrl}
              alt="ACCGK Logo"
              width={200}
              height={200}
              className="object-contain"
              priority
            />
          </div>

          <div className="text-center text-lg font-bold text-[#3F96E6] dark:text-white">
            ACCGK Member Portal
          </div>

          {errorMessage && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          {successMessage && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-4" action={handleActionResponse(loginWithEmailPassword)}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3F96E6] focus:border-[#3F96E6]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3F96E6] focus:border-[#3F96E6]"
              />
            </div>

            <SubmitButton
              className="w-full bg-gradient-to-r from-[#3F96E6] to-[#AB056A] hover:opacity-90 text-white"
              loadingText="Logging in..."
            >
              Sign In
            </SubmitButton>

            <div className="text-right text-sm">
              <a href="/auth/forgot-password" className="text-[#3F96E6] hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-zinc-900 px-2 text-muted-foreground">
              Or
            </span>
          </div>

          <form
            className="space-y-4 pt-6 border-t border-gray-200 dark:border-zinc-800"
            action={handleActionResponse(loginWithMagicLink)}
          >
            <div className="space-y-2">
              <label
                htmlFor="magic-email"
                className="block text-sm font-medium"
              >
                Log in via magic link
              </label>
              <input
                id="magic-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3F96E6] focus:border-[#3F96E6]"
              />
            </div>

            <SubmitButton
              variant="outline"
              className="w-full border-[#3F96E6] text-[#3F96E6] hover:bg-[#3F96E6]/10"
              loadingText="Sending link..."
            >
              Send Magic Link
            </SubmitButton>
          </form>

          <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-200 dark:border-zinc-800">
            <form action={handleActionResponse(loginWithGoogle)}>
              <button
                type="submit"
                aria-label="Sign in with Google"
                className="p-2 rounded-full border hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-600"
              >
                <FaGoogle className="w-5 h-5" />
              </button>
            </form>

            <form action={handleActionResponse(loginWithGitHub)}>
              <button
                type="submit"
                aria-label="Sign in with GitHub"
                className="p-2 rounded-full border hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-600"
              >
                <FaGithub className="w-5 h-5" />
              </button>
            </form>

            <form action={handleActionResponse(loginWithLinkedIn)}>
              <button
                type="submit"
                aria-label="Sign in with LinkedIn"
                className="p-2 rounded-full border hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-600"
              >
                <FaLinkedin className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}