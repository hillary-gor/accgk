// app/auth/login/actions.ts
"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSupabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const credentialsSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type ActionResponse = {
  success?: string;
  error?: string;
  redirectTo?: string;
};

export async function loginWithEmailPassword(formData: FormData): Promise<ActionResponse> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = credentialsSchema.safeParse(raw);

  if (!parsed.success) {
    const errorMessages = parsed.error.flatten().fieldErrors;
    const errorMessage = Object.values(errorMessages).flat().join(", ") || "Validation failed.";
    return { error: `Login failed: ${errorMessage}` };
  }

  const { email, password } = parsed.data;
  const supabase = await getSupabaseServer();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("[Login Auth Error]", error.message);
    return { error: "Login failed. Please check your credentials." };
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function loginWithMagicLink(formData: FormData): Promise<ActionResponse> {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    console.warn("[Magic Link] Invalid email provided");
    return { error: "Please enter a valid email address." };
  }

  const supabase = await getSupabaseServer();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) {
    console.error("[Magic Link Auth Error]", error.message);
    return { error: "Failed to send magic link. Please try again." };
  }

  return { success: "Magic link sent! Check your email to complete login." };
}

async function loginWithOAuth(provider: "google" | "github" | "linkedin"): Promise<ActionResponse> {
  const supabase = await getSupabaseServer();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error || !data.url) {
    console.error(`[${provider.toUpperCase()} OAuth Error]`, error?.message ?? "No URL returned");
    return { error: `Failed to sign in with ${provider}. Please try again.` };
  }

  return { redirectTo: data.url };
}

export async function loginWithGoogle(): Promise<ActionResponse> {
  return loginWithOAuth("google");
}

export async function loginWithGitHub(): Promise<ActionResponse> {
  return loginWithOAuth("github");
}

export async function loginWithLinkedIn(): Promise<ActionResponse> {
  return loginWithOAuth("linkedin");
}