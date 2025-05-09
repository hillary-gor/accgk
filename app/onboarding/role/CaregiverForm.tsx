"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaregiverSchema, CaregiverData } from "./schema";
import { updateCaregiver } from "./actions";
import { useState } from "react";

interface CaregiverFormProps {
  role: "caregiver";
}

export default function CaregiverForm({ role }: CaregiverFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, setError: setFormError, formState: { errors } } = useForm<CaregiverData>({
    resolver: zodResolver(CaregiverSchema),
    defaultValues: { role },
  });

  const onSubmit = async (data: CaregiverData) => {
    setLoading(true);
    setError(null);

    try {
      await updateCaregiver(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("role")} value="caregiver" />

      <input {...register("specialization")} placeholder="Specialization" className="input" />
      {errors.specialization && <p className="text-red-500">{errors.specialization.message}</p>}

      <input
        {...register("years_of_experience", { valueAsNumber: true })}
        placeholder="Years of Experience"
        type="number"
        className="input"
        onBlur={(e) => {
          if (isNaN(e.target.valueAsNumber)) {
            setFormError("years_of_experience", {
              type: "manual",
              message: "Must be a valid number.",
            });
          }
        }}
      />
      {errors.years_of_experience && <p className="text-red-500">{errors.years_of_experience.message}</p>}

      <button type="submit" className="btn" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
