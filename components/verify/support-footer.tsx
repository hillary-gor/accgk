import Link from "next/link"
import { Phone, Mail, HelpCircle } from "lucide-react"

export default function SupportFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-accgk-blue mb-4 flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Need Help?
              </h3>
              <p className="text-gray-600 mb-4">
                If you need assistance with verification or have questions about a caregiver's certification, our
                support team is here to help.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <Phone className="w-4 h-4 mr-2 text-accgk-pink" />
                  <span>+254 700 000000</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail className="w-4 h-4 mr-2 text-accgk-pink" />
                  <span>verification@accgk.org</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-accgk-blue hover:text-accgk-pink transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-accgk-blue hover:text-accgk-pink transition-colors">
                    About Certification
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-accgk-blue hover:text-accgk-pink transition-colors">
                    Register as a Caregiver
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-accgk-blue hover:text-accgk-pink transition-colors">
                    Report Fraudulent Activity
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-accgk-blue hover:text-accgk-pink transition-colors">
                    Contact ACCGK
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Association of Certified Caregivers Kenya. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
