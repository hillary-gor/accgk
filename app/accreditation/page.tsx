import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"

// Mock data for accreditation process steps
const accreditationSteps = [
  {
    id: 1,
    title: "Initial Application",
    description: "Submit an application form with basic information about your institution, programs, and facilities.",
    details:
      "The application includes details about your organization's structure, leadership, facilities, current training programs, and instructor qualifications. A non-refundable application fee is required at this stage.",
  },
  {
    id: 2,
    title: "Self-Assessment",
    description: "Complete a comprehensive self-assessment against ACCK's accreditation standards and requirements.",
    details:
      "The self-assessment tool helps you evaluate your institution's readiness for accreditation and identify areas that may need improvement before the formal review process.",
  },
  {
    id: 3,
    title: "Document Submission",
    description: "Provide detailed documentation of your curriculum, faculty qualifications, facilities, and policies.",
    details:
      "Required documents include curriculum outlines, instructor credentials, administrative policies, student assessment methods, facility descriptions, and financial information.",
  },
  {
    id: 4,
    title: "On-Site Evaluation",
    description:
      "Host ACCK accreditation team for an on-site visit to evaluate facilities, observe instruction, and interview stakeholders.",
    details:
      "The evaluation team will tour your facilities, observe classes in session, review records, and conduct interviews with administrators, instructors, and students to verify information provided in your application.",
  },
  {
    id: 5,
    title: "Review and Decision",
    description:
      "ACCK Accreditation Committee reviews all materials and the evaluation report to make an accreditation decision.",
    details:
      "The committee may grant full accreditation, provisional accreditation with specific requirements for improvement, or deny accreditation with recommendations for reapplication after addressing deficiencies.",
  },
  {
    id: 6,
    title: "Ongoing Compliance",
    description: "Maintain standards through annual reports, periodic reviews, and renewal every three years.",
    details:
      "Accredited institutions must submit annual reports, notify ACCK of significant changes to programs or facilities, and undergo a full reaccreditation review every three years.",
  },
]

// Mock data for accreditation standards
const accreditationStandards = [
  {
    id: 1,
    category: "Curriculum and Instruction",
    standards: [
      "Comprehensive curriculum covering all required competencies for each certification level",
      "Appropriate balance between theoretical knowledge and practical skills",
      "Evidence-based content aligned with current best practices in caregiving",
      "Clear learning objectives and assessment methods for each module",
      "Sufficient instructional hours to develop required competencies",
      "Integration of ethics, cultural sensitivity, and person-centered care principles",
    ],
  },
  {
    id: 2,
    category: "Faculty Qualifications",
    standards: [
      "Instructors possess relevant professional qualifications and certifications",
      "Minimum of 3 years practical experience in the subject area being taught",
      "Demonstrated teaching ability and instructional skills",
      "Ongoing professional development and continuing education",
      "Appropriate instructor-to-student ratios for theoretical and practical components",
      "Regular evaluation of instructor performance and effectiveness",
    ],
  },
  {
    id: 3,
    category: "Facilities and Resources",
    standards: [
      "Adequate classroom space and learning environment for theoretical instruction",
      "Properly equipped skills labs for practical training components",
      "Current and relevant learning materials and resources",
      "Access to appropriate technology for educational purposes",
      "Safe and accessible facilities for all students",
      "Sufficient administrative support for program operations",
    ],
  },
  {
    id: 4,
    category: "Student Services",
    standards: [
      "Clear admissions policies and procedures",
      "Adequate student orientation and support services",
      "Fair and transparent assessment and grading policies",
      "Appropriate record-keeping systems for student progress and achievement",
      "Career guidance and job placement assistance",
      "Process for addressing student grievances and concerns",
    ],
  },
  {
    id: 5,
    category: "Administration and Governance",
    standards: [
      "Sound financial management and sustainability",
      "Clear organizational structure with appropriate oversight",
      "Written policies and procedures for all aspects of program operation",
      "Compliance with relevant laws and regulations",
      "Quality assurance mechanisms and continuous improvement processes",
      "Strategic planning for program development and enhancement",
    ],
  },
]

