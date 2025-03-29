"use client";

import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3F96E6] leading-tight">
            About the Association of Certified Caregivers Kenya
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            We are dedicated to supporting, certifying, and connecting caregivers and 
            institutions across Kenya. Our mission is to uphold high professional 
            caregiving standards while providing education, community, and resources.
          </p>
        </div>

        {/* Right: Image */}
        <div className="relative">
          <Image
            src="/about"
            alt="Caregivers Team"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full object-cover"
            priority
          />
        </div>
      </div>

      {/* Key Features Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-[#AB056A]">What We Offer</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mt-4">
          Our platform provides essential services and tools to help caregivers and 
          institutions grow, learn, and stay connected.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 transition hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-[#3F96E6]">{feature.title}</h3>
              <p className="text-gray-700 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Feature List
const features = [
  {
    title: "🎓 Training & Certification",
    description: "Caregivers can enroll in accredited courses and earn recognized certifications.",
  },
  {
    title: "🩺 Professional Directory",
    description: "A searchable database of registered caregivers and institutions.",
  },
  {
    title: "📚 Resource Library",
    description: "Access caregiver guides, legal documents, and learning materials.",
  },
  {
    title: "💬 Community & Support",
    description: "Forums, mentorship, and live chat for peer support and knowledge sharing.",
  },
  {
    title: "📅 Events & Webinars",
    description: "Workshops, online training sessions, and networking events.",
  },
  {
    title: "💳 Secure Payments",
    description: "Seamless online transactions for course fees, certifications, and memberships.",
  },
];
