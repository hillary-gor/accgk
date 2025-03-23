"use client";
import { useState } from "react";
import { uploadFile } from "../api/uploads/uploadFile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-lg p-6 bg-white shadow-md rounded-xl">
        <CardContent>
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            Register
          </h1>
          <div className="space-y-4 mt-4">
            <Label>Role</Label>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value as "caregiver" | "institution")}
            >
              <SelectItem value="caregiver">Caregiver</SelectItem>
              <SelectItem value="institution">Institution</SelectItem>
            </Select>

            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Label>Phone</Label>
            <Input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Label>Address</Label>
            <Input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <Label>Additional Information</Label>
            <Textarea
              placeholder="Additional Information"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />

            <Label>Upload Document</Label>
            <Input
              type="file"
              onChange={(e) => setDocument(e.target.files?.[0] || null)}
            />
          </div>

          <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-full mt-6"
          >
            {loading ? "Registering..." : "Sign Up"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
