"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    bio: "",
  })
  const [institutionData, setInstitutionData] = useState({
    name: "",
    registrationNumber: "",
    address: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
  })

  useEffect(() => {
    if (!user) return

    const fetchProfileData = async () => {
      setIsLoading(true)
      try {
        // Get user role
        const role = user.user_metadata?.role
        setUserRole(role)

        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (profileError && profileError.code !== "PGRST116") throw profileError

        if (profileData) {
          setProfileData({
            firstName: profileData.first_name || "",
            lastName: profileData.last_name || "",
            phoneNumber: profileData.phone_number || "",
            address: profileData.address || "",
            bio: profileData.bio || "",
          })
        }

        // If user is an institution, fetch institution data
        if (role === "institution") {
          const { data: institutionData, error: institutionError } = await supabase
            .from("institutions")
            .select("*")
            .eq("user_id", user.id)
            .single()

          if (institutionError && institutionError.code !== "PGRST116") throw institutionError

          if (institutionData) {
            setInstitutionData({
              name: institutionData.name || "",
              registrationNumber: institutionData.registration_number || "",
              address: institutionData.address || "",
              contactPerson: institutionData.contact_person || "",
              contactEmail: institutionData.contact_email || "",
              contactPhone: institutionData.contact_phone || "",
            })
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error)
        toast({
          title: "Error",
          description: "Failed to fetch profile data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfileData()
  }, [user, toast])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleInstitutionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInstitutionData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    if (!user) return

    setIsSaving(true)
    try {
      // Update profile data
      const { error: profileError } = await supabase.from("profiles").upsert({
        user_id: user.id,
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        phone_number: profileData.phoneNumber,
        address: profileData.address,
        bio: profileData.bio,
        updated_at: new Date().toISOString(),
      })

      if (profileError) throw profileError

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveInstitution = async () => {
    if (!user || userRole !== "institution") return

    setIsSaving(true)
    try {
      // Update institution data
      const { error: institutionError } = await supabase.from("institutions").upsert({
        user_id: user.id,
        name: institutionData.name,
        registration_number: institutionData.registrationNumber,
        address: institutionData.address,
        contact_person: institutionData.contactPerson,
        contact_email: institutionData.contactEmail,
        contact_phone: institutionData.contactPhone,
        updated_at: new Date().toISOString(),
      })

      if (institutionError) throw institutionError

      toast({
        title: "Institution Profile Updated",
        description: "Your institution profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating institution profile:", error)
      toast({
        title: "Error",
        description: "Failed to update institution profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">Manage your personal information and settings</p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            {userRole === "institution" && <TabsTrigger value="institution">Institution Details</TabsTrigger>}
          </TabsList>
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" value={profileData.lastName} onChange={handleProfileChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={profileData.address} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          {userRole === "institution" && (
            <TabsContent value="institution">
              <Card>
                <CardHeader>
                  <CardTitle>Institution Details</CardTitle>
                  <CardDescription>Update your institution's information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Institution Name</Label>
                    <Input id="name" name="name" value={institutionData.name} onChange={handleInstitutionChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      name="registrationNumber"
                      value={institutionData.registrationNumber}
                      onChange={handleInstitutionChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institutionAddress">Address</Label>
                    <Input
                      id="institutionAddress"
                      name="address"
                      value={institutionData.address}
                      onChange={handleInstitutionChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={institutionData.contactPerson}
                      onChange={handleInstitutionChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        value={institutionData.contactEmail}
                        onChange={handleInstitutionChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        value={institutionData.contactPhone}
                        onChange={handleInstitutionChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveInstitution} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </DashboardShell>
  )
}
