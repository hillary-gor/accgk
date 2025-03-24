"use client";
import { useState, useEffect } from "react";
import { resubmitApplication } from "@/app/registration/process/resubmitApplication";
import { Button, Input, Textarea } from "@/components/ui";

export default function ResubmissionPage() {
  const [email] = useState(""); // Replace with actual user email
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [resubmissionCount, setResubmissionCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchResubmissionCount() {
      if (!email) return;
      try {
        const res = await fetch(`/registration/api/getResubmissionCount?email=${email}`);
        const data = await res.json();
        setResubmissionCount(data.count || 0);
      } catch (error) {
        console.error("Error fetching resubmission count:", error);
      }
    }
    fetchResubmissionCount();
  }, [email]);

  async function handleResubmit() {
    if (resubmissionCount >= 2) return alert("You have reached the maximum number of resubmissions.");

    setLoading(true);

    try {
      const res = await resubmitApplication({
        email,
        fullName,
        phone,
        address,
        additionalInfo,
      });

      if (!res.success) throw new Error(res.message);

      alert("Resubmission successful! Your application is pending review.");
      setResubmissionCount((prev) => prev + 1);
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Resubmit Application</h1>

      {resubmissionCount < 2 ? (
        <>
          <p className="text-gray-700">You have {2 - resubmissionCount} resubmission(s) left.</p>
          <Input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <Textarea placeholder="Additional Information" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />

          <Button onClick={handleResubmit} disabled={loading} className="w-full">
            {loading ? "Resubmitting..." : "Resubmit Application"}
          </Button>
        </>
      ) : (
        <p className="text-red-600">You have reached the maximum number of resubmissions.</p>
      )}
    </div>
  );
}
