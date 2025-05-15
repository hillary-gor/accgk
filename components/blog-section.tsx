import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const blogPosts = [
  {
    title: "New Certification Standards Announced for 2023",
    excerpt:
      "ACCGK has released updated certification standards that will take effect in January 2023, focusing on enhanced clinical skills and ethical practices.",
    date: "October 15, 2023",
    image: "/placeholder.svg?height=600&width=800&text=Certification+Standards",
    link: "#",
  },
  {
    title: "ACCGK Partners with Ministry of Health on Caregiver Registry",
    excerpt:
      "A new partnership aims to create a comprehensive national registry of certified caregivers to improve accountability and recognition.",
    date: "September 28, 2023",
    image: "/placeholder.svg?height=600&width=800&text=Partnership+Announcement",
    link: "#",
  },
  {
    title: "Annual Caregivers Conference Scheduled for December",
    excerpt:
      "The annual conference will bring together caregivers, healthcare institutions, and policymakers to discuss the future of caregiving in Kenya.",
    date: "September 10, 2023",
    image: "/placeholder.svg?height=600&width=800&text=Caregivers+Conference",
    link: "#",
  },
]

export default function BlogSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accgk-blue">Latest News & Updates</h2>
            <div className="w-20 h-1 bg-accgk-pink mb-4"></div>
            <p className="text-lg text-gray-700">
              Stay informed about the latest developments in the caregiving profession.
            </p>
          </div>
          <Link
            href="#"
            className="hidden md:flex items-center text-accgk-blue hover:text-accgk-pink transition-colors font-medium"
          >
            <span>View all news</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 w-full">
                    <span className="inline-block px-3 py-1 bg-accgk-pink text-white text-xs rounded-full">News</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h3 className="text-xl font-semibold mb-3 text-accgk-blue group-hover:text-accgk-pink transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href={post.link}
                  className="inline-flex items-center text-accgk-pink hover:text-accgk-blue transition-colors font-medium"
                >
                  <span>Read more</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link
            href="#"
            className="inline-flex items-center text-accgk-blue hover:text-accgk-pink transition-colors font-medium"
          >
            <span>View all news</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
