"use server";

import { z } from "zod";
import { getSupabaseServer } from "@/utils/supabase/server";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signUpWithEmailPassword(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = signUpSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("[Signup Validation Failed]", parsed.error.flatten().fieldErrors);
    return {
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsed.data;
  const supabase = await getSupabaseServer();


  const { error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error("[Signup Auth Error]", authError.message);
    return { error: authError.message };
  }

  return { success: true, email };
}
