import Link from "next/link"
import { UserPlus, CheckCircle, Handshake, AlertCircle, ArrowRight } from "lucide-react"

const services = [
  {
    title: "Register",
    description: "Register as a certified caregiver or institution",
    icon: UserPlus,
    color: "bg-blue-500",
    link: "./membership",
  },
  {
    title: "Verify",
    description: "Verify a caregiver's certification status",
    icon: CheckCircle,
    color: "bg-green-500",
    link: "./verify",
  },
  {
    title: "Partner",
    description: "Become an institutional partner with ACCGK",
    icon: Handshake,
    color: "bg-purple-500",
    link: "./partnerships",
  },
  {
    title: "Submit Complaint",
    description: "Report an issue or file a formal complaint",
    icon: AlertCircle,
    color: "bg-amber-500",
    link: "./about",
  },
]

export default function ServiceTiles() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-accgk-blue">Quick Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col h-full"
              >
                <div className={`${service.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                <div className="flex items-center text-accgk-blue font-medium group-hover:text-accgk-pink transition-colors">
                  <span>Access now</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
