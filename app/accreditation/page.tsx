import PageLayout from "@/components/page-layout"
import BenefitsSection from "@/components/accreditation/benefits-section"
import AccreditationTabs from "@/components/accreditation/accreditation-tabs"

export default function AccreditationPage() {
  return (
    <PageLayout
      title="Accreditation Information"
      description="ACCGK's comprehensive accreditation process ensures that caregiving institutions meet the highest standards of education and professional preparation."
    >
      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-lg text-gray-700 mb-4">
          The Association of Certified Caregivers Kenya (ACCGK) plays a vital role in accrediting caregiving
          institutions across Kenya to ensure standardization, quality education, and professional preparedness of
          caregivers entering the healthcare ecosystem.
        </p>
        <p className="text-gray-600">
          Our accreditation framework comprehensively evaluates institutions across multiple dimensions, including
          curriculum design and delivery, faculty qualifications and development, infrastructure and learning resources,
          student services and support, and administrative governance and sustainability.
        </p>
      </div>

      <BenefitsSection />
      <AccreditationTabs />
    </PageLayout>
  )
}
