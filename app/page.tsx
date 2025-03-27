import Navbar from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/AboutUs";
import { WhatWeOffer } from "./components/WhatWeOffer";
import Footer from "./components/Footer";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { CTA } from "./components/CTA";
import { FAQs } from "./components/faqs";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <WhatWeOffer />
      <WhyChooseUs />
      <FAQs />
      <CTA />
      <Footer />
    </>
  );
}
