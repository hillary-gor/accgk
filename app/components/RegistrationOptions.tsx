"use client";
import { useRouter } from "next/navigation";

export default function RegistrationOptions() {
  const router = useRouter();

  // Registration Data for Reusability
  const registrationTypes = [
    {
      title: "Caregiver",
      description:
        "For individuals offering professional caregiving services, such as home nurses, elderly caregivers, and disability care providers.",
      requirements: [
        "Must have a valid caregiving certification.",
        "Minimum 18 years old.",
        "Experience in caregiving (preferred).",
      ],
      buttonText: "Register as a Caregiver",
      link: "/registration/caregiverApplication",
    },
    {
      title: "Institution",
      description:
        "For organizations such as hospitals, training centers, and nursing homes seeking to register on the platform.",
      requirements: [
        "Must provide a valid registration number.",
        "Accreditation details required.",
        "Authorized representative must complete registration.",
      ],
      buttonText: "Register as an Institution",
      link: "/registration/institutionApplication",
    },
  ];

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-8 text-[#AB056A]">
        Choose Your Registration Type
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Select the category that best describes you to proceed with
        registration.
      </p>

      {/* Registration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {registrationTypes.map((type, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition hover:shadow-xl"
          >
            {/* Header */}
            <h3 className="text-2xl font-semibold text-[#AB056A]">
              {type.title}
            </h3>

            {/* Description */}
            <p className="text-gray-700 mt-3">{type.description}</p>

            {/* List of Requirements */}
            <ul className="mt-4 space-y-2 text-gray-600">
              {type.requirements.map((req, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-2 h-2 bg-[#AB056A] rounded-full mr-2"></span>
                  {req}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              className="mt-6 w-full bg-[#3F96E6] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#2c7bc0] transition"
              onClick={() => router.push(type.link)}
            >
              {type.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
