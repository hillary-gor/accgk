"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { upsertInstitutionDetails } from "./actions";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { kenya } from "@/lib/countries";
import { InstitutionFormSchema, InstitutionFormData } from "./schema";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function InstitutionDetailsForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<InstitutionFormData>({
    institution_name: "",
    institution_type: "",
    bio: "",
    county: "",
    city: "",
    physical_address: "",
    postal_code: "",
    website: "",
    linkedin_profile: "",
    years_in_operation: 0,
    contact_person_name: "",
    contact_person_phone: "",
    details: null,
    location: null,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const parsed = InstitutionFormSchema.safeParse(formData);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message;
      toast.error(firstError || "Please review your input.");
      setLoading(false);
      return;
    }

    try {
      const res = await upsertInstitutionDetails({
        ...parsed.data,
        years_in_operation: parsed.data.years_in_operation
          ? Number(parsed.data.years_in_operation)
          : null,
      });

      if (res.error) {
        toast.error(res.error, {
          description: "Please review your input and try again.",
        });
      } else {
        toast.success("Institution details saved successfully!", {
          description: "Proceed to upload qualification documents.",
        });
        setTimeout(() => {
          router.push(
            "/dashboard/guest/institution-registration-form/institution-qualifications"
          );
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-gray-800">
              Institution Registration
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Provide basic information about your institution.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Institution Info */}
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Institution Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Institution Name */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Your training institution"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.institution_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        institution_name: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Institution Type */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Institution Type
                  </label>
                  <select
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.institution_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        institution_type: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="training_institution">
                      Training Institution
                    </option>
                    <option value="hospital_or_health_facility">
                      Hospital or Health Facility
                    </option>
                    <option value="home_care_agency">Home Care Agency</option>
                    <option value="rehabilitation_centre">
                      Rehabilitation Centre
                    </option>
                    <option value="nursing_home">Nursing Home</option>
                    <option value="cbo">
                      Community-Based Organization (CBO)
                    </option>
                    <option value="fbo">Faith-Based Organization (FBO)</option>
                    <option value="ngo_nonprofit">NGO / Nonprofit</option>
                    <option value="consultancy_support_service">
                      Consultancy / Support Service
                    </option>
                    <option value="government_department">
                      Government Department or Program
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6 flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Short Description / Bio
                </label>
                <textarea
                  placeholder="Briefly describe your institution’s mission, services, or specialty..."
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
                  value={formData.bio ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bio: e.target.value,
                    })
                  }
                />
              </div>
            </section>

            {/* Location */}
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Location Details
              </h2>

              {/* County & Sub-county / Region */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* County */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    County
                  </label>
                  <select
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.county}
                    onChange={(e) => {
                      const selectedCounty = e.target.value;
                      setFormData({
                        ...formData,
                        county: selectedCounty,
                        city: "",
                      });
                    }}
                    required
                  >
                    <option value="">Select County</option>
                    {kenya.counties.map((county) => (
                      <option key={county.code} value={county.name}>
                        {county.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sub-county / Region */}
                <AnimatePresence>
                  {formData.county && (
                    <motion.div
                      key="subcounty"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col"
                    >
                      <label className="text-sm font-medium text-gray-600 mb-1">
                        Sub-county / Region
                      </label>
                      <select
                        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            city: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Select Sub-county / Region</option>
                        {kenya.counties
                          .find((c) => c.name === formData.county)
                          ?.sub_counties?.map((sub) => (
                            <option key={sub} value={sub}>
                              {sub}
                            </option>
                          )) ?? []}
                      </select>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Address */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Physical Address */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Physical Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Next to Joska Police Station"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.physical_address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        physical_address: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Postal Code */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Postal Code (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 00232"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.postal_code ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        postal_code: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            {/* Contact Section (unchanged) */}
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Contact & Online Presence
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Name */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jane Doe"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.contact_person_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact_person_name: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Contact Phone */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+2547..."
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.contact_person_phone ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact_person_phone: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Website */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Website (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.website ?? ""}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </div>

                {/* LinkedIn */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    LinkedIn (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/company/..."
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.linkedin_profile ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        linkedin_profile: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Years in operation (slider) */}
                <div className="flex flex-col md:col-span-2 mt-4">
                  <Label className="text-sm font-medium text-gray-600 mb-2">
                    Years in Operation:{" "}
                    <span className="font-semibold text-blue-600">
                      {formData.years_in_operation ?? 0} year
                      {(formData.years_in_operation ?? 0) > 1 ? "s" : ""}
                    </span>
                  </Label>
                  <Slider
                    min={0}
                    max={50}
                    step={1}
                    value={[formData.years_in_operation ?? 0]}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        years_in_operation: value[0],
                      })
                    }
                  />
                </div>
              </div>
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
                    Saving...
                  </span>
                ) : (
                  "Save & Continue"
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
