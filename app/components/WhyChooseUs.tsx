export function WhyChooseUs() {
    const benefits = [
      {
        icon: "🎓",
        title: "Expert-Led Training",
        description: "Learn from experienced professionals in the caregiving field.",
      },
      {
        icon: "📜",
        title: "Recognized Certification",
        description: "Earn industry-approved certifications that boost your career.",
      },
      {
        icon: "🌎",
        title: "Global Standards",
        description: "Our curriculum follows global caregiving best practices.",
      },
      {
        icon: "🤝",
        title: "Supportive Community",
        description: "Join a network of like-minded caregivers for mentorship and growth.",
      },
      {
        icon: "⚡",
        title: "Flexible Learning",
        description: "Access training anytime, anywhere, with online and in-person options.",
      },
      {
        icon: "🔒",
        title: "Secure & Verified",
        description: "Your certifications are stored securely for easy verification.",
      },
    ];
  
    return (
      <section className="w-full px-6 py-16 bg-gradient-to-b from-gray-100 to-white text-center">
        <h2 className="text-4xl font-extrabold text-[#3F96E6]">Why Choose Us?</h2>
        <p className="mt-4 text-lg text-gray-700">
          We are dedicated to empowering caregivers with top-notch training, certification, and career growth.
        </p>
  
        {/* Benefits Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="text-4xl">{benefit.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-[#AB056A]">{benefit.title}</h3>
              <p className="mt-2 text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  