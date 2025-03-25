"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { updateApplicationStatus } from "../actions";

export default function RejectApplicationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const applicationId = searchParams.get("id");

  const handleReject = async () => {
    try {
      await updateApplicationStatus(applicationId!, "rejected");
      router.push("/dashboard/admin/applications");
    } catch (error) {
      console.error("Failed to reject application:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Reject Application</h2>
      <p>Are you sure you want to reject this application?</p>
      <button
        onClick={handleReject}
        className="bg-red-500 text-white px-4 py-2 mt-4"
      >
        Reject
      </button>
    </div>
  );
}
