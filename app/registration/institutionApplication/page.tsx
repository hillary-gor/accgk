"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/registration/process/registerUser";

const COURSE_OPTIONS = [
  "Nursing",
  "Physiotherapy",
  "Elderly Care",
  "Mental Health",
  "Healthcare Assistance",
  "Certified Nursing Assistant (CNA)",
  "Palliative Care",
  "Home-Based Care",
  "Midwifery",
  "Medical Social Work",
  "Emergency Medical Technician (EMT)",
  "Community Health Work",
  "Disability Support Services",
  "Rehabilitation Therapy",
  "Geriatric Care",
] as const;

const FACILITY_OPTIONS = ["ICU", "Lab", "Pharmacy", "Rehabilitation"] as const;

type Course = (typeof COURSE_OPTIONS)[number];
type Facility = (typeof FACILITY_OPTIONS)[number];

interface InstitutionFormData {
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  institution_name: string;
  registration_number: string;
  contact_person_name: string;
  contact_person_phone: string;
  institution_type: string;
  years_in_operation: string;
  caregivers_needed: string;
  courses_offered: Course[];
  facilities_available: Facility[];
  website: string;
  accreditation_status: string;
  additionalInfo: string;
}

export default function InstitutionApplication() {
  const router = useRouter();
  const [formData, setFormData] = useState<InstitutionFormData>({
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    institution_name: "",
    registration_number: "",
    contact_person_name: "",
    contact_person_phone: "",
    institution_type: "",
    years_in_operation: "",
    caregivers_needed: "",
    courses_offered: [],
    facilities_available: [],
    website: "",
    accreditation_status: "",
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleMultiSelectChange(
    value: Course | Facility,
    field: "courses_offered" | "facilities_available"
  ) {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as (Course | Facility)[]).includes(value)
        ? (prev[field] as (Course | Facility)[]).filter(
            (item) => item !== value
          ) // Remove if already selected
        : [...(prev[field] as (Course | Facility)[]), value], // Add if not selected
    }));
  }

  async function handleSubmit() {
    setLoading(true);

    const formattedData = {
      ...formData,
      role: "institution" as const,
      years_in_operation: Number(formData.years_in_operation) || 0,
      caregivers_needed: formData.caregivers_needed,
      courses_offered: formData.courses_offered.join(","),
      facilities_available: formData.facilities_available.join(","),
    };

    const response = await registerUser(formattedData);

    alert(response.message);
    setLoading(false);

    if (response.success) router.push("/registration/successfullApplication");
  }

  return (
    <div className="p-8 rounded-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Institution Application
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          name="institution_name"
          placeholder="Institution Name"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          name="registration_number"
          placeholder="Registration Number"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          name="contact_person_name"
          placeholder="Contact Person Name"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          name="contact_person_phone"
          placeholder="Contact Person Phone"
          onChange={handleChange}
          required
        />

        <select
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          name="institution_type"
          onChange={handleChange}
          required
        >
          <option value="">Select Institution Type</option>
          <option value="Hospital">Hospital</option>
          <option value="Nursing Home">Nursing Home</option>
          <option value="Training Center">Training Center</option>
        </select>

        <input
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          name="years_in_operation"
          type="number"
          placeholder="Years in Operation"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          name="caregivers_needed"
          type="text"
          placeholder="Caregivers Needed"
          onChange={handleChange}
          required
        />
      </div>

      {/* Courses Offered */}
      <div className="mt-4">
        <label className="font-semibold">Courses Offered:</label>
        <div className="flex flex-wrap gap-2">
          {COURSE_OPTIONS.map((course) => (
            <button
              key={course}
              type="button"
              className={`px-2 py-1 border rounded ${formData.courses_offered.includes(course) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => handleMultiSelectChange(course, "courses_offered")}
            >
              {course}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities Available */}
      <div className="mt-4">
        <label className="font-semibold">Facilities Available:</label>
        <div className="flex flex-wrap gap-2">
          {FACILITY_OPTIONS.map((facility) => (
            <button
              key={facility}
              type="button"
              className={`px-2 py-1 border rounded ${formData.facilities_available.includes(facility) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() =>
                handleMultiSelectChange(facility, "facilities_available")
              }
            >
              {facility}
            </button>
          ))}
        </div>
      </div>

      <input
        className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500 mt-4"
        name="website"
        placeholder="Website"
        onChange={handleChange}
      />

      <button
        className="mt-6 w-full max-w-md bg-blue-600 text-white py-2 rounded-lg transition duration-300 hover:bg-blue-700 hover:shadow-lg"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Apply"}
      </button>
    </div>
  );
}
