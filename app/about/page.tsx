import HeroSection from "@/components/about/hero-section"
import OurStorySection from "@/components/about/our-story-section"
import CoreValuesSection from "@/components/about/core-values-section"
import TeamSection from "@/components/about/team-section"
import CTASection from "@/components/about/cta-section"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <OurStorySection />
      <CoreValuesSection />
      <TeamSection />
      <CTASection />
    </main>
  )
}
