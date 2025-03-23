"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = getSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) {
        router.push("/login"); // Redirect to login if not authenticated
        return;
      }

      const { data: userData } = await supabase
        .from("approved_users")
        .select("role")
        .eq("auth_id", authData.user.id)
        .single();

      if (!userData) {
        router.push("/login"); // Redirect if user role not found
        return;
      }

      if (userData.role === "admin") router.push("/dashboard/admin");
      else if (userData.role === "caregiver") router.push("/dashboard/caregiver");
      else if (userData.role === "institution") router.push("/dashboard/institution");

      setLoading(false);
    }
    fetchUser();
  }, [supabase, router]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return <>{children}</>;
}
