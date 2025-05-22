"use client";

import Image from "next/image";
import Link from "next/link";

const image1 = {
  url: "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets/group-photo.JPG",
  alt: "A diverse group of smiling caregivers standing together, signifying community and support.",
};

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Section */}
        <div className="space-y-6 z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[color:var(--accgk-blue)] leading-tight">
            Association of Certified Caregivers Kenya
          </h1>
          <p className="text-gray-600 text-lg">
            Join the movement of certified caregivers making a difference in
            healthcare. Get certified, get licensed, and start making a
            difference today!
          </p>

          <div className="flex space-x-4">
            <Link
              href="/membership/join"
              className="bg-[color:var(--accgk-blue)] text-white px-6 py-3 rounded-lg hover:bg-[color:var(--accgk-blue)]/90 transition"
            >
              Join Now
            </Link>
            <Link
              href="/membership"
              className="bg-[color:var(--accgk-blue)]/20 rounded-lg px-6 py-3 text-[color:var(--accgk-blue)] font-semibold hover:bg-[color:var(--accgk-blue)]/20 transition"
            >
              Learn More
            </Link>
          </div>
          <div className="bg-[color:var(--accgk-blue)]/20 text-[color:var(--accgk-blue)] px-4 py-2 rounded-lg text-sm font-medium w-fit">
            Empowering Caregivers Across Kenya.
            <br />
            You’re in! 🔓 Member services are just a click away.
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] relative overflow-hidden rounded-[15px]">
            <Image
              src={image1.url}
              alt={image1.alt}
              width={800}
              height={500}
              className="object-contain rounded-[30px] w-full h-full"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
