import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"
import Link from "next/link"

// Mock data for current partners
const currentPartners = [
  {
    id: 1,
    name: "Ministry of Health",
    logo: "/placeholder.svg?height=100&width=200",
    category: "Government",
    description:
      "Strategic partnership to develop and implement national caregiving standards and certification requirements.",
  },
  {
    id: 2,
    name: "Nairobi University Medical School",
    logo: "/placeholder.svg?height=100&width=200",
    category: "Education",
    description:
      "Collaboration on curriculum development, research initiatives, and practical training opportunities for caregivers.",
  },
  {
    id: 3,
    name: "Kenya Healthcare Federation",
    logo: "/placeholder.svg?height=100&width=200",
    category: "Industry",
    description: "Joint advocacy for caregiver recognition, professional development, and improved working conditions.",
  },
  {
    id: 4,
    name: "Global Caregiving Alliance",
    logo: "/placeholder.svg?height=100&width=200",
    category: "International",
    description:
      "International partnership providing access to global best practices, resources, and certification standards.",
  },
  {
    id: 5,
    name: "Sunrise Elder Care Network",
    logo: "/placeholder.svg?height=100&width=200",
    category: "Healthcare",
    description:
      "Industry partner providing employment opportunities and practical training sites for certified caregivers.",
  },
  {
    id: 6,
    name: "CareTech Solutions",
    logo: "/placeholder.svg?height=100&width=200",
    category: "Technology",
    description:
      "Technology partner supporting digital learning platforms, certification verification systems, and telehealth integration.",
  },
]

// Mock data for partnership packages
const partnershipPackages = [
  {
    id: 1,
    name: "Strategic Partner",
    description:
      "Comprehensive partnership for organizations seeking deep integration with ACCK's mission and programs.",
    benefits: [
      "Co-development of certification programs and standards",
      "Joint research initiatives and publications",
      "Preferred access to certified caregivers for employment",
      "Co-branding opportunities on all ACCK materials",
      "VIP participation in all ACCK events and conferences",
      "Dedicated relationship manager and quarterly strategy meetings",
      "Customized training programs for your organization",
    ],
    investment: "KSh 500,000+ annually",
  },
  {
    id: 2,
    name: "Education Partner",
    description: "Ideal for educational institutions and training providers looking to align with ACCK standards.",
    benefits: [
      "Curriculum alignment with ACCK certification requirements",
      "Faculty development and train-the-trainer programs",
      "Student pathways to ACCK certification",
      "Co-hosted educational events and workshops",
      "Recognition as an approved training provider",
      "Access to ACCK learning resources and materials",
      "Participation in education advisory committees",
    ],
    investment: "KSh 250,000+ annually",
  },
  {
    id: 3,
    name: "Industry Partner",
    description: "For healthcare facilities and employers seeking qualified caregivers and quality improvement.",
    benefits: [
      "Priority access to ACCK's certified caregiver database",
      "Staff training and certification at preferential rates",
      "Quality improvement consultations and assessments",
      "Recognition as an employer of choice for certified caregivers",
      "Participation in job fairs and recruitment events",
      "Input into certification standards and competencies",
      "Discounted group memberships for staff",
    ],
    investment: "KSh 200,000+ annually",
  },
]

// Mock data for sponsorship opportunities
const sponsorshipOpportunities = [
  {
    id: 1,
    name: "Annual Conference Sponsor",
    description:
      "Support ACCK's flagship annual conference bringing together caregivers, educators, and healthcare leaders from across Kenya.",
    benefits: [
      "Prominent branding throughout the conference venue",
      "Speaking opportunity during opening or closing ceremony",
      "Exhibition booth in prime location",
      "Full-page advertisement in conference program",
      "Logo on all conference materials and website",
      "10 complimentary conference registrations",
      "Recognition in all conference press releases and media",
    ],
    levels: [
      { name: "Platinum", amount: "KSh 500,000" },
      { name: "Gold", amount: "KSh 300,000" },
      { name: "Silver", amount: "KSh 150,000" },
    ],
  },
  {
    id: 2,
    name: "Certification Scholarship Fund",
    description:
      "Enable aspiring caregivers from underserved communities to access certification programs through scholarship support.",
    benefits: [
      "Recognition as a scholarship provider on the ACCK website",
      "Opportunity to present certificates to scholarship recipients",
      "Impact reports on scholarship outcomes and success stories",
      "Branding on scholarship application materials",
      "Recognition at certification ceremonies",
      "Feature in ACCK newsletter and social media",
      "Tax benefits for charitable contribution",
    ],
    levels: [
      { name: "Full Program (10+ scholarships)", amount: "KSh 250,000+" },
      { name: "Partial Program (5-9 scholarships)", amount: "KSh 125,000+" },
      { name: "Individual Scholarship", amount: "KSh 25,000 per student" },
    ],
  },
  {
    id: 3,
    name: "Digital Learning Platform Sponsor",
    description:
      "Support the development and maintenance of ACCK's digital learning platform, expanding access to caregiver education across Kenya.",
    benefits: [
      "Branded learning module or course section",
      "Logo visibility on the platform login page",
      "Recognition in platform tutorials and guides",
      "Opportunity to provide expert content or case studies",
      "Mention in all platform-related communications",
      "Regular usage and impact reports",
      "Recognition at platform launch events",
    ],
    levels: [
      { name: "Technology Partner", amount: "KSh 400,000" },
      { name: "Content Partner", amount: "KSh 200,000" },
      { name: "Access Partner", amount: "KSh 100,000" },
    ],
  },
]

