import Image from "next/image"

export default function VideoSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accgk-blue">See Our Work in Action</h2>
          <div className="w-20 h-1 bg-accgk-pink mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">Watch how ACCGK is transforming the caregiving profession in Kenya.</p>
        </div>

        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
          <div className="aspect-w-16 aspect-h-9 relative group cursor-pointer">
            {/* Video Thumbnail */}
            <Image
              src="/placeholder.svg?height=1080&width=1920&text=ACCGK+Caregiver+Training+Video"
              alt="ACCGK Caregiver Training Video"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-accgk-blue/80 to-transparent flex items-center justify-center">
              {/* Play Button */}
              <div className="w-20 h-20 rounded-full bg-accgk-pink flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Video Title */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-semibold">ACCGK: Transforming Caregiving in Kenya</h3>
              <p className="text-white/80">Learn about our mission, impact, and vision for the future</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-accgk-blue/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-accgk-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-accgk-blue">Our Mission</h3>
            <p className="text-gray-600">
              Learn about our mission to transform caregiving in Kenya through professional standards.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-accgk-blue/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-accgk-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-accgk-blue">Success Stories</h3>
            <p className="text-gray-600">Hear from certified caregivers who have benefited from ACCGK's programs.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-accgk-blue/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-accgk-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-accgk-blue">Future Vision</h3>
            <p className="text-gray-600">Discover our plans for the future of caregiving profession in Kenya.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
