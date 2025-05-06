"use server";

import { z } from "zod";
import { getSupabaseServer } from "@/utils/supabase/server";

// Schema for validating sign-up fields
const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().min(1),
  display_name: z.string().min(1),
  phone: z.string().optional(),
});

export async function signUpWithEmailPassword(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = signUpSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("[Signup Validation Failed]", parsed.error.flatten().fieldErrors);
    return { error: "Please fill all required fields correctly." };
  }

  const { email, password, full_name, display_name, phone } = parsed.data;
  const supabase = await getSupabaseServer();

  const { error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Store user data directly in auth.users.user_metadata
      data: {
        full_name,
        display_name,
        phone,
      },
    },
  });

  if (authError) {
    console.error("[Signup Auth Error]", authError.message);
    return { error: authError.message };
  }

  return { success: true, email };
}
