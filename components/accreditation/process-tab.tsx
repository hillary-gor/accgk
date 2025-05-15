import { Card, CardContent, CardHeader } from "@/components/ui/card"

const processSteps = [
  {
    title: "Initial Application",
    shortDescription: "Submit formal application and documentation",
    detailedExplanation:
      "Institutions must complete the ACCGK application form, submit required documentation including program curricula, faculty qualifications, and pay the initial application fee. This stage establishes eligibility for the accreditation process.",
  },
  {
    title: "Self-Assessment",
    shortDescription: "Conduct comprehensive internal evaluation",
    detailedExplanation:
      "Institutions perform a thorough self-assessment against ACCGK standards, documenting strengths, areas for improvement, and action plans. This critical reflection helps prepare for the external evaluation and demonstrates institutional commitment to quality.",
  },
  {
    title: "Document Review",
    shortDescription: "ACCGK evaluates submitted materials",
    detailedExplanation:
      "The ACCGK Accreditation Committee reviews all submitted documentation, including the self-assessment report, curriculum materials, faculty credentials, and institutional policies. Feedback is provided on areas requiring additional information or clarification.",
  },
  {
    title: "Site Visit",
    shortDescription: "On-site evaluation by ACCGK representatives",
    detailedExplanation:
      "A team of ACCGK evaluators conducts a comprehensive on-site visit to verify information, observe facilities and teaching, interview stakeholders (faculty, students, administrators), and assess overall institutional quality and compliance with standards.",
  },
  {
    title: "Evaluation Report",
    shortDescription: "Comprehensive assessment and recommendations",
    detailedExplanation:
      "Following the site visit, ACCGK prepares a detailed evaluation report highlighting strengths, areas for improvement, and specific recommendations. The institution has an opportunity to respond to factual errors before the report is finalized.",
  },
  {
    title: "Accreditation Decision",
    shortDescription: "Final determination and status assignment",
    detailedExplanation:
      "Based on the evaluation report and institutional response, the ACCGK Board makes a final accreditation decision: Full Accreditation (5 years), Provisional Accreditation (with specific conditions), or Denial of Accreditation. Institutions may appeal decisions following established procedures.",
  },
]

export default function ProcessTab() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 mb-6">
        ACCGK follows a rigorous six-step process to evaluate and accredit caregiving institutions. Each step is
        designed to thoroughly assess all aspects of the institution's operations and educational quality.
      </p>

      <div className="space-y-6">
        {processSteps.map((step, index) => (
          <Card key={index} className="border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100 pb-3">
              <div className="flex items-start">
                <div className="bg-accgk-blue text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-accgk-blue">{step.title}</h3>
                  <p className="text-gray-600 font-medium">{step.shortDescription}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700">{step.detailedExplanation}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
