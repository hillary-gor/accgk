import { Card, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"
import Image from "next/image"

export default function CertificatePreview() {
  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Membership Certificate</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Upon successful registration and verification, you'll receive an official ACCGK membership certificate
          recognizing your professional status.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-teal-200 shadow-lg overflow-hidden">
          <div className="relative bg-gradient-to-r from-teal-500/10 to-teal-600/10 p-8">
            {/* Certificate Header */}
            <div className="absolute top-4 right-4">
              <Award className="h-16 w-16 text-teal-600" />
            </div>

            <div className="text-center mb-8">
              <div className="relative h-20 w-full mb-4">
                <Image
                  src="/placeholder.svg?height=80&width=300&text=ACCGK+Logo"
                  alt="ACCGK Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Association of Certified Caregivers Kenya</h3>
              <p className="text-gray-600">Official Membership Certificate</p>
            </div>

            {/* Certificate Content */}
            <CardContent className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <p className="text-center text-gray-700 mb-6">This certifies that</p>
              <p className="text-center text-2xl font-bold text-teal-600 mb-6">[Member Name]</p>
              <p className="text-center text-gray-700 mb-6">
                is a registered member of the Association of Certified Caregivers Kenya
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Membership ID</p>
                  <p className="font-semibold text-gray-800">ACCGK-2023-12345</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Valid Until</p>
                  <p className="font-semibold text-gray-800">December 31, 2024</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="relative h-16 w-32">
                  <Image
                    src="/placeholder.svg?height=60&width=120&text=Signature"
                    alt="Official Signature"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative h-16 w-16">
                  <Image
                    src="/placeholder.svg?height=60&width=60&text=Seal"
                    alt="Official Seal"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </CardContent>

            <p className="text-center text-sm text-gray-500">
              This certificate verifies membership status and is the property of ACCGK.
              <br />
              Verification available at verify.accgk.org using the Membership ID.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
