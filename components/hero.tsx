import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-accgk-blue to-accgk-blue/90 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 items-center gap-12">
          {/* Text Content Left */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Association of Certified Caregivers Kenya
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Uplifting Caregiving Standards in Kenya
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accgk-pink hover:bg-accgk-pink/90 text-white"
            >
              <Link href="#cta">Join the Movement</Link>
            </Button>
          </div>

          {/* Image Right */}
          <div className="relative w-full aspect-[4/3] md:aspect-[3/2] lg:aspect-video rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets/neema-and-shanice-accgk.JPG"
              alt="Professional caregivers providing compassionate care"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Optional Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
