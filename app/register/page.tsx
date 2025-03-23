"use client";
import { useState } from "react";
import { uploadFile } from "../api/uploads/uploadFile";

export default function RegisterPage() {
  const [role, setRole] = useState<"caregiver" | "institution">("caregiver");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!document) return alert("Please upload required documents");

    setLoading(true);

    try {
      const register = (await import("@/app/api/auth/register")).register;

      const fileUrl = await uploadFile(document);
      if (!fileUrl) throw new Error("Document upload failed.");

      const res = await register({
        email,
        password,
        role,
        fullName,
        phone,
        address,
        additionalInfo,
        documentUrl: fileUrl,
      });

      if (!res.success) throw new Error(res.error);

      alert("Registration successful! Your application is pending approval.");
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <select value={role} onChange={(e) => setRole(e.target.value as "caregiver" | "institution")}>
        <option value="caregiver">Caregiver</option>
        <option value="institution">Institution</option>
      </select>

      <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <textarea placeholder="Additional Information" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />
      <input type="file" onChange={(e) => setDocument(e.target.files?.[0] || null)} />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Sign Up"}
      </button>
    </div>
  );
}
