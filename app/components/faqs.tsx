"use client";
import { useState } from "react";

const faqs = [
  {
    question: "Who can enroll in the caregiver training program?",
    answer:
      "Anyone interested in a caregiving career can enroll. No prior experience is needed, but a passion for healthcare is recommended.",
  },
  {
    question: "Is the certification recognized?",
    answer:
      "Yes, our certifications are industry-recognized and align with national caregiving standards.",
  },
  {
    question: "How long does the training take?",
    answer:
      "The duration varies by course, but most programs take between 3 to 6 months to complete.",
  },
  {
    question: "Are there job placement opportunities after training?",
    answer:
      "We provide career guidance and connect certified caregivers with potential employers through our network.",
  },
];

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full px-6 py-16 lg:px-20 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#3F96E6]">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          Here are some common questions about our programs and services.
        </p>

        {/* FAQs List */}
        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <span className="text-xl text-[#3F96E6]">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-600 transition-opacity duration-300">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
