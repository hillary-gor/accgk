"use client";
import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative bg-[#3F96E6] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Video Thumbnail */}
        <div className="relative">
          <div
            className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer flex justify-center items-center"
            onClick={() => setIsOpen(true)}
          >
            <Image
              src="/https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/staticimages//DJI_20250320112852_0159_D.JPG"
              alt="Membership Video"
              width={800}
              height={450}
              className="w-full h-full object-cover opacity-70 hover:opacity-100 transition"
              priority
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <button className="bg-white text-[#AB056A] rounded-full p-4 shadow-lg hover:scale-110 transition">
                ▶
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-[#AB056A]">Become a Member</h1>
          <p className="mt-4 text-lg max-w-lg">
            Join our growing network of caregivers and institutions.  
            Gain exclusive access to training, networking, and career growth opportunities.
          </p>
          <button className="mt-6 bg-white text-[#3F96E6] font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-200 transition">
            Join Now
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative w-full max-w-3xl">
            <button
              className="absolute -top-6 -right-6 bg-white text-[#AB056A] rounded-full p-2 shadow-md hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
            <iframe
              src="https://www.youtube.com/" // Replace with actual membership video
              title="Membership Video"
              className="w-full h-[400px] md:h-[500px] rounded-lg"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
