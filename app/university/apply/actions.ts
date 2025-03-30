"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// ✅ Securely create Supabase client inside the function
const createSupabaseClient = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// ✅ Application Schema Validation with Zod
const ApplicationSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Invalid phone number"),
  dateOfBirth: z.string(),
  gender: z.enum(["Male", "Female", "Other"]),
  nationality: z.string(),
  nationalId: z.string().min(5, "Invalid ID/Passport Number"),
  address: z.string(),
  highestEducation: z.string(),
  previousSchool: z.string(),
  gpa: z.string().optional(),
  courseId: z.string().min(1, "Course ID is required"),
  studyMode: z.enum(["Full-time", "Part-time"]),
  emergencyContact: z.string(),
  sponsorship: z.string().optional(),
  agreementAccepted: z.boolean(),
});

// ✅ Allowed file types & max file size
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

// ✅ Improved File Upload Function
const uploadFile = async (file: File | null, folder: string): Promise<string | null> => {
  if (!file) return null;

  if (file.size > MAX_FILE_SIZE) {
    console.error("❌ File too large:", file.name);
    return null;
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    console.error("❌ Invalid file type:", file.type);
    return null;
  }

  try {
    const supabase = createSupabaseClient();
    const filePath = `${folder}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage.from("applications").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false, // Prevent overwriting existing files
      contentType: file.type, // Ensure MIME type is set
    });

    if (error) throw new Error(`File upload failed: ${error.message}`);

    const { data } = supabase.storage.from("applications").getPublicUrl(filePath);
    return data?.publicUrl ?? null;
  } catch (error) {
    console.error("❌ File Upload Error:", error);
    return null;
  }
};

// 🚀 **Apply for Course (Server Action)**
export async function applyForCourse(formData: FormData) {
  const supabase = createSupabaseClient();

  try {
    // Validate form data using Zod
    const parsedData = ApplicationSchema.safeParse({
      userName: formData.get("userName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      dateOfBirth: formData.get("dateOfBirth"),
      gender: formData.get("gender"),
      nationality: formData.get("nationality"),
      nationalId: formData.get("nationalId"),
      address: formData.get("address"),
      highestEducation: formData.get("highestEducation"),
      previousSchool: formData.get("previousSchool"),
      gpa: formData.get("gpa"),
      courseId: formData.get("courseId"),
      studyMode: formData.get("studyMode"),
      emergencyContact: formData.get("emergencyContact"),
      sponsorship: formData.get("sponsorship"),
      agreementAccepted: formData.get("agreementAccepted") === "true",
    });

    if (!parsedData.success) {
      return {
        success: false,
        message: "❌ Validation failed",
        errors: parsedData.error.flatten(),
      };
    }

    // Handle file uploads concurrently
    const kcseCertificateFile = formData.get("kcseCertificate") as File | null;
    const nationalIdFile = formData.get("nationalIdOrPassport") as File | null;
    const additionalDocsFile = formData.get("additionalDocs") as File | null;

    const [kcseCertificateUrl, nationalIdUrl, additionalDocsUrl] = await Promise.all([
      uploadFile(kcseCertificateFile, "kcse_certificates"),
      uploadFile(nationalIdFile, "identifications"),
      uploadFile(additionalDocsFile, "additional_docs"),
    ]);

    // Insert data into Supabase
    const { error } = await supabase.from("code_blue_admissions").insert([
      {
        user_name: parsedData.data.userName,
        email: parsedData.data.email,
        phone: parsedData.data.phone,
        date_of_birth: parsedData.data.dateOfBirth,
        gender: parsedData.data.gender,
        nationality: parsedData.data.nationality,
        national_id: parsedData.data.nationalId,
        address: parsedData.data.address,
        highest_education: parsedData.data.highestEducation,
        previous_school: parsedData.data.previousSchool,
        gpa: parsedData.data.gpa,
        course_id: parsedData.data.courseId,
        study_mode: parsedData.data.studyMode,
        emergency_contact: parsedData.data.emergencyContact,
        sponsorship: parsedData.data.sponsorship,
        agreement_accepted: parsedData.data.agreementAccepted,
        kcse_certificate_url: kcseCertificateUrl,
        national_id_url: nationalIdUrl,
        additional_docs_url: additionalDocsUrl,
        applied_at: new Date(),
      },
    ]);

    if (error) throw new Error(`Database insert error: ${error.message}`);

    // Revalidate application page upon successful submission
    revalidatePath("/apply");

    return { success: true, message: "✅ Application submitted successfully!" };
  } catch (error) {
    console.error("❌ Application Error:", error);
    return {
      success: false,
      message: `❌ Error: ${error instanceof Error ? error.message : "Failed to submit application."}`,
    };
  }
}
