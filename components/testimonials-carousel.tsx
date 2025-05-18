"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "ACCGK certification has transformed my career path and given me professional recognition I never had before. The training and support have been invaluable to my growth as a caregiver.",
    name: "Jane Muthoni",
    role: "Certified Caregiver, Nairobi",
    image: "/placeholder.svg?height=200&width=200&text=Female+Caregiver",
  },
  {
    quote:
      "Partnering with ACCGK ensures our institution maintains the highest standards of care delivery. Their certification process is thorough and their ongoing support is exceptional.",
    name: "Dr. John Kamau",
    role: "Healthcare Facility Director, Mombasa",
    image: "/placeholder.svg?height=200&width=200&text=Male+Healthcare+Director",
  },
  {
    quote:
      "The structured career pathway that ACCGK provides has allowed me to advance professionally while improving the quality of care I provide to my patients.",
    name: "Sarah Ochieng",
    role: "Senior Caregiver, Kisumu",
    image: "/placeholder.svg?height=200&width=200&text=Female+Senior+Caregiver",
  },
  {
    quote:
      "ACCGK's advocacy work has significantly improved the recognition and working conditions for caregivers across Kenya. Their commitment to our profession is unmatched.",
    name: "David Njoroge",
    role: "Caregiver and Advocate, Nakuru",
    image: "/placeholder.svg?height=200&width=200&text=Male+Caregiver+Advocate",
  },
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex])

  return (
    <section className="py-16 md:py-24 bg-[color:var(--accgk-blue)] text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('/placeholder.svg?height=500&width=500&text=Pattern')] bg-repeat"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Impact Stories</h2>
          <div className="w-20 h-1 bg-[color:var(--accgk-pink)] mx-auto mb-8"></div>
          <p className="text-xl text-white/90">
            Hear from caregivers and institutions who have benefited from ACCGK&apos;s work.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Testimonial */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 md:p-12">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-[color:var(--accgk-pink)] flex items-center justify-center">
                  <Quote className="w-5 h-5 text-white" />
                </div>
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[color:var(--accgk-pink)] shadow-lg">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-[color:var(--accgk-pink)] flex items-center justify-center rotate-180">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <blockquote className="text-center mb-8">
              <p className="text-xl md:text-2xl italic mb-6">&quot;{testimonials[currentIndex].quote}&quot;</p>
              <footer>
                <p className="font-semibold text-lg">{testimonials[currentIndex].name}</p>
                <p className="text-white/80">{testimonials[currentIndex].role}</p>
              </footer>
            </blockquote>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center space-x-4 mb-6">
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                    index === currentIndex ? "border-[color:var(--accgk-pink)] scale-110" : "border-white/30 opacity-70"
                  }`}
                  aria-label={`Go to testimonial from ${testimonial.name}`}
                >
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-[color:var(--accgk-pink)]" : "bg-white/30"}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
