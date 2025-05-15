import VerificationForm from "@/components/verify/verification-form"
import VerificationResult from "@/components/verify/verification-result"
import SupportFooter from "@/components/verify/support-footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function VerifyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-accgk-blue to-accgk-blue/80 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=Digital+Verification+Background"
            alt="Digital verification background with healthcare professionals"
            fill
            priority
            className="object-cover opacity-30 mix-blend-overlay"
          />
        </div>

        {/* Navigation */}
        <div className="container mx-auto px-4 pt-6 relative z-10">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Homepage
          </Link>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Verify a Certified Caregiver</h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Confirm the authenticity of caregiver certification in seconds.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Verification Form and Results Section */}
      <section className="py-12 md:py-20 bg-white flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <VerificationForm />
            <VerificationResult />
          </div>
        </div>
      </section>

      {/* Support Footer */}
      <SupportFooter />
    </main>
  )
}
