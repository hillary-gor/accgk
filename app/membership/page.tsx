import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, Award, Users, BookOpen, Calendar, MessageSquare, FileText, CreditCard } from "lucide-react"
import Link from "next/link"

export default function MembershipPage() {
  return (
    <PageLayout
      title="Membership"
      description="Join our growing network of caregivers and institutions. Gain exclusive access to training, networking, and career growth opportunities."
    >
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-xl bg-teal-600 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-800 opacity-90"></div>
          <div className="relative grid gap-4 p-8 md:grid-cols-2 md:gap-8 md:p-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Become a Member</h2>
              <p className="text-teal-50">
                Join our growing network of caregivers and institutions. Gain exclusive access to training, networking,
                and career growth opportunities.
              </p>
              <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                <Link href="/membership/join">Join Now</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-teal-700 shadow-lg">
                <div className="flex h-full items-center justify-center">
                  <img
                    src="/placeholder.svg?height=300&width=500"
                    alt="Membership Video"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <div className="h-12 w-12 rounded-full bg-white text-teal-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-12 w-12"
                      >
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Become a Member Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">Why Become a Member?</h2>
            <p className="mt-2 text-muted-foreground">
              Our membership program offers exclusive opportunities for caregivers and institutions to grow, learn, and
              network with industry leaders.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>For Caregivers</CardTitle>
                <CardDescription>Benefits for individual caregiving professionals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-teal-600" />
                  <span>Official membership certificate</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-teal-600" />
                  <span>Exclusive training and industry insights</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-teal-600" />
                  <span>Priority access to networking events</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-teal-600" />
                  <span>Discounted certification programs</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-teal-600" />
                  <span>Job placement assistance</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-teal-600" />
                  <span>Professional development resources</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                  <Link href="/membership/join?type=caregiver">Join as a Caregiver</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>For Institutions</CardTitle>
                <CardDescription>Benefits for healthcare facilities and training centers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-teal-600" />
                  <span>Accreditation and recognition</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-teal-600" />
                  <span>Institutional visibility and promotion</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-teal-600" />
                  <span>Recruitment access to top caregivers</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-teal-600" />
                  <span>Discounted group training programs</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-teal-600" />
                  <span>Industry representation and advocacy</span>
                </div>
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-teal-600" />
                  <span>Networking with other healthcare institutions</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                  <Link href="/membership/join?type=institution">Join as an Institution</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* How to Become a Member Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">How to Become a Member</h2>
            <p className="mt-2 text-muted-foreground">
              Follow these simple steps to join our community of certified caregivers and institutions.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-300">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Choose Your Membership Type</h3>
                <p className="text-sm text-muted-foreground">
                  Select between Individual Caregiver (KES 5,000) or Institution (KES 100,000).
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-300">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Complete the Registration Form</h3>
                <p className="text-sm text-muted-foreground">
                  Fill in your personal or institutional details accurately.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-300">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Pay via MPesa</h3>
                <p className="text-sm text-muted-foreground">Make a secure transaction using MPesa (Daraja API).</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-300">4</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Receive Confirmation</h3>
                <p className="text-sm text-muted-foreground">
                  Instant confirmation and access to membership benefits upon approval.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Membership Benefits Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">Membership Benefits</h2>
            <p className="mt-2 text-muted-foreground">Explore the comprehensive benefits available to ACCK members.</p>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="mx-auto">
              <TabsTrigger value="all">All Benefits</TabsTrigger>
              <TabsTrigger value="certification">Certification</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="networking">Networking</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <Award className="h-10 w-10 text-teal-600 mb-4" />
                    <h3 className="text-lg font-bold mb-2">Certification</h3>
                    <p className="text-sm text-muted-foreground">
                      Discounted access to ACCK certification programs and priority processing for certification
                      applications. Members receive special rates on certification renewal and specialized credentials.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <BookOpen className="h-10 w-10 text-teal-600 mb-4" />
                    <h3 className="text-lg font-bold mb-2">Education</h3>
                    <p className="text-sm text-muted-foreground">
                      Exclusive access to continuing education courses, workshops, and webinars. Members receive
                      discounted rates on all ACCK training programs and priority registration for limited-seat events.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Users className="h-10 w-10 text-teal-600 mb-4" />
                    <h3 className="text-lg font-bold mb-2">Networking</h3>
                    <p className="text-sm text-muted-foreground">
                      Invitations to member-only networking events, conferences, and forums. Connect with fellow
                      caregivers, healthcare institutions, and industry leaders to expand your professional network.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Calendar className="h-10 w-10 text-teal-600 mb-4" />
                    <h3 className="text-lg font-bold mb-2">Events</h3>
                    <p className="text-sm text-muted-foreground">
                      Priority registration and discounted rates for ACCK conferences, workshops, and special events.
                      Members gain access to exclusive sessions and networking opportunities at all ACCK events.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <MessageSquare className="h-10 w-10 text-teal-600 mb-4" />
                    <h3 className="text-lg font-bold mb-2">Community</h3>
                    <p className="text-sm text-muted-foreground">
                      Access to ACCK's online community platform for peer support, knowledge sharing, and professional
                      discussions. Participate in specialized interest groups and mentorship programs.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <FileText className="h-10 w-10 text-teal-600 mb-4" />
                    <h3 className="text-lg font-bold mb-2">Resources</h3>
                    <p className="text-sm text-muted-foreground">
                      Exclusive access to ACCK's resource library, including caregiving guides, templates, research
                      publications, and best practice documents. Regular updates on industry trends and regulations.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <CreditCard className="h-10 w-10 text-teal-600 mb-4" />
                    <h3 className="text-lg font-bold mb-2">Financial Benefits</h3>
                    <p className="text-sm text-muted-foreground">
                      Members receive discounts on all ACCK programs, services, and events. Additional benefits include
                      access to special partner offers and potential eligibility for professional development grants.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="certification" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Certification Benefits</CardTitle>
                  <CardDescription>
                    Enhance your professional credentials with ACCK certification benefits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Discounted Certification Fees</h4>
                      <p className="text-sm text-muted-foreground">
                        Members receive up to 30% discount on all certification program fees.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Priority Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        Member applications are processed with priority, reducing waiting times.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Certification Renewal Discounts</h4>
                      <p className="text-sm text-muted-foreground">
                        Special rates for certification renewal and maintenance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Specialized Credentials</h4>
                      <p className="text-sm text-muted-foreground">
                        Exclusive access to specialized certification programs not available to non-members.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Education Benefits</CardTitle>
                  <CardDescription>Continuous learning opportunities for professional development</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Continuing Education</h4>
                      <p className="text-sm text-muted-foreground">
                        Access to exclusive continuing education courses and webinars.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Training Discounts</h4>
                      <p className="text-sm text-muted-foreground">
                        Reduced rates on all ACCK training programs and workshops.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Priority Registration</h4>
                      <p className="text-sm text-muted-foreground">
                        Early access to register for limited-seat educational events.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Educational Resources</h4>
                      <p className="text-sm text-muted-foreground">
                        Access to premium educational content, videos, and learning materials.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="networking" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Networking Benefits</CardTitle>
                  <CardDescription>Connect with fellow professionals and industry leaders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Exclusive Events</h4>
                      <p className="text-sm text-muted-foreground">
                        Invitations to member-only networking events and forums.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Industry Connections</h4>
                      <p className="text-sm text-muted-foreground">
                        Opportunities to connect with healthcare institutions and industry leaders.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Mentorship Programs</h4>
                      <p className="text-sm text-muted-foreground">
                        Participate in mentorship programs as either a mentor or mentee.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Online Community</h4>
                      <p className="text-sm text-muted-foreground">
                        Access to ACCK's online community platform for ongoing networking.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Benefits</CardTitle>
                  <CardDescription>
                    Access valuable tools and materials to support your caregiving practice
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Resource Library</h4>
                      <p className="text-sm text-muted-foreground">
                        Exclusive access to ACCK's comprehensive resource library.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Practice Guides</h4>
                      <p className="text-sm text-muted-foreground">
                        Caregiving guides, templates, and best practice documents.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Research Publications</h4>
                      <p className="text-sm text-muted-foreground">
                        Access to research publications and industry reports.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Industry Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        Regular updates on industry trends, regulations, and best practices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Membership Certificate Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">Membership Certificate</h2>
            <p className="mt-2 text-muted-foreground">
              Receive an official digital membership certificate upon successful registration.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative max-w-md overflow-hidden rounded-lg border p-8 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-teal-100 opacity-50"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 text-teal-600">
                  <Award className="h-16 w-16" />
                </div>
                <h3 className="mb-1 text-2xl font-bold">Certificate of Membership</h3>
                <p className="mb-4 text-sm text-muted-foreground">This certifies that</p>
                <p className="mb-2 text-xl font-semibold">John Doe</p>
                <p className="mb-4 text-sm text-muted-foreground">
                  is a recognized member of the Association of Certified Caregivers Kenya
                </p>
                <div className="mb-4 h-px w-3/4 bg-teal-200"></div>
                <p className="text-sm text-muted-foreground">Membership ID: ACCK-2025-001234</p>
                <p className="text-sm text-muted-foreground">Valid until: May 12, 2026</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="mt-2 text-muted-foreground">Find answers to common questions about our membership program.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What happens after I register?</AccordionTrigger>
              <AccordionContent>
                After submitting your registration and payment, our team will review your application within 2-3
                business days. Once approved, you'll receive a welcome email with your membership certificate, login
                credentials for the member portal, and information on how to access your benefits.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long does the approval process take?</AccordionTrigger>
              <AccordionContent>
                The approval process typically takes 2-3 business days for individual caregivers and 5-7 business days
                for institutions. If additional information is needed, our team will contact you directly, which may
                extend the process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I update my information after registration?</AccordionTrigger>
              <AccordionContent>
                Yes, you can update your personal or institutional information at any time through the member portal.
                Simply log in, navigate to your profile settings, and make the necessary changes. For major changes like
                name or institution type, please contact our membership support team.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What should I do if my application is rejected?</AccordionTrigger>
              <AccordionContent>
                If your application is rejected, you'll receive an email explaining the reasons. Common reasons include
                incomplete information, unverifiable credentials, or not meeting the minimum requirements. You can
                address these issues and reapply after 30 days. Our membership support team is available to help you
                understand the requirements better.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>I need help with registration. Who do I contact?</AccordionTrigger>
              <AccordionContent>
                For assistance with registration or any membership-related questions, you can contact our membership
                support team at membership@acck.org or call +254 700 000000 during business hours (Monday to Friday,
                8:00 AM to 5:00 PM).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>What benefits do I get as a member?</AccordionTrigger>
              <AccordionContent>
                Members receive numerous benefits including discounted certification and training programs, access to
                exclusive resources and events, networking opportunities, job placement assistance, and professional
                development resources. The specific benefits vary between individual and institutional memberships.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>Is my membership fee refundable?</AccordionTrigger>
              <AccordionContent>
                Membership fees are generally non-refundable once your application has been approved. If your
                application is rejected, you will receive a full refund minus a small processing fee. In exceptional
                circumstances, refund requests may be considered on a case-by-case basis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>How do institutions register multiple caregivers?</AccordionTrigger>
              <AccordionContent>
                Institutions can register multiple caregivers through the institutional membership portal. After your
                institution is approved, you'll gain access to a dashboard where you can add and manage individual
                caregiver profiles. Bulk registration discounts are available for institutions registering 10 or more
                caregivers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA Section */}
        <section className="rounded-lg bg-teal-50 p-8 text-center dark:bg-teal-950">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Secure Your Membership Today!</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Join a growing network of professionals and institutions. Take the next step in your career or business.
          </p>
          <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
            <Link href="/membership/join">Join Now</Link>
          </Button>

          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Need Assistance?</h3>
            <p className="text-muted-foreground">
              Have questions? Contact our membership support team at info@accgk.co.ke or call +254 700 111 000.
            </p>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
