"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

// Signup Server Action
export async function signUpAction(email: string, password: string) {
  const supabase = supabaseServer();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) return { error: error.message };
  return { success: "Check your email for a confirmation link!" };
}

// Login Server Action
export async function loginAction(email: string, password: string) {
  const supabase = supabaseServer();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };
  redirect("/dashboard"); // Redirect after login
}

// Google OAuth Server Action
export async function googleLoginAction() {
  const supabase = supabaseServer();
  const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });

  if (error) return { error: error.message };
}

// Logout Server Action
export async function logoutAction() {
  const supabase = supabaseServer();
  await supabase.auth.signOut();
  redirect("/auth/login");
}
