"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage("Thank you for your message. We'll get back to you soon!")
      setFormData({ name: "", email: "", message: "" })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("")
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[color:var(--accgk-blue)]">Contact Us</h2>
          <div className="w-20 h-1 bg-[color:var(--accgk-pink)] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">Have questions or want to get involved? Reach out to us.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-[color:var(--accgk-blue)]">Get in Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-[color:var(--accgk-pink)] mr-4 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Address</h4>
                  <p className="text-gray-600">
                    P.O. Box 12345-00100
                    <br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-6 h-6 text-[color:var(--accgk-pink)] mr-4 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-gray-600">+254 700 000000</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-6 h-6 text-[color:var(--accgk-pink)] mr-4 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-gray-600">info@accgk.org</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-[color:var(--accgk-blue)] text-white rounded-lg">
              <h4 className="text-xl font-semibold mb-3">Office Hours</h4>
              <p className="mb-2">Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p>Saturday: 9:00 AM - 1:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-[color:var(--accgk-blue)]">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[150px]"
                />
              </div>

              <Button type="submit" className="w-full bg-[color:var(--accgk-blue)] hover:bg-[color:var(--accgk-blue)]/90" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              {submitMessage && <div className="p-4 bg-green-50 text-green-700 rounded-md">{submitMessage}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
