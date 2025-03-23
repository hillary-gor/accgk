"use client";
import { useState, useEffect } from "react";
import { fetchPendingApplications, approveUser, rejectUser } from "./actions";

type Application = {
  id: string;
  full_name: string;
  email: string;
  role: "caregiver" | "institution";
};

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

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

  async function handleApprove(id: string) {
    try {
      await approveUser(id);
      setApplications(applications.filter((app) => app.id !== id));
      alert("User approved successfully!");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  }

  async function handleReject(id: string) {
    try {
      await rejectUser(id);
      setApplications(applications.filter((app) => app.id !== id));
      alert("User rejected.");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  }

  if (loading) return <p>Loading applications...</p>;

  return (
    <div>
      <h1>Admin Dashboard - Approve Users</h1>
      {applications.length === 0 ? (
        <p>No pending applications</p>
      ) : (
        <ul>
          {applications.map((app) => (
            <li key={app.id}>
              <p><strong>Name:</strong> {app.full_name} ({app.role})</p>
              <p><strong>Email:</strong> {app.email}</p>
              <button onClick={() => handleApprove(app.id)}>Approve</button>
              <button onClick={() => handleReject(app.id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
