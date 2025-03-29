"use client";

import Image from "next/image";
import RegistrationHeroImage from "../../public/assets/caregiver_happily_joined_accgk.png"

export default function RegistrationHero() {
  return (
    <section className="relative w-full bg-white text-[#3F96E6] py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text Content */}
        <div className="relative z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Become a Member
          </h1>
          <p className="mt-4 text-lg md:text-xl font-medium">
            Choose the category that best fits you and start your journey with us.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="relative">
          <Image
            src={RegistrationHeroImage} 
            alt="Membership Banner"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
