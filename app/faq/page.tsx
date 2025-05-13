"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search } from "lucide-react"

// Mock data for FAQs
const faqCategories = [
  {
    id: "general",
    label: "General",
    faqs: [
      {
        question: "What is the Association of Certified Caregivers Kenya (ACCK)?",
        answer:
          "The Association of Certified Caregivers Kenya (ACCK) is a professional organization dedicated to elevating caregiving standards across Kenya through certification, education, and community support. We provide training, certification, and resources for caregivers to enhance their skills and advance their careers.",
      },
      {
        question: "How can I become a member of ACCK?",
        answer:
          "To become a member of ACCK, you need to create an account on our platform, select the appropriate membership level, and complete the registration process. Membership fees vary depending on the level you choose. Once registered, you'll have access to member benefits, including discounted courses, networking opportunities, and resources.",
      },
      {
        question: "What are the benefits of ACCK membership?",
        answer:
          "ACCK membership offers numerous benefits, including access to certification programs, continuing education opportunities, networking with fellow caregivers, job placement assistance, discounts on courses and events, access to resources and best practices, and recognition as a professional caregiver.",
      },
      {
        question: "How can I contact ACCK for support?",
        answer:
          "You can contact ACCK through various channels: Email us at info@acck.org, call our support line at +254 700 000000, visit our office in Nairobi, or use the contact form on our website. Our support team is available Monday through Friday, 8:00 AM to 5:00 PM.",
      },
    ],
  },
  {
    id: "certification",
    label: "Certification",
    faqs: [
      {
        question: "What certifications does ACCK offer?",
        answer:
          "ACCK offers various certification programs, including Basic Caregiving Certificate, Elder Care Specialist, Pediatric Care Specialist, Mental Health Support Specialist, and Palliative Care Specialist. Each certification focuses on specific skills and knowledge required for different caregiving specialties.",
      },
      {
        question: "How do I earn an ACCK certification?",
        answer:
          "To earn an ACCK certification, you need to: 1) Enroll in the corresponding certification course, 2) Complete all required coursework and assessments, 3) Pass the certification exam with the minimum required score (typically 70% or higher), 4) Complete any required practical hours or demonstrations, and 5) Submit all necessary documentation for verification.",
      },
      {
        question: "How long are ACCK certifications valid?",
        answer:
          "Most ACCK certifications are valid for two years from the date of issuance. To maintain your certification, you'll need to complete continuing education requirements and renew before the expiration date. Renewal typically involves a fee and documentation of continuing education activities.",
      },
      {
        question: "Can employers verify my ACCK certification?",
        answer:
          "Yes, employers can verify your ACCK certification through our online verification system. They'll need your certification number and your name to check your certification status, expiration date, and specialty areas. This verification service is available 24/7 on our website.",
      },
    ],
  },
  {
    id: "courses",
    label: "Courses",
    faqs: [
      {
        question: "How do I enroll in ACCK courses?",
        answer:
          "To enroll in ACCK courses, log in to your account, browse the course catalog, select the course you're interested in, and click 'Enroll Now.' Follow the prompts to complete payment and registration. Once enrolled, you'll have immediate access to the course materials.",
      },
      {
        question: "What is the format of ACCK courses?",
        answer:
          "ACCK courses are delivered through a combination of formats, including online modules, in-person workshops, practical demonstrations, and assessments. Online components can be accessed 24/7 through our learning platform, while in-person sessions are scheduled at specific times and locations.",
      },
      {
        question: "What is the refund policy for courses?",
        answer:
          "Course fees are generally non-refundable once the course has started. However, refund requests for special circumstances may be submitted in writing within 7 days of enrollment and will be evaluated on a case-by-case basis. Alternatively, you may be able to transfer your enrollment to a future course offering.",
      },
      {
        question: "How long do I have to complete a course?",
        answer:
          "The time allowed to complete a course varies depending on the specific program. Most courses have a designated completion timeframe, typically ranging from 4 weeks to 6 months. This information is provided in the course description. Extensions may be granted in certain circumstances for an additional fee.",
      },
    ],
  },
  {
    id: "membership",
    label: "Membership",
    faqs: [
      {
        question: "What membership levels does ACCK offer?",
        answer:
          "ACCK offers several membership levels: Student Membership (for those currently enrolled in caregiving education), Basic Membership (for entry-level caregivers), Professional Membership (for experienced caregivers with certifications), and Institutional Membership (for healthcare facilities and training institutions).",
      },
      {
        question: "How much does ACCK membership cost?",
        answer:
          "Membership fees vary by level: Student Membership (KSh 2,000/year), Basic Membership (KSh 5,000/year), Professional Membership (KSh 8,000/year), and Institutional Membership (starting at KSh 20,000/year). Discounts are available for multi-year subscriptions and early renewals.",
      },
      {
        question: "How do I renew my ACCK membership?",
        answer:
          "To renew your membership, log in to your account, navigate to the Membership section, and click on 'Renew Membership.' Follow the prompts to complete the renewal process and payment. You'll receive a confirmation email once your renewal is processed.",
      },
      {
        question: "Can I upgrade my membership level?",
        answer:
          "Yes, you can upgrade your membership level at any time. Log in to your account, go to the Membership section, and select 'Upgrade Membership.' You'll only need to pay the difference between your current level and the new level. The upgraded benefits will be available immediately after processing.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    faqs: [
      {
        question: "How do I reset my password?",
        answer:
          "To reset your password, click on the 'Forgot Password' link on the login page. Enter your registered email address, and we'll send you a password reset link. Click the link in the email and follow the instructions to create a new password. For security reasons, the reset link expires after 24 hours.",
      },
      {
        question: "What browsers are supported by the ACCK platform?",
        answer:
          "The ACCK platform supports the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend keeping your browser updated to the latest version. Some features may not work correctly on older browsers or Internet Explorer.",
      },
      {
        question: "Can I access the ACCK platform on mobile devices?",
        answer:
          "Yes, the ACCK platform is fully responsive and can be accessed on smartphones and tablets. We also offer a mobile app for iOS and Android devices, which provides enhanced features for on-the-go learning and community engagement.",
      },
      {
        question: "What should I do if I encounter technical issues?",
        answer:
          "If you encounter technical issues, first try refreshing the page or clearing your browser cache. If the problem persists, check our Technical Support page for common solutions. You can also contact our technical support team at support@acck.org or call +254 700 000000 during business hours.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter FAQs based on search query
  const filterFAQs = (faqs: any[]) => {
    if (!searchQuery) return faqs

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <PageLayout
      title="Frequently Asked Questions"
      description="Find answers to common questions about ACCK membership, certification, courses, and more."
    >
      <div className="space-y-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search FAQs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="flex flex-wrap justify-start">
            {faqCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {faqCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {filterFAQs(category.faqs).map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filterFAQs(category.faqs).length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No FAQs found matching your search query.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-center">Still Have Questions?</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            If you couldn't find the answer to your question, please don't hesitate to contact our support team. We're
            here to help!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Contact Support
            </a>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
