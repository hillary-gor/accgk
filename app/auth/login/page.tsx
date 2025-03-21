"use client";

import { useState } from "react";
import { loginAction, googleLoginAction } from "../actions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await loginAction(email, password);
    if (response?.error) setMessage(response.error);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Login</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="border p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="border p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
      </form>
      <button onClick={googleLoginAction} className="bg-red-500 text-white p-2 mt-4">Login with Google</button>
    </div>
  );
}
