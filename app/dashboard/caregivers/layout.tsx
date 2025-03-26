"use client";

import { useEffect, useState } from "react";
import { isCaregiver } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Loader from "./components/Loader";

export default function CaregiverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkCaregiver() {
      const email = sessionStorage.getItem("userEmail");
      if (!email) {
        router.push("/login");
        return;
      }
      const caregiver = await isCaregiver(email);
      if (!caregiver) {
        router.push("/dashboard");
      }
      setLoading(false);
    }
    checkCaregiver();
  }, [router]);

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 bg-white shadow rounded-lg mx-6 my-4">
          {children}
        </main>
      </div>
    </div>
  );
}
