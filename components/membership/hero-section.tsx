import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-xl overflow-hidden shadow-lg mb-16 text-white">
      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Left Column - Text Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Elevate Your Caregiving Career with ACCGK Membership</h2>
          <p className="text-white/90 mb-8">
            Join Kenya's premier community of certified caregivers and healthcare institutions. Gain access to
            professional development, networking opportunities, and resources that will enhance your career and improve
            patient care standards.
          </p>
          <div>
            <Button
              asChild
              size="lg"
              className="bg-white text-teal-600 hover:bg-white/90 hover:text-teal-700 font-semibold"
            >
              <Link href="/membership/join">Join Now</Link>
            </Button>
          </div>
        </div>

        {/* Right Column - Image/Video */}
        <div className="relative rounded-lg overflow-hidden h-[300px] md:h-auto">
          <Image
            src="/placeholder.svg?height=600&width=800&text=ACCGK+Membership+Video"
            alt="ACCGK membership benefits video thumbnail"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
