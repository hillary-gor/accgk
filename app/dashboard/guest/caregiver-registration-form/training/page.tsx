"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertCaregiverTraining, TrainingFormData } from "../actions";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CaregiverTrainingForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TrainingFormData>({
    highest_qualification: "",
    caregiving_certification: "",
    training_institution_name: "",
    training_completion_year: "",
    has_bls_certification: false,
    other_relevant_trainings: "",
  });

  // Optional: fetch existing training info
  useEffect(() => {
    async function fetchData() {
      try {
        const { getCaregiverTraining } = await import("../actions");
        const data = await getCaregiverTraining();

        if (!data) return;

        // Set plain JS object into state
        setFormData({
          highest_qualification: data.highest_qualification ?? "",
          caregiving_certification: data.caregiving_certification ?? "",
          training_institution_name: data.training_institution_name ?? "",
          training_completion_year: data.training_completion_year ?? "",
          has_bls_certification: data.has_bls_certification ?? false,
          other_relevant_trainings: data.other_relevant_trainings ?? "",
        });
      } catch (err) {
        console.error("Error fetching caregiver training info:", err);
      }
    }

    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await upsertCaregiverTraining(formData);
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Training Information saved!");
    router.push("/dashboard/guest/caregiver-registration-form/payment");
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-gray-800">
              Caregiver Training & Certification
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Provide your education and caregiving certification details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Training Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Training Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="text"
                  placeholder="Highest Qualification (e.g., High School)"
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.highest_qualification}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      highest_qualification: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Caregiving Certification (e.g., KCSE)"
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.caregiving_certification ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      caregiving_certification: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Training Institution Name"
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.training_institution_name ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      training_institution_name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <input
                  type="text"
                  placeholder="Training Completion Year (YYYY)"
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.training_completion_year ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      training_completion_year: e.target.value,
                    })
                  }
                />
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <input
                    type="checkbox"
                    checked={formData.has_bls_certification}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        has_bls_certification: e.target.checked,
                      })
                    }
                  />
                  <label className="text-gray-700">Has BLS Certification</label>
                </div>
                <input
                  type="text"
                  placeholder="Other Relevant Trainings"
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.other_relevant_trainings ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      other_relevant_trainings: e.target.value,
                    })
                  }
                />
              </div>
            </section>

            {/* SUBMIT */}
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
