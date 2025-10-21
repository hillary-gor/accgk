"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { login } from "./signin-actions";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

// Supabase client (browser)
const supabase = createClient();

// Logo URL
const logoUrl =
  "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/institution-logos/accgk%20official%20logo.png";

// Google sign-in handler
async function handleGoogleSignIn() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

// --- Email verification dialog (wrapped in suspense) ---
function CheckEmailDialogInner() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (searchParams.get("message") === "check-email") {
      setOpen(true);
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      const redirectTimer = setTimeout(() => {
        setOpen(false);
        window.history.replaceState(null, "", window.location.pathname);
      }, 15000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimer);
      };
    }
  }, [searchParams]);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Email Verification Required</DialogTitle>
          <DialogDescription>
            A verification link has been sent to your email. Please click it to
            confirm your account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-2">
          <AlertCircle className="h-10 w-10 text-primary" />
          <p className="text-center text-sm text-muted-foreground">
            Redirecting in {countdown} seconds…
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Link href="/auth/signup" passHref>
            <Button>Go to Login</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CheckEmailDialog() {
  return (
    <Suspense fallback={null}>
      <CheckEmailDialogInner />
    </Suspense>
  );
}

// --- Login page ---
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-white to-white dark:from-neutral-900 dark:to-neutral-950 p-4">
      <CheckEmailDialog />

      <div className="w-full max-w-md rounded-2xl bg-card/80 backdrop-blur-md shadow-xl p-6 md:p-8 space-y-6">
        {/* Logo / Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Image
              src={logoUrl}
              alt="ACCGK Official Logo"
              width={120}
              height={120}
              className="rounded-md"
              priority
            />
          </div>
          <p className="text-muted-foreground">
            Sign in to continue your journey
          </p>
        </div>

        {/* Login Form */}
        <form action={login} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              className="transition focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="transition focus:ring-2 focus:ring-rose-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Extras */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />{" "}
              Remember me
            </label>
            <Link
              href="/auth/reset-password"
              className="text-rose-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              or continue with
            </span>
          </div>
        </div>

        {/* Social logins */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
          >
            Google
          </Button>
          <Button variant="outline" className="w-full">
            Apple
          </Button>
        </div>

        {/* Signup CTA */}
        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-rose-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
