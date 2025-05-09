import { z } from "zod";

export const CaregiverSchema = z.object({
  role: z.literal("caregiver"),
  specialization: z.string().min(1, "Specialization is required"),
  years_of_experience: z.number().min(1, "Must be at least 1 year of experience"),
});

export const InstitutionSchema = z.object({
  role: z.literal("institution"),
  institution_name: z.string().min(1, "Institution name is required"),
  established_year: z.number().min(1900, "Year must be after 1900"),
});

export const RoleSchema = z.discriminatedUnion("role", [
  CaregiverSchema,
  InstitutionSchema,
]);

export type CaregiverData = z.infer<typeof CaregiverSchema>;
export type InstitutionData = z.infer<typeof InstitutionSchema>;
export type RoleData = z.infer<typeof RoleSchema>;
