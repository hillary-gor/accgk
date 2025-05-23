import Image from "next/image";

export default function HeroSection() {
  const aboutHeroImage = {
    url: "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//janet-glows-accgk.JPG",
    alt: "Janet Glows",
  };

  return (
    <section className="relative bg-gradient-to-r from-accgk-white to-[color:var(--accgk-blue)]/80 text-white overflow-hidden py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="order-2 md:order-1">
            <div className="relative h-[650px] rounded-2xl overflow-hidden shadow-2xl transform md:rotate-1">
              <Image
                src={aboutHeroImage.url}
                alt={aboutHeroImage.alt}
                width={800}
                height={500}
                className="object-cover w-full h-full"
                style={{ borderRadius: "25px" }}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--accgk-blue)]/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block bg-[color:var(--accgk-pink)] text-white text-sm font-bold px-3 py-1 rounded-full">
                  Certified Excellence
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 md:order-2">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-blue-600">
                About ACCGK
              </h1>
              <div className="w-20 h-1 bg-[color:var(--accgk-pink)] mb-8"></div>
              <p className="text-xl mb-8 text-blue-500">
                The Association of Certified Caregivers Kenya (ACCGK) is the
                premier regulatory body dedicated to uplifting caregiving
                standards across Kenya. We establish and maintain professional
                standards, ensuring quality care delivery while advocating for
                the rights and welfare of caregiving professionals.
              </p>
              <div className="bg-pink-300/20 rounded-xl p-6 md:p-8 shadow-sm backdrop-blur-sm">
                <p className="text-base md:text-lg text-pink-700 leading-relaxed">
                  Through our comprehensive framework, we provide certification,
                  continuing education, and a structured career pathway for
                  caregivers, enhancing their professional growth and
                  recognition in the healthcare ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider 
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto"
        >
          <path
            fill="#111827"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div> */}
    </section>
  );
}
