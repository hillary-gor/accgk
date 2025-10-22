"use client";

import Image from "next/image";
import { useState } from "react";
import { PreviewDialog } from "./components/preview-dialog/";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface MembershipInfo {
  title: string;
  image: string;
  description: string[];
  feeDetails: string[];
  actionLabel: string;
}

const memberships: MembershipInfo[] = [
  {
    title: "For Caregivers",
    image:
      "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets/neema-mbuno-baby-manikin.JPG",
    description: [
      "Professional recognition through ACCGK certification",
      "Access to continuing professional development opportunities",
      "Networking with fellow caregivers and healthcare professionals",
      "Career advancement and job placement assistance",
      "Representation in policy discussions and advocacy",
      "Discounted rates for workshops, conferences, and training",
    ],
    feeDetails: [
      "Annual Fee: KES 6,000",
      "First Time Application: KES 10,000",
      "Total: KES 16,000",
    ],
    actionLabel: "Register as a Caregiver",
  },
  {
    title: "For Institutions",
    image:
      "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets/IMG_0297.JPG",
    description: [
      "Enhanced credibility through ACCGK institutional accreditation",
      "Access to a database of certified caregivers for recruitment",
      "Participation in setting industry standards and best practices",
      "Discounted group certification for staff members",
      "Visibility through ACCGK's network and marketing channels",
      "Collaborative research and development opportunities",
    ],
    feeDetails: ["Annual Fee: KES 50,000"],
    actionLabel: "Register Your Institution",
  },
  {
    title: "For Employers / Recruitment Partners",
    image:
      "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets/IMG_0312.JPG",
    description: [
      "Access to verified and certified caregivers for recruitment",
      "Post job openings directly through the ACCGK employer dashboard",
      "Streamlined hiring with candidate matching and shortlisting tools",
      "Brand visibility through ACCGK’s employer network",
      "Participation in national caregiver recruitment fairs and events",
      "Accreditation as a trusted employer partner in the caregiving sector",
    ],
    feeDetails: ["Annual Fee: KES 10,000"],
    actionLabel: "Register as an Employer",
  },
];

export default function GuestDashboard() {
  const [selected, setSelected] = useState<MembershipInfo | null>(null);

  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-800">
          Join Us Today
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select how you&apos;d like to be part of the ACCGK community — whether
          you’re a caregiver, institution, or employer, there’s a place for you!
        </p>
      </section>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {memberships.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer"
            onClick={() => setSelected(item)}
          >
            <Card className="overflow-hidden rounded-2xl border hover:shadow-lg transition-all bg-white p-4">
              <div className="relative w-full aspect-square">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-2xl border"
                />
              </div>
              <CardHeader className="text-center p-5">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {item.title}
                </CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal Dialog */}
      <PreviewDialog open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="flex flex-col md:flex-row items-stretch w-full">
            {/* Left: Image */}
            <div className="relative w-full md:w-1/2 aspect-square overflow-hidden bg-gray-100">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                className="object-cover rounded-none md:rounded-l-2xl"
              />
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-between bg-white">
              <div>
                {/* Title */}
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                  {selected.title}
                </h2>

                {/* Description */}
                <ul className="space-y-2 mb-6 text-gray-700 leading-relaxed text-[15px]">
                  {selected.description.map((point, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-blue-500 text-sm mt-[2px]">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Fee Box */}
                <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 mb-6">
                  <h3 className="text-base font-semibold text-blue-700 mb-2">
                    Membership Details
                  </h3>
                  {selected.feeDetails.map((fee, i) => (
                    <p key={i} className="text-sm text-gray-700 leading-snug">
                      {fee}
                    </p>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() =>
                    alert(`${selected.actionLabel} flow coming soon!`)
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 text-sm font-medium shadow-md hover:shadow-lg transition-all"
                >
                  {selected.actionLabel}
                </Button>
              </div>
            </div>
          </div>
        )}
      </PreviewDialog>
    </main>
  );
}
