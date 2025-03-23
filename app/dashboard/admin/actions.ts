"use server";
import { getSupabaseServer } from "@/lib/supabase";

// Fetch pending applications
export async function fetchPendingApplications() {
  const supabase = await getSupabaseServer();

  // Get logged-in user
  const { data, error: authError } = await supabase.auth.getUser();
  if (authError || !data?.user) throw new Error("Unauthorized");

  const userId = data.user.id; // Ensure user.id exists

  // Check if user is in the `admins` table
  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("id")
    .eq("id", userId)
    .single();

  if (adminError || !admin) throw new Error("Unauthorized: Only admins can view applications.");

  // Fetch pending applications
  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .eq("status", "pending");

  if (error) throw new Error(error.message);

  return applications;
}

// Approve an application
export async function approveUser(id: string) {
  const supabase = await getSupabaseServer();

  // Get logged-in user
  const { data, error: authError } = await supabase.auth.getUser();
  if (authError || !data?.user) throw new Error("Unauthorized");

  const userId = data.user.id; // Ensure user.id exists

  // Check if user is in the `admins` table
  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("id")
    .eq("id", userId)
    .single();

  if (adminError || !admin) throw new Error("Unauthorized: Only admins can approve users.");

  // Approve the user and store the admin’s ID
  const { error } = await supabase
    .from("applications")
    .update({ status: "approved", reviewed_by: userId })
    .eq("id", id);

  if (error) throw new Error("Approval failed");

  return { success: true };
}

// Reject an application
export async function rejectUser(id: string) {
  const supabase = await getSupabaseServer();

  // Get logged-in user
  const { data, error: authError } = await supabase.auth.getUser();
  if (authError || !data?.user) throw new Error("Unauthorized");

  const userId = data.user.id; // Ensure user.id exists

  // Check if user is in the `admins` table
  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("id")
    .eq("id", userId)
    .single();

  if (adminError || !admin) throw new Error("Unauthorized: Only admins can reject users.");

  // Reject the user and store the admin’s ID
  const { error } = await supabase
    .from("applications")
    .update({ status: "rejected", reviewed_by: userId })
    .eq("id", id);

  if (error) throw new Error("Rejection failed");

  return { success: true };
}
