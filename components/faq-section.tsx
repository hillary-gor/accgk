"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is ACCGK and what does it do?",
    answer:
      "The Association of Certified Caregivers Kenya (ACCGK) is the premier regulatory body dedicated to supporting and elevating certified caregivers across Kenya. We establish and maintain professional standards, ensure quality care delivery, and advocate for the rights and welfare of caregiving professionals.",
  },
  {
    question: "How do I become a certified caregiver with ACCGK?",
    answer:
      "To become certified, you need to complete an approved training program, pass the ACCGK certification exam, and meet all ethical and professional requirements. Visit our Registration page for detailed information on the application process.",
  },
  {
    question: "What are the benefits of ACCGK certification?",
    answer:
      "ACCGK certification provides professional recognition, access to continuing education, career advancement opportunities, legal protection, and inclusion in the national registry of certified caregivers, which can lead to better employment opportunities.",
  },
  {
    question: "How often do I need to renew my certification?",
    answer:
      "ACCGK certification must be renewed every two years. Renewal requires completion of continuing education units (CEUs) and maintaining good standing with the association.",
  },
  {
    question: "How can institutions partner with ACCGK?",
    answer:
      "Healthcare institutions can partner with ACCGK through our Institutional Partnership Program. This provides access to certified caregivers, training programs, and quality assurance frameworks. Contact us through our Partnership page to learn more.",
  },
  {
    question: "What continuing education opportunities does ACCGK offer?",
    answer:
      "ACCGK offers workshops, seminars, online courses, and annual conferences that provide continuing education units (CEUs) required for certification renewal. Our education programs cover clinical skills, ethical practices, and professional development.",
  },
  {
    question: "How does ACCGK handle complaints against caregivers?",
    answer:
      "ACCGK has a formal complaint process and disciplinary framework. Complaints can be submitted through our website and are reviewed by the Ethics Committee. Investigations are conducted with due process, and appropriate actions are taken based on findings.",
  },
  {
    question: "What is the ACCGK Code of Ethics?",
    answer:
      "The ACCGK Code of Ethics outlines the professional standards and ethical principles that all certified caregivers must adhere to. It covers areas such as patient dignity, confidentiality, professional boundaries, and continuing competence.",
  },
]

export default function FaqSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accgk-blue">Frequently Asked Questions</h2>
          <div className="w-20 h-1 bg-accgk-pink mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">Find answers to common questions about ACCGK and our services.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-accgk-blue hover:text-accgk-pink">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center">
            <p className="text-gray-700 mb-4">
              Don't see your question here? Contact us directly and we'll be happy to help.
            </p>
            <a
              href="#contact"
              className="inline-block px-6 py-3 bg-accgk-blue text-white rounded-md hover:bg-accgk-blue/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
