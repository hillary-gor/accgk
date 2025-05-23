import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { Play } from "lucide-react";

export default function HeroSection() {
  const membershipImage = {
    url: "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//sandra-&-janet.JPG",
    alt: "Membership Image",
  };
  return (
    <div className="bg-gradient-to-r from-[#3F96E6] to-[#228cf0] rounded-xl overflow-hidden shadow-lg mb-16 text-white">
      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Left Column - Text Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Elevate Your Caregiving Career with ACCGK Membership
          </h2>
          <p className="text-white/90 mb-8">
            Join Kenya's premier community of certified caregivers and
            healthcare institutions. Gain access to professional development,
            networking opportunities, and resources that will enhance your
            career and improve patient care standards.
          </p>
          <div>
            <Button
              asChild
              size="lg"
              className="bg-white text-[#3F96E6] hover:bg-white/90 hover:text-teal-700 font-semibold"
            >
              <Link href="/membership/join">Join Now</Link>
            </Button>
          </div>
        </div>

        {/* Right Column - Image/Video */}
        <div className="relative rounded-lg overflow-hidden h-[300px] md:h-auto">
          <Image
            src={membershipImage.url}
            alt={membershipImage.alt}
            width={800}
            height={500}
            className="object-cover w-full h-full"
            style={{ borderRadius: "25px" }}
            unoptimized
          />
          {/*<div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </div>*/}
        </div>
      </div>
    </div>
  );
}
