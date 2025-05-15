import Image from "next/image"
import { Linkedin, Twitter, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Dr. Jane Muthoni",
    role: "Chairperson",
    image: "/placeholder.svg?height=400&width=400&text=Jane+Muthoni",
    bio: "With over 20 years in healthcare leadership, Dr. Muthoni brings extensive experience in healthcare policy and regulation.",
  },
  {
    name: "John Kamau",
    role: "Executive Director",
    image: "/placeholder.svg?height=400&width=400&text=John+Kamau",
    bio: "John has dedicated his career to improving healthcare standards and professional development for caregivers.",
  },
  {
    name: "Sarah Ochieng",
    role: "Director of Certification",
    image: "/placeholder.svg?height=400&width=400&text=Sarah+Ochieng",
    bio: "Sarah oversees the certification process, ensuring rigorous standards and continuous improvement.",
  },
  {
    name: "David Njoroge",
    role: "Director of Training",
    image: "/placeholder.svg?height=400&width=400&text=David+Njoroge",
    bio: "David leads our training programs, developing curriculum and educational resources for caregivers.",
  },
  {
    name: "Mary Wanjiku",
    role: "Advocacy Officer",
    image: "/placeholder.svg?height=400&width=400&text=Mary+Wanjiku",
    bio: "Mary champions policy reform and advocates for the rights and recognition of caregivers across Kenya.",
  },
  {
    name: "James Otieno",
    role: "Ethics Committee Chair",
    image: "/placeholder.svg?height=400&width=400&text=James+Otieno",
    bio: "James leads the ethics committee, ensuring adherence to professional standards and ethical guidelines.",
  },
]

export default function TeamSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accgk-blue">Meet Our Team</h2>
          <div className="w-20 h-1 bg-accgk-pink mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            Our dedicated team of professionals works tirelessly to uphold caregiving standards and support certified
            caregivers across Kenya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden group">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accgk-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex justify-center space-x-4">
                      <a
                        href="#"
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                      >
                        <Linkedin className="h-4 w-4 text-white" />
                      </a>
                      <a
                        href="#"
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                      >
                        <Twitter className="h-4 w-4 text-white" />
                      </a>
                      <a
                        href="#"
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                      >
                        <Mail className="h-4 w-4 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-accgk-blue">{member.name}</h3>
                <p className="text-accgk-pink font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
