"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSupabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// Zod Schema
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Email + Password Login
export async function loginWithEmailPassword(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = credentialsSchema.safeParse(raw);

  if (!parsed.success) {
    console.error(
      "[Login Validation Failed]",
      parsed.error.flatten().fieldErrors,
    );
    redirect("/login?error=validation");
  }

  const { email, password } = parsed.data;
  const supabase = await getSupabaseServer();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("[Login Auth Error]", error.message);
    redirect("/login?error=auth");
  }

  revalidatePath("/", "layout");
  redirect("../onboarding/profile");
}

// Magic Link Login
export async function loginWithMagicLink(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    console.warn("[Magic Link] Invalid email");
    redirect("/login?error=invalid-email");
  }

  const supabase = await getSupabaseServer();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false, // login-only
    },
  });

  if (error) {
    console.error("[Magic Link Auth Error]", error.message);
    redirect("/login?error=magic-link");
  }

  redirect("/login?status=magic-link-sent");
}

// Generic OAuth Login
async function loginWithOAuth(provider: "google" | "github" | "linkedin") {
  const supabase = await getSupabaseServer();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error || !data.url) {
    console.error(`[${provider.toUpperCase()} OAuth Error]`, error?.message ?? "No URL returned");
    redirect("/login?error=oauth");
  }

  redirect(data.url);
}

// Exported OAuth logins for use in <form action={...}>
export async function loginWithGoogle() {
  return loginWithOAuth("google");
}

export async function loginWithGitHub() {
  return loginWithOAuth("github");
}

export async function loginWithLinkedIn() {
  return loginWithOAuth("linkedin");
}
