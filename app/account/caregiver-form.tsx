// components/account/caregiver-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useTransition, useEffect, useCallback } from 'react'
import { upsertCaregiverProfile } from '@/app/account/caregiver/actions' // Corrected path assumption
import { uploadFile } from '@/app/account/upload-actions'
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

const GENDER_OPTIONS = ['Male', 'Female', 'Other'] as const;
const PREFERRED_WORK_TYPE_OPTIONS = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Live-in', 'Hourly'] as const;
const CERTIFICATION_LEVEL_OPTIONS = ['CNA', 'HHA', 'RN', 'LPN', 'Other'] as const;

// NEW: Define options for Specialty, Profession, Country, and Emergency Contact Relationship
const SPECIALTY_OPTIONS = [
  'Pediatric Care', 'Geriatric Care', 'Dementia Care', 'Post-operative Care',
  'Special Needs Care', 'Palliative Care', 'Home Health', 'Companion Care', 'Respite Care', 'Other'
] as const;

const PROFESSION_OPTIONS = [
  "Registered Nurse (RN)", "Licensed Practical Nurse (LPN)", "Certified Nursing Assistant (CNA)",
  "Home Health Aide (HHA)", "Personal Care Assistant (PCA)", "Therapist (Physical/Occupational/Speech)",
  "Medical Assistant", "Care Coordinator", "Social Worker", "Geriatric Care Manager", "Other"
] as const;

// Comprehensive list of countries for 'current_country_of_residence'
const COUNTRY_OPTIONS_WORLDWIDE = [
  "United States", "Canada", "Mexico", "Brazil", "Argentina", "Colombia", "Chile", // Americas
  "United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands", "Sweden", "Poland", "Belgium", "Switzerland", "Austria", // Europe
  "China", "India", "Japan", "South Korea", "Indonesia", "Philippines", "Vietnam", "Thailand", "Malaysia", "Singapore", "Australia", "New Zealand", // Asia-Pacific
  "South Africa", "Nigeria", "Kenya", "Egypt", "Morocco", "Ghana", "Ethiopia", "Tanzania", "Uganda", "Rwanda", "Algeria", // Africa, including East Africa
  "Saudi Arabia", "United Arab Emirates", "Turkey", "Israel", // Middle East
  "Other" // Fallback for any country not listed
] as const;

const RELATIONSHIP_OPTIONS = [
  "Parent", "Spouse", "Child", "Sibling", "Friend", "Other Family Member", "Legal Guardian", "Employer", "Other"
] as const;

// Define specific schemas for JSON parsing and runtime type validation
const availabilityObjectSchema = z.record(z.string()); // e.g., { "monday": "9AM-5PM" }
const emergencyContactObjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  relationship: z.string().min(1, "Relationship is required"),
});
const emergencyContactsArraySchema = z.array(emergencyContactObjectSchema);

