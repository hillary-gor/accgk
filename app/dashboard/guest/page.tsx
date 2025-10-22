"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PreviewDialog } from "./components/preview-dialog/";

interface MembershipInfo {
  id: string;
  title: string;
  image_url: string;
  description: string[];
  detailed_description?: string;
  fee_details: string[];
  action_label: string | null;
}

// Logo URL
const logoUrl =
  "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/institution-logos/accgk%20official%20logo.png";

export default function GuestDashboard() {
  const router = useRouter();
  const [memberships, setMemberships] = useState<MembershipInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [selected, setSelected] = useState<MembershipInfo | null>(null);

  useEffect(() => {
    async function fetchMemberships() {
      try {
        const res = await fetch("/api/membership-categories");
        const data: MembershipInfo[] = await res.json();
        setMemberships(data);
        toast.success("Memberships loaded successfully");
      } catch {
        toast.error("Failed to load membership categories");
      } finally {
        setLoading(false);
      }
    }

    fetchMemberships();

    // Keep intro visible for 5 seconds minimum
    const introTimer = setTimeout(() => setShowIntro(false), 5000);
    return () => clearTimeout(introTimer);
  }, []);

  // Animated intro screen
  if (showIntro) {
    return (
      <motion.div
        key="intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-white"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center"
        >
          <Image
            src={logoUrl}
            alt="ACCGK Logo"
            width={100}
            height={100}
            className="mb-6 drop-shadow-md"
          />
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl font-semibold text-gray-800"
          >
            Welcome to ACCGK
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-gray-500 mt-2"
          >
            Preparing your membership experience...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  // While data is loading (after intro)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading memberships...
        </p>
      </div>
    );
  }

  // Main Content
  return (
    <main className="min-h-screen bg-white py-16 px-6 relative">
      {/* Close button - top right */}
      <div className="absolute top-6 right-6">
        <Button
          onClick={() => router.push("/")}
          variant="ghost"
          className="rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
        >
          ✕ Close
        </Button>
      </div>

      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-800">
          Join Us Today
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select how you&apos;d like to be part of the ACCGK community, whether
          you’re a caregiver, institution, or employer, there’s a place for you!
        </p>
      </section>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {memberships.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer"
            onClick={() => setSelected(item)}
          >
            <Card className="overflow-hidden rounded-2xl border hover:shadow-lg transition-all bg-white p-4">
              <div className="relative w-full aspect-square">
                <Image
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title || "Category Image"}
                  fill
                  className="object-cover rounded-2xl"
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
                src={selected.image_url || "/placeholder.svg"}
                alt={selected.title}
                fill
                className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              />
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-between bg-white">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                  {selected.title}
                </h2>

                <ul className="space-y-2 mb-6 text-gray-700 leading-relaxed text-[15px]">
                  {selected.description.map((point, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-blue-500 text-sm mt-[2px]">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 mb-6">
                  <h3 className="text-base font-semibold text-blue-700 mb-2">
                    Membership Details
                  </h3>
                  {selected.fee_details.map((fee, i) => (
                    <p key={i} className="text-sm text-gray-700 leading-snug">
                      {fee}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => {
                    toast.info("Coming soon!", {
                      description: `${
                        selected.action_label ?? "Registration"
                      } flow is being prepared.`,
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 text-sm font-medium shadow-md hover:shadow-lg transition-all"
                >
                  {selected.action_label ?? "Register"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </PreviewDialog>
    </main>
  );
}
