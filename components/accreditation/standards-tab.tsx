import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"

const standardsCategories = [
  {
    title: "Curriculum and Instruction",
    standards: [
      "Curriculum aligned with ACCGK competency framework and national healthcare needs",
      "Appropriate balance of theoretical knowledge and practical skills development",
      "Evidence-based teaching methodologies and learning activities",
      "Regular curriculum review and updates based on industry feedback",
      "Effective assessment methods that measure both knowledge and competency",
      "Integration of ethics, professional conduct, and patient-centered care principles",
    ],
  },
  {
    title: "Faculty Qualifications",
    standards: [
      "Instructors possess relevant academic credentials and professional experience",
      "Ongoing professional development for all teaching staff",
      "Appropriate faculty-to-student ratios for effective instruction",
      "Regular performance evaluation and improvement processes",
      "Industry engagement and currency of practice knowledge",
      "Demonstrated teaching effectiveness and student mentorship capabilities",
    ],
  },
  {
    title: "Facilities and Resources",
    standards: [
      "Adequate classroom, laboratory, and simulation spaces for instruction",
      "Up-to-date equipment and supplies reflecting current healthcare practices",
      "Accessible learning resources including library, digital materials, and references",
      "Appropriate technology infrastructure supporting educational delivery",
      "Safe learning environment compliant with health and safety regulations",
      "Clinical placement arrangements with suitable healthcare facilities",
    ],
  },
  {
    title: "Student Services",
    standards: [
      "Comprehensive student orientation and support services",
      "Academic advising and career guidance programs",
      "Fair and transparent admissions and progression policies",
      "Mechanisms for addressing student grievances and appeals",
      "Support for students with special needs or learning accommodations",
      "Graduate tracking and employment assistance services",
    ],
  },
  {
    title: "Administration and Governance",
    standards: [
      "Clear organizational structure with defined roles and responsibilities",
      "Sound financial management ensuring program sustainability",
      "Documented policies and procedures for all operational aspects",
      "Effective quality assurance and continuous improvement mechanisms",
      "Strategic planning aligned with institutional mission and healthcare needs",
      "Ethical practices in all administrative and educational functions",
    ],
  },
]

export default function StandardsTab() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 mb-6">
        ACCGK evaluates institutions across five key standard categories. Each category contains specific criteria that
        must be met to achieve and maintain accreditation status.
      </p>

      <div className="space-y-6">
        {standardsCategories.map((category, index) => (
          <Card key={index} className="border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-[color:var(--accgk-blue)]">{category.title}</h3>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3">
                {category.standards.map((standard, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-[color:var(--accgk-pink)] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{standard}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
