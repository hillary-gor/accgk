import Navbar from "../components/Navbar";
import Hero from "./membership_components/Hero";
import Benefits from "./membership_components/Benefits";
import WhyBecomeMember from "./membership_components/WhyBecomeMember";
import HowToJoin from "./membership_components/HowToJoin";
import MembershipCertificate from "./membership_components/MembershipCertificate";
import SecureMembership from "./membership_components/SecureMembership";
import NeedAssistance from "../components/NeedAssistance";
import Footer from "../components/Footer";

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <Hero />
      <WhyBecomeMember />
      <Benefits />
      <HowToJoin />
      <MembershipCertificate />
      <SecureMembership />
      <NeedAssistance />
      <Footer />
    </main>
  );
}
