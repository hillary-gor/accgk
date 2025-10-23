"use client";

import { useState, useTransition } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { caregiverSchema, CaregiverFormData } from "./schema";
import { upsertCaregiverProfile } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CaregiverFormProps {
  profileId: string;
  defaultValues?: Partial<CaregiverFormData>;
}

// Define steps
const steps = [
  "Personal & ID Info",
  "Location",
  "Emergency Contact & Next of Kin",
  "Education & Training",
  "Work Experience",
  "References",
  "Motivations & Personal Info",
  "Health & Contact",
];

export default function CaregiverForm({
  profileId,
  defaultValues,
}: CaregiverFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPending, startTransition] = useTransition();

  const methods = useForm<CaregiverFormData>({
    resolver: zodResolver(caregiverSchema),
    defaultValues: {
      has_birth_certificate: false,
      has_passport: false,
      has_bls_certification: false,
      willing_to_work_nights_or_weekends: false,
      has_criminal_record: false,
      willing_to_provide_references: false,
      is_physically_able: true,
      ...defaultValues,
    },
    mode: "onBlur",
  });

  const { handleSubmit, register } = methods;

  const onSubmit = (data: CaregiverFormData) => {
    startTransition(async () => {
      try {
        await upsertCaregiverProfile(profileId, data);
        toast.success("Profile submitted successfully!");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Submission failed.");
      }
    });
  };

  const nextStep = () =>
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  // Step Components
  const StepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>National ID Number</Label>
              <Input {...register("national_id_number")} />
            </div>
            <div>
              <Label>Alternate ID Type</Label>
              <Input {...register("alt_id_type")} />
            </div>
            <div>
              <Checkbox {...register("has_birth_certificate")} />
              <Label>Has Birth Certificate</Label>
            </div>
            <div>
              <Checkbox {...register("has_passport")} />
              <Label>Has Passport</Label>
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Input type="date" {...register("date_of_birth")} />
            </div>
            <div>
              <Label>Gender</Label>
              <Input {...register("gender")} />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>County</Label>
              <Input {...register("county_of_residence")} />
            </div>
            <div>
              <Label>Sub-County / Constituency</Label>
              <Input {...register("sub_county_or_constituency")} />
            </div>
            <div className="col-span-2">
              <Label>Exact Location</Label>
              <Input {...register("exact_location")} />
            </div>
          </div>
        );
      case 2:
        return (
          <>
            <h3 className="font-medium text-gray-700 mt-4">
              Emergency Contact
            </h3>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <Input
                placeholder="Name"
                {...register("emergency_contact_name")}
              />
              <Input
                placeholder="Phone"
                {...register("emergency_contact_phone")}
              />
              <Input
                placeholder="Relationship"
                {...register("emergency_contact_relationship")}
              />
            </div>
            <h3 className="font-medium text-gray-700 mt-4">Next of Kin</h3>
            <div className="grid grid-cols-4 gap-4 mt-2">
              <Input placeholder="Name" {...register("next_of_kin_name")} />
              <Input placeholder="Phone" {...register("next_of_kin_phone")} />
              <Input
                placeholder="Relationship"
                {...register("next_of_kin_relationship")}
              />
              <Input
                placeholder="Location"
                {...register("next_of_kin_location")}
              />
            </div>
          </>
        );
      case 3:
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Highest Qualification</Label>
              <Input {...register("highest_qualification")} />
            </div>
            <div>
              <Label>Caregiving Certification</Label>
              <Input {...register("caregiving_certification")} />
            </div>
            <div>
              <Label>Training Institution</Label>
              <Input {...register("training_institution_name")} />
            </div>
            <div>
              <Label>Training Completion Year</Label>
              <Input {...register("training_completion_year")} />
            </div>
            <div>
              <Checkbox {...register("has_bls_certification")} />
              <Label>Has BLS Certification</Label>
            </div>
            <div>
              <Label>Other Relevant Trainings</Label>
              <Input {...register("other_relevant_trainings")} />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Years of Experience</Label>
              <Input
                type="number"
                {...register("years_of_experience", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label>Current Employment Status</Label>
              <Input {...register("current_employment_status")} />
            </div>
            <div>
              <Label>Last Employer</Label>
              <Input {...register("last_employer_name")} />
            </div>
            <div>
              <Label>Last Job Title</Label>
              <Input {...register("last_job_title")} />
            </div>
            <div className="col-span-2">
              <Label>Work Experience Description</Label>
              <Textarea {...register("work_experience_description")} />
            </div>
            <div className="col-span-2">
              <Label>Specialized Skills</Label>
              <Textarea {...register("specialized_skills")} />
            </div>
            <div className="col-span-2">
              <Label>Language Proficiency</Label>
              <Input {...register("language_proficiency")} />
            </div>
            <div className="col-span-2">
              <Label>Preferred Work Environment</Label>
              <Input {...register("preferred_work_environment")} />
            </div>
            <div>
              <Checkbox {...register("willing_to_work_nights_or_weekends")} />
              <Label>Willing to Work Nights/Weekends</Label>
            </div>
            <div>
              <Checkbox {...register("has_criminal_record")} />
              <Label>Has Criminal Record</Label>
            </div>
            <div>
              <Checkbox {...register("willing_to_provide_references")} />
              <Label>Willing to Provide References</Label>
            </div>
          </div>
        );
      case 5:
        return (
          <>
            <div className="grid grid-cols-3 gap-4">
              <Input
                placeholder="Reference 1 Name"
                {...register("reference_1_name")}
              />
              <Input
                placeholder="Relationship"
                {...register("reference_1_relationship")}
              />
              <Input
                placeholder="Contact"
                {...register("reference_1_contact")}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <Input
                placeholder="Reference 2 Name"
                {...register("reference_2_name")}
              />
              <Input
                placeholder="Relationship"
                {...register("reference_2_relationship")}
              />
              <Input
                placeholder="Contact"
                {...register("reference_2_contact")}
              />
            </div>
          </>
        );
      case 6:
        return (
          <>
            <Label>Why Caregiving?</Label>
            <Textarea {...register("why_caregiving")} />
            <Label>Career Goals</Label>
            <Textarea {...register("career_goals")} />
            <Label>Personal Strengths</Label>
            <Textarea {...register("personal_strengths")} />
            <Label>Relevant Volunteer Experience</Label>
            <Textarea {...register("relevant_volunteer_experience")} />
          </>
        );
      case 7:
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Checkbox {...register("is_physically_able")} />
              <Label>Physically Able</Label>
            </div>
            <div>
              <Label>Vaccination Status</Label>
              <Input {...register("vaccination_status")} />
            </div>
            <div>
              <Label>Religious Affiliation</Label>
              <Input {...register("religious_affiliation")} />
            </div>
            <div>
              <Label>WhatsApp Number</Label>
              <Input {...register("whatsapp_number")} />
            </div>
            <div>
              <Label>Preferred Contact Method</Label>
              <Input {...register("preferred_contact_method")} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </h2>

        <StepContent />

        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit Registration"}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
