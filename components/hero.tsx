'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-white via-[color:var(--accgk-blue)]/5 to-white text-blue-600 overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 items-center gap-12">
          {/* Text Content Left */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Association of Certified Caregivers Kenya
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-500">
              Uplifting Caregiving Standards in Kenya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-[#AB056A] hover:bg-[#AB056A]/90 text-white shadow-md"
              >
                <Link href="/membership/join" aria-label="Get Certified in Pink">
                  Get Certified
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-[var(--accgk-blue)] hover:bg-[var(--accgk-blue)]/90 text-white shadow-md"
              >
                <Link href="#cta" aria-label="Get Certified in Blue">
                  Why join?
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Image Right */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="relative w-full aspect-[4/3] md:aspect-[4/3] lg:aspect-video rounded-xl overflow-hidden shadow-xl"
          >
            <Image
              src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets/neema-and-shanice-accgk.JPG"
              alt="Professional caregivers providing compassionate care"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Optional Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
