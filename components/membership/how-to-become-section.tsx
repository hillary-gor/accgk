import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    number: 1,
    title: "Choose Membership Type",
    description:
      "Select the appropriate membership category that fits your profile - either as an individual caregiver or as a healthcare institution.",
  },
  {
    number: 2,
    title: "Complete Registration Form",
    description:
      "Fill out the comprehensive application form with your personal or institutional details, qualifications, and relevant experience.",
  },
  {
    number: 3,
    title: "Pay via MPesa",
    description:
      "Process your membership fee payment securely through our integrated MPesa payment system. You'll receive payment instructions after form submission.",
  },
  {
    number: 4,
    title: "Receive Confirmation",
    description:
      "Upon successful verification and payment processing, you'll receive your digital membership certificate and access to the ACCGK member portal.",
  },
]

export default function HowToBecomeSection() {
  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">How to Become a Member</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Joining ACCGK is a straightforward process designed to ensure that all members meet our professional standards
          while making the application experience smooth and efficient.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <Card key={step.number} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
