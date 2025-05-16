import { Shield, Heart, Award, Users, BookOpen, Scale } from "lucide-react";

const coreValues = [
  {
    icon: Shield,
    title: "Professionalism",
    description:
      "Upholding the highest standards of professional conduct and practice in all caregiving activities.",
  },
  {
    icon: Heart,
    title: "Compassion",
    description:
      "Delivering care with empathy, kindness, and genuine concern for the wellbeing of those we serve.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Continuously striving for the highest quality in caregiving education, certification, and practice.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description:
      "Embracing diversity and ensuring equitable access to caregiving resources and opportunities.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description:
      "Fostering a culture of ongoing education and professional development for all caregivers.",
  },
  {
    icon: Scale,
    title: "Integrity",
    description:
      "Maintaining ethical standards, transparency, and accountability in all our operations and decisions.",
  },
];

export default function CoreValuesSection() {
  return (
    <section className="py-16 md:py-24 bg-white from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">
            Our Core Values
          </h2>
          <div className="w-20 h-1 bg-accgk-pink mx-auto mb-8"></div>
          <p className="text-xl text-blue-500">
            Upholding professionalism and integrity in caregiving practices
            across Kenya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="group bg-gray-900 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl hover:bg-white/10 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-accgk-pink/20 flex items-center justify-center mb-4">
                <value.icon className="h-6 w-6 text-accgk-pink" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-500 transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-gray-300 group-hover:text-pink-800 transition-colors duration-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
