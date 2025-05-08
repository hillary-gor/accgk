import { z } from "zod";

export const ProfileSchema = z.object({
  full_name: z.string().min(3, "Full name is required"),
  phone: z.string().min(10, "Phone number must be valid"),
});

export type ProfileData = z.infer<typeof ProfileSchema>;
