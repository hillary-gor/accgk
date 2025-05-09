"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { UserData } from "./schema";

export async function updateUser(data: UserData) {
  const supabase = await getSupabaseServer();
  
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("users")
    .update({
      address: data.address,
      date_of_birth: data.date_of_birth,
    })
    .eq("id", user.id);

  if (error) throw new Error(error.message);
}