export default function PartnershipsPage() {
  return (
    <PageLayout
      title="Partnerships & Sponsorships"
      description="Explore opportunities to partner with the Association of Certified Caregivers Kenya (ACCK) and support our mission to elevate caregiving standards."
    >
      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Why Partner with ACCK?</h2>
          <p className="text-lg text-muted-foreground">
            Partnering with the Association of Certified Caregivers Kenya (ACCK) offers organizations the opportunity to
            contribute to the advancement of caregiving standards while achieving their own strategic objectives. Our
            partners play a crucial role in shaping the future of caregiving in Kenya through collaborative initiatives,
            resource sharing, and joint advocacy.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-600 dark:text-teal-300"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Access to Talent</h3>
                <p className="text-muted-foreground">
                  Connect with a network of certified caregivers who meet rigorous standards of knowledge and skill,
                  ensuring quality care for your clients or patients.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-600 dark:text-teal-300"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Improvement</h3>
                <p className="text-muted-foreground">
                  Enhance the quality of care in your organization through standardized training, certification, and
                  continuous professional development.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-600 dark:text-teal-300"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Industry Influence</h3>
                <p className="text-muted-foreground">
                  Shape the future of caregiving standards and practices through participation in advisory committees
                  and policy development.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-600 dark:text-teal-300"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Brand Association</h3>
                <p className="text-muted-foreground">
                  Align your brand with ACCK's reputation for excellence in caregiving, demonstrating your commitment to
                  quality and professional standards.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-600 dark:text-teal-300"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Networking</h3>
                <p className="text-muted-foreground">
                  Connect with other healthcare organizations, educational institutions, and industry leaders through
                  ACCK's extensive network and events.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-600 dark:text-teal-300"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Social Impact</h3>
                <p className="text-muted-foreground">
                  Contribute to the improvement of healthcare outcomes and quality of life for care recipients across
                  Kenya through your support of professional caregiving.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Our Current Partners</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentPartners.map((partner) => (
              <Card key={partner.id} className="flex flex-col">
                <CardHeader className="p-4 pb-2 text-center">
                  <div className="mx-auto mb-4 h-20 w-40 flex items-center justify-center">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <CardTitle className="text-lg">{partner.name}</CardTitle>
                  <CardDescription>{partner.category}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2 flex-grow">
                  <p className="text-sm text-muted-foreground text-center">{partner.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Tabs defaultValue="partnerships" className="space-y-8">
          <TabsList className="mx-auto">
            <TabsTrigger value="partnerships">Partnership Opportunities</TabsTrigger>
            <TabsTrigger value="sponsorships">Sponsorship Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="partnerships" className="space-y-8">
            <p className="text-lg text-muted-foreground">
              ACCK offers various partnership packages designed to meet the needs and objectives of different
              organizations. Each partnership is customized to create mutual value and advance our shared mission of
              elevating caregiving standards.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              {partnershipPackages.map((package_) => (
                <Card key={package_.id} className="flex flex-col">
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-xl">{package_.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2 flex-grow">
                    <p className="text-sm text-muted-foreground mb-4">{package_.description}</p>
                    <h4 className="font-semibold mb-2">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {package_.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-semibold">Investment:</p>
                      <p className="text-sm text-muted-foreground">{package_.investment}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                      <Link href="/contact?subject=Partnership%20Inquiry">Inquire Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sponsorships" className="space-y-8">
            <p className="text-lg text-muted-foreground">
              Sponsorship opportunities allow organizations to support specific ACCK initiatives, events, or programs
              while gaining visibility and demonstrating their commitment to quality caregiving.
            </p>

            <div className="space-y-8">
              {sponsorshipOpportunities.map((opportunity) => (
                <Card key={opportunity.id}>
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-xl">{opportunity.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <p className="text-muted-foreground mb-4">{opportunity.description}</p>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="font-semibold mb-2">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {opportunity.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Sponsorship Levels:</h4>
                        <div className="space-y-4">
                          {opportunity.levels.map((level, index) => (
                            <div key={index} className="flex justify-between items-center pb-2 border-b">
                              <span className="font-medium">{level.name}</span>
                              <span className="text-muted-foreground">{level.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button asChild className="bg-teal-600 hover:bg-teal-700">
                      <Link href="/contact?subject=Sponsorship%20Inquiry">Inquire About Sponsorship</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <section className="bg-muted/50 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Interested in Partnering with ACCK?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            We welcome the opportunity to discuss how a partnership with ACCK can benefit your organization while
            advancing our shared commitment to excellence in caregiving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link href="/contact?subject=Partnership%20Inquiry">Contact Our Partnership Team</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/partnerships/brochure">Download Partnership Brochure</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
