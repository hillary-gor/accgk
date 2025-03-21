"use client";

import { useState } from "react";
import { signUpAction } from "../actions";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signUpAction(email, password);
    setMessage(response?.error ?? response?.success ?? ""); // ✅ Fixed
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="border p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="border p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white p-2">Sign Up</button>
      </form>
    </div>
  );
}
