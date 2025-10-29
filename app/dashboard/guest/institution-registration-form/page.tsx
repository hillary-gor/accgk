"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, Building2, ShieldCheck, ArrowRight } from "lucide-react";

export default function InstitutionRegistrationIntro() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50 px-6">
      {/* Animated container */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full text-center bg-white shadow-lg rounded-2xl p-10 border border-gray-100"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-4"
        >
          <div className="bg-blue-100 p-4 rounded-full">
            <GraduationCap className="h-10 w-10 text-blue-600" />
          </div>
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Register Your Institution
        </h1>
        <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
          Welcome to the <strong>ACCGK Institution Portal</strong>.  
          Register your training or caregiving institution to gain verified
          access, manage staff and student records, and connect with our caregiver network.
        </p>

        {/* Features Section */}
        <div className="grid sm:grid-cols-3 gap-6 mt-10 text-left">
          <div className="flex items-start gap-3">
            <Building2 className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Institution Profile</h3>
              <p className="text-gray-600 text-sm">
                Create an official digital profile for your institution.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="h-6 w-6 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Verification</h3>
              <p className="text-gray-600 text-sm">
                Submit your license and accreditation for review.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <GraduationCap className="h-6 w-6 text-indigo-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Access Dashboard</h3>
              <p className="text-gray-600 text-sm">
                Manage students, staff, and institutional updates securely.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold rounded-xl shadow-md flex items-center gap-2 mx-auto"
            onClick={() => router.push("/dashboard/guest/institution-registration-form/institution-details")}
          >
            Proceed to Registration
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.section>

      {/* Footer note */}
      <p className="text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} ACCGK Portal — All Rights Reserved
      </p>
    </main>
  );
}
