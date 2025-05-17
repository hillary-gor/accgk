"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion, AnimatePresence } from "framer-motion"

const faqItems = [
  {
    question: "What happens after I submit my membership application?",
    answer:
      "After submission, your application undergoes a verification process where our team reviews your credentials and information. This typically takes 3-5 business days. You'll receive email updates on your application status, and once approved, you'll get instructions for payment. After payment confirmation, you'll receive your digital membership certificate and login credentials for the member portal.",
  },
  {
    question: "Can I update my profile information after registration?",
    answer:
      "Yes, you can update your profile information at any time through the ACCGK member portal. After logging in, navigate to the 'My Profile' section where you can edit your contact details, professional information, and upload new credentials or certifications. Any substantial changes to your qualifications may require verification by our team.",
  },
  {
    question: "What if my membership application is rejected?",
    answer:
      "If your application doesn't meet our current criteria, you'll receive a detailed explanation of the reasons and specific guidance on how to address these issues. You can reapply after addressing the identified gaps. We also offer pre-application consultations to help potential members understand the requirements before formal submission.",
  },
  {
    question: "How do institutions register multiple caregivers?",
    answer:
      "Institutions can register multiple caregivers through our bulk registration process. After creating an institutional account, you'll gain access to a dashboard where you can upload a spreadsheet with caregiver details or add them individually. We offer volume discounts based on the number of caregivers registered. Our institutional support team can provide guidance throughout this process.",
  },
  {
    question: "How long is the membership valid and how do I renew?",
    answer:
      "ACCGK membership is valid for one year from the date of approval. Renewal notices are sent via email 60, 30, and 15 days before expiration. To renew, log into the member portal and follow the renewal process, which includes updating your information and paying the renewal fee. Members must also demonstrate completion of required continuing education units (CEUs) for renewal.",
  },
  {
    question: "What continuing education requirements must I fulfill as a member?",
    answer:
      "ACCGK members are required to complete 20 Continuing Education Units (CEUs) annually to maintain active membership status. These can be earned through ACCGK-approved workshops, courses, conferences, and online learning modules. The member portal tracks your CEU progress and suggests relevant educational opportunities based on your specialization and interests.",
  },
  {
    question: "Are there different membership tiers or categories?",
    answer:
      "Yes, ACCGK offers several membership categories: Student Member (for those enrolled in caregiving programs), Associate Member (for entry-level caregivers), Full Member (for experienced caregivers with complete certification), and Institutional Member (for healthcare facilities and training institutions). Each category has specific eligibility requirements and benefits tailored to the member's professional stage.",
  },
  {
    question: "How can I get involved in ACCGK committees and leadership?",
    answer:
      "Active members can apply to join various ACCGK committees after six months of membership. Committee opportunities include Education, Standards and Ethics, Membership, and Advocacy. Annual leadership elections are held for the Executive Board, and members in good standing for at least one year are eligible to run for these positions. We also offer mentorship programs for members interested in leadership development.",
  },
]

export default function FaqSection() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#3F96E6] mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about ACCGK membership, applications, and support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 max-w-6xl mx-auto items-start">
        {/* Image Section */}
        <div className="w-full">
          <img
            src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//neema-mbuno-accgk-standing.JPG"
            alt="Illustration representing frequently asked questions"
            className="w-full h-auto rounded-xl shadow-md object-cover"
          />
        </div>

        {/* FAQ Section */}
        <div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-xl shadow-sm bg-white hover:border-[#3F96E6] transition-all"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium text-gray-800 hover:text-[#3F96E6] transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent asChild>
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={`faq-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden px-6 pb-4 text-gray-600"
                    >
                      {item.answer}
                    </motion.div>
                  </AnimatePresence>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
