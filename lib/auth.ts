"use server";

import { getSupabaseServer } from "@/utils/supabase/server";

// Types
export type ACCGKRole =
  | "caregiver"
  | "institution"
  | "admin"
  | "assessor"
  | "trainer";

export type UserWithRole = {
  id: string;
  full_name: string;
  role: ACCGKRole;
  avatar_url?: string | null;
  email?: string | null;
};

export async function getUserAndRole(): Promise<UserWithRole | null> {
  const supabase = await getSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: member, error } = await supabase
    .from("members")
    .select("id, full_name, role, avatar_url, email")
    .eq("id", user.id)
    .single();

  if (error || !member) return null;

  return member as UserWithRole;
}
