"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InstitutionSchema, InstitutionData } from "./schema";
import { updateInstitution } from "./actions";
import { useState } from "react";

interface InstitutionFormProps {
  role: "institution";
}

export default function InstitutionForm({ role }: InstitutionFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, setError: setFormError, formState: { errors } } = useForm<InstitutionData>({
    resolver: zodResolver(InstitutionSchema),
    defaultValues: { role },
  });

  const onSubmit = async (data: InstitutionData) => {
    setLoading(true);
    setError(null);

    try {
      await updateInstitution(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("role")} value="institution" />

      <input {...register("institution_name")} placeholder="Institution Name" className="input" />
      {errors.institution_name && <p className="text-red-500">{errors.institution_name.message}</p>}

      <input
        {...register("established_year", { valueAsNumber: true })}
        placeholder="Established Year"
        type="number"
        className="input"
        onBlur={(e) => {
          if (isNaN(e.target.valueAsNumber)) {
            setFormError("established_year", {
              type: "manual",
              message: "Must be a valid number.",
            });
          }
        }}
      />
      {errors.established_year && <p className="text-red-500">{errors.established_year.message}</p>}

      <button type="submit" className="btn" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
