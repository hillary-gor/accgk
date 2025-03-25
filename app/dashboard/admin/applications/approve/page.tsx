"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { updateApplicationStatus } from "../actions";

export default function ApproveApplicationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const applicationId = searchParams.get("id");

  const handleApprove = async () => {
    try {
      await updateApplicationStatus(applicationId!, "approved");
      router.push("/dashboard/admin/applications");
    } catch (error) {
      console.error("Failed to approve application:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Approve Application</h2>
      <p>Are you sure you want to approve this application?</p>
      <button
        onClick={handleApprove}
        className="bg-green-500 text-white px-4 py-2 mt-4"
      >
        Approve
      </button>
    </div>
  );
}
