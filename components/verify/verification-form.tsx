"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, User, CreditCard } from "lucide-react"
import Image from "next/image"

export default function VerificationForm() {
  const [name, setName] = useState("")
  const [certNumber, setCertNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState("")

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")

    // Validate that at least one field is filled
    if (!name && !certNumber) {
      setFormError("Please enter a name or certification number")
      return
    }

    // Simulate form submission
    setIsSubmitting(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false)

      // Trigger the verification result display
      // In a real app, this would come from an API response
      const verificationResultElement = document.getElementById("verification-result")
      if (verificationResultElement) {
        verificationResultElement.classList.remove("hidden")
        verificationResultElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 1500)
  }

  return (
    <div className="relative mb-16">
      {/* Decorative background elements */}
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-[color:var(--accgk-pink)]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[color:var(--accgk-blue)]/10 rounded-full blur-3xl"></div>

      <div className="relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-xl p-6 md:p-8">
        <div className="grid md:grid-cols-5 gap-8 items-center">
          {/* Left side - Form */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold text-[color:var(--accgk-blue)] mb-2">Verification Portal</h2>
            <p className="text-gray-600 mb-6">
              Enter the caregiver's full name or certification number to verify their credentials.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="flex items-center text-gray-700">
                    <User className="w-4 h-4 mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter caregiver's full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <div className="border-t border-gray-200 w-full"></div>
                  <span className="px-4 text-gray-500 bg-white text-sm">OR</span>
                  <div className="border-t border-gray-200 w-full"></div>
                </div>

                <div>
                  <Label htmlFor="certNumber" className="flex items-center text-gray-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Certification Number
                  </Label>
                  <Input
                    id="certNumber"
                    type="text"
                    placeholder="Enter certification ID number"
                    value={certNumber}
                    onChange={(e) => setCertNumber(e.target.value)}
                    className="mt-1 w-full"
                  />
                </div>
              </div>

              {formError && <div className="text-red-500 text-sm animate-pulse">{formError}</div>}

              <Button
                type="submit"
                className="w-full bg-[color:var(--accgk-blue)] hover:bg-[color:var(--accgk-blue)]/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Search className="mr-2 h-5 w-5" />
                    Verify Now
                  </span>
                )}
              </Button>

              <div className="text-xs text-gray-500 text-center">
                This verification service is provided by ACCGK to confirm the certification status of caregivers in
                Kenya.
              </div>
            </form>
          </div>

          {/* Right side - Image */}
          <div className="hidden md:block md:col-span-2">
            <div className="relative h-64 w-full">
              <Image
                src="/placeholder.svg?height=400&width=300&text=Verification+Scan"
                alt="Digital verification scan illustration"
                fill
                className="object-contain"
              />
            </div>
            <div className="bg-[color:var(--accgk-blue)]/5 rounded-lg p-4 mt-4">
              <h3 className="font-medium text-[color:var(--accgk-blue)] mb-2">Why Verify?</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="bg-[color:var(--accgk-pink)]/20 text-[color:var(--accgk-pink)] rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  Ensure your caregiver is properly certified
                </li>
                <li className="flex items-start">
                  <span className="bg-[color:var(--accgk-pink)]/20 text-[color:var(--accgk-pink)] rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  Confirm certification is current and valid
                </li>
                <li className="flex items-start">
                  <span className="bg-[color:var(--accgk-pink)]/20 text-[color:var(--accgk-pink)] rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  Protect yourself and your loved ones
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
