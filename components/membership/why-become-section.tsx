import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function WhyBecomeSection() {
  const caregiverBenefits = [
    "Professional recognition through ACCGK certification",
    "Access to continuing professional development opportunities",
    "Networking with fellow caregivers and healthcare professionals",
    "Career advancement and job placement assistance",
    "Representation in policy discussions and advocacy",
    "Discounted rates for workshops, conferences, and training",
  ];

  const institutionBenefits = [
    "Enhanced credibility through ACCGK institutional accreditation",
    "Access to a database of certified caregivers for recruitment",
    "Participation in setting industry standards and best practices",
    "Discounted group certification for staff members",
    "Visibility through ACCGK's network and marketing channels",
    "Collaborative research and development opportunities",
  ];

  const employerBenefits = [
    "Access to verified and certified caregivers for recruitment",
    "Post job openings directly through the ACCGK employer dashboard",
    "Streamlined hiring with candidate matching and shortlisting tools",
    "Brand visibility through ACCGK’s employer network",
    "Participation in national caregiver recruitment fairs and events",
    "Accreditation as a trusted employer partner in the caregiving sector",
  ];

  const sections = [
    { title: "For Caregivers", benefits: caregiverBenefits, type: "caregiver" },
    {
      title: "For Institutions",
      benefits: institutionBenefits,
      type: "institution",
    },
    {
      title: "For Employers / Recruitment Partners",
      benefits: employerBenefits,
      type: "employer",
    },
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#3F96E6] mb-4">
          Why Become a Member?
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          ACCGK membership offers tailored benefits for caregivers,
          institutions, and employers — all designed to enhance professional
          growth, credibility, and service quality.
        </p>
      </div>

      {/* Responsive Grid: 1 column mobile, 2 columns tablet, 3 columns desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section, idx) => (
          <Card
            key={idx}
            className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold text-[#3F96E6]">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {section.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="border-t border-gray-100 pt-4">
              <Button asChild className="w-full bg-[#3F96E6] hover:bg-teal-700">
                <Link href={`/membership/join?type=${section.type}`}>
                  Apply as {section.title.split(" ")[1]}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
