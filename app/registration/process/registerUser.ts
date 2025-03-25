"use server";
import { getSupabaseServer } from "@/app/registration/lib/supabase";

type Role = "caregiver" | "institution";

interface RegisterData {
  email: string;
  role: Role;
  phone: string;
  address: string;
  city: string;
  country: string;
  additional_info?: string;

  // Caregiver fields
  full_name?: string;
  gender?: string;
  date_of_birth?: string;
  profession?: string;
  specialty?: string;
  experience_year?: number;
  certification_level?: string;
  license_number?: string;
  preferred_work_type?: string;
  availability_days?: string;

  // Institution fields
  institution_name?: string;
  registration_number?: string;
  contact_person_name?: string;
  contact_person_phone?: string;
  institution_type?: string;
  years_in_operation?: number;
  caregivers_needed?: string;
  courses_offered?: string;
  facilities_available?: string;
  website?: string;
}

interface ApplicationData extends RegisterData {
  status: "pending";
  created_at: string;
}

export async function registerUser(data: RegisterData) {
  try {
    const supabase = await getSupabaseServer();

    // Validate required fields
    if (
      !data.email ||
      !data.role ||
      !data.phone ||
      !data.address ||
      !data.city ||
      !data.country
    ) {
      throw new Error("All required fields must be filled.");
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      throw new Error("Invalid email format.");
    }

    // Validate phone number format
    if (!/^\+?[0-9]{7,15}$/.test(data.phone)) {
      throw new Error("Invalid phone number format.");
    }

    // Convert date to ISO format if provided
    const formattedDOB = data.date_of_birth
      ? new Date(data.date_of_birth).toISOString()
      : undefined;

    // Construct application data
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

    // Assign caregiver-specific fields
    if (data.role === "caregiver") {
      Object.assign(applicationData, {
        full_name: data.full_name || undefined,
        gender: data.gender || undefined,
        date_of_birth: formattedDOB,
        profession: data.profession || undefined,
        specialty: data.specialty || undefined,
        experience_year: data.experience_year
          ? Number(data.experience_year)
          : undefined,
        certification_level: data.certification_level || undefined,
        license_number: data.license_number || undefined,
        preferred_work_type: data.preferred_work_type || undefined,
        availability_days: data.availability_days || undefined,
      });
    }
    // Assign institution-specific fields
    else if (data.role === "institution") {
      Object.assign(applicationData, {
        institution_name: data.institution_name || undefined,
        registration_number: data.registration_number || undefined,
        contact_person_name: data.contact_person_name || undefined,
        contact_person_phone: data.contact_person_phone || undefined,
        institution_type: data.institution_type || undefined,
        years_in_operation: data.years_in_operation
          ? Number(data.years_in_operation)
          : undefined,
        caregivers_needed: data.caregivers_needed || undefined,
        courses_offered: data.courses_offered || undefined,
        facilities_available: data.facilities_available || undefined,
        website: data.website || undefined,
      });
    }

    // Insert into applications table
    const { error } = await supabase
      .from("applications")
      .insert([applicationData]);

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
