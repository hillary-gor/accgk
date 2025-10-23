'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition, useEffect } from 'react'
import { upsertInstitutionProfile } from '@/app/dashboard/guest/institution/actions'
import { Database } from '@/types/supabase'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import z from 'zod'

const INSTITUTION_TYPE_OPTIONS = ['Hospital', 'Clinic', 'Rehabilitation Center', 'Nursing Home', 'Home Care Agency', 'Other'] as const;
const INSTITUTION_STATUS_OPTIONS = ['Active', 'Pending Review', 'Suspended', 'Rejected'] as const;

export const institutionProfileSchema = z.object({
  institution_name: z.string().min(2, "Institution name is required"),
  institution_type: z.enum(INSTITUTION_TYPE_OPTIONS, { required_error: "Institution type is required" }),
  years_in_operation: z.number({ invalid_type_error: "Years in operation must be a number" }).min(0, "Years in operation is required"),
  bio: z.string().min(10, "Bio is required"),
  status: z.enum(INSTITUTION_STATUS_OPTIONS, { required_error: "Status is required" }),
  rating: z.number().min(0).max(5).optional().nullable(),
  contact_person_name: z.string().min(2, "Contact person name is required"),
  contact_person_phone: z.string().min(7, "Contact person phone is required"),
  website: z.string().url("Website must be a valid URL"),
  linkedin_profile: z.string().url("LinkedIn profile must be a valid URL"),
  physical_address: z.string().min(2, "Physical address is required"),
  city: z.string().min(2, "City is required"),
  county: z.string().min(2, "County is required"),
  postal_code: z.string().min(2, "Postal code is required"),
  // Simplified location to string as JSON input is removed
  location: z.string().optional().nullable(),
  // Removed institution_logo_url, registration_certificate_url
  license_number: z.string().min(2, "License number is required"),
  // Removed license_documents_url, accreditation_files_url
  // Simplified details to string as JSON input is removed
  details: z.string().optional().nullable(),
});

type InstitutionFormValues = z.infer<typeof institutionProfileSchema>;

interface InstitutionFormProps {
  userId: string;
  defaultValues: Partial<Database['public']['Tables']['institutions']['Row']>;
}

