import Navbar from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/AboutUs";
import { WhatWeOffer } from "./components/WhatWeOffer";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <WhatWeOffer />
      <Footer />
    </>
  );
}
