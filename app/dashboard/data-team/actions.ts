"use server";
import { getSupabaseServer } from "@/lib/supabase";

// Environment variable for Supabase URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl)
  throw new Error("Supabase URL is missing in environment variables.");

// Allowed Fields for Updates
type ApplicationUpdates = {
  full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  additional_info?: string;
  certifications?: string[];
  experience_years?: number;
  specializations?: string[];
  availability?: "full-time" | "part-time" | "weekends" | "on-call";
  institution_name?: string;
  registration_number?: string;
  website?: string;
  number_of_employees?: number;
  services_offered?: string[];
  extra_document_urls?: string[];
};

// Fetch pending applications for Data Team
export async function fetchPendingApplications() {
  const supabase = await getSupabaseServer();

  // Get logged-in user
  const { data, error: authError } = await supabase.auth.getUser();
  if (authError || !data?.user) throw new Error("Unauthorized");

  const userId = data.user.id;

  // Ensure user is in the Data Team
  const { data: dataTeamMember, error: dataTeamError } = await supabase
    .from("data_team")
    .select("id, role")
    .eq("id", userId)
    .single();

  if (dataTeamError || !dataTeamMember)
    throw new Error("Unauthorized: Only Data Team can view applications.");

  // Fetch pending applications
  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .eq("status", "pending");

  if (error) throw new Error(error.message);

  return applications;
}

// Update application details & track last editor
export async function updateApplication(
  id: string,
  updates: ApplicationUpdates
) {
  const supabase = await getSupabaseServer();

  // Get logged-in user
  const { data, error: authError } = await supabase.auth.getUser();
  if (authError || !data?.user) throw new Error("Unauthorized");

  const userId = data.user.id;

  // Check if user is in Data Team
  const { data: dataTeamMember, error: dataTeamError } = await supabase
    .from("data_team")
    .select("id, role")
    .eq("id", userId)
    .single();

  if (dataTeamError || !dataTeamMember)
    throw new Error("Unauthorized: Only Data Team can update applications.");

  // Restrict viewers from editing
  if (dataTeamMember.role === "viewer") {
    throw new Error("Viewers cannot edit applications.");
  }

  // Update application & store last editor
  const { error } = await supabase
    .from("applications")
    .update({
      ...updates,
      last_edited_by: userId, // Track who made the edit
    })
    .eq("id", id)
    .eq("status", "pending");

  if (error) throw new Error("Update failed");

  return { success: true };
}

// Upload additional documents for an application
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
