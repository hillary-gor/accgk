"use server";
import { getSupabaseServer } from "@/lib/supabase";

// Environment variable for Supabase URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl)
  throw new Error("Supabase URL is missing in environment variables.");

// Upload additional documents to Supabase Storage
export async function uploadDocument(file: File, applicationId: string) {
  const supabase = await getSupabaseServer();

  // Get logged-in user
  const { data, error: authError } = await supabase.auth.getUser();
  if (authError || !data?.user) throw new Error("Unauthorized");

  const userId = data.user.id;

  // Ensure user is in Data Team
  const { data: dataTeamMember, error: dataTeamError } = await supabase
    .from("data_team")
    .select("id, role")
    .eq("id", userId)
    .single();

  if (dataTeamError || !dataTeamMember)
    throw new Error("Unauthorized: Only Data Team can upload documents.");

  // Restrict viewers from uploading documents
  if (dataTeamMember.role === "viewer") {
    throw new Error("Viewers cannot upload documents.");
  }

  // Upload the file to Supabase Storage
  const fileName = `${applicationId}-${Date.now()}-${file.name}`;
  const { data: fileData, error: fileError } = await supabase.storage
    .from("documents")
    .upload(fileName, file);

  if (fileError) throw new Error("File upload failed");

  // Construct the correct file URL dynamically from `.env.local`
  const fileUrl = `${supabaseUrl}/storage/v1/object/public/documents/${fileData.path}`;

  // Call the Postgres function to append the document URL
  const { error: updateError } = await supabase.rpc(
    "append_file_url_to_application",
    {
      application_id: applicationId,
      file_url: fileUrl,
    }
  );

  if (updateError)
    throw new Error("Failed to update application with document");

  return { success: true, fileUrl };
}
