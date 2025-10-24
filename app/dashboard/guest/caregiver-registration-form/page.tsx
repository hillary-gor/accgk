"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertInitialCaregiverProfile } from "./actions";
import type { InitialCaregiverFormData } from "./actions";
import { kenya, County } from "@/lib/countries";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CaregiverRegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<InitialCaregiverFormData>({
    national_id_number: "",
    gender: "Male",
    date_of_birth: "",
    county_of_residence: "",
    sub_county_or_constituency: "",
    exact_location: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    emergency_contact_relationship: "",
    whatsapp_number: "",
    preferred_contact_method: "Phone",
    why_caregiving: "",
  });

  const [loading, setLoading] = useState(false);
  const selectedCounty: County | undefined = kenya.counties.find(
    (c) => c.name === formData.county_of_residence
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await upsertInitialCaregiverProfile(formData);
    setLoading(false);

    if (res?.error) {
      toast.error(res.error, {
        description: "Please check your input and try again.",
      });
      return;
    }

    toast.success("Application submitted successfully!", {
      description: "Redirecting to training page...",
    });

    setTimeout(() => {
      router.push("/dashboard/guest/caregiver-registration-form/training");
    }, 1000);
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-gray-800">
              Caregiver Application
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Fill out the form carefully. All fields are required unless stated
              otherwise.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Personal Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    National ID Number
                  </label>
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.national_id_number}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        national_id_number: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.date_of_birth}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date_of_birth: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            {/* Location Details */}
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Location Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    County of Residence
                  </label>
                  <select
                    value={formData.county_of_residence}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        county_of_residence: e.target.value,
                        sub_county_or_constituency: "",
                      })
                    }
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select County</option>
                    {kenya.counties.map((county) => (
                      <option key={county.code} value={county.name}>
                        {county.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Sub-county / Constituency
                  </label>
                  <select
                    value={formData.sub_county_or_constituency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sub_county_or_constituency: e.target.value,
                      })
                    }
                    disabled={!selectedCounty}
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
                  >
                    <option value="">Select Sub-county</option>
                    {selectedCounty?.sub_counties.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col md:col-span-1">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Exact Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kiambu Town"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.exact_location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        exact_location: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            {/* Emergency Contact */}
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Emergency Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.emergency_contact_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergency_contact_name: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.emergency_contact_phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergency_contact_phone: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Relationship"
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.emergency_contact_relationship}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emergency_contact_relationship: e.target.value,
                    })
                  }
                />
              </div>
            </section>

            {/* Contact Preferences */}
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Contact Preferences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="WhatsApp Number"
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.whatsapp_number ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsapp_number: e.target.value,
                    })
                  }
                />

                <select
                  value={formData.preferred_contact_method ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferred_contact_method: e.target.value,
                    })
                  }
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Phone</option>
                  <option>Email</option>
                  <option>WhatsApp</option>
                </select>
              </div>
            </section>

            {/* Motivation */}
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Motivation
              </h2>
              <textarea
                placeholder="Why do you want to be a caregiver?"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
                value={formData.why_caregiving ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, why_caregiving: e.target.value })
                }
              />
            </section>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                disabled={loading}
                className={`px-8 py-3 rounded-lg text-white font-medium transition-all ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Submitting...
                  </span>
                ) : (
                  "Submit & Continue"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
