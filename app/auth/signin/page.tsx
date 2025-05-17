"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import {
  loginWithEmailPassword,
  // loginWithMagicLink,
  loginWithGoogle,
} from "./actions";
import Image from "next/image";

const logoUrl =
  "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/institution-logos//accgk%20official%20logo.png";

const illustrationUrl =
  "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//shanice-akinyi-illustration.JPG";

// Spinner component reused across login buttons
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

// Submit button with loading state
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

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-background">
      {/* Left Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src={illustrationUrl}
          alt="Login Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 relative">
        {/* Top-right register link */}
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
          {/* Logo */}
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

          {/* Email & Password Form */}
          <form className="space-y-4" action={loginWithEmailPassword}>
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
          </form>

          {/* Magic Link Form 
          <form
            className="space-y-4 pt-6 border-t border-gray-200 dark:border-zinc-800"
            action={loginWithMagicLink}
          >
            <div className="space-y-2">
              <label
                htmlFor="magic-email"
                className="block text-sm font-medium"
              >
                Or log in via magic link
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
          */}

          {/* Social Auth Buttons */}
          <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-200 dark:border-zinc-800">
            <form action={loginWithGoogle}>
              <button
                type="submit"
                aria-label="Sign in with Google"
                className="p-2 rounded-full border hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-600"
              >
                <FaGoogle className="w-5 h-5" />
              </button>
            </form>

            {/* GitHub Icon Link */}
            <a
              href="https://github.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-500 hover:text-black transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>

            {/* LinkedIn Icon Link */}
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-blue-700 transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
