import type { Database } from "./supabase"

export type { Database }

// Core table rows
export type User = Database["public"]["Tables"]["users"]["Row"]
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type License = Database["public"]["Tables"]["licenses"]["Row"]
export type Certification = Database["public"]["Tables"]["certifications"]["Row"]
export type Payment = Database["public"]["Tables"]["payments"]["Row"]
export type TrainingProgram = Database["public"]["Tables"]["training_programs"]["Row"]
export type TrainingEnrollment = Database["public"]["Tables"]["training_enrollments"]["Row"]
export type Assessment = Database["public"]["Tables"]["assessments"]["Row"]
export type Institution = Database["public"]["Tables"]["institutions"]["Row"]
export type InstitutionCaregiver = Database["public"]["Tables"]["institution_caregivers"]["Row"]
export type Complaint = Database["public"]["Tables"]["complaints"]["Row"]

// Insert types
export type NewUser = Database["public"]["Tables"]["users"]["Insert"]
export type NewProfile = Database["public"]["Tables"]["profiles"]["Insert"]
export type NewLicense = Database["public"]["Tables"]["licenses"]["Insert"]
export type NewCertification = Database["public"]["Tables"]["certifications"]["Insert"]
export type NewPayment = Database["public"]["Tables"]["payments"]["Insert"]
export type NewTrainingProgram = Database["public"]["Tables"]["training_programs"]["Insert"]
export type NewTrainingEnrollment = Database["public"]["Tables"]["training_enrollments"]["Insert"]
export type NewAssessment = Database["public"]["Tables"]["assessments"]["Insert"]
export type NewInstitution = Database["public"]["Tables"]["institutions"]["Insert"]
export type NewInstitutionCaregiver = Database["public"]["Tables"]["institution_caregivers"]["Insert"]
export type NewComplaint = Database["public"]["Tables"]["complaints"]["Insert"]

// Update types
export type UpdateUser = Database["public"]["Tables"]["users"]["Update"]
export type UpdateProfile = Database["public"]["Tables"]["profiles"]["Update"]
export type UpdateLicense = Database["public"]["Tables"]["licenses"]["Update"]
export type UpdateCertification = Database["public"]["Tables"]["certifications"]["Update"]
export type UpdatePayment = Database["public"]["Tables"]["payments"]["Update"]
export type UpdateTrainingProgram = Database["public"]["Tables"]["training_programs"]["Update"]
export type UpdateTrainingEnrollment = Database["public"]["Tables"]["training_enrollments"]["Update"]
export type UpdateAssessment = Database["public"]["Tables"]["assessments"]["Update"]
export type UpdateInstitution = Database["public"]["Tables"]["institutions"]["Update"]
export type UpdateInstitutionCaregiver = Database["public"]["Tables"]["institution_caregivers"]["Update"]
export type UpdateComplaint = Database["public"]["Tables"]["complaints"]["Update"]
