"use client";

import { useState } from "react";
import InstitutionFilesList from "./components/InstitutionFilesList";
import InstitutionFileUploadForm from "./components/InstitutionFileUploadForm";

export default function InstitutionQualificationPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      {showForm ? (
        <InstitutionFileUploadForm onClose={() => setShowForm(false)} />
      ) : (
        <InstitutionFilesList onAddClick={() => setShowForm(true)} />
      )}
    </div>
  );
}
