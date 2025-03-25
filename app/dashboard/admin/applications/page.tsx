"use client";

import { useState, useEffect } from "react";
import { fetchApplications, updateApplicationStatus } from "./actions";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<
    { id: string; applicant_name: string; email: string; status: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await fetchApplications();
        setApplications(data);
      } catch (error) {
        console.error("Failed to load applications:", error);
      } finally {
        setLoading(false);
      }
    }
    loadApplications();
  }, []);

  const handleStatusChange = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    try {
      await updateApplicationStatus(id, status);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
  };

  if (loading) return <p className="text-center">Loading applications...</p>;

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Applications Management</h2>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">Name</th>
            <th className="border p-3 text-left">Email</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No applications found.
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app.id} className="border">
                <td className="p-3">{app.applicant_name}</td>
                <td className="p-3">{app.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      app.status === "approved"
                        ? "bg-green-500"
                        : app.status === "rejected"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center space-x-2">
                  <button
                    onClick={() => handleStatusChange(app.id, "approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    disabled={app.status === "approved"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(app.id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    disabled={app.status === "rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
