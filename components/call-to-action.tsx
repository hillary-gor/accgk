import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section id="cta" className="py-16 md:py-24 relative text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//neema-janet-pricilla-shanice-sandy.JPG"
          alt="Caregivers in a training session"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[color:var(--accgk-blue)]/80"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the ACCGK Community</h2>
          <p className="text-xl mb-10 text-white/90">
            Whether you're a caregiver seeking certification or an institution looking to partner with us, ACCGK
            provides the framework and support you need to excel in the caregiving profession.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-lg">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Caregivers</h3>
              <p className="mb-6 text-white/80">
                Get certified, access professional development, and join a community of recognized caregiving
                professionals.
              </p>
              <Button asChild className="w-full bg-[color:var(--accgk-pink)] hover:bg-[color:var(--accgk-pink)]/90">
                <Link href="#contact">Register as a Caregiver</Link>
              </Button>
            </div>

            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 shadow-lg">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Institutions</h3>
              <p className="mb-6 text-white/80">
                Partner with ACCGK to ensure your caregiving staff meet national standards and receive ongoing
                professional support.
              </p>
              <Button asChild className="w-full bg-white text-[color:var(--accgk-blue)] hover:bg-white/90">
                <Link href="#contact">Partner with ACCGK</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
