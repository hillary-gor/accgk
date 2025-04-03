'use client';

import Image from 'next/image';
import SideImage from '@/public/assets/caregiver_happily_joined_accgk.png'
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function SuccessfullApplication() {
  return (
   <>
  <Navbar />
   <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      {/* Left Section - Image (Half Screen) */}
      <div className="w-full md:w-1/2 h-64 md:h-screen">
        <Image
          src={SideImage}
          alt="Success Illustration"
          width={800}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section - Text and Button */}
      <div className="w-full md:w-1/2 p-6 bg-white text-center animate-fadeIn flex flex-col items-center">
        {/* 🎉 Emoji */}
        <div className="text-6xl mb-4 animate-bounce">🎉</div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-blue-600 mb-2">
          Application Submitted!
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg">
          Your application has been received and is under review.
        </p>
        <p className="text-gray-600 mt-1">
          You will receive an email once it is approved.
        </p>

        {/* Back to Dashboard Button */}
        <button
          className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 hover:scale-105"
          onClick={() => window.location.href = "/app/about_us"}
        >
          Wanna Learn More
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
}
