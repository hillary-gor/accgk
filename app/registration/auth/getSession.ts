"use server";
import { getSupabaseServer } from "@/app/registration/lib/supabase";

export async function getSession() {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.auth.getSession();

  if (error) return { authenticated: false };

  return { authenticated: !!data.session, user: data.session?.user };
}
