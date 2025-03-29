"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What happens after I register?",
    answer:
      "After registration, your application will be reviewed. You will receive a Magic Link via email for verification. Once approved, you will be granted access to your respective dashboard.",
  },
  {
    question: "How long does the approval process take?",
    answer:
      "The approval process typically takes 24-48 hours. If additional documents are required, you will be notified via email.",
  },
  {
    question: "Can I update my information after registration?",
    answer:
      "Yes. Once approved, you can log in to your dashboard and update your profile details.",
  },
  {
    question: "What should I do if my application is rejected?",
    answer:
      "If your application is rejected, you will receive a reason via email. You may appeal or resubmit your application with the required corrections.",
  },
  {
    question: "I need help with registration. Who do I contact?",
    answer:
      "You can contact our support team at support@example.com for assistance.",
  },
  {
    question: "What benefits do I get as a member?",
    answer:
      "As a member, you gain access to exclusive caregiver resources, networking opportunities, training sessions, and industry insights tailored to your professional growth.",
  },
  {
    question: "Is my membership fee refundable?",
    answer:
      "No, membership fees are non-refundable. However, you may reach out to our support team for exceptional cases.",
  },
  {
    question: "How do institutions register multiple caregivers?",
    answer:
      "Institutions can register multiple caregivers under their account. Simply select 'Institution' during registration and follow the instructions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#3F96E6]">Frequently Asked Questions</h2>
        <p className="mt-4 text-lg text-gray-600">
          Find answers to the most common questions about our membership process.
        </p>
      </div>

      <div className="mt-10 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 py-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 hover:text-[#AB056A] transition"
            >
              {faq.question}
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown className="text-gray-500" />
              </motion.div>
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
