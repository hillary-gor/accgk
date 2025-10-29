import { z } from "zod";

/**
 * Zod schema for institution registration form
 */
export const InstitutionFormSchema = z.object({
  institution_name: z
    .string()
    .min(2, "Institution name is required")
    .max(255),
  institution_type: z
    .string()
    .min(2, "Please select an institution type")
    .max(100),
  bio: z.string().max(1000).optional().nullable(),
  county: z.string().min(2, "County is required"),
  city: z.string().min(2, "City/Town is required"),
  physical_address: z.string().min(2, "Physical address is required"),
  postal_code: z.string().max(20).optional().nullable(),
  website: z.url("Invalid website URL").optional().nullable(),
  linkedin_profile: z
    .url("Invalid LinkedIn URL")
    .optional()
    .nullable(),
  years_in_operation: z
    .number()
    .int()
    .min(0)
    .optional()
    .nullable(),
  contact_person_name: z.string().min(2, "Contact person name is required"),
  contact_person_phone: z
    .string()
    .regex(/^\+?254\d{9}$|^07\d{8}$/, "Invalid phone number")
    .optional()
    .nullable(),
  registration_number: z.string().optional().nullable(),
  details: z.any().optional().nullable(),
  location: z.any().optional().nullable(),
});

/**
 * TypeScript types
 */
export type InstitutionFormData = z.infer<typeof InstitutionFormSchema>;
