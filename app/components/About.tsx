import Image from "next/image";
import AboutImage from "../../public/assets/about-image.jpg";

export function About() {
  return (
    <section className="w-full px-6 py-12 lg:px-20 bg-gray-50">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#3F96E6]">
            About Us
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            We are committed to <strong className="text-[#AB056A]">training, certifying,</strong> and building a 
            <strong className="text-[#AB056A]"> strong professional network</strong> for caregivers in Kenya.
            Our mission is to elevate the standards of caregiving through education, advocacy, and community support.
          </p>
          <ul className="mt-6 space-y-3">
            <li className="flex items-center gap-3">
              ✅ <span className="text-lg">Quality caregiver training</span>
            </li>
            <li className="flex items-center gap-3">
              ✅ <span className="text-lg">Industry-recognized certification</span>
            </li>
            <li className="flex items-center gap-3">
              ✅ <span className="text-lg">Access to a community of the best carers</span>
            </li>
          </ul>
        </div>

        {/* Right Side: Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={AboutImage}
            alt="Caregiver Training"
            className="rounded-lg shadow-lg w-[90%] max-w-[500px] lg:w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
