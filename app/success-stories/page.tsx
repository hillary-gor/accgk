import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for success stories
const successStories = [
  {
    id: 1,
    name: "Jane Muthoni",
    role: "Elder Care Specialist",
    location: "Nairobi",
    image: "/placeholder.svg?height=200&width=200",
    story:
      "After 5 years as an informal caregiver for my grandmother, I decided to pursue professional certification through ACCK. The comprehensive training and certification process transformed my approach to caregiving. Now, I work with a leading elder care facility in Nairobi, earning twice my previous income and making a meaningful difference in seniors' lives. ACCK's certification opened doors I never thought possible and gave me confidence in my skills.",
    impact: "Doubled income and secured employment at a prestigious care facility",
    certification: "Elder Care Specialist",
  },
  {
    id: 2,
    name: "David Omondi",
    role: "Pediatric Care Specialist",
    location: "Mombasa",
    image: "/placeholder.svg?height=200&width=200",
    story:
      "I started my caregiving journey without formal training, relying on instinct and on-the-job learning. After joining ACCK and completing the Pediatric Care Specialist certification, I gained structured knowledge and evidence-based techniques that dramatically improved my effectiveness. The community of fellow caregivers provided invaluable support and mentorship. Today, I run a small pediatric care agency employing five certified caregivers, all trained through ACCK.",
    impact: "Founded a pediatric care agency employing 5 certified caregivers",
    certification: "Pediatric Care Specialist",
  },
  {
    id: 3,
    name: "Sarah Wanjiku",
    role: "Home Health Aide",
    location: "Kisumu",
    image: "/placeholder.svg?height=200&width=200",
    story:
      "As a single mother seeking stable employment, I discovered ACCK's Basic Caregiving certification program. Despite limited resources, I was able to complete the training thanks to ACCK's flexible payment options. The certification not only provided me with essential skills but also connected me with employers seeking qualified caregivers. Within two weeks of certification, I secured a position as a home health aide for a family in Kisumu, providing stability for my own family while helping others.",
    impact: "Secured stable employment within two weeks of certification",
    certification: "Basic Caregiving Certificate",
  },
]

// Mock data for institutional success stories
const institutionalStories = [
  {
    id: 1,
    name: "Sunrise Elder Care Home",
    location: "Nairobi",
    image: "/placeholder.svg?height=200&width=200",
    story:
      "Before partnering with ACCK, our facility struggled with high staff turnover and inconsistent care quality. By implementing ACCK's certification standards and enrolling our staff in their training programs, we've seen remarkable improvements. Staff retention has increased by 40%, and resident satisfaction scores have risen from 72% to 94%. The structured approach to caregiver development has created clear career pathways, boosting morale and professionalism among our team.",
    impact: "40% increase in staff retention and 22% improvement in resident satisfaction",
    partnership: "Staff Certification & Training Partner",
  },
  {
    id: 2,
    name: "Healing Hands Hospital",
    location: "Eldoret",
    image: "/placeholder.svg?height=200&width=200",
    story:
      "As a growing hospital serving rural communities, we faced challenges in maintaining consistent caregiving standards. Partnering with ACCK allowed us to implement standardized training and certification for our caregiving staff. This has not only improved patient outcomes but also enhanced our reputation in the community. The certification process has become a cornerstone of our quality assurance program, and we've seen a 30% reduction in patient complaints related to care quality.",
    impact: "30% reduction in care-related complaints and improved community reputation",
    partnership: "Institutional Member & Training Site",
  },
]

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Michael Kamau",
    role: "Certified Caregiver",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "ACCK certification changed my career trajectory completely. The comprehensive training prepared me for real-world challenges, and employers recognize the value of my credentials. I'm proud to be part of a community that elevates caregiving standards.",
  },
  {
    id: 2,
    name: "Grace Otieno",
    role: "Elder Care Specialist",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "The specialized training I received through ACCK gave me confidence in handling complex caregiving situations. The community aspect has been invaluable - being able to connect with other caregivers, share experiences, and learn from each other has made me a better caregiver.",
  },
  {
    id: 3,
    name: "John Mwangi",
    role: "Healthcare Facility Manager",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "As an employer, ACCK certification has become our gold standard when hiring caregivers. The difference in skill level, professionalism, and dedication is immediately apparent. Our facility's quality of care has improved significantly since we began prioritizing ACCK-certified caregivers.",
  },
  {
    id: 4,
    name: "Elizabeth Njeri",
    role: "Pediatric Care Specialist",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "The pediatric care certification program was thorough and practical. I appreciate how the curriculum balanced theoretical knowledge with hands-on skills. The online resources and continuing education opportunities keep me updated on best practices.",
  },
  {
    id: 5,
    name: "Samuel Kipchoge",
    role: "Home Health Aide",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "ACCK's flexible learning options made it possible for me to get certified while working full-time. The investment in my education has paid off many times over through better job opportunities and higher compensation.",
  },
  {
    id: 6,
    name: "Dr. Amina Hassan",
    role: "Medical Director",
    image: "/placeholder.svg?height=100&width=100",
    testimonial:
      "The partnership between our hospital and ACCK has elevated our standard of care. Having a consistent framework for caregiver training and certification ensures that all patients receive high-quality care regardless of which staff member is assigned to them.",
  },
]

export default function SuccessStoriesPage() {
  return (
    <PageLayout
      title="Success Stories & Testimonials"
      description="Discover how ACCK certification has transformed caregiving careers and improved care standards across Kenya."
    >
      <div className="space-y-12">
        <Tabs defaultValue="individual" className="space-y-8">
          <TabsList className="mx-auto">
            <TabsTrigger value="individual">Individual Success Stories</TabsTrigger>
            <TabsTrigger value="institutional">Institutional Success Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="space-y-8">
            {successStories.map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-muted">
                    <div className="h-full flex items-center justify-center p-6">
                      <Avatar className="h-40 w-40">
                        <AvatarImage src={story.image || "/placeholder.svg"} alt={story.name} />
                        <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <CardTitle className="text-xl">{story.name}</CardTitle>
                          <CardDescription>
                            {story.role} • {story.location}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{story.certification}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{story.story}</p>
                      <div className="pt-2">
                        <p className="text-sm font-semibold">Impact:</p>
                        <p className="text-sm text-teal-600 dark:text-teal-400">{story.impact}</p>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="institutional" className="space-y-8">
            {institutionalStories.map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-muted">
                    <div className="h-full flex items-center justify-center p-6">
                      <div className="h-40 w-40 rounded-md overflow-hidden">
                        <img
                          src={story.image || "/placeholder.svg"}
                          alt={story.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <CardTitle className="text-xl">{story.name}</CardTitle>
                          <CardDescription>{story.location}</CardDescription>
                        </div>
                        <Badge variant="outline">{story.partnership}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{story.story}</p>
                      <div className="pt-2">
                        <p className="text-sm font-semibold">Impact:</p>
                        <p className="text-sm text-teal-600 dark:text-teal-400">{story.impact}</p>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-center">Testimonials</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="h-full flex flex-col">
                <CardContent className="flex-grow flex flex-col p-6">
                  <div className="flex-grow">
                    <p className="italic text-muted-foreground mb-4">"{testimonial.testimonial}"</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                    <Avatar>
                      <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-muted/50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Share Your Story</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Has ACCK certification made a difference in your caregiving career or institution? We'd love to hear about
            your experience and potentially feature your story.
          </p>
          <a
            href="/contact?subject=Success%20Story"
            className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Submit Your Story
          </a>
        </section>
      </div>
    </PageLayout>
  )
}
