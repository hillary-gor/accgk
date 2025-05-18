import Image from "next/image"
import { Award, FileCheck, Users, Scale, GraduationCap, ShieldCheck } from "lucide-react"

const focusAreas = [
  {
    title: "Competence Assurance & CPD",
    description:
      "Ensuring caregivers maintain and enhance their skills through continuous professional development programs.",
    icon: GraduationCap,
    image: "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//IMG_0314.JPG",
  },
  {
    title: "Licensing & Regulation",
    description: "Establishing and maintaining professional standards through comprehensive licensing frameworks.",
    icon: FileCheck,
    image: "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//shanice-accgk.JPG",
  },
  {
    title: "Caregivers Registry",
    description: "Maintaining a national database of certified caregivers to ensure accountability and recognition.",
    icon: Users,
    image: "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//janet-smile-accgk.JPG",
  },
  {
    title: "Advocacy for Policy & Legal Reform",
    description: "Championing the rights and interests of caregivers through policy advocacy and legal reforms.",
    icon: Scale,
    image: "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//dida-accgk.JPG",
  },
  {
    title: "Career Development Pathways",
    description: "Creating structured career progression routes for caregivers to advance professionally.",
    icon: Award,
    image: "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//neema-accgk.JPG",
  },
  {
    title: "Ethical Oversight & Disciplinary Framework",
    description: "Upholding ethical standards and providing a framework for professional conduct.",
    icon: ShieldCheck,
    image: "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//sandra-accgk-confidence.JPG",
  },
]

export default function FocusAreas() {
  return (
    <section id="focus-areas" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--accgk-blue)]">Our Focus Areas</h2>
          <div className="w-20 h-1 bg-[color:var(--accgk-pink)] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            ACCGK works across multiple domains to ensure comprehensive support and regulation for caregivers in Kenya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {focusAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative h-40 bg-[color:var(--accgk-blue)]/5">
                <Image
                  src={area.image || "/placeholder.svg"}
                  alt={area.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
              </div>
              <div className="p-6 relative">
                <div className="w-12 h-12 rounded-full bg-[color:var(--accgk-blue)]/10 flex items-center justify-center mb-4 absolute -top-6 right-6 border-4 border-white shadow-sm">
                  <area.icon className="w-6 h-6 text-[color:var(--accgk-blue)]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[color:var(--accgk-blue)]">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
