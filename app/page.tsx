import Hero from "@/components/hero"
import About from "@/components/about"
import FocusAreas from "@/components/focus-areas"
import CallToAction from "@/components/call-to-action"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Header from "@/components/header"
import AnnouncementBar from "@/components/announcement-bar"
import ServiceTiles from "@/components/service-tiles"
import AnimatedStats from "@/components/animated-stats"
import VideoSection from "@/components/video-section"
import BlogSection from "@/components/blog-section"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import FaqSection from "@/components/faq-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Hero />
      <ServiceTiles />
      <About />
      <AnimatedStats />
      <FocusAreas />
      <VideoSection />
      <CallToAction />
      <TestimonialsCarousel />
      <BlogSection />
      <FaqSection />
      <Contact />
    </main>
  )
}
