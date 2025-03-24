"use server";
import { getSupabaseServer } from "@/app/registration/lib/supabase";

type RegisterData = {
  email: string;
  role: "caregiver" | "institution";
  phone: string;
  address: string;
  city: string;
  country: string;
  additional_info?: string;

  // Caregiver-specific fields
  full_name?: string;
  gender?: string;
  date_of_birth?: string;
  profession?: string;
  specialty?: string;
  experience_year?: number;
  certification_level?: string;
  license_number?: string;
  preferred_work_type?: string;
  availability?: string; // Should be JSON format

  // Institution-specific fields
  institution_name?: string;
  registration_number?: string;
  contact_person_name?: string;
  contact_person_phone?: string;
  institution_type?: string;
  years_in_operation?: number;
  caregivers_needed?: string; // Should be JSON format
  courses_offered?: string; // Should be JSON format
  facilities_available?: string; // Should be JSON format
  website?: string;
};

// Extend RegisterData to include status and timestamps
type ApplicationData = RegisterData & {
  status: "pending";
  created_at: string;
};

export async function registerUser(data: RegisterData) {
  try {
    const supabase = await getSupabaseServer();

    // Validate required fields
    if (!data.email || !data.role || !data.phone || !data.address || !data.city || !data.country) {
      throw new Error("All fields are required.");
    }

    // Ensure email format is valid
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      throw new Error("Invalid email format.");
    }

    // Ensure phone number format is valid
    if (!/^\+?[0-9]{7,15}$/.test(data.phone)) {
      throw new Error("Invalid phone number format.");
    }

    // Convert optional date to ISO format
    const formattedDateOfBirth = data.date_of_birth ? new Date(data.date_of_birth).toISOString() : undefined;

    // Validate JSON fields
    const validateJson = (value?: string) => {
      try {
        return value ? JSON.parse(value) : undefined;
      } catch {
        throw new Error("Invalid JSON format in one of the fields.");
      }
    };

    // Construct application object
    const applicationData: ApplicationData = {
      email: data.email,
      role: data.role,
      phone: data.phone,
      address: data.address,
      city: data.city,
      country: data.country,
      additional_info: data.additional_info || undefined,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    // Add role-specific fields dynamically
    if (data.role === "caregiver") {
      Object.assign(applicationData, {
        full_name: data.full_name || undefined,
        gender: data.gender || undefined,
        date_of_birth: formattedDateOfBirth,
        profession: data.profession || undefined,
        specialty: data.specialty || undefined,
        experience_year: data.experience_year ? Number(data.experience_year) : undefined,
        certification_level: data.certification_level || undefined,
        license_number: data.license_number || undefined,
        preferred_work_type: data.preferred_work_type || undefined,
        availability: validateJson(data.availability),
      });
    } else if (data.role === "institution") {
      Object.assign(applicationData, {
        institution_name: data.institution_name || undefined,
        registration_number: data.registration_number || undefined,
        contact_person_name: data.contact_person_name || undefined,
        contact_person_phone: data.contact_person_phone || undefined,
        institution_type: data.institution_type || undefined,
        years_in_operation: data.years_in_operation ? Number(data.years_in_operation) : undefined,
        caregivers_needed: validateJson(data.caregivers_needed),
        courses_offered: validateJson(data.courses_offered),
        facilities_available: validateJson(data.facilities_available),
        website: data.website || undefined,
      });
    }

    // Insert into applications table
    const { error } = await supabase.from("applications").insert([applicationData]);

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to submit application. Please try again.");
    }

    return { success: true, message: "Application submitted successfully!" };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "An unexpected error occurred." };
  }
}
