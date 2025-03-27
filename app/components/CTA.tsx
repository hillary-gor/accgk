import Link from "next/link";

export function CTA() {
  return (
    <section className="w-full bg-gradient-to-r from-[#3F96E6] to-[#AB056A] text-white py-16 px-6 lg:px-20 text-center">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-extrabold">
          Start Your Caregiving Journey Today
        </h2>

        {/* Supporting Text */}
        <p className="mt-4 text-lg leading-relaxed">
          Gain the skills, certification, and community support to build a successful
          career in caregiving. Join thousands of trained professionals making a
          difference every day.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/register">
            <button className="bg-white text-[#3F96E6] font-semibold py-3 px-6 rounded-lg text-lg shadow-md hover:bg-gray-200 transition">
              Sign Up Now
            </button>
          </Link>

          <Link href="/courses">
            <button className="border-2 border-white text-white font-semibold py-3 px-6 rounded-lg text-lg hover:bg-white hover:text-[#3F96E6] transition">
              Explore Courses
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
