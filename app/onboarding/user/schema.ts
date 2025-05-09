import { z } from "zod";

export const UserSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
});

export type UserData = z.infer<typeof UserSchema>;
