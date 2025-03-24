"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/registration/process/registerUser";
import { Button, Input, Select, SelectItem } from "@/components/ui";

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
    profession: "",
    specialty: "",
    experience_year: "",
    certification_level: "",
    license_number: "",
    preferred_work_type: "",
    availability: "",
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setLoading(true);

    const formattedData = {
      ...formData,
      role: "caregiver" as const,
      experience_year: Number(formData.experience_year) || 0,
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
      <Input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <Input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        required
      />
      <Input
        name="address"
        placeholder="Address"
        onChange={handleChange}
        required
      />
      <Input name="city" placeholder="City" onChange={handleChange} required />
      <Input
        name="country"
        placeholder="Country"
        onChange={handleChange}
        required
      />
      <Input
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
        required
      />
      <Input
        name="dob"
        type="date"
        placeholder="Date of Birth"
        onChange={handleChange}
        required
      />
      <Select name="gender" onChange={handleChange} required>
        <SelectItem value="Male">Male</SelectItem>
        <SelectItem value="Female">Female</SelectItem>
        <SelectItem value="Other">Other</SelectItem>
      </Select>
      <Select name="profession" onChange={handleChange} required>
        <SelectItem value="Health Care Assistant">
          Health Care Assistant
        </SelectItem>
        <SelectItem value="Certified Nursing Assistant">
          Certified Nursing Assistant
        </SelectItem>
        <SelectItem value="Nurse Aide">Nurse Aide</SelectItem>
        <SelectItem value="Patient Attendant">Patient Attendant</SelectItem>
        <SelectItem value="Home Health Aide">Home Health Aide</SelectItem>
        <SelectItem value="Elderly Care Specialist">
          Elderly Care Specialist
        </SelectItem>
        <SelectItem value="Pediatric Caregiver">Pediatric Caregiver</SelectItem>
        <SelectItem value="Palliative Care Specialist">
          Palliative Care Specialist
        </SelectItem>
      </Select>
      <Input
        name="specialty"
        placeholder="Specialty"
        onChange={handleChange}
        required
      />
      <Input
        name="experience_year"
        type="number"
        placeholder="Years of Experience"
        onChange={handleChange}
        required
      />
      <Select name="certification_level" onChange={handleChange} required>
        <SelectItem value="Diploma">Diploma</SelectItem>
        <SelectItem value="Certificate">Certificate</SelectItem>
        <SelectItem value="Degree">Degree</SelectItem>
      </Select>
      <Input
        name="license_number"
        placeholder="License Number"
        onChange={handleChange}
        required
      />
      <Select name="preferred_work_type" onChange={handleChange} required>
        <SelectItem value="Full-time">Full-time</SelectItem>
        <SelectItem value="Part-time">Part-time</SelectItem>
        <SelectItem value="Contract">Contract</SelectItem>
        <SelectItem value="Freelance">Freelance</SelectItem>
      </Select>
      <Input
        name="availability"
        placeholder="Availability (JSON format)"
        onChange={handleChange}
        required
      />
      <Input
        name="additionalInfo"
        placeholder="Additional Information"
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Apply"}
      </Button>
    </div>
  );
}
