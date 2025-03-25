"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/registration/process/registerUser";
import { Button, Input, Select, SelectItem } from "@/components/ui";

// Define profession and certification level options
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
const WORK_TYPE_OPTIONS = ["Full-time", "Part-time", "Contract", "Freelance"] as const;

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
    availability_days: [] as string[], // ✅ Multi-select
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Explicit event typing
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // ✅ Handle multi-select inputs
  function handleMultiSelectChange(value: string, field: "availability_days") {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value) // Remove if already selected
        : [...prev[field], value], // Add if not selected
    }));
  }

  async function handleSubmit() {
    setLoading(true);

    const formattedData = {
      ...formData,
      role: "caregiver" as const,
      experience_year: Number(formData.experience_year) || 0,
      availability_days: formData.availability_days.join(","), // ✅ Convert array to string
    };

    const response = await registerUser(formattedData);

    alert(response.message);
    setLoading(false);

    if (response.success) router.push("/registration/successfullApplication");
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Caregiver Application</h1>
      
      <Input name="email" placeholder="Email" onChange={handleChange} required />
      <Input name="phone" placeholder="Phone" onChange={handleChange} required />
      <Input name="address" placeholder="Address" onChange={handleChange} required />
      <Input name="city" placeholder="City" onChange={handleChange} required />
      <Input name="country" placeholder="Country" onChange={handleChange} required />
      <Input name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <Input name="dob" type="date" placeholder="Date of Birth" onChange={handleChange} required />
      
      <Select name="gender" onChange={handleChange} required>
        <SelectItem value="Male">Male</SelectItem>
        <SelectItem value="Female">Female</SelectItem>
        <SelectItem value="Other">Other</SelectItem>
      </Select>

      <Select name="profession" onChange={handleChange} required>
        {PROFESSION_OPTIONS.map((prof) => (
          <SelectItem key={prof} value={prof}>
            {prof}
          </SelectItem>
        ))}
      </Select>

      <Input name="specialty" placeholder="Specialty" onChange={handleChange} required />
      <Input name="experience_year" type="number" placeholder="Years of Experience" onChange={handleChange} required />

      <Select name="certification_level" onChange={handleChange} required>
        {CERTIFICATION_OPTIONS.map((cert) => (
          <SelectItem key={cert} value={cert}>
            {cert}
          </SelectItem>
        ))}
      </Select>

      <Input name="license_number" placeholder="License Number" onChange={handleChange} required />

      <Select name="preferred_work_type" onChange={handleChange} required>
        {WORK_TYPE_OPTIONS.map((workType) => (
          <SelectItem key={workType} value={workType}>
            {workType}
          </SelectItem>
        ))}
      </Select>

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

      <Input name="additionalInfo" placeholder="Additional Information" onChange={handleChange} />

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Apply"}
      </Button>
    </div>
  );
}
