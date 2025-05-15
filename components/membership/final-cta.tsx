import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"

export default function FinalCta() {
  return (
    <div className="bg-teal-50 rounded-xl p-8 md:p-12 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Secure Your Membership Today</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Join the growing community of professional caregivers and healthcare institutions committed to excellence in
        caregiving standards across Kenya.
      </p>

      <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 mb-8">
        <Link href="/membership/join">Join Now</Link>
      </Button>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600">
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-teal-600 mr-2" />
          <span>membership@accgk.org</span>
        </div>
        <div className="hidden sm:block">•</div>
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-teal-600 mr-2" />
          <span>+254 700 123456</span>
        </div>
      </div>
    </div>
  )
}
