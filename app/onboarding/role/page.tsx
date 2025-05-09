"use client";

import { useSearchParams } from "next/navigation";
import CaregiverForm from "./CaregiverForm";
import InstitutionForm from "./InstitutionForm";

export default function RolePage() {
  const role = useSearchParams().get("role");

  if (role === "caregiver") {
    return <CaregiverForm role="caregiver" />;
  }

  if (role === "institution") {
    return <InstitutionForm role="institution" />;
  }

  return <p className="text-red-500">Invalid role specified.</p>;
}
