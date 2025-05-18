import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--accgk-blue)]">About ACCGK</h2>
          <div className="w-20 h-1 bg-[color:var(--accgk-pink)] mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-6 text-gray-700">
              The Association of Certified Caregivers Kenya (ACCGK) is the premier regulatory body dedicated to
              supporting and elevating certified caregivers across Kenya. We establish and maintain professional
              standards, ensuring quality care delivery while advocating for the rights and welfare of caregiving
              professionals.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              Through our comprehensive framework, we provide certification, continuing education, and a structured
              career pathway for caregivers, enhancing their professional growth and recognition in the healthcare
              ecosystem.
            </p>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-xl h-[500px]">
            <Image
              src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//IMG_0325.JPG"
              alt="Professional caregiver providing care with compassion"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--accgk-blue)]/80 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Compassionate Care</h3>
                <p>
                  Our certified caregivers are trained to provide the highest quality of care with empathy and
                  professionalism
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 mt-8">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-[color:var(--accgk-blue)]">Our Mission</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[color:var(--accgk-pink)] flex items-center justify-center text-white font-bold mr-3 mt-0.5">
                    1
                  </div>
                  <p>Strengthening professionalism in caregiving through standardized certification</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[color:var(--accgk-pink)] flex items-center justify-center text-white font-bold mr-3 mt-0.5">
                    2
                  </div>
                  <p>Enforcing ethical standards and best practices in care delivery</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[color:var(--accgk-pink)] flex items-center justify-center text-white font-bold mr-3 mt-0.5">
                    3
                  </div>
                  <p>Enabling legal protection and recognition for certified caregivers</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[color:var(--accgk-pink)] flex items-center justify-center text-white font-bold mr-3 mt-0.5">
                    4
                  </div>
                  <p>Creating structured career pathways for professional advancement</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
