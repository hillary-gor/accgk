"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition, useEffect } from "react";
import { updateUserProfile } from "@/app/account/account-form-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { kenya } from "@/lib/countries";

// --- Zod schema ---
const schema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["Male", "Female", "Other"], { message: "Gender is required" }),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  county: z.string().min(1, "County is required"),
  subcounty: z.string().min(1, "Subcounty is required"),
  ward: z.string().optional(),
  town: z.string().optional(),
});

type AccountFormValues = z.infer<typeof schema>;

interface AccountFormProps {
  userId: string;
  defaultValues?: Partial<AccountFormValues> & {
    location?: {
      country?: string;
      county?: string;
      subcounty?: string;
      ward?: string | null;
      town?: string | null;
    } | null;
  };
}

export function AccountForm({ userId, defaultValues = {} }: AccountFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Derive values for prefilling
  const prefillCounty =
    defaultValues.county ??
    (defaultValues.location?.county as string | undefined) ??
    "";
  const prefillSubcounty =
    defaultValues.subcounty ??
    (defaultValues.location?.subcounty as string | undefined) ??
    "";
  const prefillWard =
    defaultValues.ward ?? (defaultValues.location?.ward ?? "") ?? "";
  const prefillTown =
    defaultValues.town ?? (defaultValues.location?.town ?? "") ?? "";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: defaultValues.first_name ?? "",
      last_name: defaultValues.last_name ?? "",
      phone: defaultValues.phone ?? "",
      gender: defaultValues.gender ?? "Male",
      date_of_birth: defaultValues.date_of_birth ?? "",
      county: prefillCounty,
      subcounty: prefillSubcounty,
      ward: prefillWard,
      town: prefillTown,
    },
  });

  const selectedCounty = watch("county");

  // when county changes, reset subcounty if it doesn't belong
  useEffect(() => {
    if (!selectedCounty) {
      setValue("subcounty", "");
      return;
    }

    const countyObj = kenya.counties.find((c) => c.name === selectedCounty);
    const validSubs = countyObj?.sub_counties ?? [];

    if (!validSubs.includes(watch("subcounty") ?? "")) {
      setValue("subcounty", "");
    }
  }, [selectedCounty, setValue, watch]);

  const onSubmit = async (formData: AccountFormValues) => {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        const locationPayload = {
          country: "Kenya",
          county: formData.county,
          subcounty: formData.subcounty,
          ward: formData.ward ?? null,
          town: formData.town ?? null,
        };

        const result = await updateUserProfile(userId, {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          gender: formData.gender,
          date_of_birth: formData.date_of_birth,
          location: locationPayload,
        } as unknown);

        if (result && "error" in result) {
          setError(result.error || "An error occurred while saving profile.");
          setSuccess(null);
        } else {
          setSuccess("Profile updated successfully! Redirecting...");
          setTimeout(() => {
            window.location.href = "/dashboard/guest";
          }, 1400);
        }
      } catch (err) {
        console.error("Update user profile failed:", err);
        setError(err instanceof Error ? err.message : "Unexpected error");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto p-4"
      noValidate
    >
      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 text-green-700 dark:text-green-300">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* First name */}
      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input id="first_name" {...register("first_name")} />
        {errors.first_name && (
          <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
        )}
      </div>

      {/* Last name */}
      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input id="last_name" {...register("last_name")} />
        {errors.last_name && (
          <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" {...register("phone")} />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Gender */}
      <div>
        <Label htmlFor="gender">Gender</Label>
        <select
          id="gender"
          {...register("gender")}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
        )}
      </div>

      {/* Date of birth */}
      <div>
        <Label htmlFor="date_of_birth">Date of Birth</Label>
        <Input id="date_of_birth" type="date" {...register("date_of_birth")} />
        {errors.date_of_birth && (
          <p className="text-red-500 text-xs mt-1">{errors.date_of_birth.message}</p>
        )}
      </div>

      {/* County */}
      <div>
        <Label htmlFor="county">County</Label>
        <select
          id="county"
          {...register("county")}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="">Select County</option>
          {kenya.counties.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.county && (
          <p className="text-red-500 text-xs mt-1">{errors.county.message}</p>
        )}
      </div>

      {/* Subcounty */}
      <div>
        <Label htmlFor="subcounty">Subcounty</Label>
        <select
          id="subcounty"
          {...register("subcounty")}
          className="w-full border px-2 py-1 rounded"
          disabled={!selectedCounty}
        >
          <option value="">Select Subcounty</option>
          {selectedCounty &&
            kenya.counties
              .find((c) => c.name === selectedCounty)
              ?.sub_counties.map((sc) => (
                <option key={sc} value={sc}>
                  {sc}
                </option>
              ))}
        </select>
        {errors.subcounty && (
          <p className="text-red-500 text-xs mt-1">{errors.subcounty.message}</p>
        )}
      </div>

      {/* Ward */}
      <div>
        <Label htmlFor="ward">Ward (optional)</Label>
        <Input id="ward" {...register("ward")} />
      </div>

      {/* Town */}
      <div>
        <Label htmlFor="town">Town (optional)</Label>
        <Input id="town" {...register("town")} />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}
