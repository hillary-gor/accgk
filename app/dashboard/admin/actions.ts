"use server";

import { getSupabaseServer } from "@/lib/supabase";

export async function fetchAdminStats() {
  const supabase = await getSupabaseServer();

  try {
    // Fetch all counts in parallel
    const [totalApps, approvedApps, rejectedApps, totalUsers] =
      await Promise.all([
        supabase
          .from("applications")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("applications")
          .select("*", { count: "exact", head: true })
          .eq("status", "approved"),
        supabase
          .from("applications")
          .select("*", { count: "exact", head: true })
          .eq("status", "rejected"),
        supabase.from("users").select("*", { count: "exact", head: true }),
      ]);

    // Extract counts safely
    return {
      totalApplications: totalApps.count ?? 0,
      approvedApplications: approvedApps.count ?? 0,
      rejectedApplications: rejectedApps.count ?? 0,
      totalUsers: totalUsers.count ?? 0,
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return {
      totalApplications: 0,
      approvedApplications: 0,
      rejectedApplications: 0,
      totalUsers: 0,
    };
  }
}
