"use client"

import type React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Award, BookOpen, Users, Calendar, Shield, Briefcase, FileText, Headphones } from "lucide-react"

const benefitsData = {
  certification: [
    {
      icon: Award,
      title: "Professional Certification",
      description:
        "Gain nationally recognized certification that validates your caregiving skills and knowledge, enhancing your professional credibility.",
    },
    {
      icon: Shield,
      title: "Discounted Certification Fees",
      description:
        "Members enjoy significantly reduced rates for initial certification and renewal processes, making professional recognition more accessible.",
    },
    {
      icon: FileText,
      title: "Expedited Processing",
      description:
        "ACCGK members receive priority processing for certification applications and renewals, reducing waiting times.",
    },
  ],
  education: [
    {
      icon: BookOpen,
      title: "Continuing Professional Development",
      description:
        "Access a wide range of CPD courses, workshops, and training sessions designed specifically for caregiving professionals.",
    },
    {
      icon: Calendar,
      title: "Exclusive Workshops & Seminars",
      description:
        "Participate in member-only educational events featuring industry experts and the latest caregiving methodologies.",
    },
    {
      icon: Headphones,
      title: "Online Learning Resources",
      description:
        "Unlimited access to our digital library of educational materials, webinars, and self-paced learning modules.",
    },
  ],
  networking: [
    {
      icon: Users,
      title: "Professional Community",
      description:
        "Connect with a network of fellow caregivers, healthcare professionals, and institutions across Kenya.",
    },
    {
      icon: Calendar,
      title: "Networking Events",
      description:
        "Attend regular meetups, conferences, and social gatherings designed to foster professional relationships and knowledge sharing.",
    },
    {
      icon: Briefcase,
      title: "Job Placement Assistance",
      description:
        "Gain access to exclusive job opportunities through our partnerships with healthcare facilities and placement agencies.",
    },
  ],
  resources: [
    {
      icon: FileText,
      title: "Professional Resources",
      description:
        "Access caregiving guidelines, templates, assessment tools, and best practice documents to enhance your service delivery.",
    },
    {
      icon: Shield,
      title: "Legal & Ethical Support",
      description:
        "Receive guidance on navigating legal and ethical challenges in caregiving through our dedicated support team.",
    },
    {
      icon: Headphones,
      title: "Advisory Services",
      description:
        "Consult with industry experts on career development, specialization options, and professional challenges.",
    },
    {
      icon: Award,
      title: "Recognition Programs",
      description:
        "Participate in ACCGK's excellence awards and recognition initiatives that highlight outstanding caregiving professionals.",
    },
  ],
}

export default function BenefitsTabsSection() {
  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#3F96E6] mb-4">Membership Benefits</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          ACCGK membership provides a comprehensive package of benefits designed to support your professional growth,
          enhance your skills, and advance your caregiving career.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="all">All Benefits</TabsTrigger>
          <TabsTrigger value="certification">Certification</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="networking">Networking</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(benefitsData)
              .flat()
              .slice(0, 6)
              .map((benefit, index) => (
                <BenefitCard key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="certification">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsData.certification.map((benefit, index) => (
              <BenefitCard key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="education">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsData.education.map((benefit, index) => (
              <BenefitCard key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="networking">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsData.networking.map((benefit, index) => (
              <BenefitCard key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsData.resources.map((benefit, index) => (
              <BenefitCard key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface BenefitCardProps {
  icon: React.ElementType
  title: string
  description: string
}

function BenefitCard({ icon: Icon, title, description }: BenefitCardProps) {
  return (
    <Card className="border border-[#3F96E6] shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-[#3F96E6]" />
        </div>
        <h3 className="text-xl font-bold text-[#3F96E6] mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}
