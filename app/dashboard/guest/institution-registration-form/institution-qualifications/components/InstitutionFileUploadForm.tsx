"use client";

import { useState, useEffect } from "react";
import { uploadInstitutionFile, getUploadedInstitutionFiles } from "../actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
  onClose: () => void;
}

const REQUIRED_FILES = [
  {
    key: "accreditation",
    label: "Accreditation Certificate",
    type: "Accreditation",
  },
  { key: "license", label: "Operating License", type: "License" },
  {
    key: "fireSafety",
    label: "Fire Safety Certificate",
    type: "Certification",
  },
  {
    key: "healthReport",
    label: "Public Health Inspection Report",
    type: "Certification",
  },
  {
    key: "curriculumApproval",
    label: "Curriculum Approval Letter",
    type: "Accreditation",
  },
  { key: "insurance", label: "Insurance Cover", type: "Certification" },
  {
    key: "principalID",
    label: "Principal’s ID & Appointment Letter",
    type: "Certification",
  },
  { key: "equipmentList", label: "Training Equipment List", type: "License" },
];

export default function InstitutionMultiFileUploadForm({ onClose }: Props) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [loadingExisting, setLoadingExisting] = useState(true);

  // Load existing uploaded files when component mounts
  useEffect(() => {
    async function fetchUploadedFiles() {
      try {
        const uploaded = await getUploadedInstitutionFiles();
        const completedMap: Record<string, boolean> = {};

        // Type for the uploaded file rows
        type InstitutionQualificationFile = {
          id: string;
          file_name: string;
          file_url: string;
          file_type: string | null;
          file_size: number | null;
          description: string | null;
          document_type: string;
          issued_by: string | null;
          issued_date: string | null;
          uploaded_at: string | null;
          updated_at: string | null;
          institution_id: string | null;
          profile_id: string;
        };

        uploaded.forEach((file: InstitutionQualificationFile) => {
          const found = REQUIRED_FILES.find(
            (r) => r.label === file.description || r.type === file.document_type
          );
          if (found) completedMap[found.key] = true;
        });

        setCompleted(completedMap);
      } catch (err) {
        console.error("Failed to load uploaded files:", err);
      } finally {
        setLoadingExisting(false);
      }
    }

    fetchUploadedFiles();
  }, []);

  async function handleSubmit(formData: FormData, key: string) {
    setLoadingKey(key);
    try {
      const res = await uploadInstitutionFile(formData);

      if (res?.success) {
        toast.success(
          `${
            REQUIRED_FILES.find((f) => f.key === key)?.label
          } uploaded successfully.`
        );
        setCompleted((prev) => ({ ...prev, [key]: true }));
      } else {
        toast.error(res?.message || "Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoadingKey(null);
    }
  }

  if (loadingExisting)
    return (
      <div className="text-center py-6 text-gray-500">
        Checking uploaded files...
      </div>
    );

  const nextIncompleteIndex = REQUIRED_FILES.findIndex(
    (item) => !completed[item.key]
  );
  const allCompleted = nextIncompleteIndex === -1;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">
        Institution Document Uploads
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Upload each required document sequentially. Each field unlocks after the
        previous upload succeeds.
      </p>

      <div className="space-y-5">
        {REQUIRED_FILES.map((item, idx) => {
          const isDisabled =
            allCompleted || idx > nextIncompleteIndex || completed[item.key];
          const isUploaded = completed[item.key];
          const isUploading = loadingKey === item.key;

          return (
            <form
              key={item.key}
              action={async (formData) =>
                await handleSubmit(formData, item.key)
              }
              className={`border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                isDisabled ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <div>
                <label className="font-medium">{item.label}</label>
                <p className="text-xs text-gray-500">{item.type}</p>
              </div>

              <div className="flex items-center gap-2">
                {!isUploaded ? (
                  <>
                    <input
                      type="hidden"
                      name="document_type"
                      value={item.type}
                    />
                    <input
                      type="hidden"
                      name="description"
                      value={item.label}
                    />
                    <input type="hidden" name="issued_by" value="Institution" />
                    <input
                      type="hidden"
                      name="issued_date"
                      value={new Date().toISOString().split("T")[0]}
                    />
                    <input
                      type="file"
                      name="file"
                      accept="application/pdf"
                      required
                      disabled={isDisabled}
                      className="text-sm"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isUploading || isDisabled}
                    >
                      {isUploading ? "Uploading..." : "Submit"}
                    </Button>
                  </>
                ) : (
                  <span className="text-green-600 font-medium">✔ Uploaded</span>
                )}
              </div>
            </form>
          );
        })}

        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button type="button" disabled={!allCompleted}>
            {allCompleted ? "All Files Uploaded" : "Incomplete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