// Define the Zod schema for caregiver profile validation
// Updated 'profession', 'specialty', 'country' (renamed to country_of_residence), and 'emergency_contact_relationship'
const caregiverProfileSchema = z.object({
  profession: z.enum(PROFESSION_OPTIONS, { required_error: "Profession is required" }), // Changed to z.enum
  bio: z.string().min(10, "Bio is required"),
  specialty: z.enum(SPECIALTY_OPTIONS, { required_error: "Specialty is required" }), // Already z.enum from previous turn, confirmed
  experience_year: z.number({ invalid_type_error: "Experience year must be a number" }).min(0, "Experience year must be a non-negative number"),
  gender: z.enum(GENDER_OPTIONS, { required_error: "Gender is required" }),
  date_of_birth: z.string().refine(val => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === val;
  }, "Invalid date of birth format (YYYY-MM-DD)"),
  certification_level: z.enum(CERTIFICATION_LEVEL_OPTIONS, { required_error: "Certification level is required" }),
  license_number: z.string().min(1, "License number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country_of_residence: z.enum(COUNTRY_OPTIONS_WORLDWIDE, { required_error: "Country of residence is required" }), // Renamed and changed to z.enum
  preferred_work_type: z.enum(PREFERRED_WORK_TYPE_OPTIONS, { required_error: "Preferred work type is required" }),
  availability: z.string().min(1, "Availability is required").refine(
    (val) => {
      try {
        const parsed = JSON.parse(val);
        availabilityObjectSchema.parse(parsed);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Availability must be valid JSON object (e.g., {\"monday\": \"9AM-5PM\"})" }
  ),
  emergency_contact_name: z.string().min(1, "Emergency contact name is required"),
  emergency_contact_phone: z.string().min(1, "Emergency contact phone is required"),
  emergency_contact_relationship: z.enum(RELATIONSHIP_OPTIONS, { required_error: "Emergency contact relationship is required" }), // Changed to z.enum
  emergency_contacts: z.string().optional().refine(
    (val) => {
      if (!val) return true;
      try {
        const parsed = JSON.parse(val);
        emergencyContactsArraySchema.parse(parsed);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Additional emergency contacts must be a valid JSON array of objects" }
  ),
  profile_picture_url: z.string().url("A valid profile picture URL is required"),
  government_id_url: z.string().url("A valid government ID URL is required"),
  resume_url: z.string().url("A valid resume URL is required"),
  certifications_url: z.array(z.string().url("Each certification must have a valid URL")).min(1, "At least one certification is required"),
});

// Infer the form values type directly from the Zod schema for form input types (before JSON parsing)
type CaregiverFormValues = z.infer<typeof caregiverProfileSchema>;

// Define the type for the payload sent to the server action (after JSON parsing)
type CaregiverServerPayload = Omit<CaregiverFormValues, 'availability' | 'emergency_contacts' | 'country_of_residence'> & {
  availability: Record<string, string>;
  emergency_contacts?: z.infer<typeof emergencyContactsArraySchema>;
  country: CaregiverFormValues['country_of_residence']; // Map to 'country' column in DB
};


interface CaregiverFormProps {
  userId: string;
  defaultValues: Partial<Database['public']['Tables']['caregivers']['Row']>;
}

export function CaregiverForm({ userId, defaultValues }: CaregiverFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<CaregiverFormValues>({
    resolver: zodResolver(caregiverProfileSchema),
    defaultValues: {
      address: defaultValues.address || '',
      availability: defaultValues.availability ? JSON.stringify(defaultValues.availability, null, 2) : '',
      bio: defaultValues.bio || '',
      certification_level: defaultValues.certification_level as typeof CERTIFICATION_LEVEL_OPTIONS[number] || undefined,
      certifications_url: (defaultValues.certifications_url || []) as string[],
      city: defaultValues.city || '',
      country_of_residence: (defaultValues.country as typeof COUNTRY_OPTIONS_WORLDWIDE[number]) || undefined, // Mapped from defaultValues.country
      date_of_birth: defaultValues.date_of_birth || '',
      emergency_contact_name: defaultValues.emergency_contact_name || '',
      emergency_contact_phone: defaultValues.emergency_contact_phone || '',
      emergency_contact_relationship: (defaultValues.emergency_contact_relationship as typeof RELATIONSHIP_OPTIONS[number]) || undefined, // Updated type
      emergency_contacts: defaultValues.emergency_contacts ? JSON.stringify(defaultValues.emergency_contacts, null, 2) : '',
      experience_year: defaultValues.experience_year || 0,
      gender: defaultValues.gender as typeof GENDER_OPTIONS[number] || undefined,
      government_id_url: defaultValues.government_id_url || '',
      license_number: defaultValues.license_number || '',
      preferred_work_type: defaultValues.preferred_work_type as typeof PREFERRED_WORK_TYPE_OPTIONS[number] || undefined,
      profession: (defaultValues.profession as typeof PROFESSION_OPTIONS[number]) || undefined, // Updated type
      profile_picture_url: defaultValues.profile_picture_url || '',
      resume_url: defaultValues.resume_url || '',
      specialty: (defaultValues.specialty as typeof SPECIALTY_OPTIONS[number]) || undefined,
    },
  });

  const { register, handleSubmit, setValue, reset, formState: { errors }, getValues } = form; // Removed 'control' as it's not strictly necessary for simple register/setValue use cases unless using <FormField> components directly

  useEffect(() => {
    reset({
      address: defaultValues.address || '',
      availability: defaultValues.availability ? JSON.stringify(defaultValues.availability, null, 2) : '',
      bio: defaultValues.bio || '',
      certification_level: defaultValues.certification_level as typeof CERTIFICATION_LEVEL_OPTIONS[number] || undefined,
      certifications_url: (defaultValues.certifications_url || []) as string[],
      city: defaultValues.city || '',
      country_of_residence: (defaultValues.country as typeof COUNTRY_OPTIONS_WORLDWIDE[number]) || undefined, // Mapped from defaultValues.country
      date_of_birth: defaultValues.date_of_birth || '',
      emergency_contact_name: defaultValues.emergency_contact_name || '',
      emergency_contact_phone: defaultValues.emergency_contact_phone || '',
      emergency_contact_relationship: (defaultValues.emergency_contact_relationship as typeof RELATIONSHIP_OPTIONS[number]) || undefined, // Updated type
      emergency_contacts: defaultValues.emergency_contacts ? JSON.stringify(defaultValues.emergency_contacts, null, 2) : '',
      experience_year: defaultValues.experience_year || 0,
      gender: defaultValues.gender as typeof GENDER_OPTIONS[number] || undefined,
      government_id_url: defaultValues.government_id_url || '',
      license_number: defaultValues.license_number || '',
      preferred_work_type: defaultValues.preferred_work_type as typeof PREFERRED_WORK_TYPE_OPTIONS[number] || undefined,
      profession: (defaultValues.profession as typeof PROFESSION_OPTIONS[number]) || undefined, // Updated type
      profile_picture_url: defaultValues.profile_picture_url || '',
      resume_url: defaultValues.resume_url || '',
      specialty: (defaultValues.specialty as typeof SPECIALTY_OPTIONS[number]) || undefined,
    });
  }, [defaultValues, reset]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof CaregiverFormValues, isMultiple: boolean = false) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setError("No file selected.");
      return;
    }

    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        const uploadedUrls: string[] = [];
        for (const file of Array.from(files)) {
          const result = await uploadFile(file, "caregiver-documents", userId);
          if (result.error) {
            setError(`Failed to upload ${file.name}: ${result.error}`);
            return;
          }
          if (result.url) {
            uploadedUrls.push(result.url);
          }
        }

        if (isMultiple) {
          const currentUrls = getValues(fieldName) as string[] || [];
          setValue(fieldName, [...currentUrls, ...uploadedUrls] as string[], { shouldValidate: true, shouldDirty: true });
        } else {
          setValue(fieldName, uploadedUrls[0] as string, { shouldValidate: true, shouldDirty: true });
        }
        setSuccess("File(s) uploaded successfully!");
      } catch (err: unknown) {
        console.error("File upload handler error:", err);
        if (err instanceof Error) {
          setError(`An unexpected error occurred during upload: ${err.message}`);
        } else {
          setError("An unexpected error occurred during upload.");
        }
      } finally {
        event.target.value = '';
      }
    });
  }, [userId, getValues, setValue]);

  const steps = [
    {
      title: "Personal & Professional Information",
      fields: ['profession', 'bio', 'specialty', 'experience_year', 'gender', 'date_of_birth', 'certification_level', 'license_number'] as const,
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {/* Profession field now uses Select */}
          <div>
            <Label htmlFor="profession">Profession<span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value: (typeof PROFESSION_OPTIONS)[number]) => setValue('profession', value, { shouldValidate: true })}
              value={getValues('profession') || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your profession" />
              </SelectTrigger>
              <SelectContent>
                {PROFESSION_OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.profession && <p className="text-red-500 text-xs mt-1">{errors.profession.message}</p>}
          </div>
          <div className="col-span-full"> {/* Bio takes full width */}
            <Label htmlFor="bio">Bio<span className="text-red-500">*</span></Label>
            <Textarea id="bio" {...register('bio')} rows={4} placeholder="Tell us about your experience and qualifications..." />
            {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
          </div>
          {/* Specialty field (already Select, confirmed) */}
          <div>
            <Label htmlFor="specialty">Specialty<span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value: (typeof SPECIALTY_OPTIONS)[number]) => setValue('specialty', value, { shouldValidate: true })}
              value={getValues('specialty') || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your primary specialty" />
              </SelectTrigger>
              <SelectContent>
                {SPECIALTY_OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.specialty && <p className="text-red-500 text-xs mt-1">{errors.specialty.message}</p>}
          </div>
          <div>
            <Label htmlFor="experience_year">Years of Experience<span className="text-red-500">*</span></Label>
            <Input id="experience_year" type="number" {...register('experience_year', { valueAsNumber: true })} placeholder="e.g., 5" />
            {errors.experience_year && <p className="text-red-500 text-xs mt-1">{errors.experience_year.message}</p>}
          </div>
          <div>
            <Label htmlFor="gender">Gender<span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value: (typeof GENDER_OPTIONS)[number]) => setValue('gender', value, { shouldValidate: true })}
              value={getValues('gender') || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
          </div>
          <div>
            <Label htmlFor="date_of_birth">Date of Birth<span className="text-red-500">*</span></Label>
            <Input id="date_of_birth" type="date" {...register('date_of_birth')} />
            {errors.date_of_birth && <p className="text-red-500 text-xs mt-1">{errors.date_of_birth.message}</p>}
          </div>
          <div>
            <Label htmlFor="certification_level">Certification Level<span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value: (typeof CERTIFICATION_LEVEL_OPTIONS)[number]) => setValue('certification_level', value, { shouldValidate: true })}
              value={getValues('certification_level') || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Certification Level" />
              </SelectTrigger>
              <SelectContent>
                {CERTIFICATION_LEVEL_OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.certification_level && <p className="text-red-500 text-xs mt-1">{errors.certification_level.message}</p>}
          </div>
          <div>
            <Label htmlFor="license_number">License Number<span className="text-red-500">*</span></Label>
            <Input id="license_number" {...register('license_number')} placeholder="Your professional license number" />
            {errors.license_number && <p className="text-red-500 text-xs mt-1">{errors.license_number.message}</p>}
          </div>
        </div>
      ),
    },
    {
      title: "Contact & Preferences",
      fields: ['address', 'city', 'country_of_residence', 'preferred_work_type', 'availability'] as const, // Updated field name
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          <div className="col-span-full"> {/* Address takes full width */}
            <Label htmlFor="address">Address<span className="text-red-500">*</span></Label>
            <Input id="address" {...register('address')} placeholder="Street address" />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
          </div>
          <div>
            <Label htmlFor="city">City<span className="text-red-500">*</span></Label>
            <Input id="city" {...register('city')} placeholder="City" />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
          </div>
          {/* Country of Residence field now uses Select */}
          <div>
            <Label htmlFor="country_of_residence">Current Country of Residence<span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value: (typeof COUNTRY_OPTIONS_WORLDWIDE)[number]) => setValue('country_of_residence', value, { shouldValidate: true })}
              value={getValues('country_of_residence') || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your country of residence" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRY_OPTIONS_WORLDWIDE.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country_of_residence && <p className="text-red-500 text-xs mt-1">{errors.country_of_residence.message}</p>}
          </div>
          <div>
            <Label htmlFor="preferred_work_type">Preferred Work Type<span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value: (typeof PREFERRED_WORK_TYPE_OPTIONS)[number]) => setValue('preferred_work_type', value, { shouldValidate: true })}
              value={getValues('preferred_work_type') || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Work Type" />
              </SelectTrigger>
              <SelectContent>
                {PREFERRED_WORK_TYPE_OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.preferred_work_type && <p className="text-red-500 text-xs mt-1">{errors.preferred_work_type.message}</p>}
          </div>
          <div className="col-span-full"> {/* Availability takes full width */}
            <Label htmlFor="availability">Availability (JSON Format)<span className="text-red-500">*</span></Label>
            <Textarea id="availability" {...register('availability')} rows={6}
              placeholder={`e.g.,\n{\n  "monday": "9AM-5PM",\n  "tuesday": "9AM-5PM"\n}`}
            />
            {errors.availability && <p className="text-red-500 text-xs mt-1">{errors.availability.message}</p>}
          </div>
        </div>
      ),
    },
    {
      title: "Emergency Information & Documents",
      fields: ['emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relationship', 'emergency_contacts', 'profile_picture_url', 'government_id_url', 'resume_url', 'certifications_url'] as const,
      render: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          <div>
            <Label htmlFor="emergency_contact_name">Emergency Contact Name<span className="text-red-500">*</span></Label>
            <Input id="emergency_contact_name" {...register('emergency_contact_name')} placeholder="Full name of emergency contact" />
            {errors.emergency_contact_name && <p className="text-red-500 text-xs mt-1">{errors.emergency_contact_name.message}</p>}
          </div>
          <div>
            <Label htmlFor="emergency_contact_phone">Emergency Contact Phone<span className="text-red-500">*</span></Label>
            <Input id="emergency_contact_phone" type="tel" {...register('emergency_contact_phone')} placeholder="+1234567890" />
            {errors.emergency_contact_phone && <p className="text-red-500 text-xs mt-1">{errors.emergency_contact_phone.message}</p>}
          </div>
          {/* Emergency Contact Relationship now uses Select */}
          <div>
            <Label htmlFor="emergency_contact_relationship">Emergency Contact Relationship<span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value: (typeof RELATIONSHIP_OPTIONS)[number]) => setValue('emergency_contact_relationship', value, { shouldValidate: true })}
              value={getValues('emergency_contact_relationship') || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                {RELATIONSHIP_OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.emergency_contact_relationship && <p className="text-red-500 text-xs mt-1">{errors.emergency_contact_relationship.message}</p>}
          </div>
          <div className="col-span-full"> {/* Additional Emergency Contacts takes full width */}
            <Label htmlFor="emergency_contacts">Additional Emergency Contacts (JSON Array)</Label>
            <Textarea id="emergency_contacts" {...register('emergency_contacts')} rows={6}
              placeholder={`e.g.,\n[\n  {"name": "Jane Doe", "phone": "0987654321", "relationship": "Sister"}\n]`}
            />
            {errors.emergency_contacts && <p className="text-red-500 text-xs mt-1">{errors.emergency_contacts.message}</p>}
          </div>
          <div>
            <Label htmlFor="profile_picture_url">Profile Picture<span className="text-red-500">*</span></Label>
            <Input id="profile_picture_url" type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'profile_picture_url')} />
            {getValues('profile_picture_url') && (
              <p className="text-sm mt-1">Current: <a href={getValues('profile_picture_url')} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Profile Picture</a></p>
            )}
            {errors.profile_picture_url && <p className="text-red-500 text-xs mt-1">{errors.profile_picture_url.message}</p>}
          </div>
          <div>
            <Label htmlFor="government_id_url">Government ID (e.g., Passport, National ID)<span className="text-red-500">*</span></Label>
            <Input id="government_id_url" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, 'government_id_url')} />
            {getValues('government_id_url') && (
              <p className="text-sm mt-1">Current: <a href={getValues('government_id_url')} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Government ID</a></p>
            )}
            {errors.government_id_url && <p className="text-red-500 text-xs mt-1">{errors.government_id_url.message}</p>}
          </div>
          <div>
            <Label htmlFor="resume_url">Resume/CV<span className="text-red-500">*</span></Label>
            <Input id="resume_url" type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFileUpload(e, 'resume_url')} />
            {getValues('resume_url') && (
              <p className="text-sm mt-1">Current: <a href={getValues('resume_url')} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Resume</a></p>
            )}
            {errors.resume_url && <p className="text-red-500 text-xs mt-1">{errors.resume_url.message}</p>}
          </div>
          <div>
            <Label htmlFor="certifications_url">Certifications (Multiple Files)<span className="text-red-500">*</span></Label>
            <Input id="certifications_url" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, 'certifications_url', true)} />
            {getValues('certifications_url')?.length > 0 && (
              <div className="mt-1 text-sm">
                Current: {getValues('certifications_url').map((url, index) => (
                  <span key={index} className="mr-2"><a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{`Certification ${index + 1}`}</a></span>
                ))}
              </div>
            )}
            {errors.certifications_url && <p className="text-red-500 text-xs mt-1">{errors.certifications_url.message}</p>}
          </div>
        </div>
      ),
    },
  ];

  const onSubmit = async (formData: CaregiverFormValues) => {
    setError(null);
    setSuccess(null);

    let parsedAvailability: Record<string, string>;
    try {
      parsedAvailability = JSON.parse(formData.availability);
    } catch {
      setError("Failed to parse Availability JSON. Please check the format.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    let parsedEmergencyContacts: z.infer<typeof emergencyContactsArraySchema> | undefined;
    if (formData.emergency_contacts) {
      try {
        parsedEmergencyContacts = JSON.parse(formData.emergency_contacts);
      } catch {
        setError("Failed to parse Additional Emergency Contacts JSON. Please check the format.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    // Prepare payload for server action, mapping 'country_of_residence' back to 'country'
    const payload: CaregiverServerPayload = {
      ...formData,
      availability: parsedAvailability,
      emergency_contacts: parsedEmergencyContacts,
      country: formData.country_of_residence, // Map country_of_residence to 'country' for DB
    };

    startTransition(async () => {
      const result = await upsertCaregiverProfile(userId, payload);
      if (result && 'error' in result) {
        setError(result.error);
        setSuccess(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSuccess("Caregiver profile updated successfully!");
      }
    });
  };

  const goToNextStep = async () => {
    const fieldsToValidate = steps[currentStep].fields;

    let currentStepHasErrors = false;
    await handleSubmit(
      () => {
        currentStepHasErrors = false;
      },
      (formErrors) => {
        currentStepHasErrors = fieldsToValidate.some(field => formErrors[field as keyof typeof formErrors]);
      }
    )();

    if (!currentStepHasErrors) {
      setCurrentStep(prev => prev + 1);
      setError(null);
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