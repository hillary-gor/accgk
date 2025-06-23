'use client'

import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useTransition, useEffect } from 'react'
import { updateUserProfile } from '@/app/account/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const memberRoles = [
  "caregiver",
  "institution",
] as const;

const schema = z
  .object({
    first_name: z.string().min(2, 'First name is required'),
    last_name: z.string().min(2, 'Last name is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    gender: z.enum(['Male', 'Female', 'Other'], {
      required_error: 'Gender is required',
    }),
    date_of_birth: z.string().min(1, 'Date of birth is required'),
    location: z.string().min(2, 'Location is required'),
    role: z.enum(memberRoles, {
      required_error: 'Role is required',
    }),
  });

type AccountFormValues = z.infer<typeof schema>;

interface AccountFormProps {
  userId: string;
  defaultValues: {
    first_name?: string | null;
    last_name?: string | null;
    phone?: string | null;
    gender?: 'Male' | 'Female' | 'Other' | null;
    date_of_birth?: string | null;
    location?: string | null;
    role?: (typeof memberRoles)[number] | null;
  };
}

export function AccountForm({ userId, defaultValues }: AccountFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: defaultValues.first_name || '',
      last_name: defaultValues.last_name || '',
      phone: defaultValues.phone || '',
      gender: defaultValues.gender || undefined,
      date_of_birth: defaultValues.date_of_birth || '',
      location: defaultValues.location || '',
      role: defaultValues.role || undefined,
    },
  });

  const watchedRole = useWatch({ control, name: 'role' });

  useEffect(() => {
    reset({
      first_name: defaultValues.first_name || '',
      last_name: defaultValues.last_name || '',
      phone: defaultValues.phone || '',
      gender: defaultValues.gender || undefined,
      date_of_birth: defaultValues.date_of_birth || '',
      location: defaultValues.location || '',
      role: defaultValues.role || undefined,
    });
  }, [defaultValues, reset]);


  const onSubmit = async (formData: AccountFormValues) => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const result = await updateUserProfile(userId, formData);
      if (result && 'error' in result) {
        setError(result.error);
        setSuccess(null);
      } else {
        setSuccess("Profile updated successfully!");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-4">
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

      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input id="first_name" {...register('first_name')} />
        {errors.first_name && (
          <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input id="last_name" {...register('last_name')} />
        {errors.last_name && (
          <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" {...register('phone')} />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select
          onValueChange={(value: "Male" | "Female" | "Other") => setValue('gender', value, { shouldValidate: true })}
          value={defaultValues.gender || 'Male'}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.gender && (
          <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="date_of_birth">Date of Birth</Label>
        <Input id="date_of_birth" type="date" {...register('date_of_birth')} />
        {errors.date_of_birth && (
          <p className="text-red-500 text-xs mt-1">{errors.date_of_birth.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" {...register('location')} />
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          onValueChange={(value: (typeof memberRoles)[number]) => setValue('role', value, { shouldValidate: true })}
          value={watchedRole || defaultValues.role || undefined}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            {memberRoles.map((role) => (
              <SelectItem key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Profile'}
      </Button>
    </form>
  );
}