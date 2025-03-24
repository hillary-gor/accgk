"use server";
import { getSupabaseServer } from "@/app/registration/lib/supabase";

export async function sendMagicLink(email: string) {
  const supabase = await getSupabaseServer();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: process.env.NEXT_PUBLIC_LOGIN_REDIRECT, // Dynamic Redirect
    },
  });

  if (error) throw new Error(error.message);

  return { success: true, message: "Magic Link sent! Check your email." };
}
