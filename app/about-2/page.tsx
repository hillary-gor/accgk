import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="gradient-background pt-32 pb-24 px-4 md:px-6 relative">
        <div className="grid-pattern absolute inset-0 opacity-20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-8">
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <Image
                src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//neema-mbuno-2.JPG"
                alt="ACCGK Logo"
                width={400}
                height={300}
                className="object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                About ACCGK
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl">
                The Association of Certified Caregivers Kenya (ACCGK) is
                dedicated to enhancing the competence and professionalism of
                care providers across the country. Our goal is to address the
                challenges faced by caregivers while promoting standards that
                ensure quality, ethical, and effective caregiving practices.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Our Story */}
      <section className="py-24 px-4 md:px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Founded to address the critical gaps in caregiving standards,
                the Association of Certified Caregivers Kenya (ACCGK) was
                established with a commitment to professionalize the caregiving
                sector in Kenya.
              </p>
              <p className="text-gray-300 mb-4">
                We advocate for structured licensing, continuous professional
                development, and legal protection for caregivers. As a
                regulatory body, we also ensure that caregivers maintain
                competence throughout their careers.
              </p>
              <p className="text-gray-300">
                ACCGK works with institutions, healthcare bodies, and policy
                makers to develop frameworks that formalize the profession and
                safeguard both caregivers and their clients.
              </p>
            </div>
            <div className="relative h-[700px] rounded-lg overflow-hidden">
              <Image
                src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//Pricilla.JPG"
                alt="ACCGK Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Core Values */}
      <section className="py-24 px-4 md:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Upholding professionalism and integrity in caregiving practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Professionalism",
                description:
                  "Maintaining high standards in caregiving practices.",
              },
              {
                title: "Competence",
                description:
                  "Ensuring ongoing skills enhancement through CPD programs.",
              },
              {
                title: "Integrity",
                description:
                  "Upholding ethical standards and honesty in all caregiving practices.",
              },
              {
                title: "Compassion",
                description:
                  "Providing empathetic care to individuals with special needs.",
              },
              {
                title: "Accountability",
                description:
                  "Taking responsibility for professional conduct and quality care.",
              },
              {
                title: "Advocacy",
                description:
                  "Promoting caregivers' rights and professional development.",
              },
            ].map((value, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <CheckCircle className="h-8 w-8 text-white mb-4" />
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-24 px-4 md:px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The dedicated members of the Association of Certified Caregivers
              Kenya (ACCGK)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((member) => (
              <div key={member} className="group">
                <div className="relative h-[300px] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={`https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//hillary-gor-favicon.png?height=600&width=600`}
                    alt={`Team Member ${member}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-bold text-lg">Team Member {member}</h3>
                <p className="text-gray-400">Position</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  
      {/* CTA Section */}
      <section className="py-24 px-4 md:px-6 gradient-background relative">
        <div className="grid-pattern absolute inset-0 opacity-20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <Image
                src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//IMG_0357.JPG"
                alt="ACCGK Partnership"
                width={800}
                height={700}
                className="object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Partner with Us
              </h2>
              <p className="text-lg text-gray-300 max-w-xl mb-8">
                Are you an institution, caregiver, or organization interested in
                elevating caregiving standards in Kenya? Join ACCGK in promoting
                professionalism, competence, and ethical practices across the
                sector.
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
