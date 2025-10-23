import { getSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CaregiverForm from "./caregiver-form";

export default async function CaregiverPage() {
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/signin");

  const { data: caregiver, error } = await supabase
    .from("caregivers")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching caregiver:", error.message);
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Caregiver Registration Form</h1>
      <CaregiverForm profileId={user.id} defaultValues={caregiver || {}} />
    </div>
  );
}
