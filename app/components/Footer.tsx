import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About */}
        <div>
          <h2 className="text-white text-lg font-semibold">Association of Certified Caregivers Kenya</h2>
          <p className="text-sm mt-2">
            Empowering caregivers through certification, training, and professional growth.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className="text-white text-lg font-semibold">Legal & Policies</h2>
          <ul className="mt-2 space-y-2">
            <li><Link href="/legal/terms-and-conditions" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link href="/legal/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/legal/code-of-conduct" className="hover:text-white">Code of Conduct</Link></li>
            <li><Link href="/legal/certification-policy" className="hover:text-white">Certification Policy</Link></li>
            <li><Link href="/legal/payment-refund-policy" className="hover:text-white">Payment & Refund Policy</Link></li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h2 className="text-white text-lg font-semibold">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" className="hover:text-white"><FaFacebook size={20} /></a>
            <a href="https://twitter.com" target="_blank" className="hover:text-white"><FaTwitter size={20} /></a>
            <a href="https://instagram.com" target="_blank" className="hover:text-white"><FaInstagram size={20} /></a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-white"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Association of Certified Caregivers Kenya. All Rights Reserved.
      </div>
    </footer>
  );
}
