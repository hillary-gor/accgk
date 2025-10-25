"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  upsertCaregiverTraining,
  getCaregiverTraining,
  TrainingFormData,
} from "../actions";
import Header from "@/components/header";
import Footer from "@/components/footer";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CaregiverTrainingForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [formData, setFormData] = useState<TrainingFormData>({
    highest_qualification: "",
    caregiving_certification: "",
    training_institution_name: "",
    training_completion_year: "",
    has_bls_certification: false,
    other_relevant_trainings: "",
  });

  // Fetch existing training info
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCaregiverTraining();
        if (data) {
          // Toast feedback
          toast.info("You’ve already submitted your training info.", {
            description: "Would you like to edit it or skip to the next step?",
            duration: 5000,
          });

          // Fill form and show dialog
          setFormData({
            highest_qualification: data.highest_qualification ?? "",
            caregiving_certification: data.caregiving_certification ?? "",
            training_institution_name: data.training_institution_name ?? "",
            training_completion_year: data.training_completion_year ?? "",
            has_bls_certification: data.has_bls_certification ?? false,
            other_relevant_trainings: data.other_relevant_trainings ?? "",
          });
          setTimeout(() => setShowDialog(true), 800);
        }
      } catch (err) {
        console.error("Error fetching caregiver training info:", err);
        toast.error("Failed to load training information.");
      }
    }

    fetchData();
  }, []);

  // Handle form submit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const res = await upsertCaregiverTraining(formData);
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Training information saved successfully!");
    router.push("/dashboard/guest/caregiver-registration-form/payment");
  }

  // Qualification options (Kenya)
  const qualificationOptions = [
    "High School (KCSE)",
    "High School Diploma (IGCSE)",
    "Vocational Training",
    "Certificate",
    "Diploma",
    "Higher Diploma",
    "Bachelor’s Degree",
    "Master’s Degree",
    "Doctorate (PhD)",
  ];

  // Caregiving certification options
  const caregivingCertOptions = [
    "Certificate in Caregiving",
    "Diploma in Caregiving",
    "Health Care Assistant Certificate",
    "Community Health Worker Certificate",
    "Nursing Assistant Certificate",
    "Home-Based Caregiver Certificate",
    "Palliative Care Training",
    "Geriatric Care Training",
    "First Aid & CPR Certification",
    "Other",
  ];

  return (
    <>
      <Header />

      {/* Dialog for already submitted info */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Training Info Already Submitted</DialogTitle>
            <DialogDescription>
              You’ve already provided your caregiver training information. Would
              you like to edit it or skip to the next step?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                toast.message("Skipped editing. Proceeding to next step.");
                setShowDialog(false);
                router.push(
                  "/dashboard/guest/caregiver-registration-form/payment"
                );
              }}
            >
              Skip to Next
            </Button>
            <Button
              onClick={() => {
                toast.message("You can now edit your information.");
                setShowDialog(false);
              }}
            >
              Edit Info
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-gray-800">
              Caregiver Training & Certification
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Tell us about your education and caregiving training journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Training Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Highest Qualification */}
                <select
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.highest_qualification || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      highest_qualification: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Highest Qualification</option>
                  {qualificationOptions.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>

                {/* Caregiving Certification */}
                <select
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.caregiving_certification || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      caregiving_certification: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Caregiving Certification</option>
                  {caregivingCertOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                {/* Institution */}
                <input
                  type="text"
                  placeholder="Training Institution Name"
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.training_institution_name || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      training_institution_name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {/* Completion Year */}
                <input
                  type="text"
                  placeholder="Training Completion Year (YYYY)"
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.training_completion_year || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      training_completion_year: e.target.value,
                    })
                  }
                  required
                />

                {/* BLS Checkbox */}
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <input
                    type="checkbox"
                    checked={formData.has_bls_certification || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        has_bls_certification: e.target.checked,
                      })
                    }
                  />
                  <label className="text-gray-700">Has BLS Certification</label>
                </div>

                {/* Other Trainings */}
                <input
                  type="text"
                  placeholder="Other Relevant Trainings"
                  className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.other_relevant_trainings || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      other_relevant_trainings: e.target.value,
                    })
                  }
                />
              </div>
            </section>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="px-8 py-3 text-white font-medium"
              >
                {loading ? "Saving..." : "Save & Continue"}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
