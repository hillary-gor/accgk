import Header from "@/components/header";
import Footer from "@/components/footer";
import PageLayout from "@/components/page-layout";
import HeroSection from "@/components/membership/hero-section";
import WhyBecomeSection from "@/components/membership/why-become-section";
import HowToBecomeSection from "@/components/membership/how-to-become-section";
import BenefitsTabsSection from "@/components/membership/benefits-tabs-section";
import FaqSection from "@/components/membership/faq-section";
import FinalCta from "@/components/membership/final-cta";

export default function MembershipPage() {
  return (
    <>
      <Header />

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

      <Footer />
    </>
  );
}
