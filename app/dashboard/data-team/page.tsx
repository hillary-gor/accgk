"use client";
import { useState, useEffect } from "react";
import { fetchPendingApplications, updateApplication } from "./actions";
import { uploadDocument } from "./upload";

type Application = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  additional_info?: string;
  role: "caregiver" | "institution";
  extra_document_urls?: string[];
};

export default function DataTeamDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, boolean>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadApplications() {
      try {
        const data: Application[] = await fetchPendingApplications();
        setApplications(data);
      } catch (error) {
        console.error("Failed to load applications:", error);
      } finally {
        setLoading(false);
      }
    }
    loadApplications();
  }, []);

  // Handle application field updates
  async function handleUpdate(
    id: string,
    field: keyof Application,
    value: string
  ) {
    try {
      await updateApplication(id, { [field]: value });
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, [field]: value } : app))
      );
      alert("Application updated successfully!");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  }

  // Handle file uploads
  async function handleUpload(id: string, file: File) {
    try {
      setUploading((prev) => ({ ...prev, [id]: true }));

      const res = await uploadDocument(file, id);

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id
            ? {
                ...app,
                extra_document_urls: [
                  ...(app.extra_document_urls || []),
                  res.fileUrl,
                ],
              }
            : app
        )
      );

      alert("File uploaded successfully!");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setUploading((prev) => ({ ...prev, [id]: false }));
    }
  }

  if (loading)
    return <p className="text-center text-gray-500">Loading applications...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Data Team Dashboard
      </h1>

      {applications.length === 0 ? (
        <p className="text-gray-600">No pending applications</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li
              key={app.id}
              className="border p-4 rounded-lg shadow-sm bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                    defaultValue={app.full_name}
                    onBlur={(e) =>
                      handleUpdate(app.id, "full_name", e.target.value)
                    }
                    disabled={editing[app.id]}
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-semibold">Phone</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                    defaultValue={app.phone}
                    onBlur={(e) =>
                      handleUpdate(app.id, "phone", e.target.value)
                    }
                    disabled={editing[app.id]}
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-semibold">Address</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                    defaultValue={app.address}
                    onBlur={(e) =>
                      handleUpdate(app.id, "address", e.target.value)
                    }
                    disabled={editing[app.id]}
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-semibold">
                    Email (Read-Only)
                  </label>
                  <p className="w-full border p-2 rounded bg-gray-100 text-gray-500">
                    {app.email}
                  </p>
                </div>
              </div>

              {/* File Upload */}
              <div className="mt-4">
                <label className="text-gray-700 font-semibold">
                  Upload Document
                </label>
                <input
                  type="file"
                  className="w-full border p-2 rounded bg-white"
                  onChange={(e) =>
                    e.target.files && handleUpload(app.id, e.target.files[0])
                  }
                />
                {uploading[app.id] && (
                  <p className="text-blue-500">Uploading...</p>
                )}
              </div>

              {/* Show Uploaded Documents */}
              {app.extra_document_urls &&
                app.extra_document_urls.length > 0 && (
                  <div className="mt-4">
                    <p className="text-gray-700 font-semibold">
                      Uploaded Documents
                    </p>
                    <ul className="list-disc pl-5 text-blue-600">
                      {app.extra_document_urls.map((url, index) => (
                        <li key={index}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            Document {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Edit/Save Button */}
              <div className="mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() =>
                    setEditing((prev) => ({ ...prev, [app.id]: !prev[app.id] }))
                  }
                >
                  {editing[app.id] ? "Save" : "Edit"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
