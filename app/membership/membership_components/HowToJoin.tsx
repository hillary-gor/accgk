import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Choose Your Membership Type",
    description:
      "Select between Individual Caregiver (KES 5,000) or Institution (KES 100,000).",
    image: "/icons/membership.svg",
  },
  {
    id: 2,
    title: "Complete the Registration Form",
    description: "Fill in your personal or institutional details accurately.",
    image: "/icons/form.svg",
  },
  {
    id: 3,
    title: "Pay via MPesa",
    description: "Make a secure transaction using MPesa (Daraja API).",
    image: "/icons/payment.svg",
  },
  {
    id: 4,
    title: "Receive Confirmation",
    description:
      "Instant confirmation and access to membership benefits upon approval.",
    image: "/icons/confirmation.svg",
  },
];

export default function HowToJoin() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#AB056A]">
          How to Become a Member
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
            >
              <Image
                src={step.image}
                alt={step.title}
                width={60}
                height={60}
                className="mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
