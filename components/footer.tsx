import Link from "next/link"
import Image from "next/image"
import { Linkedin, Twitter, Facebook } from "lucide-react"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black dark:bg-neutral-900 border-t border-gray-800 dark:border-gray-700 text-gray-400 dark:text-gray-300 text-sm">
      <div className="container mx-auto px-4 md:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Logo and Intro */}
          <section aria-labelledby="footer-logo">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/institution-logos//accgk%20official%20logo.png"
                alt="ACCGK Logo"
                width={150}
                height={150}
                className="object-contain max-w-[130px] hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p id="footer-logo" className="mb-4 max-w-sm leading-relaxed">
              Empowering caregivers with training, certification, and resources
              to deliver compassionate care across Kenya.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" aria-label="Facebook" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5 hover:scale-110 transition-transform" />
              </Link>
              <Link href="https://twitter.com" aria-label="Twitter" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5 hover:scale-110 transition-transform" />
              </Link>
              <Link href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white transition-colors">
                <Linkedin className="h-5 w-5 hover:scale-110 transition-transform" />
              </Link>
            </div>
          </section>

          {/* Programs */}
          <section aria-labelledby="footer-programs">
            <h3 id="footer-programs" className="text-white font-semibold text-base mb-4">Programs</h3>
            <ul className="space-y-3">
              <li><Link href="/programs/training" className="hover:text-white transition-colors">Training & Workshops</Link></li>
              <li><Link href="/programs/certification" className="hover:text-white transition-colors">Certification</Link></li>
              <li><Link href="/programs/mentorship" className="hover:text-white transition-colors">Mentorship Program</Link></li>
              <li><Link href="/programs/resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link href="/programs/community" className="hover:text-white transition-colors">Community Forum</Link></li>
            </ul>
          </section>

          {/* About */}
          <section aria-labelledby="footer-about">
            <h3 id="footer-about" className="text-white font-semibold text-base mb-4">About ACCGK</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">News & Updates</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/get-involved" className="hover:text-white transition-colors">Get Involved</Link></li>
              <li><Link href="/partnerships" className="hover:text-white transition-colors">Partnerships</Link></li>
            </ul>
          </section>

          {/* Support */}
          <section aria-labelledby="footer-support">
            <h3 id="footer-support" className="text-white font-semibold text-base mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </section>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {year} Association of Certified Caregivers Kenya. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
