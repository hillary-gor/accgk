"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
];

const faqImage = {
  url: "https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//pricilla-show-off.JPG",
  alt: "Pricilla smilling, signifying happiness.",
};

export default function FaqSection() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#3F96E6] mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about ACCGK membership, applications,
          and support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 max-w-6xl mx-auto items-start">
        {/* Image Section */}
        <div className="w-full">
          <Image
            src={faqImage.url}
            alt={faqImage.alt}
            width={800}
            height={500}
            className="object-contain rounded-[30px] w-full h-full"
            unoptimized
          />
        </div>

        {/* FAQ Section */}
        <div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((item, index) => (
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
  );
}
