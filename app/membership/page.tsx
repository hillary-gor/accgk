import PageLayout from "@/components/page-layout"
import HeroSection from "@/components/membership/hero-section"
import WhyBecomeSection from "@/components/membership/why-become-section"
import HowToBecomeSection from "@/components/membership/how-to-become-section"
import BenefitsTabsSection from "@/components/membership/benefits-tabs-section"
// import CertificatePreview from "@/components/membership/certificate-preview"
import FaqSection from "@/components/membership/faq-section"
import FinalCta from "@/components/membership/final-cta"

export default function MembershipPage() {
  return (
    <PageLayout
      title="ACCGK Membership"
      description="Join Kenya's premier community of certified caregivers and healthcare institutions."
    >
      <HeroSection />
      <WhyBecomeSection />
      <HowToBecomeSection />
      <BenefitsTabsSection />
      <FaqSection />
      <FinalCta />
    </PageLayout>
  )
}
