"use client";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import FAQ from "../components/FAQ";
import RegistrationHero from "../components/RegistrationHero";

export default function RegistrationSelectionPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Imported FAQ Component */}
      <Navbar />
      <RegistrationHero />

      {/* Registration Options */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Choose Your Registration Type
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Select the category that best describes you to proceed with
          registration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Caregiver Registration */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition hover:shadow-xl">
            {/* Card Header */}
            <h3 className="text-2xl font-semibold text-[#AB056A]">Caregiver</h3>

            {/* Description */}
            <p className="text-gray-700 mt-3">
              For individuals offering professional caregiving services, such as
              home nurses, elderly caregivers, and disability care providers.
            </p>

            {/* List of Requirements */}
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#AB056A] rounded-full mr-2"></span>
                Must have a valid caregiving certification.
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#AB056A] rounded-full mr-2"></span>
                Minimum 18 years old.
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#AB056A] rounded-full mr-2"></span>
                Experience in caregiving (preferred).
              </li>
            </ul>

            {/* Action Button */}
            <button
              className="mt-6 w-full bg-[#3F96E6] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#2c7bc0] transition"
              onClick={() => router.push("/registration/caregiverApplication")}
            >
              Register as a Caregiver
            </button>
          </div>

          {/* Institution Registration */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition hover:shadow-xl">
            {/* Card Header */}
            <h3 className="text-2xl font-semibold text-[#AB056A]">
              Institution
            </h3>

            {/* Description */}
            <p className="text-gray-700 mt-3">
              For organizations such as hospitals, training centers, and nursing
              homes seeking to register on the platform.
            </p>

            {/* List of Requirements */}
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#AB056A] rounded-full mr-2"></span>
                Must provide a valid registration number.
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#AB056A] rounded-full mr-2"></span>
                Accreditation details required.
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-[#AB056A] rounded-full mr-2"></span>
                Authorized representative must complete registration.
              </li>
            </ul>

            {/* Action Button */}
            <button
              className="mt-6 w-full bg-[#3F96E6] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#2c7bc0] transition"
              onClick={() =>
                router.push("/registration/institutionApplication")
              }
            >
              Register as an Institution
            </button>
          </div>
        </div>
      </section>

      {/* Imported FAQ Component */}
      <FAQ />
    </div>
  );
}
