import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Mock data for job openings
const jobOpenings = [
  {
    id: 1,
    title: "Certification Program Manager",
    department: "Education",
    location: "Nairobi",
    type: "Full-time",
    description:
      "Oversee the development and implementation of caregiver certification programs, ensuring alignment with industry standards and best practices.",
    responsibilities: [
      "Develop and maintain certification program curricula",
      "Coordinate with trainers and subject matter experts",
      "Monitor program quality and effectiveness",
      "Manage certification examinations and assessments",
    ],
    requirements: [
      "Bachelor's degree in healthcare, education, or related field",
      "5+ years of experience in program management",
      "Knowledge of certification processes and standards",
      "Strong leadership and communication skills",
    ],
  },
  {
    id: 2,
    title: "Community Engagement Coordinator",
    department: "Outreach",
    location: "Nairobi",
    type: "Full-time",
    description:
      "Build and nurture relationships with caregivers, healthcare institutions, and community organizations to promote ACCK's mission and programs.",
    responsibilities: [
      "Organize community events and workshops",
      "Manage social media and online community platforms",
      "Develop engagement strategies to grow membership",
      "Collect and analyze community feedback",
    ],
    requirements: [
      "Bachelor's degree in communications, public relations, or related field",
      "3+ years of experience in community engagement or outreach",
      "Excellent interpersonal and communication skills",
      "Experience with social media management and digital marketing",
    ],
  },
  {
    id: 3,
    title: "Curriculum Developer",
    department: "Education",
    location: "Remote",
    type: "Contract",
    description:
      "Design and develop comprehensive, evidence-based curricula for caregiver training programs across various specialties.",
    responsibilities: [
      "Research and compile content for training modules",
      "Develop learning objectives and assessment methods",
      "Create engaging multimedia learning materials",
      "Collaborate with subject matter experts and instructional designers",
    ],
    requirements: [
      "Master's degree in education, instructional design, or healthcare",
      "3+ years of experience in curriculum development",
      "Knowledge of adult learning principles",
      "Experience with e-learning platforms and tools",
    ],
  },
]

// Mock data for internships
const internships = [
  {
    id: 1,
    title: "Education Program Intern",
    department: "Education",
    duration: "3 months",
    description:
      "Assist in the development and implementation of caregiver training programs, with a focus on digital learning materials and assessment tools.",
    responsibilities: [
      "Support curriculum development projects",
      "Assist with program evaluation and feedback analysis",
      "Help organize training sessions and workshops",
      "Contribute to research on caregiving best practices",
    ],
    requirements: [
      "Current enrollment in a bachelor's or master's program in education, healthcare, or related field",
      "Strong research and writing skills",
      "Familiarity with digital learning platforms",
      "Interest in healthcare education and professional development",
    ],
  },
  {
    id: 2,
    title: "Marketing & Communications Intern",
    department: "Marketing",
    duration: "6 months",
    description:
      "Support ACCK's marketing and communications efforts, with a focus on digital content creation, social media management, and event promotion.",
    responsibilities: [
      "Create content for social media and the ACCK website",
      "Assist with email newsletter production",
      "Help organize and promote ACCK events",
      "Support public relations and media outreach efforts",
    ],
    requirements: [
      "Current enrollment in a bachelor's or master's program in marketing, communications, or related field",
      "Strong writing and editing skills",
      "Experience with social media platforms and content creation",
      "Basic graphic design skills (Canva, Adobe Creative Suite)",
    ],
  },
]

export default function CareersPage() {
  return (
    <PageLayout
      title="Careers"
      description="Join the Association of Certified Caregivers Kenya (ACCK) team and help us elevate caregiving standards across Kenya."
    >
      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Join Our Team</h2>
          <p className="text-lg text-muted-foreground">
            At ACCK, we're passionate about elevating caregiving standards across Kenya. We're looking for talented,
            mission-driven individuals to join our team and help us make a difference in the lives of caregivers and
            those they serve.
          </p>
          <p className="text-lg text-muted-foreground">
            We offer a collaborative work environment, competitive benefits, and the opportunity to contribute to
            meaningful work that impacts communities across Kenya.
          </p>
        </section>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">Job Openings</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
            <TabsTrigger value="volunteer">Volunteer Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            <div className="grid gap-6">
              {jobOpenings.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>
                          {job.department} • {job.location}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{job.description}</p>

                    <div>
                      <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.responsibilities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.requirements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="bg-teal-600 hover:bg-teal-700">
                      <Link href={`/careers/apply?job=${job.id}`}>Apply Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="internships" className="space-y-6">
            <div className="grid gap-6">
              {internships.map((internship) => (
                <Card key={internship.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <CardTitle>{internship.title}</CardTitle>
                        <CardDescription>
                          {internship.department} • {internship.duration}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">Internship</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{internship.description}</p>

                    <div>
                      <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {internship.responsibilities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {internship.requirements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="bg-teal-600 hover:bg-teal-700">
                      <Link href={`/careers/apply?internship=${internship.id}`}>Apply Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="volunteer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Opportunities</CardTitle>
                <CardDescription>Contribute your skills and time to support ACCK's mission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  ACCK offers various volunteer opportunities for individuals passionate about improving caregiving
                  standards in Kenya. Volunteers play a crucial role in supporting our programs, events, and community
                  outreach efforts.
                </p>

                <div>
                  <h4 className="font-semibold mb-2">Current Volunteer Opportunities:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Community Workshop Facilitator</strong>
                      <p className="text-sm text-muted-foreground">
                        Help organize and facilitate workshops for caregivers in various communities.
                      </p>
                    </li>
                    <li>
                      <strong>Content Creator</strong>
                      <p className="text-sm text-muted-foreground">
                        Develop educational content, blog posts, and social media materials to raise awareness about
                        caregiving best practices.
                      </p>
                    </li>
                    <li>
                      <strong>Event Support</strong>
                      <p className="text-sm text-muted-foreground">
                        Assist with planning and execution of ACCK events, conferences, and certification ceremonies.
                      </p>
                    </li>
                    <li>
                      <strong>Mentorship Program</strong>
                      <p className="text-sm text-muted-foreground">
                        Experienced caregivers can volunteer to mentor new caregivers entering the profession.
                      </p>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/careers/volunteer">Become a Volunteer</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Application Process</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-300">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Submit Application</h3>
                <p className="text-sm text-muted-foreground">
                  Complete the online application form with your personal information, qualifications, and relevant
                  experience.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-300">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Initial Screening</h3>
                <p className="text-sm text-muted-foreground">
                  Our HR team will review your application and reach out to qualified candidates for an initial phone
                  interview.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-300">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Interview Process</h3>
                <p className="text-sm text-muted-foreground">
                  Selected candidates will be invited for in-person or virtual interviews with the hiring team and
                  potential colleagues.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-300">4</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Offer & Onboarding</h3>
                <p className="text-sm text-muted-foreground">
                  Successful candidates will receive an offer letter and begin the onboarding process to join the ACCK
                  team.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
