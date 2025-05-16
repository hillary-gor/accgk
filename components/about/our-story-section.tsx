import Image from "next/image"

export default function OurStorySection() {
  return (
    <section className="bg-gray-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="w-20 h-1 bg-accgk-pink mb-8"></div>

            <div className="space-y-6 text-gray-300">
              <p>
                Founded in 2020, the Association of Certified Caregivers Kenya (ACCGK) emerged from a critical need to
                professionalize and standardize caregiving practices across Kenya. What began as a small coalition of
                dedicated healthcare professionals has grown into the country's premier regulatory body for caregivers.
              </p>

              <p>
                Our founders recognized that while caregivers play an essential role in Kenya's healthcare system, they
                often lacked formal recognition, standardized training, and career advancement opportunities. This gap
                not only affected the quality of care but also the welfare and professional growth of caregivers
                themselves.
              </p>

              <p>
                ACCGK was established with a clear mission: to transform caregiving from an informal occupation into a
                respected profession with defined standards, ethical guidelines, and career pathways. Through
                partnerships with healthcare institutions, government agencies, and international organizations, we've
                developed comprehensive certification programs and continuing education opportunities.
              </p>

              <p>
                Today, ACCGK stands as the authoritative voice for caregiving standards in Kenya, advocating for policy
                reforms, providing professional development, and ensuring that certified caregivers receive the
                recognition and support they deserve.
              </p>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative">
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//shanice-accgk-aboutSmile.JPG"
                alt="ACCGK Caregivers in Action"
                fill
                className="object-cover"
              />

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accgk-pink rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accgk-blue rounded-full opacity-20 blur-xl"></div>

              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <blockquote className="italic text-white/90">
                    "Our vision is to create a healthcare ecosystem where every caregiver is recognized, respected, and
                    empowered to deliver exceptional care."
                  </blockquote>
                  <p className="mt-2 text-accgk-pink font-medium">— ACCGK Founding Statement, 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
