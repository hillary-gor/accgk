"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// upload file to Supabase Storage
async function uploadCategoryImage(file: File) {
  const supabase = await getSupabaseServer();

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `membership-categories/${fileName}`;

  const { error } = await supabase.storage
    .from("assets")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("assets").getPublicUrl(filePath);
  return data.publicUrl;
}

// Create
export async function createMembershipCategory(formData: FormData) {
  try {
    const supabase = await getSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { success: false, message: "Not signed in" };

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (profile?.role !== "admin")
      return { success: false, message: "Unauthorized" };

    const title = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const detailed_description =
      formData.get("detailed_description")?.toString() || "";
    const initial_registration_fee = Number(
      formData.get("initial_registration_fee")
    );
    const licensing_fee = Number(formData.get("licensing_fee"));

    // handle file upload directly
    let image_url = "";
    const file = formData.get("image") as File | null;
    if (file && file.size > 0) {
      image_url = await uploadCategoryImage(file);
    }

    const { error } = await supabase.from("membership_categories").insert({
      title,
      image_url,
      description: [description],
      detailed_description,
      initial_registration_fee,
      licensing_fee,
      fee_details: [
        `Initial Registration Fee: KES ${initial_registration_fee}`,
        `Licensing Fee: KES ${licensing_fee}`,
        `Total: KES ${initial_registration_fee + licensing_fee}`,
      ],
    });

    if (error) return { success: false, message: "Insert failed" };
    revalidatePath("/dashboard/admin/membership-categories");
    return { success: true, message: "Category added successfully" };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
}

// Update
export async function updateMembershipCategory(id: string, formData: FormData) {
  try {
    const supabase = await getSupabaseServer();
    const title = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const detailed_description =
      formData.get("detailed_description")?.toString() || "";
    const initial_registration_fee = Number(
      formData.get("initial_registration_fee")
    );
    const licensing_fee = Number(formData.get("licensing_fee"));

    // handle file upload
    let image_url = formData.get("image_url")?.toString() || "";
    const file = formData.get("image") as File | null;
    if (file && file.size > 0) {
      image_url = await uploadCategoryImage(file);
    }

    const { error } = await supabase
      .from("membership_categories")
      .update({
        title,
        image_url,
        description: [description],
        detailed_description,
        initial_registration_fee,
        licensing_fee,
        fee_details: [
          `Initial Registration Fee: KES ${initial_registration_fee}`,
          `Licensing Fee: KES ${licensing_fee}`,
          `Total: KES ${initial_registration_fee + licensing_fee}`,
        ],
      })
      .eq("id", id);

    if (error) return { success: false, message: "Update failed" };
    revalidatePath("/dashboard/admin/membership-categories");
    return { success: true, message: "Category updated successfully" };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
}

// Delete
export async function deleteMembershipCategory(id: string) {
  try {
    const supabase = await getSupabaseServer();
    const { error } = await supabase
      .from("membership_categories")
      .delete()
      .eq("id", id);

    if (error) return { success: false, message: "Delete failed" };
    revalidatePath("/dashboard/admin/membership-categories");
    return { success: true, message: "Category deleted successfully" };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
}