// Mock data for accredited institutions
const accreditedInstitutions = [
  {
    id: 1,
    name: "Nairobi Healthcare Training Institute",
    location: "Nairobi",
    programs: ["Basic Caregiving", "Elder Care Specialist", "Pediatric Care Specialist"],
    accreditationDate: "January 2023",
    website: "https://example.com/nhti",
  },
  {
    id: 2,
    name: "Mombasa Caregiving Academy",
    location: "Mombasa",
    programs: ["Basic Caregiving", "Home Health Aide", "Palliative Care Specialist"],
    accreditationDate: "March 2023",
    website: "https://example.com/mca",
  },
  {
    id: 3,
    name: "Kisumu Medical Training College",
    location: "Kisumu",
    programs: ["Basic Caregiving", "Mental Health Support Specialist"],
    accreditationDate: "June 2023",
    website: "https://example.com/kmtc",
  },
  {
    id: 4,
    name: "Eldoret Caregiving Institute",
    location: "Eldoret",
    programs: ["Basic Caregiving", "Elder Care Specialist"],
    accreditationDate: "August 2023",
    website: "https://example.com/eci",
  },
  {
    id: 5,
    name: "Nakuru Health Sciences College",
    location: "Nakuru",
    programs: ["Basic Caregiving", "Pediatric Care Specialist", "Mental Health Support Specialist"],
    accreditationDate: "October 2023",
    website: "https://example.com/nhsc",
  },
  {
    id: 6,
    name: "Thika Caregiving School",
    location: "Thika",
    programs: ["Basic Caregiving", "Home Health Aide"],
    accreditationDate: "December 2023",
    website: "https://example.com/tcs",
  },
]

export default function AccreditationPage() {
  return (
    <PageLayout 
      title="Accreditation Information" 
      description="Learn about ACCK's accreditation process for caregiving training institutions and programs."
    >
      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">About ACCK Accreditation</h2>
          <p className="text-lg text-muted-foreground">
            ACCK accreditation is a rigorous, peer-review process that ensures caregiving training institutions and programs meet established standards of quality and effectiveness. Accreditation signifies that an institution provides education and training that adequately prepares individuals for caregiving roles and responsibilities.
          </p>
          <p className="text-lg text-muted-foreground">
            Our accreditation process evaluates all aspects of an institution's operations, including curriculum, faculty qualifications, facilities, student services, and administrative practices. Accredited institutions demonstrate a commitment to excellence and continuous improvement in caregiving education.
          </p>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Benefits for Institutions</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Recognition of program quality and standards</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Enhanced reputation and credibility</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Structured framework for program improvement</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Marketing advantage to prospective students</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Access to ACCK resources and support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Benefits for Students</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Assurance of quality education and training</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Confidence in program meeting industry standards</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Improved employment prospects</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Streamlined pathway to ACCK certification</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Recognition of credentials by employers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Benefits for Employers</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Confidence in graduates' preparation and skills</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Consistent quality of caregiver education</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Reduced training costs for new hires</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Improved care outcomes and client satisfaction</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-teal-600 mr-2 shrink-0" />
                    <span>Alignment with industry best practices</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Tabs defaultValue="process" className="space-y-8">
          <TabsList className="mx-auto">
            <TabsTrigger value="process">Accreditation Process</TabsTrigger>
            <TabsTrigger value="standards">Accreditation Standards</TabsTrigger>
            <TabsTrigger value="institutions">Accredited Institutions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="process">
            <div className="space-y-6">
              {accreditationSteps.map((step) => (
                <Card key={step.id} className="bg-background border border-border shadow-lg">
                  <CardHeader className="p-4 bg-primary text-white font-bold">{step.title}</CardHeader>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-lg">{step.description}</p>
                    <p className="text-sm text-muted-foreground">{step.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="standards">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {accreditationStandards.map((standard) => (
                <Card key={standard.id} className="bg-background border border-border shadow-lg">
                  <CardHeader className="p-4 bg-primary text-white font-bold">{standard.category}</CardHeader>
                  <CardContent className="p-4 space-y-1">
                    <ul className="list-disc ml-5">
                      {standard.standards.map((item, index) => (
                        <li key={index} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="institutions">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {accreditedInstitutions.map((institution) => (
                <Card key={institution.id} className="bg-background border border-border shadow-lg">
                  <CardHeader className="p-4 bg-primary text-white font-bold">{institution.name}</CardHeader>
                  <CardContent className="p-4 space-y-2">
                    <p className="text-lg">Location: {institution.location}</p>
                    <p className="text-sm text-muted-foreground">Accredited Since: {institution.accreditationDate}</p>
                    <p className="text-sm">Programs: {institution.programs.join(", ")}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}