import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

const benefitsData = [
  {
    title: "For Institutions",
    benefits: [
      "Enhanced credibility and reputation in the healthcare education sector",
      "Quality assurance framework for continuous improvement",
      "Access to ACCGK resources, best practices, and professional networks",
      "Increased student enrollment due to recognized certification",
      "Participation in shaping industry standards and policies",
    ],
  },
  {
    title: "For Students",
    benefits: [
      "Assurance of quality education meeting national standards",
      "Curriculum aligned with industry needs and best practices",
      "Improved job prospects with recognized certification",
      "Access to standardized learning resources and qualified faculty",
      "Clear career pathways and professional development opportunities",
    ],
  },
  {
    title: "For Employers",
    benefits: [
      "Confidence in the qualifications and competence of caregivers",
      "Standardized skill sets aligned with healthcare industry needs",
      "Reduced training costs due to well-prepared graduates",
      "Access to a database of certified caregivers for recruitment",
      "Assurance of ethical practice and professional conduct",
    ],
  },
]

export default function BenefitsSection() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-accgk-blue mb-8 text-center">Benefits of Accreditation</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefitsData.map((item, index) => (
          <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-accgk-blue mb-4">{item.title}</h3>
              <ul className="space-y-3">
                {item.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-accgk-pink mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
