import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { Play } from "lucide-react";

export default function AccreditationHero() {
  const accreditationImage = {
    url: "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//neema-mbuno-accgk.JPG",
    alt: "Accreditation Hero Image",
  };

  return (
    <div className="bg-gradient-to-r from-[#3F96E6] to-[#2991f3] rounded-xl overflow-hidden shadow-lg mb-16 text-white">
      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Left Column - Text Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Accreditation That Builds Trust & Excellence
          </h1>
          <p className="text-white/90 mb-8">
            ACCGK’s rigorous accreditation standards help caregiving
            institutions elevate training quality, gain national recognition,
            and foster professional growth for caregivers.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-[#3F96E6] hover:bg-white/90 hover:text-[#3F96E6] font-semibold"
          >
            <Link href="/partnerships">Partner With Us</Link>
          </Button>
        </div>

        {/* Right Column - Image or Placeholder */}
        <div className="relative rounded-lg overflow-hidden h-[300px] md:h-auto">
          <Image
            src={accreditationImage.url}
            alt={accreditationImage.alt}
            width={800}
            height={500}
            className="object-cover w-full h-full"
            style={{ borderRadius: "25px" }}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
