"use server";

import { getSupabaseServer } from "@/lib/supabase";

// Fetch Users List
export async function fetchUsers() {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, role");

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data || [];
}

export async function updateUser(id: string, name: string, role: string) {
  const supabase = await getSupabaseServer();
  const { error } = await supabase
    .from("users")
    .update({ name, role })
    .eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true };
}

export async function deleteUser(id: string) {
  const supabase = await getSupabaseServer();
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) throw new Error(error.message);
  return { success: true };
}
