import Navbar from "../components/Navbar";
import { About } from "../components/AboutUs";
import Footer from "../components/Footer";
import { CTA } from "../components/CTA";
import { FAQs } from "../components/faqs";

export default function Home() {
  return (
    <>
      <Navbar />
      <About />
      <CTA />
      <FAQs />
      <Footer />
    </>
  );
}
