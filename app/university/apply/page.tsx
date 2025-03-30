"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { applyForCourse } from "./actions";
import { z } from "zod";

// Validation Schema
const applicationSchema = z.object({
  userName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number is too short"),
  dateOfBirth: z.string(),
  gender: z.enum(["Male", "Female", "Other"]),
  nationality: z.string(),
  nationalId: z.string().min(8, "National ID must be at least 8 characters"),
  address: z.string(),
  highestEducation: z.string(),
  previousSchool: z.string(),
  gpa: z.string(),
  studyMode: z.enum(["Full-time", "Part-time"]),
  emergencyContact: z.string(),
  sponsorship: z.string().optional(),
  agreementAccepted: z.boolean(),
  kcseCertificate: z.instanceof(File).nullable(),
  nationalIdFile: z.instanceof(File).nullable(),
  additionalDocs: z.instanceof(File).nullable(),
  courseId: z.string(),
});

export default function ApplyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "Male",
    nationality: "",
    nationalId: "",
    address: "",
    highestEducation: "",
    previousSchool: "",
    gpa: "",
    studyMode: "Full-time",
    emergencyContact: "",
    sponsorship: "",
    agreementAccepted: false,
    kcseCertificate: null as File | null,
    nationalIdFile: null as File | null,
    additionalDocs: null as File | null,
    courseId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Prefill Course ID
  useEffect(() => {
    const courseIdFromUrl = searchParams.get("courseId");
    if (courseIdFromUrl) {
      setFormData((prev) => ({ ...prev, courseId: courseIdFromUrl }));
    }
  }, [searchParams]);

  // Handle Input Changes
  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  // Handle File Changes
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.files![0] }));
    }
  }

  // Handle Form Submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const parsedData = applicationSchema.safeParse(formData);
    if (!parsedData.success) {
      const formattedErrors: Record<string, string> = {};
      parsedData.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });

      setErrors(formattedErrors);
      setLoading(false);
      return;
    }

    // Convert to FormData
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        formDataToSend.append(key, value);
      } else {
        formDataToSend.append(key, String(value));
      }
    });

    // Submit Data
    const response = await applyForCourse(formDataToSend);
    alert(response.message);
    setLoading(false);

    if (response.success) {
      router.push("../../university/apply/successfullApplication");
    }
  }

  return (
    <div className="mx-auto mt-10 p-8">
      <h2 className="text-3xl font-bold text-center text-blue-600">
        Apply for Course
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <input type="hidden" name="courseId" value={formData.courseId} />

        {[
          "userName",
          "email",
          "phone",
          "dateOfBirth",
          "nationality",
          "nationalId",
          "address",
          "highestEducation",
          "previousSchool",
          "gpa",
          "emergencyContact",
          "sponsorship",
        ].map((name) => (
          <div key={name}>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 capitalize">
              {name}
            </label>
            <input
              name={name}
              type={name === "dateOfBirth" ? "date" : "text"}
              value={(() => {
                const val = formData[name as keyof typeof formData];
                return typeof val === "string" || typeof val === "number"
                  ? val
                  : "";
              })()}
              onChange={handleInputChange}
              className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        {/* SELECT FIELDS */}
        <div>
          <label className="block font-semibold text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Study Mode
          </label>
          <select
            name="studyMode"
            value={formData.studyMode}
            onChange={handleInputChange}
            className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
          {errors.studyMode && (
            <p className="text-red-500 text-sm mt-1">{errors.studyMode}</p>
          )}
        </div>

        {["kcseCertificate", "nationalIdFile", "additionalDocs"].map((name) => (
          <div key={name}>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 capitalize">
              {name.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              name={name}
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 border border-blue-300 rounded-md focus:ring-1 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* CHECKBOX */}
        <div className="col-span-2">
          <label className="flex items-center text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              name="agreementAccepted"
              checked={formData.agreementAccepted}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>I accept the terms</span>
          </label>
          {errors.agreementAccepted && (
            <p className="text-red-500 text-sm mt-1">
              {errors.agreementAccepted}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <SubmitButton loading={loading} />
      </form>
    </div>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 hover:shadow-lg"
    >
      {loading ? "Submitting..." : "Apply Now"}
    </button>
  );
}
