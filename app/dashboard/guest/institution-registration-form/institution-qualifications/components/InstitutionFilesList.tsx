"use client";

import { useEffect, useState } from "react";
import { getInstitutionFiles, deleteInstitutionFile } from "../actions";
import { FileText, Plus, Loader2, ExternalLink, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface InstitutionFile {
  id: string;
  file_name: string;
  document_type: string;
  description: string;
  issued_by: string;
  issued_date: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
  created_at?: string;
}

export default function InstitutionFilesList({
  onAddClick,
}: {
  onAddClick: () => void;
}) {
  const [files, setFiles] = useState<InstitutionFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 🔹 Load files on mount
  useEffect(() => {
    async function fetchFiles() {
      setLoading(true);
      const result = await getInstitutionFiles();
      if (result.success) {
        setFiles(result.data);
      } else {
        toast.error(result.message);
        setFiles([]);
      }
      setLoading(false);
    }

    fetchFiles();
  }, []);

  // 🔹 Delete handler
  async function handleDelete(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this file? This action cannot be undone."
    );
    if (!confirmDelete) return;

    setDeletingId(id);
    const result = await deleteInstitutionFile(id);
    setDeletingId(null);

    if (result.success) {
      // Optimistic UI update
      setFiles((prev) => prev.filter((file) => file.id !== id));
      toast.success("File deleted successfully.");
    } else {
      toast.error(result.message || "Failed to delete file.");
    }
  }

  // 🔹 Loading state
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin mb-3 text-blue-600" />
        <p>Loading qualification files...</p>
      </div>
    );

  // 🔹 Empty state
  if (!files.length)
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
        <FileText className="w-10 h-10 text-gray-400" />
        <p className="text-gray-600">No qualification files uploaded yet.</p>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          <Plus className="w-4 h-4" /> Upload File
        </button>
      </div>
    );

  // 🔹 File list
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Uploaded Qualification Files
        </h2>
        <button
          onClick={onAddClick}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Add File
        </button>
      </div>

      {/* File Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between"
          >
            {/* File Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium text-gray-800 truncate">
                  {file.file_name}
                </h3>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(file.id)}
                disabled={deletingId === file.id}
                className={`text-red-500 hover:text-red-700 transition ${
                  deletingId === file.id ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {deletingId === file.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* File Metadata */}
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-700">Type:</span>{" "}
                {file.document_type}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Issued by:</span>{" "}
                {file.issued_by}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Date:</span>{" "}
                {file.issued_date}
              </p>
              {file.description && (
                <p className="text-gray-500 italic line-clamp-2">
                  “{file.description}”
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <p>{(file.file_size / 1024).toFixed(1)} KB</p>
              <a
                href={file.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
              >
                View <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
