"use client";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { signUpWithEmailPassword } from "./actions";
import { loginWithGoogle } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";

const logoUrl =
  "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/institution-logos//accgk%20official%20logo.png";

const illustrationUrl =
  "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//shanice-akinyi-illustration.JPG";

// Spinner reused across buttons
function Spinner({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-2">
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
  variant?: "outline" | "ghost" | "default";
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

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await signUpWithEmailPassword(formData);
      if (result?.success) {
        setEmail(result.email);
        setShowModal(true);
        setError("");
      } else {
        setError(result?.error || "Something went wrong");
      }
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted px-4 py-12">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-background shadow-xl rounded-2xl overflow-hidden border border-border">
        {/* Left Illustration */}
        <div className="hidden md:block md:w-1/2 relative">
          <Image
            src={illustrationUrl}
            alt="Signup Illustration"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src={logoUrl}
              alt="CBMTI Logo"
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </div>

          {/* Heading */}
          <div className="text-center text-xl font-semibold text-foreground">
            Create your account
          </div>

          {/* Form */}
          <form action={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" name="full_name" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="display_name">Display Name</Label>
                <Input id="display_name" name="display_name" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" autoComplete="new-password" required />
              </div>
            </div>

            <SubmitButton className="w-full" loadingText="Signing up...">
              Sign Up
            </SubmitButton>

            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </form>

          {/* Separator */}
          <Separator className="my-4" />

          {/* Social Auth */}
          <div className="flex items-center justify-center gap-4">
            <form action={loginWithGoogle}>
              <Button variant="outline" size="icon" aria-label="Sign up with Google">
                <FaGoogle className="w-4 h-4" />
              </Button>
            </form>
            <Button asChild variant="outline" size="icon" aria-label="GitHub">
              <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-4 h-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" aria-label="LinkedIn">
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Footer */}
          <div className="pt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Log In
            </a>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-background rounded-xl p-6 w-full max-w-sm text-center border border-border shadow-lg">
            <CheckCircle className="mx-auto text-green-500 h-10 w-10 mb-2" />
            <h2 className="text-lg font-semibold mb-1">Check your email</h2>
            <p className="text-sm text-muted-foreground">
              A confirmation link has been sent to <strong>{email}</strong>.
              <br />
              Click the link to verify your email and activate your account.
            </p>
            <Button
              variant="ghost"
              onClick={() => setShowModal(false)}
              className="mt-4 w-full"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </Dialog>
    </main>
  );
}
