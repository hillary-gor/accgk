'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown, Facebook, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  const year = new Date().getFullYear()

  const [open, setOpen] = useState<string | null>(null)

  const toggle = (section: string) => {
    setOpen(open === section ? null : section)
  }

  const isOpen = (section: string) => open === section

  return (
    <footer className="bg-black dark:bg-neutral-900 border-t border-gray-800 dark:border-gray-700 text-gray-400 dark:text-gray-300 text-sm">
      <div className="container mx-auto px-4 md:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Logo and Intro */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/institution-logos//accgk%20official%20logo.png"
                alt="ACCGK Logo"
                width={150}
                height={150}
                className="object-contain max-w-[130px] hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="mb-4 max-w-sm leading-relaxed">
              Empowering caregivers with training, certification, and resources to deliver compassionate care across Kenya.
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
          </div>

          {/* Collapsible Sections */}
          {[
            {
              label: 'Programs',
              id: 'programs',
              links: [
                ['/programs/training', 'Training & Workshops'],
                ['/programs/certification', 'Certification'],
                ['/programs/mentorship', 'Mentorship Program'],
                ['/programs/resources', 'Resources'],
                ['/programs/community', 'Community Forum'],
              ],
            },
            {
              label: 'About ACCGK',
              id: 'about',
              links: [
                ['/about', 'About Us'],
                ['/news', 'News & Updates'],
                ['/contact', 'Contact'],
                ['/get-involved', 'Get Involved'],
                ['/partnerships', 'Partnerships'],
              ],
            },
            {
              label: 'Support',
              id: 'support',
              links: [
                ['/faq', 'FAQ'],
                ['/help', 'Help Center'],
                ['/careers', 'Careers'],
              ],
            },
          ].map(({ label, id, links }) => (
            <div key={id}>
              {/* Toggle Header (Collapsible on mobile, static on md+) */}
              <button
                className="flex w-full justify-between items-center text-white font-semibold text-base mb-2 md:mb-4 md:pointer-events-none"
                onClick={() => toggle(id)}
              >
                {label}
                <ChevronDown
                  className={`w-4 h-4 transition-transform md:hidden ${
                    isOpen(id) ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Links */}
              <ul
                className={`overflow-hidden transition-all duration-300 ease-in-out space-y-3 ${
                  isOpen(id) ? 'max-h-96 mt-2' : 'max-h-0 md:max-h-full'
                } md:mt-0 md:block`}
              >
                {links.map(([href, text]) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-white transition-colors block">
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
