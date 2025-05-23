import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTASection() {

  const ctaImage = {
    url: "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//pricillah-about-cta.JPG",
    alt: "ACCGK Partnership Meeting",
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-accgk-blue to-accgk-blue/80 text-gray-900 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-gray-900/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={ctaImage.url}
                alt={ctaImage.alt}
                width={800}
                height={500}
                className="object-cover w-full h-full"
                style={{ borderRadius: "25px" }}
                unoptimized
              />
              {/*<div className="absolute inset-0 bg-gradient-to-t from-[#3F96E6] to-transparent"></div>*/}
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[color:var(--accgk-pink)] rounded-full opacity-20 blur-xl"></div>
          </div>

          {/* Content Column */}
          <div>
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[color:var(--accgk-blue)]">Partner with Us</h2>
              <div className="w-20 h-1 bg-[color:var(--accgk-pink)] mb-8"></div>
              <p className="text-xl mb-6 text-gray-900/90">
                Join ACCGK in our mission to elevate caregiving standards across Kenya. Whether you're a healthcare
                institution, training provider, or advocacy organization, we welcome partnerships that advance our
                shared goals.
              </p>
              <p className="text-lg mb-8 text-gray-900/80">
                Together, we can create a stronger, more professional caregiving ecosystem that benefits caregivers,
                patients, and the entire healthcare system.
              </p>

              <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex">
                <Button asChild size="lg" className="bg-[color:var(--accgk-pink)] hover:bg-[color:var(--accgk-pink)]/90 text-gray-900 w-full md:w-auto">
                  <Link href="/accreditation">
                    <span className="flex items-center text-white">
                      Partner with Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-[color:var(--accgk-blue)]/20 border-[color:var(--accgk-blue)]/20 text-[color:var(--accgk-blue)] hover:bg-[color:var(--accgk-blue)]/20 w-full md:w-auto"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
