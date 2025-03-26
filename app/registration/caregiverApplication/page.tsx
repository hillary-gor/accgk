"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/registration/process/registerUser";

const PROFESSION_OPTIONS = [
  "Health Care Assistant",
  "Certified Nursing Assistant",
  "Nurse Aide",
  "Patient Attendant",
  "Home Health Aide",
  "Elderly Care Specialist",
  "Pediatric Caregiver",
  "Palliative Care Specialist",
] as const;

const CERTIFICATION_OPTIONS = ["Diploma", "Certificate", "Degree"] as const;
const WORK_TYPE_OPTIONS = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
] as const;

type Profession = (typeof PROFESSION_OPTIONS)[number];
type Certification = (typeof CERTIFICATION_OPTIONS)[number];
type WorkType = (typeof WORK_TYPE_OPTIONS)[number];

export default function CaregiverApplication() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    fullName: "",
    dob: "",
    gender: "",
    profession: "" as Profession,
    specialty: "",
    experience_year: "",
    certification_level: "" as Certification,
    license_number: "",
    preferred_work_type: "" as WorkType,
    availability_days: [] as string[],
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleMultiSelectChange(value: string, field: "availability_days") {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  }

  async function handleSubmit() {
    setLoading(true);

    const formattedData = {
      ...formData,
      role: "caregiver" as const,
      experience_year: Number(formData.experience_year) || 0,
      availability_days: formData.availability_days.join(","),
    };

    const response = await registerUser(formattedData);

    alert(response.message);
    setLoading(false);

    if (response.success) router.push("/registration/successfullApplication");
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Caregiver Application
      </h1>

      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="city" placeholder="City" onChange={handleChange} required />
      <input name="country" placeholder="Country" onChange={handleChange} required />
      <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <input name="dob" type="date" placeholder="Date of Birth" onChange={handleChange} required />

      <select name="gender" onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <select name="profession" onChange={handleChange} required>
        <option value="">Select Profession</option>
        {PROFESSION_OPTIONS.map((prof) => (
          <option key={prof} value={prof}>
            {prof}
          </option>
        ))}
      </select>

      <input name="specialty" placeholder="Specialty" onChange={handleChange} required />
      <input name="experience_year" type="number" placeholder="Years of Experience" onChange={handleChange} required />

      <select name="certification_level" onChange={handleChange} required>
        <option value="">Select Certification</option>
        {CERTIFICATION_OPTIONS.map((cert) => (
          <option key={cert} value={cert}>
            {cert}
          </option>
        ))}
      </select>

      <input name="license_number" placeholder="License Number" onChange={handleChange} required />

      <select name="preferred_work_type" onChange={handleChange} required>
        <option value="">Select Work Type</option>
        {WORK_TYPE_OPTIONS.map((workType) => (
          <option key={workType} value={workType}>
            {workType}
          </option>
        ))}
      </select>

      {/* Availability (Multi-Select) */}
      <label className="font-semibold mt-4">Availability Days:</label>
      <div className="flex flex-wrap gap-2">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
          <button
            key={day}
            type="button"
            className={`px-2 py-1 border rounded ${
              formData.availability_days.includes(day) ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleMultiSelectChange(day, "availability_days")}
          >
            {day}
          </button>
        ))}
      </div>

      <input name="additionalInfo" placeholder="Additional Information" onChange={handleChange} />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Apply"}
      </button>
    </div>
  );
}
