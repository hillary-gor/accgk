import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"

// Mock data for news articles
const newsArticles = [
  {
    id: 1,
    title: "ACCK Launches New Pediatric Care Specialist Certification",
    category: "Certification",
    date: "May 10, 2025",
    author: "ACCK Team",
    excerpt:
      "The Association of Certified Caregivers Kenya (ACCK) is proud to announce the launch of our new Pediatric Care Specialist certification program, designed to elevate the standard of care for children across Kenya.",
    image: "/placeholder.svg?height=300&width=600",
    readTime: "4 min read",
  },
  {
    id: 2,
    title: "Partnership Announcement: ACCK and Ministry of Health",
    category: "Partnerships",
    date: "April 28, 2025",
    author: "David Omondi",
    excerpt:
      "We are excited to announce a new partnership between ACCK and the Ministry of Health to standardize caregiver certification requirements across Kenya, ensuring consistent quality of care nationwide.",
    image: "/placeholder.svg?height=300&width=600",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "ACCK Annual Conference: Registration Now Open",
    category: "Events",
    date: "April 15, 2025",
    author: "Events Team",
    excerpt:
      "Registration is now open for the 2025 ACCK Annual Conference, taking place in Nairobi on June 20-22. Join us for three days of learning, networking, and celebration of caregiving excellence.",
    image: "/placeholder.svg?height=300&width=600",
    readTime: "3 min read",
  },
  {
    id: 4,
    title: "New Online Learning Platform Enhances Caregiver Education",
    category: "Education",
    date: "March 30, 2025",
    author: "Sarah Wanjiku",
    excerpt:
      "ACCK has launched an enhanced online learning platform featuring interactive modules, real-time feedback, and improved accessibility for caregivers across Kenya, regardless of location.",
    image: "/placeholder.svg?height=300&width=600",
    readTime: "6 min read",
  },
]

// Mock data for press releases
const pressReleases = [
  {
    id: 1,
    title: "ACCK Receives Grant to Expand Rural Caregiver Training",
    date: "May 5, 2025",
    excerpt:
      "The Association of Certified Caregivers Kenya (ACCK) has been awarded a significant grant to expand its caregiver training and certification programs to rural areas across Kenya.",
  },
  {
    id: 2,
    title: "ACCK Celebrates 5,000th Certified Caregiver Milestone",
    date: "April 20, 2025",
    excerpt:
      "ACCK proudly announces a major milestone in its mission to elevate caregiving standards, having certified its 5,000th caregiver since the organization's founding in 2018.",
  },
  {
    id: 3,
    title: "New Research Highlights Impact of Certified Caregivers on Patient Outcomes",
    date: "March 15, 2025",
    excerpt:
      "A new study conducted in partnership with the University of Nairobi reveals significant improvements in patient outcomes when care is provided by ACCK-certified caregivers.",
  },
]

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "ACCK Annual Conference 2025",
    date: "June 20-22, 2025",
    location: "Kenyatta International Convention Centre, Nairobi",
    description:
      "Join us for three days of learning, networking, and celebration of caregiving excellence. Featuring keynote speakers, workshops, and the annual ACCK Awards ceremony.",
  },
  {
    id: 2,
    title: "Caregiver Mental Health Workshop",
    date: "May 25, 2025",
    location: "Virtual Event",
    description:
      "A half-day workshop focused on mental health and self-care strategies for caregivers, featuring expert speakers and interactive sessions.",
  },
  {
    id: 3,
    title: "Pediatric Care Certification Information Session",
    date: "May 18, 2025",
    location: "ACCK Training Center, Nairobi",
    description:
      "Learn about the new Pediatric Care Specialist certification program, including curriculum, requirements, and career opportunities.",
  },
]

export default function NewsPage() {
  return (
    <PageLayout
      title="News & Updates"
      description="Stay informed about the latest news, events, and announcements from the Association of Certified Caregivers Kenya (ACCK)."
    >
      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Latest News</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {newsArticles.slice(0, 2).map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {article.category}
                      </Badge>
                      <CardTitle className="text-xl">
                        <Link href={`/news/${article.id}`} className="hover:underline">
                          {article.title}
                        </Link>
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-muted-foreground">{article.excerpt}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/news/${article.id}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <Tabs defaultValue="all-news" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all-news">All News</TabsTrigger>
            <TabsTrigger value="press-releases">Press Releases</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          </TabsList>

          <TabsContent value="all-news" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {newsArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden flex flex-col">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                  <CardHeader className="p-4 pb-2">
                    <Badge variant="outline" className="w-fit mb-2">
                      {article.category}
                    </Badge>
                    <CardTitle className="text-lg">
                      <Link href={`/news/${article.id}`} className="hover:underline">
                        {article.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{article.date}</span>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/news/${article.id}`}>Read More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="press-releases" className="space-y-6">
            <div className="grid gap-6">
              {pressReleases.map((release) => (
                <Card key={release.id}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <CardTitle className="text-lg">{release.title}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>{release.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-muted-foreground">{release.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/news/press-releases/${release.id}`}>Read Full Release</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>{event.location}</CardDescription>
                      </div>
                      <Badge variant="outline">{event.date}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/events/${event.id}`}>Event Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <section className="bg-muted/50 p-8 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground">
                Stay updated with the latest news, events, and resources from ACCK.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-3 py-2 rounded-md border bg-background"
              />
              <Button className="bg-teal-600 hover:bg-teal-700">Subscribe</Button>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
