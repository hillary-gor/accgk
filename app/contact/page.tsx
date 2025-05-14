import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="gradient-background pt-32 pb-24 px-4 md:px-6 relative">
        <div className="grid-pattern absolute inset-0 opacity-20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl">
                Have a question or ready to start your next project? Get in
                touch with our team and let's create something amazing together.
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <img
                src="https://rzprmsavgqeghpnmparg.supabase.co/storage/v1/object/public/assets//IMG_0324.JPG"
                alt="Contact Us"
                className="w-full max-w-md h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-24 px-4 md:px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-gray-300 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-gray-900/50 border-gray-800 focus:border-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="bg-gray-900/50 border-gray-800 focus:border-white/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone (Optional)
                    </label>
                    <Input
                      id="phone"
                      placeholder="Your phone number"
                      className="bg-gray-900/50 border-gray-800 focus:border-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Company (Optional)
                    </label>
                    <Input
                      id="company"
                      placeholder="Your company"
                      className="bg-gray-900/50 border-gray-800 focus:border-white/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    className="bg-gray-900/50 border-gray-800 focus:border-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project or inquiry"
                    rows={6}
                    className="bg-gray-900/50 border-gray-800 focus:border-white/50 resize-none"
                  />
                </div>

                <Button className="w-full md:w-auto" size="lg">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-gray-300 mb-8">
                Prefer to reach out directly? Here's how you can contact us.
              </p>

              <div className="space-y-8">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Email Us</h3>
                        <p className="text-gray-400 mb-2">
                          For general inquiries and support
                        </p>
                        <Link
                          href="mailto:info@surgeinnovations.com"
                          className="text-white hover:text-blue-400"
                        >
                          info@surgeinnovations.com
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Call Us</h3>
                        <p className="text-gray-400 mb-2">
                          Monday to Friday, 9am - 6pm EST
                        </p>
                        <Link
                          href="tel:+1234567890"
                          className="text-white hover:text-green-400"
                        >
                          +1 (234) 567-890
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                        <p className="text-gray-400 mb-2">Our headquarters</p>
                        <address className="not-italic text-white">
                          123 Tech Avenue
                          <br />
                          San Francisco, CA 94107
                          <br />
                          United States
                        </address>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 p-3 rounded-full">
                        <Clock className="h-6 w-6 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">
                          Business Hours
                        </h3>
                        <p className="text-gray-400 mb-2">
                          When we're available
                        </p>
                        <div className="space-y-1 text-white">
                          <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                          <p>Saturday: 10:00 AM - 2:00 PM EST</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 px-4 md:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Location
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Visit our headquarters in the heart of San Francisco's tech
              district
            </p>
          </div>

          <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/7412069/pexels-photo-7412069.jpeg"
              alt="Office Location Map"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/70 p-6 rounded-lg max-w-md text-center">
                <h3 className="text-xl font-bold mb-2">Surge Innovations HQ</h3>
                <p className="text-gray-300 mb-4">
                  123 Tech Avenue, San Francisco, CA 94107
                </p>
                <Button
                  variant="outline"
                  className="border-white/20 hover:bg-white/10"
                  asChild
                >
                  <Link
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 md:px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Quick answers to common questions about working with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What is your typical project timeline?",
                answer:
                  "Project timelines vary based on scope and complexity. A simple website might take 4-6 weeks, while a complex application could take 3-6 months. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                question:
                  "Do you offer ongoing support after project completion?",
                answer:
                  "Yes, we offer various support and maintenance packages to ensure your digital products continue to perform optimally after launch. Our team can provide regular updates, security patches, and feature enhancements.",
              },
              {
                question: "How do you handle project pricing?",
                answer:
                  "We offer both fixed-price and time-and-materials pricing models depending on project requirements. For most projects, we provide a detailed proposal with transparent pricing based on the scope of work.",
              },
              {
                question: "Can you work with our existing technology stack?",
                answer:
                  "Absolutely. Our team is experienced in a wide range of technologies and can adapt to your existing stack. We can also provide recommendations for technology upgrades if needed.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-6 gradient-background relative">
        <div className="grid-pattern absolute inset-0 opacity-20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mb-8">
              Take the first step towards transforming your business with
              cutting-edge technology solutions.
            </p>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200"
              asChild
            >
              <Link href="/get-started">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
