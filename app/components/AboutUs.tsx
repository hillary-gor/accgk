import Image from "next/image";
import AboutImage from "../../public/assets/hero-image.png";

export function About() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-100 py-16 px-6 lg:px-20">
      {/* Text Content */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#3F96E6]">
          Empowering Caregivers
        </h2>
        <p className="mt-5 text-lg text-gray-700 leading-relaxed">
          We are a dedicated platform for{" "}
          <strong className="text-[#AB056A]">training, certifying,</strong> and
          supporting caregivers in Kenya. Our mission is to create a{" "}
          <strong className="text-[#AB056A]">
            highly skilled caregiving workforce
          </strong>{" "}
          through education, career opportunities, and a strong professional
          network.
        </p>

        {/* Animated Stats */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="bg-white shadow-md p-4 rounded-lg text-center w-[180px] transition-transform hover:scale-105">
            <h3 className="text-3xl font-bold text-[#3F96E6]">5K+</h3>
            <p className="text-gray-600">Certified Caregivers</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg text-center w-[180px] transition-transform hover:scale-105">
            <h3 className="text-3xl font-bold text-[#3F96E6]">100+</h3>
            <p className="text-gray-600">Training Programs</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg text-center w-[180px] transition-transform hover:scale-105">
            <h3 className="text-3xl font-bold text-[#3F96E6]">500+</h3>
            <p className="text-gray-600">Impacts</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="bg-[#AB056A] text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-md hover:bg-[#900455] transition">
            Learn More
          </button>
          <button className="border-2 border-[#AB056A] text-[#AB056A] font-semibold py-3 px-6 rounded-lg text-lg hover:bg-[#AB056A] hover:text-white transition">
            Join Us
          </button>
        </div>
      </div>

      {/* Full-Width Image */}
      <div className="mt-12">
        <Image
          src={AboutImage}
          alt="Caregiver Training"
          className="w-full max-w-6xl mx-auto rounded-lg shadow-lg object-cover h-[250px] lg:h-[400px] transition-transform duration-500 hover:scale-105"
          priority
        />
      </div>
    </section>
  );
}
