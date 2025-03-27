import Image from "next/image";
import TrainingImage from "../../public/assets/Image.svg";
import CertificationImage from "../../public/assets/Image.svg";
import CommunityImage from "../../public/assets/Image.svg";
import ResourcesImage from "../../public/assets/Image.svg";

export function WhatWeOffer() {
  return (
    <section className="w-full px-6 py-16 lg:px-20 bg-white">
      <div className="text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#3F96E6]">
          What We Offer
        </h2>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Our platform is dedicated to equipping caregivers with essential skills,  
          industry-recognized certification, and continuous support for professional growth.
        </p>
      </div>

      {/* Offerings Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Training Programs */}
        <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md transition-transform hover:scale-105">
          <Image src={TrainingImage} alt="Caregiver Training" width={80} height={80} className="mx-auto" />
          <h3 className="text-xl font-semibold mt-4 text-[#3F96E6]">Comprehensive Training</h3>
          <p className="text-gray-600 mt-2">Hands-on courses tailored for professional caregiving.</p>
        </div>

        {/* Certification */}
        <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md transition-transform hover:scale-105">
          <Image src={CertificationImage} alt="Certification" width={80} height={80} className="mx-auto" />
          <h3 className="text-xl font-semibold mt-4 text-[#3F96E6]">Accredited Certification</h3>
          <p className="text-gray-600 mt-2">Get recognized with industry-approved certifications.</p>
        </div>

        {/* Professional Community */}
        <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md transition-transform hover:scale-105">
          <Image src={CommunityImage} alt="Community Support" width={80} height={80} className="mx-auto" />
          <h3 className="text-xl font-semibold mt-4 text-[#3F96E6]">Professional Community</h3>
          <p className="text-gray-600 mt-2">Connect, share, and grow with fellow caregivers.</p>
        </div>

        {/* Learning Resources */}
        <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md transition-transform hover:scale-105">
          <Image src={ResourcesImage} alt="Learning Materials" width={80} height={80} className="mx-auto" />
          <h3 className="text-xl font-semibold mt-4 text-[#3F96E6]">Learning Resources</h3>
          <p className="text-gray-600 mt-2">Access study materials, guides, and industry insights.</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center">
        <button className="bg-[#AB056A] text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-md hover:bg-[#900455] transition">
          Explore Programs
        </button>
      </div>
    </section>
  );
}
