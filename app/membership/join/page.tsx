import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check } from "lucide-react"
import Link from "next/link"

export default function JoinMembershipPage() {
  return (
    <PageLayout
      title="Become a Member"
      description="Choose the category that best fits you and start your journey with us."
    >
      <div className="space-y-12">
        {/* Hero Banner */}
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-600 to-teal-800 text-white">
          <div className="p-8 md:p-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Membership Banner</h2>
              <p className="text-teal-50 text-lg">Choose Your Registration Type</p>
              <p className="text-teal-100 mt-2">
                Select the category that best describes you to proceed with registration.
              </p>
            </div>
          </div>
        </section>

        {/* Registration Options */}
        <section className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Caregiver</CardTitle>
                <CardDescription>
                  For individuals offering professional caregiving services, such as home nurses, elderly caregivers,
                  and disability care providers.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <h3 className="font-semibold">Requirements:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-teal-600 shrink-0" />
                      <span>Must have a valid caregiving certification.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-teal-600 shrink-0" />
                      <span>Minimum 18 years old.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-teal-600 shrink-0" />
                      <span>Experience in caregiving (preferred).</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                  <Link href="/membership/register-caregiver">Register as a Caregiver</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Institution</CardTitle>
                <CardDescription>
                  For organizations such as hospitals, training centers, and nursing homes seeking to register on the
                  platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <h3 className="font-semibold">Requirements:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-teal-600 shrink-0" />
                      <span>Must provide a valid registration number.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-teal-600 shrink-0" />
                      <span>Accreditation details required.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-teal-600 shrink-0" />
                      <span>Authorized representative must complete registration.</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                  <Link href="/membership/register-institution">Register as an Institution</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Find answers to the most common questions about our membership process.
          </p>

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
      </div>
    </PageLayout>
  )
}
