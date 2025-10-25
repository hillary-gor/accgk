"use server";

import { getSupabaseServer } from "@/utils/supabase/server";

export async function getPaymentDetails() {
  const supabase = await getSupabaseServer();

  // Get the logged-in user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized");
  }

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    throw new Error("Profile not found");
  }

  // Get membership category (linked by profile.membership_id)
  const { data: membership, error: memberError } = await supabase
    .from("membership_categories")
    .select("*")
    .eq("id", profile.membership_id)
    .single();

  if (memberError || !membership) {
    console.error("Membership error:", memberError);
    throw new Error("Membership not found or invalid membership ID");
  }

  // Compute total fee
  const registrationFee = parseFloat(
    membership.initial_registration_fee ?? "0"
  );
  const licensingFee = parseFloat(membership.licensing_fee ?? "0");
  const total = registrationFee + licensingFee;

  // Return structured data
  return {
    user: {
      id: profile.id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone,
      membership_title: membership.title,
    },
    total,
  };
}
