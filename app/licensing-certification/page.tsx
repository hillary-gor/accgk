import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Award, FileCheck, Clock, BookOpen, Users, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LicensingCertificationPage() {
  return (
    <PageLayout
      title="Licensing & Certification"
      description="Learn about ACCK's licensing and certification programs for caregivers and institutions."
    >
      <div className="space-y-12">
        {/* Overview Section */}
        <section className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Professional Recognition</h2>
              <p className="text-muted-foreground mb-4">
                ACCK's licensing and certification programs provide professional recognition for caregivers and
                institutions, establishing standardized criteria for quality care across Kenya. Our certifications are
                designed to validate skills, knowledge, and ethical practices in the caregiving profession.
              </p>
              <p className="text-muted-foreground">
                Whether you're an individual caregiver seeking to enhance your credentials or an institution aiming to
                demonstrate your commitment to quality standards, ACCK offers comprehensive pathways to professional
                recognition and excellence.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="Certification Ceremony"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Tabs for Caregiver vs Institution */}
        <Tabs defaultValue="caregivers" className="space-y-8">
          <TabsList className="mx-auto">
            <TabsTrigger value="caregivers">For Caregivers</TabsTrigger>
            <TabsTrigger value="institutions">For Institutions</TabsTrigger>
          </TabsList>

          {/* Caregiver Certification Content */}
          <TabsContent value="caregivers" className="space-y-8">
            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Caregiver Certification Levels</h2>
              <p className="text-muted-foreground">
                ACCK offers a progressive certification pathway that allows caregivers to advance their careers through
                increasingly specialized levels of expertise. Each level builds upon the previous one, requiring
                additional training, experience, and demonstrated competency.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-teal-600" />
                      Basic Certificate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Entry-level certification for caregivers with fundamental skills and knowledge.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>40 hours of training</span>
                      </div>
                      <div className="flex items-start">
                        <FileCheck className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Written examination</span>
                      </div>
                      <div className="flex items-start">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>No experience required</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-teal-600" />
                      Intermediate Certificate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      For caregivers with established skills seeking to enhance their capabilities.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>80 hours of training</span>
                      </div>
                      <div className="flex items-start">
                        <FileCheck className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Written and practical examination</span>
                      </div>
                      <div className="flex items-start">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>1 year experience required</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-teal-600" />
                      Advanced Certificate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      For experienced caregivers demonstrating comprehensive knowledge and skills.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>120 hours of training</span>
                      </div>
                      <div className="flex items-start">
                        <FileCheck className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Comprehensive assessment</span>
                      </div>
                      <div className="flex items-start">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>3 years experience required</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-teal-600" />
                      Specialist Certificate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Specialized certification in specific areas of caregiving expertise.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>80+ hours of specialized training</span>
                      </div>
                      <div className="flex items-start">
                        <FileCheck className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Specialty-specific assessment</span>
                      </div>
                      <div className="flex items-start">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Advanced Certificate required</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Specialty Certifications</h2>
              <p className="text-muted-foreground">
                ACCK offers specialized certifications for caregivers who wish to focus on specific areas of care. These
                certifications require completion of the Advanced Certificate plus additional specialized training and
                assessment.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Elder Care Specialist</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Specialized in providing care for elderly individuals, including those with dementia, mobility
                      issues, and chronic conditions common in aging populations.
                    </p>
                    <div className="text-sm text-muted-foreground">
                      Requires 80 hours of specialized training in geriatric care.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Pediatric Care Specialist</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Focused on providing care for children with special needs, developmental disabilities, or medical
                      conditions requiring specialized care.
                    </p>
                    <div className="text-sm text-muted-foreground">
                      Requires 80 hours of specialized training in pediatric care.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Mental Health Support Specialist</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Specialized in providing care for individuals with mental health conditions, including depression,
                      anxiety, and more severe psychiatric disorders.
                    </p>
                    <div className="text-sm text-muted-foreground">
                      Requires 100 hours of specialized training in mental health support.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Palliative Care Specialist</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Focused on providing compassionate end-of-life care, pain management, and support for individuals
                      with terminal illnesses and their families.
                    </p>
                    <div className="text-sm text-muted-foreground">
                      Requires 80 hours of specialized training in palliative care.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Disability Support Specialist</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Specialized in providing care for individuals with physical, intellectual, or developmental
                      disabilities, focusing on independence and quality of life.
                    </p>
                    <div className="text-sm text-muted-foreground">
                      Requires 80 hours of specialized training in disability support.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Post-Surgical Care Specialist</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Focused on providing care for individuals recovering from surgery, including wound care, mobility
                      assistance, and monitoring for complications.
                    </p>
                    <div className="text-sm text-muted-foreground">
                      Requires 60 hours of specialized training in post-surgical care.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Certification Process</h2>
              <p className="text-muted-foreground">
                The ACCK certification process is designed to be thorough, fair, and accessible to all qualified
                caregivers. Below is an overview of the steps involved in obtaining ACCK certification.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                      <span className="text-xl font-bold text-teal-600 dark:text-teal-300">1</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Application</h3>
                    <p className="text-sm text-muted-foreground">
                      Submit application with required documentation, including education, training, and experience.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                      <span className="text-xl font-bold text-teal-600 dark:text-teal-300">2</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Training</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete required training hours through ACCK-approved education providers.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                      <span className="text-xl font-bold text-teal-600 dark:text-teal-300">3</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Examination</h3>
                    <p className="text-sm text-muted-foreground">
                      Pass written and practical examinations demonstrating knowledge and skills.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                      <span className="text-xl font-bold text-teal-600 dark:text-teal-300">4</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Certification</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive official certification valid for two years, requiring renewal through continuing
                      education.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Maintaining Certification</h2>
              <p className="text-muted-foreground">
                ACCK certifications are valid for two years. To maintain certification, caregivers must complete
                continuing education requirements and adhere to the ACCK Code of Ethics.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Continuing Education Requirements</CardTitle>
                    <CardDescription>Required hours of continuing education to maintain certification</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span>Basic Certificate</span>
                      <span className="font-medium">20 hours / 2 years</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span>Intermediate Certificate</span>
                      <span className="font-medium">30 hours / 2 years</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span>Advanced Certificate</span>
                      <span className="font-medium">40 hours / 2 years</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Specialist Certificate</span>
                      <span className="font-medium">50 hours / 2 years</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Renewal Process</CardTitle>
                    <CardDescription>Steps to renew your certification before expiration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start">
                      <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs font-medium text-teal-600">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Document Continuing Education</p>
                        <p className="text-sm text-muted-foreground">
                          Submit proof of completed continuing education hours.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs font-medium text-teal-600">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Complete Renewal Application</p>
                        <p className="text-sm text-muted-foreground">
                          Update personal information and professional experience.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs font-medium text-teal-600">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Pay Renewal Fee</p>
                        <p className="text-sm text-muted-foreground">
                          Submit the renewal fee based on certification level.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs font-medium text-teal-600">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Receive Updated Certificate</p>
                        <p className="text-sm text-muted-foreground">
                          Obtain your renewed certification valid for another two years.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <div className="rounded-lg bg-teal-50 p-8 text-center dark:bg-teal-950">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Ready to Get Certified?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Take the first step toward professional recognition and career advancement by pursuing ACCK
                certification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/certification">View Certification Programs</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/membership/join?type=caregiver">Apply for Membership</Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Institution Certification Content */}
          <TabsContent value="institutions" className="space-y-8">
            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Institution Accreditation Levels</h2>
              <p className="text-muted-foreground">
                ACCK offers comprehensive accreditation programs for healthcare institutions, training centers, and
                caregiving agencies. Our accreditation process evaluates facilities, staff qualifications, training
                programs, and operational standards to ensure quality care delivery.
              </p>

              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-teal-600" />
                      Standard Accreditation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Basic accreditation level for institutions meeting essential quality and safety standards.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <FileCheck className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Meets minimum facility requirements</span>
                      </div>
                      <div className="flex items-start">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Staff with basic certifications</span>
                      </div>
                      <div className="flex items-start">
                        <BookOpen className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Standard operating procedures</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-teal-600" />
                      Premium Accreditation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Advanced accreditation for institutions demonstrating excellence in caregiving services.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <FileCheck className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Enhanced facility standards</span>
                      </div>
                      <div className="flex items-start">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Staff with advanced certifications</span>
                      </div>
                      <div className="flex items-start">
                        <BookOpen className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Comprehensive quality management</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-teal-600" />
                      Center of Excellence
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Highest level of accreditation for institutions setting industry benchmarks in caregiving.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <FileCheck className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>State-of-the-art facilities</span>
                      </div>
                      <div className="flex items-start">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Specialist-level staff</span>
                      </div>
                      <div className="flex items-start">
                        <BookOpen className="mr-2 h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span>Research and innovation focus</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Accreditation Standards</h2>
              <p className="text-muted-foreground">
                ACCK evaluates institutions across multiple domains to ensure comprehensive quality assessment. Each
                domain contributes to the overall accreditation score and determination of accreditation level.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Facility Standards</h3>
                    <p className="text-sm text-muted-foreground">
                      Assessment of physical infrastructure, safety measures, accessibility, equipment, and environment
                      conducive to quality care delivery.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Staff Qualifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Evaluation of staff certification levels, continuing education, staff-to-client ratios, and
                      professional development programs.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Care Protocols</h3>
                    <p className="text-sm text-muted-foreground">
                      Review of standardized care procedures, documentation practices, care planning processes, and
                      adherence to best practices.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Quality Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Assessment of quality assurance programs, outcome measurement, continuous improvement processes,
                      and incident management systems.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Client Services</h3>
                    <p className="text-sm text-muted-foreground">
                      Evaluation of client intake procedures, needs assessment, service delivery, client satisfaction
                      monitoring, and feedback mechanisms.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Governance & Ethics</h3>
                    <p className="text-sm text-muted-foreground">
                      Review of organizational structure, policies and procedures, ethical standards, compliance with
                      regulations, and financial sustainability.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Accreditation Process</h2>
              <p className="text-muted-foreground">
                The ACCK accreditation process for institutions is comprehensive and rigorous, designed to ensure that
                only those meeting our high standards receive recognition. Below is an overview of the accreditation
                journey.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                      <span className="text-xl font-bold text-teal-600 dark:text-teal-300">1</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Application</h3>
                    <p className="text-sm text-muted-foreground">
                      Submit institutional profile, documentation, and self-assessment.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                      <span className="text-xl font-bold text-teal-600 dark:text-teal-300">2</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Document Review</h3>
                    <p className="text-sm text-muted-foreground">
                      ACCK reviews policies, procedures, and documentation for compliance.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                      <span className="text-xl font-bold text-teal-600 dark:text-teal-300">3</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">On-Site Assessment</h3>
                    <p className="text-sm text-muted-foreground">
                      ACCK team conducts comprehensive on-site evaluation of facilities and operations.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                      <span className="text-xl font-bold text-teal-600 dark:text-teal-300">4</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Accreditation Decision</h3>
                    <p className="text-sm text-muted-foreground">
                      ACCK board reviews findings and determines accreditation level.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                      <span className="text-xl font-bold text-teal-600 dark:text-teal-300">5</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Certification</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive official accreditation valid for three years with annual reviews.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Maintaining Accreditation</h2>
              <p className="text-muted-foreground">
                ACCK institutional accreditation is valid for three years. To maintain accreditation status,
                institutions must participate in annual reviews and demonstrate ongoing compliance with standards.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Annual Review Requirements</CardTitle>
                    <CardDescription>Key components of the annual review process</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-teal-600 shrink-0" />
                      <div>
                        <p className="font-medium">Quality Metrics Reporting</p>
                        <p className="text-sm text-muted-foreground">
                          Submit data on key performance indicators and quality metrics.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-teal-600 shrink-0" />
                      <div>
                        <p className="font-medium">Staff Certification Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Provide updated information on staff certifications and continuing education.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-teal-600 shrink-0" />
                      <div>
                        <p className="font-medium">Policy and Procedure Updates</p>
                        <p className="text-sm text-muted-foreground">
                          Submit any changes to institutional policies and procedures.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-teal-600 shrink-0" />
                      <div>
                        <p className="font-medium">Incident and Complaint Reports</p>
                        <p className="text-sm text-muted-foreground">
                          Provide summary of incidents, complaints, and resolution actions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Reaccreditation Process</CardTitle>
                    <CardDescription>Steps for renewing accreditation after three years</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start">
                      <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs font-medium text-teal-600">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Comprehensive Self-Assessment</p>
                        <p className="text-sm text-muted-foreground">
                          Complete updated self-assessment against current standards.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs font-medium text-teal-600">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Documentation Update</p>
                        <p className="text-sm text-muted-foreground">
                          Submit updated documentation reflecting current operations.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs font-medium text-teal-600">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Abbreviated On-Site Visit</p>
                        <p className="text-sm text-muted-foreground">Host ACCK team for focused on-site assessment.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs font-medium text-teal-600">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Reaccreditation Decision</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updated accreditation status and level determination.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Benefits of Accreditation</h2>
              <p className="text-muted-foreground">
                ACCK accreditation provides numerous benefits for institutions, enhancing reputation, operations, and
                market position.
              </p>

              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Quality Recognition</h3>
                    <p className="text-sm text-muted-foreground">
                      Official recognition of quality standards and commitment to excellence in caregiving services.
                      Enhanced reputation among clients, partners, and the healthcare community.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Operational Improvements</h3>
                    <p className="text-sm text-muted-foreground">
                      Structured framework for quality improvement and operational excellence. Access to best practices,
                      benchmarking data, and quality improvement resources.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Market Advantage</h3>
                    <p className="text-sm text-muted-foreground">
                      Competitive differentiation in the marketplace. Preferred status with referral sources, insurance
                      providers, and healthcare networks.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Staff Development</h3>
                    <p className="text-sm text-muted-foreground">
                      Enhanced staff recruitment, retention, and professional development. Access to ACCK training
                      resources and professional development opportunities.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Risk Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Reduced liability through standardized protocols and quality assurance mechanisms. Improved safety
                      outcomes for clients and staff.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">Networking Opportunities</h3>
                    <p className="text-sm text-muted-foreground">
                      Access to network of accredited institutions for collaboration and knowledge sharing.
                      Participation in ACCK institutional forums and leadership events.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <div className="rounded-lg bg-teal-50 p-8 text-center dark:bg-teal-950">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Ready to Pursue Accreditation?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Take the first step toward institutional excellence and recognition by pursuing ACCK accreditation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/accreditation">View Accreditation Programs</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/membership/join?type=institution">Apply for Institutional Membership</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Resources Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Resources & Support</h2>
          <p className="text-muted-foreground">
            ACCK provides a variety of resources to support caregivers and institutions throughout the certification and
            accreditation process.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Preparation Guides</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive guides to help prepare for certification examinations and accreditation assessments.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/resources/guides">View Guides</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Training Programs</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  ACCK-approved training programs for caregivers seeking certification at all levels.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/training">Find Training</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Consultation Services</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Expert consultation for institutions preparing for accreditation or seeking to improve quality.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/consultation">Request Consultation</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Continuing Education</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Approved continuing education opportunities for maintaining certification and accreditation.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/continuing-education">Find Courses</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>How long does the certification process take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The certification process timeline varies by level. Basic certification can be completed in 1-2
                  months, while advanced and specialist certifications may take 3-6 months, depending on training
                  availability and your pace of completion.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What if I fail the certification examination?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Candidates who do not pass the examination may retake it after a 30-day waiting period. ACCK provides
                  feedback on areas needing improvement and recommends additional preparation resources before retaking
                  the exam.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How much does accreditation cost?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Accreditation fees vary based on institution size and type. Standard accreditation typically ranges
                  from KES 150,000 to KES 300,000, with annual maintenance fees of KES 50,000 to KES 100,000. Detailed
                  fee schedules are available upon application.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Can I upgrade my certification level?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, caregivers can upgrade their certification level by completing additional training, gaining
                  required experience, and passing the examination for the higher level. Previous certification
                  requirements are credited toward the new level.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Have Questions?</h2>
          <p className="text-muted-foreground">
            Our certification and accreditation team is available to answer your questions and provide guidance
            throughout the process.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Caregiver Certification</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For questions about caregiver certification requirements, process, and maintenance.
                </p>
                <p className="text-sm font-medium">certification@accgk.co.ke</p>
                <p className="text-sm font-medium">+254 700 111 222</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Institution Accreditation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For questions about institutional accreditation standards, process, and benefits.
                </p>
                <p className="text-sm font-medium">accreditation@accgk.co.ke</p>
                <p className="text-sm font-medium">+254 700 111 333</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Training & Resources</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For information about approved training programs and preparation resources.
                </p>
                <p className="text-sm font-medium">training@accgk.co.ke</p>
                <p className="text-sm font-medium">+254 700 111 444</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
