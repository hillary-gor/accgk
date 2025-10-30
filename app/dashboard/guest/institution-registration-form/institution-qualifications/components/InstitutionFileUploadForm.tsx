"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { uploadInstitutionFile } from "../actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
  onClose: () => void;
}

export default function InstitutionFileUploadForm({ onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    document_type: "",
    description: "",
    issued_by: "",
    issued_date: "",
    file: null as File | null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "file") {
      const file = target.files?.[0];
      if (!file) return;
      if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed");
        return;
      }
      setForm((prev) => ({ ...prev, file }));
    } else {
      setForm((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { document_type, description, issued_by, issued_date, file } = form;

    if (!document_type || !description || !issued_by || !issued_date || !file) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await uploadInstitutionFile({
        document_type,
        description,
        issued_by,
        issued_date,
        file,
      });

      toast.success("File uploaded successfully");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Add Qualification File</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Document Type</label>
          <select
            name="document_type"
            value={form.document_type}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">-- Select Type --</option>
            <option value="Accreditation">Accreditation</option>
            <option value="License">License</option>
            <option value="Certification">Certification</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Issued By</label>
          <input
            type="text"
            name="issued_by"
            value={form.issued_by}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Issued Date</label>
          <input
            type="date"
            name="issued_date"
            value={form.issued_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
