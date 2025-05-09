"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { CaregiverData, InstitutionData } from "./schema";

// Update Caregiver
export async function updateCaregiver(data: CaregiverData) {
  const supabase = await getSupabaseServer();
  
  // Get authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);
  if (!user) throw new Error("User not authenticated");

  // Upsert caregiver data
  const { error } = await supabase
    .from("caregivers")
    .upsert({
      id: user.id,
      ...data,
    });

  if (error) throw new Error(error.message);
}

// Update Institution
export async function updateInstitution(data: InstitutionData) {
  const supabase = await getSupabaseServer();

  // Get authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);
  if (!user) throw new Error("User not authenticated");

  // Upsert institution data
  const { error } = await supabase
    .from("institutions")
    .upsert({
      id: user.id,
      ...data,
    });

  if (error) throw new Error(error.message);
}
