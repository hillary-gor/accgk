"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/registration/process/registerUser";
import { Button, Input, Select, SelectItem } from "@/components/ui";

export default function InstitutionApplication() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
    courses_offered: "",
    facilities_available: "",
    website: "",
    accreditation_status: "",
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
      role: "institution" as const,
      years_in_operation: Number(formData.years_in_operation) || 0,
    };

    const response = await registerUser(formattedData);

    alert(response.message);
    setLoading(false);

    if (response.success) router.push("/registration/successfullApplication");
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Institution Application
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
        name="institution_name"
        placeholder="Institution Name"
        onChange={handleChange}
        required
      />
      <Input
        name="registration_number"
        placeholder="Registration Number"
        onChange={handleChange}
        required
      />
      <Input
        name="contact_person_name"
        placeholder="Contact Person Name"
        onChange={handleChange}
        required
      />
      <Input
        name="contact_person_phone"
        placeholder="Contact Person Phone"
        onChange={handleChange}
        required
      />
      <Select name="institution_type" onChange={handleChange} required>
        <SelectItem value="Hospital">Hospital</SelectItem>
        <SelectItem value="Nursing Home">Nursing Home</SelectItem>
        <SelectItem value="Training Center">Training Center</SelectItem>
      </Select>
      <Input
        name="years_in_operation"
        type="number"
        placeholder="Years in Operation"
        onChange={handleChange}
        required
      />
      <Input
        name="caregivers_needed"
        placeholder="Caregivers Needed (JSON format)"
        onChange={handleChange}
        required
      />
      <Input
        name="courses_offered"
        placeholder="Courses Offered (JSON format)"
        onChange={handleChange}
        required
      />
      <Input
        name="facilities_available"
        placeholder="Facilities Available (JSON format)"
        onChange={handleChange}
        required
      />
      <Input name="website" placeholder="Website" onChange={handleChange} />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Apply"}
      </Button>
    </div>
  );
}
