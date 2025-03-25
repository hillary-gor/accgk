"use server";

import { getSupabaseServer } from "@/lib/supabase";

export async function fetchCaregiverDashboardStats() {
  const supabase = await getSupabaseServer();

  try {
    const [totalApps, approvedApps, pendingApps, completedCourses] =
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
          .eq("status", "pending"),
        supabase
          .from("courses")
          .select("*", { count: "exact", head: true })
          .eq("status", "completed"),
      ]);

    return {
      totalApplications: totalApps.count ?? 0,
      approvedApplications: approvedApps.count ?? 0,
      pendingApplications: pendingApps.count ?? 0,
      completedCourses: completedCourses.count ?? 0,
    };
  } catch (error) {
    console.error("Error fetching caregiver dashboard stats:", error);
    return {
      totalApplications: 0,
      approvedApplications: 0,
      pendingApplications: 0,
      completedCourses: 0,
    };
  }
}
