import Link from "next/link";
import Image from "next/image";
import { Mail, Linkedin, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image
                src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/institution-logos//accgk%20official%20logo.png"
                alt="ACCGK Logo"
                width={150}
                height={150}
                className="object-contain hover:scale-105 transition-transform duration-300"
              />

              {/*<span className="font-bold text-xl text-white">ACCGK</span>*/}
            </Link>
            <p className="text-gray-400 mb-4">
              Empowering caregivers with training, certification, and resources
              to deliver compassionate care across Kenya.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="text-gray-400 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/programs/training"
                  className="text-gray-400 hover:text-white"
                >
                  Training & Workshops
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/certification"
                  className="text-gray-400 hover:text-white"
                >
                  Certification
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/mentorship"
                  className="text-gray-400 hover:text-white"
                >
                  Mentorship Program
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/resources"
                  className="text-gray-400 hover:text-white"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/community"
                  className="text-gray-400 hover:text-white"
                >
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">
              About ACCGK
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/get-involved"
                  className="text-gray-400 hover:text-white"
                >
                  Get Involved
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-gray-400 hover:text-white"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Contact</h3>
            <address className="not-italic text-gray-400">
              <p>P.O. Box 15168-00100</p>
              <p>Nairobi, Kenya</p>
              <p className="mt-3">
                <Link
                  href="mailto:info@accgk.co.ke"
                  className="flex items-center hover:text-white"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  info@accgk.co.ke
                </Link>
              </p>
              <p>
                <Link
                  href="tel:+254116443443"
                  className="flex items-center hover:text-white"
                >
                  +254 116 443 443
                </Link>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Association of Certified Caregivers
            Kenya. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-gray-400 hover:text-white text-sm"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
