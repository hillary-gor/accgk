import Image from "next/image";
import Arrow from "../../public/assets/arrow.png";
import HeroImage from "../../public/assets/hero-image.png";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex flex-col-reverse items-center lg:flex-row lg:items-center lg:justify-between w-full px-6 py-12 lg:px-20">
      {/* Left Side: Hero Image */}
      <div className="w-full lg:w-1/2 flex justify-center relative">
        {/* Image Wrapper with Modern Styling */}
        <div className="relative w-[90%] max-w-[500px] lg:w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30 rounded-xl"></div>
          <Image
            src={HeroImage}
            alt="Caregiver Hero Image"
            className="w-full h-auto rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out"
            priority
          />
        </div>
      </div>

      {/* Right Side: Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left animate-fadeIn">
        <h1 className="text-3xl lg:text-5xl font-bold text-[#3F96E6] leading-tight">
          Empowering <span className="text-[#AB056A]">Caregivers</span>
          <br className="hidden lg:block" /> Across Kenya
        </h1>
        <p className="mt-4 text-lg lg:text-xl text-gray-700 max-w-[500px]">
          Join the Association of Certified Caregivers Kenya for
          <span className="font-bold text-[#AB056A]">
            {" "}
            training, certification,
          </span>
          and a
          <span className="font-bold text-[#AB056A]">
            {" "}
            strong professional network
          </span>
          to advance your career in caregiving.
        </p>

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row items-center gap-4 mt-8">
          <Link href="/about_us">
            <button className="bg-[#AB056A] text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-md hover:bg-[#900455] transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </Link>

          <Link href="/membership">
            <button className="flex items-center text-[#AB056A] text-lg font-medium gap-2 hover:text-[#900455] transition-all duration-300 transform hover:scale-105">
              Membership
              <Image src={Arrow} alt="membership" className="w-6 h-6" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
