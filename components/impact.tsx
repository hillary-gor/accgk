export default function Impact() {
  const stats = [
    { number: "1000+", label: "Certified Caregivers" },
    { number: "10+", label: "Institutional Partners" },
    { number: "5+", label: "Training Programs" },
    { number: "100%", label: "Commitment to Excellence" },
  ]

  const testimonials = [
    {
      quote:
        "ACCGK certification has transformed my career path and given me professional recognition I never had before.",
      author: "Jane Doe",
      role: "Certified Caregiver",
    },
    {
      quote: "Partnering with ACCGK ensures our institution maintains the highest standards of care delivery.",
      author: "John Smith",
      role: "Healthcare Facility Director",
    },
  ]

  return (
    <section id="impact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accgk-blue">Our Impact</h2>
          <div className="w-20 h-1 bg-accgk-pink mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            ACCGK is making a significant difference in the caregiving profession across Kenya.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-3xl md:text-4xl font-bold text-accgk-pink mb-2">{stat.number}</p>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8 text-center text-accgk-blue">What People Say</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <p className="italic mb-4 text-gray-700">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
