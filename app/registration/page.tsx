"use client";
import { useState } from "react";
import { sendMagicLink } from "@/app/registration/auth/sendMagicLink";
import { registerUser } from "@/app/registration/process/registerUser";
import { Button, Input, Select, SelectItem, Textarea } from "@/components/ui";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"caregiver" | "institution">("caregiver");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);

    try {
      const res = await registerUser({
        email,
        role,
        fullName,
        phone,
        address,
        additionalInfo,
      });

      if (!res.success) throw new Error(res.message);

      await sendMagicLink(email);
      alert("Check your email for the Magic Link. Your application is pending approval.");
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Register</h1>

      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Select
          value={role}
          onChange={(e) => setRole(e.target.value as "caregiver" | "institution")}
        >
          <SelectItem value="caregiver">Caregiver</SelectItem>
          <SelectItem value="institution">Institution</SelectItem>
        </Select>

        <Input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Textarea
          placeholder="Additional Information"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />

        <Button onClick={handleRegister} disabled={loading} className="w-full">
          {loading ? "Registering..." : "Sign Up"}
        </Button>
      </div>
    </div>
  );
}