export function InstitutionForm({ userId, defaultValues }: InstitutionFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    getValues,
    trigger
  } = useForm<InstitutionFormValues>({
    resolver: zodResolver(institutionProfileSchema),
    defaultValues: {
      // Removed accreditation_files_url
      bio: defaultValues.bio || '',
      city: defaultValues.city || '',
      contact_person_name: defaultValues.contact_person_name || '',
      contact_person_phone: defaultValues.contact_person_phone || '',
      county: defaultValues.county || '',
      details: (defaultValues.details && typeof defaultValues.details === 'object') ? JSON.stringify(defaultValues.details, null, 2) : defaultValues.details as string || '',
      // Removed institution_logo_url
      institution_name: defaultValues.institution_name || '',
      institution_type: defaultValues.institution_type as typeof INSTITUTION_TYPE_OPTIONS[number] || undefined,
      // Removed license_documents_url
      license_number: defaultValues.license_number || '',
      linkedin_profile: defaultValues.linkedin_profile || '',
      location: (defaultValues.location && typeof defaultValues.location === 'object') ? JSON.stringify(defaultValues.location, null, 2) : defaultValues.location as string || '',
      physical_address: defaultValues.physical_address || '',
      postal_code: defaultValues.postal_code || '',
      rating: defaultValues.rating || undefined,
      // Removed registration_certificate_url
      status: defaultValues.status as typeof INSTITUTION_STATUS_OPTIONS[number] || undefined,
      website: defaultValues.website || '',
      years_in_operation: defaultValues.years_in_operation || 0,
    },
  });

  useEffect(() => {
    reset({
      // Removed accreditation_files_url
      bio: defaultValues.bio || '',
      city: defaultValues.city || '',
      contact_person_name: defaultValues.contact_person_name || '',
      contact_person_phone: defaultValues.contact_person_phone || '',
      county: defaultValues.county || '',
      details: (defaultValues.details && typeof defaultValues.details === 'object') ? JSON.stringify(defaultValues.details, null, 2) : defaultValues.details as string || '',
      // Removed institution_logo_url
      institution_name: defaultValues.institution_name || '',
      institution_type: defaultValues.institution_type as typeof INSTITUTION_TYPE_OPTIONS[number] || undefined,
      // Removed license_documents_url
      license_number: defaultValues.license_number || '',
      linkedin_profile: defaultValues.linkedin_profile || '',
      location: (defaultValues.location && typeof defaultValues.location === 'object') ? JSON.stringify(defaultValues.location, null, 2) : defaultValues.location as string || '',
      physical_address: defaultValues.physical_address || '',
      postal_code: defaultValues.postal_code || '',
      rating: defaultValues.rating || undefined,
      // Removed registration_certificate_url
      status: defaultValues.status as typeof INSTITUTION_STATUS_OPTIONS[number] || undefined,
      website: defaultValues.website || '',
      years_in_operation: defaultValues.years_in_operation || 0,
    });
  }, [defaultValues, reset]);

  const steps = [
    {
      title: "Basic Information",
      fields: ['institution_name', 'institution_type', 'years_in_operation', 'bio', 'status', 'rating'] as const,
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          <div>
            <Label htmlFor="institution_name">Institution Name<span className="text-red-500">*</span></Label>
            <Input id="institution_name" {...register('institution_name')} placeholder="e.g., General Hospital" />
            {errors.institution_name && <p className="text-red-500 text-xs mt-1">{errors.institution_name.message}</p>}
          </div>
          <div>
            <Label htmlFor="institution_type">Institution Type<span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value: (typeof INSTITUTION_TYPE_OPTIONS)[number]) => setValue('institution_type', value, { shouldValidate: true })}
              value={getValues('institution_type') || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Institution Type" />
              </SelectTrigger>
              <SelectContent>
                {INSTITUTION_TYPE_OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.institution_type && <p className="text-red-500 text-xs mt-1">{errors.institution_type.message}</p>}
          </div>
          <div>
            <Label htmlFor="years_in_operation">Years in Operation<span className="text-red-500">*</span></Label>
            <Input id="years_in_operation" type="number" {...register('years_in_operation', { valueAsNumber: true })} placeholder="e.g., 10" />
            {errors.years_in_operation && <p className="text-red-500 text-xs mt-1">{errors.years_in_operation.message}</p>}
          </div>
          <div className="col-span-full">
            <Label htmlFor="bio">Bio / Mission Statement<span className="text-red-500">*</span></Label>
            <Textarea id="bio" {...register('bio')} rows={4} placeholder="Describe your institution's mission and services..." />
            {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
          </div>
          <div>
            <Label htmlFor="status">Status<span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value: (typeof INSTITUTION_STATUS_OPTIONS)[number]) => setValue('status', value, { shouldValidate: true })}
              value={getValues('status') || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {INSTITUTION_STATUS_OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
          </div>
          <div>
            <Label htmlFor="rating">Rating (0-5, optional)</Label>
            <Input id="rating" type="number" step="0.1" min="0" max="5" {...register('rating', { valueAsNumber: true })} placeholder="e.g., 4.5" />
            {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}
          </div>
        </div>
      ),
    },
    {
      title: "Contact & Location",
      fields: ['contact_person_name', 'contact_person_phone', 'website', 'linkedin_profile', 'physical_address', 'city', 'county', 'postal_code', 'location'] as const,
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          <div>
            <Label htmlFor="contact_person_name">Contact Person Name<span className="text-red-500">*</span></Label>
            <Input id="contact_person_name" {...register('contact_person_name')} placeholder="Full name of primary contact" />
            {errors.contact_person_name && <p className="text-red-500 text-xs mt-1">{errors.contact_person_name.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact_person_phone">Contact Person Phone<span className="text-red-500">*</span></Label>
            <Input id="contact_person_phone" type="tel" {...register('contact_person_phone')} placeholder="+1234567890" />
            {errors.contact_person_phone && <p className="text-red-500 text-xs mt-1">{errors.contact_person_phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="website">Website URL<span className="text-red-500">*</span></Label>
            <Input id="website" type="url" {...register('website')} placeholder="https://www.yourinstitution.com" />
            {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>}
          </div>
          <div>
            <Label htmlFor="linkedin_profile">LinkedIn Profile URL<span className="text-red-500">*</span></Label>
            <Input id="linkedin_profile" type="url" {...register('linkedin_profile')} placeholder="https://linkedin.com/company/yourinstitution" />
            {errors.linkedin_profile && <p className="text-red-500 text-xs mt-1">{errors.linkedin_profile.message}</p>}
          </div>
          <div className="col-span-full">
            <Label htmlFor="physical_address">Physical Address<span className="text-red-500">*</span></Label>
            <Input id="physical_address" {...register('physical_address')} placeholder="Street address of your institution" />
            {errors.physical_address && <p className="text-red-500 text-xs mt-1">{errors.physical_address.message}</p>}
          </div>
          <div>
            <Label htmlFor="city">City<span className="text-red-500">*</span></Label>
            <Input id="city" {...register('city')} placeholder="City" />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
          </div>
          <div>
            <Label htmlFor="county">County<span className="text-red-500">*</span></Label>
            <Input id="county" {...register('county')} placeholder="County" />
            {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county.message}</p>}
          </div>
          <div>
            <Label htmlFor="postal_code">Postal Code<span className="text-red-500">*</span></Label>
            <Input id="postal_code" {...register('postal_code')} placeholder="e.g., 12345" />
            {errors.postal_code && <p className="text-red-500 text-xs mt-1">{errors.postal_code.message}</p>}
          </div>
          <div className="col-span-full">
            <Label htmlFor="location">General Location / Coordinates (Optional)</Label>
            <Input id="location" {...register('location')} placeholder="e.g., Latitude: -1.286389, Longitude: 36.817223" />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>
        </div>
      ),
    },
    {
      title: "Licensing & Additional Information", // Updated title
      fields: ['license_number', 'details'] as const, // Removed all URL fields
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          <div>
            <Label htmlFor="license_number">License Number<span className="text-red-500">*</span></Label>
            <Input id="license_number" {...register('license_number')} placeholder="Your institution's license number" />
            {errors.license_number && <p className="text-red-500 text-xs mt-1">{errors.license_number.message}</p>}
          </div>
          <div className="col-span-full">
            <Label htmlFor="details">Additional Details</Label>
            <Textarea id="details" {...register('details')} rows={6} placeholder="Any other relevant information about your institution, e.g., operating hours, unique services." />
            {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details.message}</p>}
          </div>
        </div>
      ),
    },
  ];

  const onSubmit = async (formData: InstitutionFormValues) => {
    setError(null);
    setSuccess(null);

    // No need to parse details or location here if they are just strings.
    // The backend should handle parsing if it expects specific formats.
    const payload = {
      ...formData,
      // If your backend still expects 'details' and 'location' as objects,
      // you'll need to re-introduce parsing logic or adjust the backend.
      // For now, they're passed as strings as per the schema change.
    };

    startTransition(async () => {
      const result = await upsertInstitutionProfile(userId, payload);
      if (result && 'error' in result) {
        setError(result.error);
        setSuccess(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSuccess("Institution profile updated successfully!");
      }
    });
  };

  const goToNextStep = async () => {
    const fieldsToValidate = steps[currentStep].fields;
    const isValid = await trigger(fieldsToValidate as readonly (keyof InstitutionFormValues)[]);

    if (isValid) {
      setCurrentStep(prev => prev + 1);
      setError(null);
      setSuccess(null);
    } else {
      setError("Please correct the errors in the current step before proceeding.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
    setError(null);
    setSuccess(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full px-8 py-6">
      {(error || success) && (
        <Alert variant={error ? "destructive" : "default"} className={success ? "border-green-500 text-green-700 dark:text-green-300" : ""}>
          <Terminal className="h-4 w-4" />
          <AlertTitle>{error ? "Error" : "Success"}</AlertTitle>
          <AlertDescription>{error || success}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between mb-6 border-b border-gray-200 dark:border-gray-700">
        {steps.map((step, index) => (
          <div key={index} className={`flex-1 text-center py-3 ${index === currentStep ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-500'}`}>
            <span className="block text-sm md:text-base">{`Step ${index + 1}`}</span>
            <span className="hidden md:block text-xs text-gray-400">{step.title}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {steps[currentStep].render()}
      </div>

      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <Button type="button" variant="outline" onClick={goToPreviousStep} disabled={isPending}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="button" onClick={goToNextStep} className="ml-auto" disabled={isPending}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="submit" className="ml-auto" disabled={isPending}>
            {isPending ? 'Completing Profile...' : 'Complete Profile'}
          </Button>
        )}
      </div>
    </form>
  );
}