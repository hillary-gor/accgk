// components/account/account-form.tsx
'use client'

import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useTransition, useEffect, useCallback } from 'react'
import { updateUserProfile, uploadAvatar } from '@/app/account/actions'
import Image from 'next/image'
import Cropper, { Area } from 'react-easy-crop'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import getCroppedImg from '@/lib/cropImage'
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
  "admin",
  "assessor",
  "trainer",
] as const;

const schema = z
  .object({
    full_name: z.string().min(2, 'Full name is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    gender: z.enum(['Male', 'Female', 'Other'], {
      required_error: 'Gender is required',
    }),
    dob: z.string().min(1, 'Date of birth is required'),
    location: z.string().min(2, 'Location is required'),
    role: z.enum(memberRoles, {
      required_error: 'Role is required',
    }),
    user_id: z.string().optional(),
    avatar_url: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.role === 'admin' || data.role === 'assessor' || data.role === 'trainer') &&
      !data.user_id
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Staff ID is required for this role',
        path: ['user_id'],
      })
    }
  });

type AccountFormValues = z.infer<typeof schema>;

interface AccountFormProps {
  userId: string;
  defaultValues: {
    full_name?: string | null;
    phone?: string | null;
    gender?: 'Male' | 'Female' | 'Other' | null;
    dob?: string | null;
    location?: string | null;
    role?: (typeof memberRoles)[number] | null;
    user_id?: string | null;
    avatar_url?: string | null;
  };
}

export function AccountForm({ userId, defaultValues }: AccountFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(defaultValues.avatar_url || null);


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
      full_name: defaultValues.full_name || '',
      phone: defaultValues.phone || '',
      gender: defaultValues.gender || undefined,
      dob: defaultValues.dob || '',
      location: defaultValues.location || '',
      role: defaultValues.role || undefined,
      user_id: defaultValues.user_id || '',
      avatar_url: defaultValues.avatar_url || '',
    },
  });

  const watchedRole = useWatch({ control, name: 'role' });

  useEffect(() => {
    reset({
      full_name: defaultValues.full_name || '',
      phone: defaultValues.phone || '',
      gender: defaultValues.gender || undefined,
      dob: defaultValues.dob || '',
      location: defaultValues.location || '',
      role: defaultValues.role || undefined,
      user_id: defaultValues.user_id || '',
      avatar_url: defaultValues.avatar_url || '',
    });
    setAvatarPreviewUrl(defaultValues.avatar_url || null);
  }, [defaultValues, reset]);


  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const croppedImageFile = new File([croppedImageBlob], `avatar-${userId}.png`, {
        type: 'image/png',
      });

      startTransition(async () => {
        const { data, error: uploadErr } = await uploadAvatar(userId, croppedImageFile);
        if (uploadErr) {
          setError(uploadErr);
          setSuccess(null);
        } else if (data?.path) {
          setValue('avatar_url', data.path);
          setAvatarPreviewUrl(data.path);
          setSuccess("Avatar uploaded successfully!");
          setError(null);
        }
        setCropDialogOpen(false);
      });
    } catch (cropError: unknown) {
      if (cropError instanceof Error) {
        setError(`Image cropping failed: ${cropError.message}`);
      } else {
        setError('Image cropping failed due to an unknown error.');
      }
      setSuccess(null);
    }
  };

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

      <div className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
          {avatarPreviewUrl ? (
            <Image
              src={avatarPreviewUrl}
              alt="Avatar"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 text-xs">
              No Avatar
            </div>
          )}
        </div>
        <Label htmlFor="avatar-upload" className="cursor-pointer">
          <Button type="button" variant="outline" size="sm">
            Change Avatar
          </Button>
          <Input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </Label>
      </div>

      <div>
        <Label htmlFor="full_name">Full Name</Label>
        <Input id="full_name" {...register('full_name')} />
        {errors.full_name && (
          <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>
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
          value={watchedRole ? (defaultValues.gender || 'Male') : undefined}
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
        <Label htmlFor="dob">Date of Birth</Label>
        <Input id="dob" type="date" {...register('dob')} />
        {errors.dob && (
          <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
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

      {(watchedRole === 'admin' || watchedRole === 'assessor' || watchedRole === 'trainer') && (
        <div>
          <Label htmlFor="user_id">Staff ID</Label>
          <Input id="user_id" {...register('user_id')} />
          {errors.user_id && (
            <p className="text-red-500 text-xs mt-1">{errors.user_id.message}</p>
          )}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Profile'}
      </Button>

      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className="p-0 overflow-hidden max-w-md w-[90vw] sm:w-full">
          <div className="relative w-full h-[min(80vw,400px)] bg-black">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="round"
                showGrid={false}
                objectFit="horizontal-cover"
              />
            )}
          </div>

          <div className="px-4 py-3 bg-background">
            <Label htmlFor="zoom" className="text-sm font-medium block mb-1">
              Zoom
            </Label>
            <Input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          <div className="flex justify-between gap-2 p-4 border-t bg-background">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCropDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleCropConfirm}
              className="flex-1"
              disabled={isPending}
            >
              {isPending ? 'Uploading...' : 'Crop & Upload'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
}