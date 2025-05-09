"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserData } from "./schema";
import { updateUser } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = async (data: UserData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateUser(data);

      setSuccess("Profile updated successfully!");

      // Wait for 1 second before redirecting
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("address")}
        placeholder="Address"
        className="input"
      />
      {errors.address && <p className="text-red-500">{errors.address.message}</p>}

      <input
        {...register("date_of_birth")}
        type="date"
        className="input"
        onBlur={(e) => {
          if (!e.target.value) {
            setFormError("date_of_birth", {
              type: "manual",
              message: "Date of birth is required.",
            });
          }
        }}
      />
      {errors.date_of_birth && (
        <p className="text-red-500">{errors.date_of_birth.message}</p>
      )}

      <button type="submit" className="btn" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
}
